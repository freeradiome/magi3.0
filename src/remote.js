/**
 * requireJS服务
 *
 */
(function () {

    "use strict";


    var $remoteProvider = function ($element, $cache) {

        var config = {
            ajaxStart: undefined,
            ajaxEnd: undefined
        };

        this.setConfig = function (params) {


            if (params.ajaxStart) {
                config.ajaxStart = params.ajaxStart;
            }

            if (params.ajaxEnd) {
                config.ajaxEnd = params.ajaxEnd;
            }

        };


        var RemoteProvider = function () {


        };

        RemoteProvider.prototype.get = function (url, request, params, callback) {
            var json = {
                type: "get",
                request: request,
                format: "json",
                url: url
            };
            if (typeof params === "function") {
                json.callback = params;
            } else if (typeof params === "object") {
                json.expires = params.expires;
                json.callback = callback;
            }
            this.load(json);
        };

        RemoteProvider.prototype.post = function (url, request, params, callback) {
            var json = {
                type: "get",
                request: request,
                format: "json",
                url: url
            };
            if (typeof params === "function") {
                json.callback = params;
            } else if (typeof params === "object") {
                json.expires = params.expires;
                json.callback = callback;
            }
            this.load(json);
        };


        /**
         * 获取请求
         * @param url
         * @param requestData
         * @param params {type:post,expires:3600,format:string/json,sync:ture,callback:function,url:xxx,request:data}
         * @param callback
         */
        RemoteProvider.prototype.load = function (params) {
            if (typeof params === "function") {
                $element.$.get(params.url, params.requestData, params.callback);
            } else {


            }

//            $cache.set(params.url,data)
        };


    };

    window.$requireProvider = $remoteProvider;

}());