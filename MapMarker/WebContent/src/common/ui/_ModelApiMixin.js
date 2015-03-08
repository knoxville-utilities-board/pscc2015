define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/when"],

function(declare, lang, domClass, when) {

    return declare([], {

        model: false,

        _lastModel: false,

        loading: false,

        error: false,

        startup: function() {
            this.inherited(arguments);
            if (this.model) {
                this.set("model", this.model);
            }
        },

        _setModelAttr: function(model) {
            this.set("loading", true);
            when(model, lang.hitch(this, "_onSetModelResolve"), lang.hitch(this, "_onSetModelReject"));
        },

        _onSetModelResolve: function(response) {
            this.model = response.data ? response.data : response;
            this._lastModel = this.model;

            if (this.model) {
                this._completeState();
                this._onModelComplete(this.model);
                this.emit("model-complete", {
                    model: this.model
                });
            } else {
                this._emptyState();
                this._onModelEmpty(this.model);
                this.emit("model-empty", {
                    model: this.model
                });
            }
        },

        _onSetModelReject: function(error) {
            this._errorState();
            this._onModelError(error);
            this.emit("model-error", {
                error: error
            });
        },

        _setLoadingAttr: function(loading) {
            if (loading) {
                this._lastModel = this.model;
                this._loadingState();
                this._onModelLoading(loading);
                this.emit("model-loading", {
                    loading: true
                });
            } else {
                if (this.loading) {
                    this.set("model", this._lastModel);
                }
            }
            this.loading = loading;
        },

        _setErrorAttr: function(error) {
            if (error) {
                this._lastModel = this.model;
                this._errorState();
                this.emit("model-error", {
                    error: error
                });
            } else {
                if (this.error) {
                    this.set("model", this._lastModel);
                }
            }
            this.error = error;
        },

        _emptyState: function() {
            domClass.remove(this.domNode, ["modelLoading", "modelComplete", "modelError"]);
            domClass.add(this.domNode, "modelEmpty");
        },

        _completeState: function() {
            domClass.remove(this.domNode, ["modelEmpty", "modelLoading", "modelError"]);
            domClass.add(this.domNode, "modelComplete");
        },

        _loadingState: function() {
            domClass.remove(this.domNode, ["modelEmpty", "modelComplete", "modelError"]);
            domClass.add(this.domNode, "modelLoading");
        },

        _errorState: function() {
            domClass.remove(this.domNode, ["modelEmpty", "modelComplete", "modelLoading"]);
            domClass.add(this.domNode, "modelError");
        },

        _onModelEmpty: function(model) {
            this.onModelEmpty(model);
        },

        _onModelComplete: function(model) {
            this.onModelComplete(model);
        },

        _onModelLoading: function(loading) {
            this.onModelLoading(loading);
        },

        _onModelError: function(error) {
            this.onModelError(error);
        },

        onModelEmpty: function(model) {
            // User Defined
        },

        onModelComplete: function(model) {
            // User Defined
        },

        onModelLoading: function(loading) {
            // User Defined
        },

        onModelError: function(error) {
            // User Defined
        }
    });
});