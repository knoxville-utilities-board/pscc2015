define(["dojo/_base/declare",
    "dojo/dom-class",
    "./View"],

function(declare, domClass, View) {

    return declare([View], {

        postCreate: function() {
            this.inherited(arguments);
            domClass.add(this.domNode, "row");
        },

        addChild: function(widget, position, xs, sm, md, lg) {
            if (xs) {
                domClass.add(widget.domNode, "col-xs-" + xs);
            }
            if (sm) {
                domClass.add(widget.domNode, "col-sm-" + sm);
            }
            if (md) {
                domClass.add(widget.domNode, "col-md-" + md);
            }
            if (lg) {
                domClass.add(widget.domNode, "col-lg-" + lg);
            }
            this.inherited(arguments);
        }
    });
});
