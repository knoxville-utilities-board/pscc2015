define(["dojo/_base/declare",
    "dojo/dom-construct",
    "common/ui/_ModelApiMixin",
    "common/ui/Panel"],

function(declare, domConstruct, _ModelApiMixin, Panel, Employee) {

    return declare([Panel, _ModelApiMixin], {

        style: "min-height: 300px;",

        errorLabel: "",

        loadingLabel: "Loading...",

        noContentLabel: "",

        emptyModelLabel: "",

        viewClass: undefined,

        onModelError: function() {
            this.set("title", this.errorLabel);
            domConstruct.empty(this.containerNode);
        },

        onModelEmpty: function(model) {
            if (model && model !== false) {
                this.set("title", this.emptyModelLabel);
            } else {
                this.set("title", this.noContentLabel);
            }
            domConstruct.empty(this.containerNode);
        },

        onModelLoading: function() {
            this.set("title", this.loadingLabel);
            domConstruct.empty(this.containerNode);
        },

        onModelComplete: function(model) {
            if (model) {
                var view = this.get("view");
                if (view) {
                    this.removeChild(view);
                    view.destroyRecursive();
                }
                view = new this.viewClass({
                    model: model,
                    "class": "modelCompleteShow"
                });
                this.set("view", view);
                this.addChild(view);
            }
        }
    });
});
