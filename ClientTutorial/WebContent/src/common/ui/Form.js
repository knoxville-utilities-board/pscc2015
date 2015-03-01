define(["dojo/_base/array",
    "dojo/_base/declare",
    "dojo/dom-class",
    "dijit/_TemplatedMixin",
    "./FormItem",
    "./View",
    "dojo/text!./templates/Form.html"],

function(array, declare, domClass, _TemplatedMixin, FormItem, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        baseClass: "form-horizontal",

        addChild: function(widget, position, label) {
            var item = new FormItem();
            item.set("label", label || "");
            item.addChild(widget, "first");
            widget = item;
            this.inherited(arguments);
        },

        addFooterButton: function(button) {
            button.placeAt(this.domNode);
            domClass.add(button.domNode || button, "pull-right");
            button.startup();
        },

        validate: function() {
            var valid = true;
            array.forEach(this.getChildren(), function(child) {
                if (child.validate && !child.validate()) {
                    valid = false;
                }
            });
            return valid;
        },

        clearValidation: function() {
            array.forEach(this.getChildren(), function(child) {
                if (child.clearValidation) {
                    child.clearValidation();
                }
            });
        }
    });
});
