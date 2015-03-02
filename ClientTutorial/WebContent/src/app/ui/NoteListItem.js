define(["dojo/_base/declare",
    "common/ui/ListItem",
    "util/dateHandling"],

function(declare, ListItem, dateHandling) {

    return declare([ListItem], {

        postCreate: function() {
            this.inherited(arguments);

            this.set("leftBody", "Created By " + this.item.createdBy);

            var createDateText = "Imported 2/2004";

            if (this.item.createDate) {
            	createDateText = "Create Date " +dateHandling.kubDate(this.item.createDate)
            }

            this.set("leftLabel",  createDateText);
        }
    });
});