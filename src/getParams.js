/**
 * get Service
 *
 */
(function () {

    "use strict";


    var GetParams = function () {


        this.history = [];


    };

    GetParams.prototype.history = [];

    GetParams.prototype.url = function () {
        return location.href;
    };

    window.$getParams = GetParams;

}());