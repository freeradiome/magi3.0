/**
 * 抛出异常的Provider
 */
(function () {

    "use strict";

    var $exceptionProvider = function () {


        var Exception = function () {

        };

        Exception.prototype.throw = function (msg) {
            throw new Error(msg);
        };


        this.$_construct = function () {
            return new Exception();
        };
    };

    window.$exceptionProvider = $exceptionProvider;

}());