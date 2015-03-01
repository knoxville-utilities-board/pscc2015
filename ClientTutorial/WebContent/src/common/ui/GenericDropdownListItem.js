define(["dojo/_base/declare",
    "common/ui/DropdownListItem"],

function(declare, DropdownListItem) {

    return declare([DropdownListItem], {

        postCreate: function() {
            this.inherited(arguments);

            if (this.item.label) {
                this.set("label", this.item.label);
            } else if (this.item.display) {
                this.set("label", this.item.display);
            } else if (this.item.name) {
                this.set("label", this.item.name);
            } else if (this.item.username) {
                this.set("label", this.item.username);
            } else if (this.item.roleName) {
                this.set("label", this.item.roleName);
            } else if (this.item.displayName) {
                this.set("label", this.item.displayName);
            } else if (this.item.contractorName) {
                this.set("label", this.item.contractorName);
            }

            if (this.item.value) {
                this.set("value", this.item.value);
            } else {
                this.set("value", this.item);
            }
        }
    });
});