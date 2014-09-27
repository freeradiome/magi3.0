(function (core, $magi) {

    "use strict";

    var Exception = function () {

    };

    Exception.prototype.throw = function (msg) {
        throw new Error(msg);
    };


    window.$magi.exception = new Exception();

}(core, $magi));