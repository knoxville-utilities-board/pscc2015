define(["dojo/_base/declare",
    "dojo/_base/lang",
    "./StoreList"],

function(declare, lang, StoreList) {

    return declare([StoreList], {

        timer: null,

        baseQuery: {},

        filterCleared: null,

        refineSearchLabel: "Too many results. Please refine your search criteria.",

        searchParam: "search",

        _errorLabel: "",

        searchDelays: {
            0: 1000,
            1: 1000,
            2: 800,
            3: 600,
            "default": 400
        },

        setStore: function(store, query, queryOptions) {
            if (this.store) {
                this.store.cancelPreviousQuery = false;
            }
            this.inherited(arguments);
            if (this.store) {
                this.store.cancelPreviousQuery = true;
            }
        },

        reset: function( /* optional */ query) {
            this.query = query || {};

            this.clearList();
            this.set("state", "loading");

            this.setQuery(query);
        },

        _setFilter: function(filter) {
            this.append = false;
            this.runningCount = 0;

            var baseQuery = this.store.baseQuery || {};
            var query = lang.clone(baseQuery);
            if (this.baseQuery) {
                lang.mixin(query, this.baseQuery);
            }
            query[this.searchParam] = filter;

            this.setQuery(query, lang.mixin(this.options, {
                start: this.startIndex,
                count: this.pageSize
            }));
        },

        onSearch: function(evt) {
            var filter = evt.value;

            if (this.timer) {
                this.timer.remove();
            }

            this.clearList();
            this.set("state", "loading");

            var delay = this.searchDelays[filter.length] || this.searchDelays["default"];

            this.timer = this.defer(function() {
                if (filter !== "") {
                    this.filterCleared = false;
                    this._setFilter(filter);
                } else if (filter === "" && this.filterCleared === false) {
                    this.filterCleared = true;
                    this._setFilter(filter);
                }
            }, delay);
        },

        onComplete: function(items) {
            this.inherited(arguments);
            this.append = true;
        },

        onError: function(err) {
            this._errorLabel = this.errorLabel;
            if (err.response.status === 418 && err.response.data.code === "refineSearchCriteria") {
                this._errorLabel = this.refineSearchLabel;
            }
            this.inherited(arguments);
        },

        getErrorLabel: function() {
            return this._errorLabel;
        }
    });
});
