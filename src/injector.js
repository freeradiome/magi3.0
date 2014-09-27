/**
 * @title 注入器
 * 负责将provider注入到函数参数中
 * 同时负责管理被注入的provider
 *
 */
(function ($, $magi) {

    "use strict";

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
     * @title 将注入到method参数中的provider 实例化
     * @param obj
     */
    Injector.prototype.getInstanceWithoutConstruct = function (injector) {
        return this.getInstance(injector, true);
    };


    /**
     * @title 将注入到method参数中的provider 实例化，并使用构造器返回
     * @param obj
     */
    Injector.prototype.getInstanceWithConstruct = function (injector) {
        return this.getInstance(injector, false);
    };


    /**
     * 将注入到method参数中的provider 实例化
     * @param injector
     * @param withoutConstruct
     * @returns {Array}
     */
    Injector.prototype.getInstance = function (injector, withoutConstruct) {
        var _this = this,
        //获取需要注入的provider对象名称
            providersNames = this.parse(injector),
        //注入的provider实例队列
            providers = [];

        //实例化provider队列
        $.each(providersNames, function (i, val) {
            if (!withoutConstruct) {
                val = val + _this.providerKeyName;
            }
            if (typeof _this.providerList[val] === "function") {
                //将没有实例化的对象加入到队列
                if (!_this.instanceProviderList[val]) {
                    var providerSingle = new _this.providerList[val]();
                    if (providerSingle.$_construct || typeof providerSingle.$_construct === "function") {
                        _this.instanceProviderList[val] = providerSingle;
                    } else {
                        $magi.exception.throw("provider must have $_construct");
                    }
                }
                if (withoutConstruct === true) {
                    providers.push(_this.instanceProviderList[val]);
                } else {
                    if (_this.instanceProviderList[val]) {
                        if(  !_this.constructProviderList[val]  ){
                            _this.constructProviderList[val] = _this.instanceProviderList[val].$_construct();
                        }
                        providers.push(_this.constructProviderList[val]);
                    }
                }
            } else {
                providers.push(undefined);
            }
        });

        return providers;
    };


    /**
     * @title 添加可以注入的provider
     * @param name
     * @param provider
     */
    Injector.prototype.import = function (name, provider) {

        if (typeof name === "object") {
            var _this = this;
            $.each(name, function (key, val) {
                _this.providerList[key] = val;
            });
        } else {
            this.providerList[name] = provider;
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
    Injector.prototype.parse = function (obj) {
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


    window.$magi.injector = Injector;

}(core, $magi));