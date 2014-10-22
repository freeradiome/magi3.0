/**
 * cache服务
 *
 */
(function () {

    "use strict";


    var $cacheProvider = function ($exception) {

        var type = "session",
            token = "magi_";

        this.config = function (params) {
            if (params.type) {
                type = params.type;
            }
            if (params.token) {
                token = params.token;
            }

        };


        var CacheProvider = function () {
            this.cacheInstance = this.switchCache(type);
        };

        /**
         * 切换返回cache类型
         * @param type
         * @returns {Storage}
         */
        CacheProvider.prototype.switchCache = function (type) {
            if (type === "session") {
                return  window.sessionStorage;
            } else if (type === "local") {
                return window.localStorage;
            } else {
                $exception.throw("cache type参数无效");
            }
        };

        /**
         * 读取或者设置cache
         * @param key
         * @param value
         * @param expires
         * @returns {boolean}
         */
        CacheProvider.prototype.val = function (key, value, expires, type) {
            key = token + key;
            return (value) ? this.set(key, value, expires, type) : this.get(key, type);

        };


        /**
         * 返回缓存的数据
         *
         * @param key
         * @returns {*}
         */
        CacheProvider.prototype.get = function (key, type) {
            if (type) {
                this.cacheInstance = this.switchCache(type);
            }

            key = token + key;
            var json = JSON.parse(this.cacheInstance.getItem(key));
            if (json) {
                var expires = (+new Date()) - json.create_at;
                if (expires < json.expires || json.expires === 0) {
                    return json.val;
                } else {
                    this.remove(key, type);
                    return "";
                }

            }
        };

        /**
         * 设置一个缓存
         * @param key
         * @param value
         * @param expires 但为0永远不过期
         * @returns {boolean}
         */
        CacheProvider.prototype.set = function (key, value, expires, type) {
            if (value) {
                if (type) {
                    this.cacheInstance = this.switchCache(type);
                }
                key = token + key;
                this.cacheInstance.setItem(
                    key,
                    JSON.stringify({
                        expires: (parseInt(expires) !== 0) ? parseInt(expires) : 0,
                        created_at: +new Date(),
                        val: value
                    }));
                return true;
            }

        };

        /**
         * 移除一个缓存对象
         * @param key
         * @param type
         * @returns {boolean}
         */
        CacheProvider.prototype.remove = function (key, type) {
            if (type) {
                this.cacheInstance = this.switchCache(type);
            }
            key = token + key;
            this.cacheInstance.removeItem(key);
            return true;

        };


        this.$_construct = function () {
            if (!window.sessionStorage) {
                $exception.throw("浏览器不支持的属性sessionStorage or LocalStorage！");
            } else {
                return new CacheProvider();
            }

        };

    };

    window.$cacheProvider = $cacheProvider;

}());