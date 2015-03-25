define(["dojo/_base/declare",
    "common/ui/DropdownListItem"],

function(declare, DropdownListItem) {

    return declare([DropdownListItem], {

        postCreate: function() {
            this.inherited(arguments);
            
            this.set("label", this.item.title);
            this.set("value", this.item.id);

        }
    });
});