define(["dojo/_base/declare",
    "dojo/dom-class",
    "dijit/_TemplatedMixin",
    "common/ui/View",
    "dojo/text!./templates/MapButton.html"],

function(declare, domClass, _TemplatedMixin, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        fontIcon: "",

        title: "",

        _setTitleAttr: {
            node: "domNode",
            type: "attribute"
        },

        _setFontIconAttr: function(className) {
            domClass.replace(this.iconNode, className, this.fontIcon);
            this.fontIcon = className;
        },

        _showLoading: function() {
            domClass.add(this.iconNode, "hidden");
            domClass.remove(this.loadingNode, "hidden");
        },

        _hideLoading: function() {
            domClass.remove(this.iconNode, "hidden");
            domClass.add(this.loadingNode, "hidden");
        }
    });
});
