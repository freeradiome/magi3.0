/**
 * 控制器Service
 */
(function (undefined) {

    "use strict";


    /**
     * 控制器对象
     * @constructor
     */
    var Controller = function ($injector) {


        //控制器fun列表
        this.controllerList = {};

        this.injector = $injector;

        //在控制器执行前执行的动作
        this._beforeRun = undefined;

    };


    /**
     * 运行一个控制器
     */
    Controller.prototype.run = function (service) {
        console.info( this.injector);
        this.injector.callback(service, true);
//        if (this._beforeRun) {
//            this.injector.callback(this._beforeRun, true);
//        }
        return this;

    };

    /**
     * 定义当一个控制器被执行前操作的方法
     * @param fun
     */
    Controller.prototype.beforeRun = function (fun) {

        if (fun && typeof fun === "function") {

            this._beforeRun = fun;
        }
        return this;
    };

    /**
     * 导入一组或一个控制器方法
     * @param name
     * @param fun
     * @returns {Controller}
     */
    Controller.prototype.import = function (name, fun) {

        if (typeof name === "object") {
            for (var key in name) {
                if (key && typeof name[key] === "function") {
                    this.controllerList[key] = name[key];
                }
            }
        } else {
            if (name && typeof fun === "function") {
                this.controllerList[name] = fun;
            }
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


    window.$controller = Controller;

}(undefined));