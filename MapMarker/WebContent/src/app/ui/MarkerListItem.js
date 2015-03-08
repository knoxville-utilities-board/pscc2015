define(["dojo/_base/declare",
    "common/ui/ListItem",
    "util/dateHandling"],

function(declare, ListItem, dateHandling) {

    return declare([ListItem], {

        postCreate: function() {
            this.inherited(arguments);

            this.set("leftBody", "Created By " + this.item.createdBy);

            var createDateText = "Imported 1/2015";

            if (this.item.createdDate) {
            	createDateText = "Create Date " +dateHandling.kubDate(this.item.createdDate)
            }

            this.set("leftLabel",  createDateText);
        }
    });
});