define(["dojo/_base/declare",
    "common/ui/ListItem",
    "util/dateHandling"],

function(declare, ListItem, dateHandling) {

    return declare([ListItem], {

        postCreate: function() {
            this.inherited(arguments);
            
            var symbols = {
                    Circle: "fa fa-circle",
                    Cross: "fa fa-plus",
                    Diamond: "&diams;",
                    Square: "fa fa-stop",
                    X: "fa fa-times"
            };
            var icon = '';

            this.set("leftBody", "Description: " + this.item.description);
            this.set("leftLabel",  this.item.title);
            
            if (this.item.symbology) {
	            var split = this.item.symbology.split(",");
	            var symbol = "Circle";
	            var color = "#000000";
	            if (split[0]) {
	            	symbol = split[0];
	            }
	            if (split[1]) {
	            	color = split[1];
	            }
                if (symbol === "Diamond") {
                	icon = '<span style="color:' + color + '">' + symbols[symbol] + '</span>';
                } else {
                	icon = '<span class="' + symbols[symbol] + '" style="color:' + color + '; font-size:17px;"></span>';
                }
            }
            
            this.set("rightIcon", icon);
        }
    });
});