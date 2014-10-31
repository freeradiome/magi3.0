/**
 * Runtime Service
 *
 */
(function () {

    "use strict";


    var Runtime = function () {
        this.startTime = + new Date();
    };


    Runtime.prototype.start = function () {
        this.startTime = + new Date();
    };

    Runtime.prototype.log = function (msg) {
        var runtime =  + new Date() - this.startTime;
        console.info(runtime.toFixed(2) + " ms "+msg);
        this.startTime = + new Date();
    };

    window.$runtime = Runtime;

}());