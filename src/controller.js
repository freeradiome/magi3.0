/**
 * 控制器Provider
 */
(function ($, undefined) {

    "use strict";

    var $controllerProvider = function ($exception) {


        /**
         * 析构
         * @returns {Controller}
         */

        this.$_construct = function () {
            return new Controller();
        };


        /**
         * 控制器对象
         * @constructor
         */
        var Controller = function () {

            //可以被注入的provider列表
            this.controllerList = {};

        };


        /**
         * 导入一组或一个控制器方法
         * @param name
         * @param fun
         * @returns {Controller}
         */
        Controller.prototype.import = function (name, fun) {

            if (typeof name === "object") {
                var _this = this;
                $.each(name, function (name, provider) {
                    _this.controllerList[name] = provider;
                });
            } else {
                this.controllerList[name] = fun;
            }
            return this;


        };


        /**
         * 取得一个控制器方法
         * @param name
         * @returns {*}
         */
        Controller.prototype.get = function (name) {
            if (this.controllerList[name]) {
                return this.controllerList[name];
            } else {
                return undefined;
            }

        };


    }

    window.$controllerProvider = $controllerProvider;

}(core, undefined));