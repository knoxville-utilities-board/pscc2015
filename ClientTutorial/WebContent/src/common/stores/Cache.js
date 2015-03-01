define(["dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/store/Memory",
    "dojo/when"],

function(declare, array, lang, Memory, when) {
    return declare(null, {

        cachingStore: null,

        getFromServer: undefined,

        constructor: function(options) {
            console.log("Cache constructor()");

            options = options || {};
            declare.safeMixin(this, options);

            if (!this.cachingStore) {
                this.cachingStore = new Memory({
                    idProperty: options.idProperty || this.idProperty
                });
            }
        },

        query: function(query, options) {
            console.log("Cache query()");

            var results = this.inherited(arguments);
            when(results, lang.hitch(this, function(results) {
                array.forEach(results, function(object) {
                    this.cachingStore.put(object);
                }, this);
            }));
            return results;
        },

        get: function(id, options) {
            console.log("Cache get()");

            //get the inherited function without calling it
            var get = this.getInherited(arguments);
            var cachingStore = this.cachingStore;

            if (options && options.getFromCache) {
                return cachingStore.get(id);
            }

            return when(cachingStore.get(id), lang.hitch(this, function(result) {
                if (this.getFromServer || (!result && typeof this.getFromServer == "undefined")) {
                    return when(get.apply(this, [id]), function(result) {
                        if (result) {
                            cachingStore.put(result, {
                                id: id
                            });
                        }
                        return result;
                    });
                }
                return result;
            }));
        },

        add: function(object, options) {
            console.log("Cache add()");

            return when(this.inherited(arguments), lang.hitch(this, function(result) {
                // now put result in cache
                this.cachingStore.add(object && typeof result == "object" ? result : object, options);
                return result;
            }));
        },

        put: function(object, options) {
            console.log("Cache put()");

            // first remove from the cache, so it is empty until we get a response from the master store
            this.cachingStore.remove((options && options.id) || this.getIdentity(object));
            return when(this.inherited(arguments), lang.hitch(this, function(result) {
                // now put result in cache
                this.cachingStore.put(object && typeof result == "object" ? result : object, options);
                return result;
            }));
        },

        remove: function(id, options) {
            console.log("Cache remove()");

            return when(this.inherited(arguments), lang.hitch(this, function(result) {
                return this.cachingStore.remove(id, options);
            }));
        },

        evict: function(id) {
            var remove = this.cachingStore.remove(id);
            if (this.notify) {
                when(remove, lang.hitch(this, function() {
                    this.notify(undefined, id);
                }));
            }
            return remove;
        }
    });
});
