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

        //默认被注入的服务
        this.defaultInjectProvider = {
            $elementProvider: $elementProvider,
            $cacheProvider: $cacheProvider,
            $controllerProvider: $controllerProvider,
            $exceptionProvider: $exceptionProvider,
            $injectorProvider: $injectorProvider,
            $getParamsProvider: $getParamsProvider
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
        this.injector.import(this.defaultInjectProvider, undefined);

    };


    /**
     * @title 配置provider
     * @desc 实例化注入的provider，并允许设置其属性，
     * @param provider
     * @returns {Magi}
     */
    Magi.prototype.config = function (provider) {

        //注入config参数的provider
        this.injector.callback(provider, true);
        return this;

    };


    /**
     * 构造APP
     * @param provider
     * @returns {Magi}
     */
    Magi.prototype.run = function (provider) {

        this.injector.callback(provider);


        return this;
    };


    /**
     * 创建一个控制器
     * @param provider
     * @returns {Magi}
     */
    Magi.prototype.controller = function (name, fun) {
        console.info(this.injector.get("$controller"))
        this.injector.get("$controller").import(name, fun);
        return this;

    };


    /**
     * 创建一个provider服务
     * @param name
     * @param method
     */
    Magi.prototype.provider = function (name, method) {
        this.injector.import(name, method);
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
