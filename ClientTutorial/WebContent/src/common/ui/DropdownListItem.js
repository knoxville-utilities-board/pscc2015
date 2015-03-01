define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-class",
    "dijit/_TemplatedMixin",
    "./View",
    "dojo/text!./templates/DropdownListItem.html"],

function(declare, lang, on, domClass, _TemplatedMixin, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        hasCheckbox: false,

        label: "",

        item: null,

        constructor: function(params) {
            this.item = params;
        },

        postCreate: function() {
            this.inherited(arguments);

            if (this.hasCheckbox) {
                domClass.remove(this.checkBoxNode, "hidden");
                domClass.add(this.labelNode, "dropdownLabelHasCheckbox");
                this.own(on(this.checkBoxNode, "click", lang.hitch(this, function(evt) {
                    this.checkBoxNode.checked = !this.checkBoxNode.checked;
                })));
            }

            this.on("click", lang.hitch(this, function(evt) {
                this.emit("select", {
                    event: evt,
                    listItem: this
                });
            }));
        },

        _setLabelAttr: {
            node: "labelNode",
            type: "innerHTML"
        }
    });
});
