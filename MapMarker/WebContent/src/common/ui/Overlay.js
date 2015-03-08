define(["dojo/_base/declare",
    "dojo/dom-class",
    "./Panel"],

function(declare, domClass, Panel) {

    return declare([Panel], {

        postCreate: function() {
            if (this.direction == "left") {
                domClass.add(this.domNode, "overlay overlay-left");
            } else if (this.direction == "right") {
                domClass.add(this.domNode, "overlay overlay-right");
            } else { // Default to bottom  
                domClass.add(this.domNode, "overlay overlay-bottom");
            }
        }
    });
});
