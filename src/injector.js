/**
 * @title 注入器
 * 负责递归的将provider注入到函数参数中
 * 同时负责管理被注入的provider
 *
 */
(function ($, undefined) {

    "use strict";

    var $injectorProvider = function () {

        var Injector = function () {

            //可以被注入的provider列表
            this.providerList = {};

            //可以被注入并完成实例化的provider列表
            this.instanceProviderList = {};

            //可以被注入并完成析构的provider列表
            this.constructProviderList = {};


            this.providerKeyName = "Provider";
        };


        /**
         * @title 添加可以注入的provider
         * @param name object or string
         * @param provider
         */
        Injector.prototype.import = function (name, provider) {

            if (typeof name === "object") {
                var _this = this;
                $.each(name, function (name, provider) {
                    _this.providerList[name] = provider;
                });
            } else {
                this.providerList[name] = provider;
            }

        };

        Injector.prototype.providerAgent = function (fun, pa) {
            var str = "";
            S.each(pa, function (i, v) {
                str = str + "pa[" + i + "],";
            });
            str = str.substr(0, str.length - 1);
            return eval("new fun(" + str + ")");
        };

        /**
         * @title 实例化一个provider
         *
         * @param name
         * @param isConstructed
         * @returns {*}
         */
        Injector.prototype.get = function (name, isNotConstructed) {
//        var providerName = name + this.providerKeyName;
            if (!isNotConstructed) {
                name = name + this.providerKeyName;
            }
            if (this.providerList[name] && typeof this.providerList[name] === "function") {

                if (!this.instanceProviderList[name] || typeof this.instanceProviderList[name] !== "object") {
//                this.instanceProviderList[name] = new this.providerList[name]();

//                    this.instanceProviderList[name] = this.callback(this.providerList[name], isNotConstructed);
                    this.instanceProviderList[name] = this.callback(this.providerList[name]);
                }
                if (!isNotConstructed) {
                    if (!this.constructProviderList[name]) {
                        this.constructProviderList[name] = this.instanceProviderList[name].$_construct();
                    }
                    return this.constructProviderList[name];
                } else {

                    return  this.instanceProviderList[name];
                }
            }

        };


        /**
         * 从参数字符串中获取
         * @param func
         * @param isNotConstructed
         * @returns {*}
         */
        Injector.prototype.callback = function (func, isNotConstructed) {
            if (func && typeof func === "function") {
                var providerNameList = this.parseParam(func),
                    providers = [],
                    _this = this;
//                 console.info(providerNameList)
                if (providerNameList && providerNameList.length > 0) {
                    $.each(providerNameList, function (i, name) {
                        providers.push(_this.get(name, isNotConstructed));
                    });
                }
                //        console.info(isConstructed);
                return this.providerAgent.call(null, func, providers);
            } else {
                return undefined;
            }

        };

        /**
         * @title 显示可以被注入的provider
         */
        Injector.prototype.getProviderList = function () {
            return this.providerList;
        };

        /**
         * @title 显示已经被注入的provider
         */
        Injector.prototype.getInstanceProviderList = function () {
            return this.instanceProviderList;
        };

        /**
         * @title 显示已经被注入析构的provider
         */
        Injector.prototype.getConstructProviderList = function () {
            return this.constructProviderList;
        };

        /**
         * 解析参数中的注入对象
         * @param obj
         * @returns {Array}
         */
        Injector.prototype.parseParam = function (obj) {

            if (obj) {
                obj = obj.toString();
                var regExp = /function[\s]+\((.*)\)/,
                    objList = regExp.exec(obj);

                if (objList && objList[1]) {
                    objList = objList[1].replace(/(\s| )*/g, "");
                    objList = objList.split(",");
                    return objList;
                }
            }
        };

        this.$_construct = function () {
            return new Injector();
        };

    }

    window.$injectorProvider = $injectorProvider;

}(core, undefined));