/**
 * Dom服务
 *
 */
(function () {

    "use strict";


    var $elementProvider = function () {

        var type = "jquery";

        this.config = function (params) {
            if (params.type) {
                type = params.type;
            }
        };

        /**
         * 实例化Dom操作对象
         * @constructor
         */
        var ElementProvider = function () {

            if (type === "jquery") {
                this.$ = window.jQuery;
            } else if (type === "coreJs") {
                this.$ = window.core;
            }
        };


        this.$_construct = function () {
            return new ElementProvider();
        };

    };

    window.$elementProvider = $elementProvider;

}());