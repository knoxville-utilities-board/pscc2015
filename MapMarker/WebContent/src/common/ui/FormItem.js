define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "./View",
    "dojo/text!./templates/FormItem.html"],

function(declare, lang, domClass, on, _TemplatedMixin, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        errorText: "",

        _setLabelAttr: function(label) {
            this.label = label;
            this.labelNode.innerHTML = label;
            if (label) {
                this.own(on(this.labelNode, "click", lang.hitch(this, function() {
                    this.getChildren().some(function(child) {
                        if (child.focus) {
                            child.focus();
                            return true;
                        }
                    });
                })));
            }
        },

        _setErrorTextAttr: {
            node: "validationErrorSpan",
            type: "innerHTML"
        },

        validate: function() {
            if (this.getChildren().length) {
                var child = this.getChildren()[0];
                var validationResponse;
                if (child.validate) {
                    validationResponse = child.validate();
                    if (validationResponse !== true) {
                        this.set("errorText", validationResponse);
                        domClass.add(this.containerNode, "has-error");
                        return false;
                    }
                }
                if (child._validate) {
                    validationResponse = child._validate();
                    if (validationResponse !== true) {
                        this.set("errorText", validationResponse);
                        domClass.add(this.containerNode, "has-error");
                        return false;
                    }
                }
            }

            this.clearValidation();
            return true;
        },

        clearValidation: function() {
            this.set("errorText", "");
            domClass.remove(this.containerNode, "has-error");
        }
    });
});