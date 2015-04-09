define(["dojo/_base/declare",
    "common/ui/ListItem",
    "util/dateHandling"],

function(declare, ListItem, dateHandling) {

    return declare([ListItem], {

        postCreate: function() {
            this.inherited(arguments);

            this.set("leftBody", "Description: " + this.item.description);
            this.set("leftLabel",  this.item.title);
            
            var symbol = "Circle";
            var color = "#000000";
            if (this.item.symbology) {
	            var split = this.item.symbology.split(",");
	            if (split[0]) symbol = split[0];
	            if (split[1]) color = split[1];
            }
            
            this.set("rightText", '<span style="color:' + color + '">' + symbol + '</span>');
        }
    });
});