define(["dojo/_base/declare",
    "common/ui/ListItem"],

function(declare, ListItem) {

    return declare([ListItem], {

        postCreate: function() {
            this.inherited(arguments);

            if (this.item.label) {
                this.set("leftLabel", this.item.label);
            } else if (this.item.display) {
                this.set("leftLabel", this.item.display);
            } else if (this.item.name) {
                this.set("leftLabel", this.item.name);
            } else if (this.item.userName) {
                this.set("leftLabel", this.item.userName);
            } else if (this.item.displayName) {
                this.set("leftLabel", this.item.displayName);
            } else if (this.item.contractorName) {
                this.set("leftLabel", this.item.contractorName);
            }
        }
    });
});