define(["dojo/_base/declare",
    "dojo/dom-class",
    "dijit/_TemplatedMixin",
    "./View",
    "dojo/text!./templates/Panel.html"],

function(declare, domClass, _TemplatedMixin, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        title: "",

        _setTitleAttr: function(title) {
            this.title = title;
            if (title) {
                this.titleNode.innerHTML = title;
                domClass.remove(this.titleDiv, "hidden");
            } else {
                domClass.add(this.titleDiv, "hidden");
            }
        }
    });
});
