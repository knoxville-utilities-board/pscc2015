define(["dojo/_base/declare",
    "common/ui/ListItem"],

function(declare, ListItem) {

    return declare([ListItem], {

        postCreate: function() {
            this.inherited(arguments);
            
            this.set("label", this.item.title);
            this.set("value", this.item.id);

        }
    });
});