/**
 * @title 注入器
 * 负责递归的将provider注入到函数参数中
 * 同时负责管理被注入的provider
 *
 */
(function (undefined) {

    "use strict";

    var $injectorProvider = function () {

        var Injector = function () {

            //可以被注入的provider列表
            this.providerList = {};

            //可以被注入的服务列表
            this.serviceList = {};

            //可以被注入并完成实例化的provider列表,当instanceProviderList中的服务执行$_constrcut后将变为instanceServiceList中的对象
            this.instanceProviderList = {};

            //可以被注入并完成析构的provider列表
            this.instanceServiceList = {};

            this.providerKeyName = "Provider";

        };


        /**
         * @title 添加可以注入的provider
         * @param name object or string
         * @param provider
         */
        Injector.prototype.provider = function (name, provider) {

            if (typeof name === "object") {
                for (var key in name) {
                    if (typeof  name[key] === "function") {
                        this.providerList[key] = name[key];
                    }
                }
            } else {
                if (typeof provider === "function") {
                    this.providerList[name] = provider;
                }

            }

        };

        /**
         * @title 添加可以注入的服务
         * @param name object or string
         * @param provider
         */
        Injector.prototype.service = function (name, service) {
            if (typeof name === "object") {
                for (var key in name) {
                    if (typeof  name[key] === "function") {
                        this.serviceList[key + this.providerKeyName] = name[key];
                    }
                }
            } else {
                if (typeof service === "function") {
                    this.serviceList[name + this.providerKeyName] = service;
                }
            }
        };


        Injector.prototype.providerAgent = function (fun, pa) {
            var str = "",i;
            for ( i in pa) {
                str = str + "pa[" + i + "],";
            }
            str = str.substr(0, str.length - 1);
            return eval("new fun(" + str + ")");
        };


        /**
         * 递归的实例一个Provider
         * @param name
         * @returns {*}
         */
        Injector.prototype.getProvider = function (name) {
            if (this.providerList[name] && typeof this.providerList[name] === "function") {

                if (!this.instanceProviderList[name] || typeof this.instanceProviderList[name] !== "object") {
                    this.instanceProviderList[name] = this.callback(this.providerList[name], false);
                }
                return  this.instanceProviderList[name];

            }

        };

        /**
         * 递归的实例一个服务
         * @param name
         * @returns {*}
         */
        Injector.prototype.getService = function (name) {
            name = name + this.providerKeyName;
            if (this.providerList[name] && typeof this.providerList[name] === "function") {
                if (!this.instanceProviderList[name] || typeof this.instanceProviderList[name] !== "object") {
                    this.instanceProviderList[name] = this.callback(this.providerList[name], true);
                }
                if (!this.instanceServiceList[name]) {
                    this.instanceServiceList[name] = this.instanceProviderList[name].$_construct();
                }
                return this.instanceServiceList[name];

            } else if (this.serviceList[name] && typeof this.serviceList[name] === "function") {
                if (!this.serviceList[name] || typeof this.serviceList[name] !== "object") {
                    if (!this.instanceServiceList[name]) {
                        this.instanceServiceList[name] = this.callback(this.serviceList[name], true);
                    }
                }
                return this.instanceServiceList[name];
            }

        };


        /**
         * 递归的实例Provider或者service fucntion
         * @param func
         * @param isService
         * @returns {*}
         */
        Injector.prototype.callback = function (func, isService) {
            if (func && typeof func === "function") {
                var providerNameList = this.parseParam(func),
                    providers = [],
                    i;
                if (providerNameList && providerNameList.length > 0) {
                    for ( i = 0; i < providerNameList.length; i++) {
                        if (!isService) {
                            providers.push(this.getProvider(providerNameList[i]));
                        } else {
                            providers.push(this.getService(providerNameList[i]));
                        }

                    }
                }
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
         * @title 显示可以被注入的service
         */
        Injector.prototype.getServiceList = function () {
            return this.serviceList;
        };


        /**
         * @title 显示已经被注入的provider
         */
        Injector.prototype.getInstanceProviderList = function () {
            return this.instanceProviderList;
        };

        /**
         * @title 显示已经被注入service
         */
        Injector.prototype.getInstanceServiceList = function () {
            return this.instanceServiceList;
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

        /**
         * 特殊形式的自我实例化和自我注入
         * @returns {*}
         */
        this.$_construct = function () {
            var injectorInstance = new Injector(),
                providerName = "$injector" + injectorInstance.providerKeyName;
            injectorInstance.providerList[providerName] = $injectorProvider;
            injectorInstance.instanceProviderList[providerName] = new $injectorProvider();
            injectorInstance.instanceServiceList[providerName] = injectorInstance;
            return  injectorInstance.instanceServiceList[providerName];
        };

    };

    window.$injectorProvider = $injectorProvider;

}(undefined));