define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/Deferred",
    "dojo/json",
    "dojo/request/registry",
    "dojo/store/util/QueryResults"],

function(declare, lang, Deferred, JSON, request, QueryResults) {

    return declare(null, {

        sort: null,

        pageSize: 25, //default number of items to get when requesting a list

        startIndex: 0, //default first index when getting fresh data if none given

        baseURL: "",

        deferred: null,

        idProperty: "id",

        cancelPreviousQuery: false, //disable the canceling of the previous deferred on a query

        constructor: function(options) {
            options = options || {};
            declare.safeMixin(this, options);
        },

        get: function(id) {
            console.log("KubJsonRest get()");

            var service = this.baseURL + "/getById/" + id;
            return request(service, {
                method: "POST",
                handleAs: "json",
                headers: {
                    "Content-Type": "application/json",
                    "Accepts": "application/json"
                },
                preventCache: true
            }).then(function(response) {
                //normalize the response
                return response.data ? response.data : response;
            });
        },

        remove: function(id) {
            console.log("KubJsonRest remove()");

            var service = this.baseURL + "/remove/" + id;

            return request(service, {
                method: "POST",
                preventCache: true
            });
        },

        getIdentity: function(object) {
            return object[this.idProperty];
        },

        put: function(object, options) {
            return put.apply(this, arguments);
        },

        add: function(object, options) {
            return put.apply(this, arguments);
        },

        _createRange: function(start, count) {
            var end = start + count - 1;
            return "items=" + start + "-" + end;
        },

        _getList: function(range, filter, sort) {
            console.log("KubJsonRest getList()");

            var service = this.baseURL + "/getList";
            return request(service, {
                method: "POST",
                handleAs: "json",
                headers: {
                    "Content-Type": "application/json",
                    Range: range,
                    "X-Range": range
                },
                query: {
                    filter: filter,
                    sort: sort
                },
                preventCache: true
            });
        },

        query: function(query, options) {
            console.log("KubJsonRest query()");

            query = query || {};
            options = options || {};
            console.log(query, options);

            if (this.cancelPreviousQuery && this.deferred) {
                this.deferred.cancel();
                this.deferred = null;
            }

            var filter = [];
            for (var key in query) {
                if (query.hasOwnProperty(key) && (query[key] || query[key] === false)) {
                    filter.push(key + ":" + query[key]);
                }
            }

            var sort = [];
            if (options.hasOwnProperty("sort")) {
                for (var sortProperty in options.sort) {
                    if (options.sort.hasOwnProperty(sortProperty) && options.sort[sortProperty]) {
                        var descending = options.sort[sortProperty].descending;
                        var attribute = options.sort[sortProperty].attribute;
                        sort.push(attribute + ":" + (descending ? "DESC" : "ASC"));
                    }
                }
            }

            //defaults arguments for getList
            var args = {
                start: this.startIndex,
                count: this.pageSize
            };
            //override defaults
            lang.mixin(args, options);

            var range = this._createRange(args.start, args.count);

            var deferredResponse = new Deferred();
            this.deferred = this._getList(range, filter, sort);

            this.deferred.then(function(response) {
                if (response.hasOwnProperty("data")) {
                    response = response.data;
                    response = response || [];
                }
                deferredResponse.resolve(response);
            }, function(err) {
                deferredResponse.reject(err);
            });

            deferredResponse.total = this.deferred.response.then(function(response) {
                var range = response.getHeader("Content-Range") || "";
                range = range.match(/\/(.*)/);
                return (range && range.length > 0) ? +range[1] : response.data.data.length;
            });

            return new QueryResults(deferredResponse);
        }
    });
    
    function put(object, options) {
        options = options || {};
        var id = ("id" in options) ? options.id : this.getIdentity(object);
        var hasId = id && typeof id !== "undefined";
        var service = this.baseURL + (hasId ? "/update" : "/create");

        return request(service, {
            method: "POST",
            handleAs: "json",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            data: JSON.stringify(object),
            preventCache: true
        }).then(function(response) {
            //normalize the response
            return response.data ? response.data : response;
        });
    }
});
