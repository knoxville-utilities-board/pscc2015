define(["dojo/_base/declare",
    "dijit/_TemplatedMixin",
    "./View",
    "dojo/text!./templates/CheckBox.html"],

function(declare, _TemplatedMixin, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        label: "",

        checked: false,

        _setLabelAttr: {
            node: "labelNode",
            type: "innerHTML"
        },

        _setNameAttr: {
            node: "checkBoxNode",
            type: "attribute",
            attribute: "name"
        },

        _setCheckedAttr: {
            node: "checkBoxNode",
            type: "attribute",
            attribute: "checked"
        },

        _setDisabledAttr: {
            node: "checkBoxNode",
            type: "attribute",
            attribute: "disabled"
        },

        _getCheckedAttr: function() {
            return this.checkBoxNode.checked;
        }
    });
});
