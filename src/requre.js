/**
 * requireJS服务
 *
 */
(function () {

    "use strict";


    var $requireProvider = function ($element) {

        var config = {
            base: "",
            alias: {}
        };

        this.setConfig = function (params) {

            //设置根路径
            if (params.base) {
                config.base = params.base;
            }
            //设置别名文件
            if (params.alias) {
                config.alias = params.alias;
            }

        };


        var RequireProvider = function () {

            //加载单个文件超时时间
            this.expires = 3000;

            //缓载成功的文件列表
            this.loadedList = [];
        };

        /**
         * 获取别名路径文件
         * @param key
         * @returns {string}
         */
        RequireProvider.prototype.getAliasPath = function (key) {
            var file = "";
            if (config.alias && config.alias[key]) {
                file = this.getFullPath(config.alias[key]);
            }
            return file;
        };

        /**
         * 获取全路径文件
         *
         * @param src
         * @returns {*}
         */
        RequireProvider.prototype.getFullPath = function (src) {
            if (config.base) {
                src = config.base + src;
            }
            return src;

        };

        /**
         * 加载JS文件
         * @param src
         * @param callback
         */
        RequireProvider.prototype.file = function (src, callback) {

            src = this.getAliasPath(src);
            if (!src) {
                src = this.getFullPath(src);
            }
            var _this = this;
            if (!_this.loadedList[src]) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.defer = "defer";
                //script.src = src + '?' + (+new Date());
                $element.$("head").appendChild(script);
                script.onload = function () {
                    _this.loadedList[src] = true;
                    if (callback) {
                        callback();
                    }
                };
                script.src = src;

            } else {
                if (callback) {
                    callback();
                }
            }

        };

        /**
         * 加载JS文件多个
         * @param src_json
         * @param callback
         */
        RequireProvider.prototype.files = function (src_json, callback) {
            if (src_json[0]) {
                var loaded_rate = src_json.length;
                var absolute_rate = 0;
                var rate_trace = setInterval(function () {
                    if (loaded_rate === absolute_rate) {
                        clearInterval(rate_trace);
                        if (callback) {
                            callback();
                        }
                    }
                }, 50);
                //expires setting
                setTimeout(function () {
                    if (loaded_rate !== absolute_rate) {
                        clearInterval(rate_trace);
                    }
                }, this.timeout);
                //loading file one by one
                var increase = function () {
                    absolute_rate++;
                };
                for (var i = 0; i < src_json.length; i++) {
                    this.file(src_json[i], increase());
                }

            } else {
                if (callback) {
                    callback();
                }
            }
        };


    };

    window.$requireProvider = $requireProvider;

}());