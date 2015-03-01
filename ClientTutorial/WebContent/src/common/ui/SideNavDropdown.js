define(["dojo/_base/array",
    "dojo/_base/declare",
    "dojo/dom-class",
    "dijit/_TemplatedMixin",
    "./View",
    "dojo/text!./templates/SideNavDropdown.html"],

function(array, declare, domClass, _TemplatedMixin, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        label: "",

        badge: "",

        selected: "",

        _setLabelAttr: function(label) {
            this.label = label;
            this.labelNode.innerHTML = label + " ";
        },

        _setBadgeAttr: {
            node: "badgeNode",
            type: "innerHTML"
        },

        update: function(hash) {
            array.forEach(this.getChildren(), function(child) {
                child.update(hash);
            });
        },

        _setSelectedAttr: function(selected) {
            if (selected) {
                domClass.add(this.itemNode, "active");
            } else {
                domClass.remove(this.itemNode, "active");
                array.forEach(this.getChildren(), function(child) {
                    child.set("selected", false);
                });
            }
        }
    });
});
