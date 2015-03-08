define(["dojo/_base/declare",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "./_ListMixin",
    "./View",
    "dojo/text!./templates/DropdownList.html"],

function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, _ListMixin, View, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ListMixin], {

        templateString: template,

        label: "Select One",

        forceSelect: false,

        postCreate: function() {
            this.inherited(arguments);
            this.containerNode["aria-labelledby"] = this.button.id;
        },

        addChild: function(listItem, position) {
            this.inherited(arguments);
            if (!this.hasFirstChild && !this.forceSelect && !this.startEmpty) {
                this.set("label", listItem.label);
                this.value = listItem.value;
                this.hasFirstChild = true;
            }
        },

        _setLabelAttr: function(label) {
            this.label = label;
            this.button.set("label", label + " <span class=\"caret\"></span>");
        },

        _setDisabledAttr: {
            node: "button",
            type: "attribute",
            attribute: "disabled"
        },

        _onSelect: function(eventObj) {
            this.set("label", eventObj.listItem.label);
            this.value = eventObj.listItem.value;
            this.inherited(arguments);
        },

        _validate: function() {
            if (this.forceSelect && this.value === undefined) {
                return "Select an option";
            } else {
                return true;
            }
        }
    });
});