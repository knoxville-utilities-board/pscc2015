define(["dojo/_base/declare",
    "dojo/dom-class",
    "dijit/_Contained",
    "dijit/_Container",
    "dijit/_WidgetBase"],

function(declare, domClass, _Contained, _Container, _WidgetBase) {

    return declare([_WidgetBase, _Container, _Contained], {
        show: function() {
            this._hidden = false;
            domClass.remove(this.domNode, "hidden");
        },

        hide: function() {
            this._hidden = true;
            domClass.add(this.domNode, "hidden");
        }
    });
});
