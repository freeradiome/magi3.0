/**
 * new magi("myAppName").config({}).run(function(){
 *
 *
 * });
 *
 */
(function ($, undefined) {

    "use strict";


    /**
     * Magi对象
     * @param appName
     * @constructor
     */
    var Magi = function (appName) {

        //默认被注入的Provider
        this.defaultInjectProvider = {
            $elementProvider: $elementProvider,
            $cacheProvider: $cacheProvider,
            $exceptionProvider: $exceptionProvider,
            $injectorProvider: $injectorProvider
        };

        //默认被注入的Service
        this.defaultInjectService = {
            $getParams: $getParams,
            $controller: $controller

        };

        //应用名称
        this.appName = appName;


        //注入服务对象
        this.injector = new $injectorProvider().$_construct();

        //系统初始化
        this._initialize();


    };

    /**
     *  @title 初始化magi,组织默认注入的method
     * @private initialize
     */
    Magi.prototype._initialize = function () {

        //导入默认provider
        this.injector.provider(this.defaultInjectProvider);
        //导入默认provider
        this.injector.service(this.defaultInjectService);

    };


    /**
     * @title 配置provider
     * @desc 实例化注入的provider，并允许设置其属性，
     * @param provider
     * @returns {Magi}
     */
    Magi.prototype.config = function (provider) {

        //注入config参数的provider
        this.injector.callback(provider);
        return this;

    };


    /**
     * 构造APP
     * @param provider
     * @returns {Magi}
     */
    Magi.prototype.run = function (provider) {

        this.injector.callback(provider,true);


        return this;
    };


    /**
     * 创建一个控制器
     * @param provider
     * @returns {Magi}
     */
    Magi.prototype.controller = function (name, fun) {
        this.injector.getService("$controller").import(name, fun);
        return this;

    };


    /**
     * 创建一个provider服务
     * @param name
     * @param method
     */
    Magi.prototype.provider = function (name, method) {
        this.injector.provider(name, method);
        return this;
    };

    /**
     * 创建一个provider服务
     * @param name
     * @param method
     */
    Magi.prototype.service = function (name, method) {
        this.injector.service(name, method);
        return this;
    };

    /**
     * 对象工厂
     * @param appName
     * @returns {*}
     */
    Magi.prototype.factory = function (appName) {
        return new Magi(appName);
    };


    window.magi = function (appName) {

        return  Magi.prototype.factory(appName);
    };


}(core, undefined));
