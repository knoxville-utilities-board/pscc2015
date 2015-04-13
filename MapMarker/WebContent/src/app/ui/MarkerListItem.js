define(["dojo/_base/declare",
    "common/ui/ListItem",
    "util/dateHandling"],

function(declare, ListItem, dateHandling) {

    return declare([ListItem], {

        postCreate: function() {
            this.inherited(arguments);

            this.set("leftLabel", this.item.location);

            var createDateText = "Imported 1/2015";

            if (this.item.createdDate) {
            	createDateText = "Created: " +dateHandling.kubDate(this.item.createdDate);
            }

            this.set("rightText",  createDateText);
            this.set("leftBody", this.item.description);
        }
    });
});