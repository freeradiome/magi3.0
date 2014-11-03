/**
 * Dom服务
 *
 */
(function () {

    "use strict";


    var $routeProvider = function () {

        var url_rule = [{
            index:{
                tpl:"index",
                controller:"index"
            }
        }];

        this.config = function (params) {

            url_rule = params

        };


        var RouteProvider = function () {


        };

        /**
         * route.url("test")
         * @param url
         */
        RouteProvider.prototype.href = function (url) {

        };


        this.$_construct = function () {
            return new RouteProvider();
        };

    };

    window.$routeProvider = $routeProvider;

}());