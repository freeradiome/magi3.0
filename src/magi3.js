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
     * 命名空间列表
     */

        //magi扩展命名空间
    window.$magi = {};

    //magi系统内部provider服务变量
    window.$magi.provider = {};

    //注入器对象
    window.$magi.Injector = undefined;


    /**
     * Magi对象
     * @param appName
     * @constructor
     */
    var Magi = function (appName) {

        //应用名称
        this.appName = appName;


        //注入服务对象
        this.injector = new $magi.Injector();


        //系统初始化
        this._initializeConfig();


    };

    /**
     *  @title 初始化magi,最先运行和组织默认注入的method
     * @private initialize
     */
    Magi.prototype._initializeConfig = function () {

        //导入系统底层provier
        this.injector.import($magi.provider);

        //配置底层provider
        //配置控制器
        this.injector.get("$controllerProvider", true).setProvider(this.injector);


    };

    /**
     * @title 配置provider
     * @desc 实例化注入的provider，并允许设置其属性，
     * @param provider
     * @returns {magi}
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
        var controller = this.injector.get("$controller");
        controller.import(name, fun);
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

    window.magi = Magi;


}(core, undefined));
