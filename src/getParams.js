/**
 * get服务
 *
 */
(function () {

    "use strict";


    var $getParamsProvider = function () {

        var GetParamsProvider = function () {

            this.history = [];

        };

        GetParamsProvider.prototype.url = function () {
            return location.href;
        };

        this.$_construct = function () {
            return new GetParamsProvider();
        };

    };

    window.$getParamsProvider = $getParamsProvider;

}());