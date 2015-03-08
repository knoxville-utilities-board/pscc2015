define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dijit/_TemplatedMixin",
    "./View",
    "dojo/text!./templates/Button.html"],

function(declare, lang, domClass, _TemplatedMixin, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        label: "",

        type: "button",

        busy: false,

        disabled: false,

        badge: null,

        postCreate: function() {
            this.inherited(arguments);
            this.on("click", lang.hitch(this, "defaultClickAction"));
        },

        _setLabelAttr: {
            node: "labelNode",
            type: "innerHTML"
        },

        _setBusyAttr: function(busy) {
            this.busy = busy;
            if (busy) {
                this.leftIconNode.innerHTML = '<div class="buttonIcon fa fa-spinner fa-spin"></div>';
                domClass.remove(this.leftIconNode, "hidden");
            } else {
                this.leftIconNode.innerHTML = "";
                domClass.add(this.leftIconNode, "hidden");
            }
        },

        _setDisabledAttr: function(disabled) {
            this.disabled = disabled;
            if (disabled) {
                this.domNode.disabled = "disabled";
            } else {
                this.domNode.disabled = "";
            }
        },

        _setBadgeAttr: function(badge) {
            var isNonEmptyString = ((typeof badge == 'string' || badge instanceof String) && badge !== "");
            var isNumber = (typeof badge == 'number' || badge instanceof Number);
            if (isNonEmptyString || isNumber) {
                this.badge = badge;
                domClass.remove(this.rightIconNode, "hidden");
                this.rightIconNode.innerHTML = '<span class="badge">' + badge + '</span>';
            } else {
                this.badge = "";
                this.rightIconNode.innerHTML = "";
                domClass.add(this.rightIconNode, "hidden");
            }
        },

        defaultClickAction: function(evt) {
            if (this.badge) {
                this.set("badge", this.badge + 1);
            }
        }
    });
});
