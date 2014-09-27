/**
 * new magi("myAppName").config({}).run(function(){
 *
 *
 * });
 *
 */
(function ($) {

    "use strict";

    //magi扩展命名空间
    window.$magi = {};

    //magi系统内部provider服务
    window.$magi.provider = {};

    var Magi = function (appName) {

        //应用名称
        this.appName = appName;

        //应用中的控制器
        this.controllerList = [];

        //注入服务对象
        this.injector = new $magi.injector();

        //系统初始化
        this._initilize();


    };

    /**
     *  @title 初始化magi,最先运行和组织默认注入的method
     * @private
     */
    Magi.prototype._initilize = function () {

        //导入系统底层provier
        this.injector.import($magi.provider);

    };

    /**
     * @title 配置provider
     * @desc 实例化注入的provider，并允许设置其属性，
     * @param provider
     * @returns {magi}
     */
    Magi.prototype.config = function (provider) {

        //注入config参数的provider
        if (provider && typeof provider === "function") {
            var params = this.injector.getInstanceWithoutConstruct(provider);
            provider.apply(null, params);
        }
        return this;

    };


    /**
     * 构造APP
     * @param provider
     * @returns {Magi}
     */
    Magi.prototype.run = function (provider) {
        if (provider && typeof provider === "function") {
            var params = this.injector.getInstanceWithConstruct(provider);
            provider.apply(null, params);
        }
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


    Magi.prototype.controller = function (name, method) {
        return this;

    };

    window.magi = Magi;


}(core));
