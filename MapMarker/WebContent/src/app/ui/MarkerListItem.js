define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/when",
    "common/ui/ListItem",
    "util/dateHandling",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/renderers/SimpleRenderer"],

function(declare, lang, when, ListItem, dateHandling, SimpleMarkerSymbol, SimpleRenderer) {

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
            
            var categoryStore = lang.getObject("marker.stores.categories", false, app);
            var cat = categoryStore.get(this.item.categoryId);
            when(cat).then(lang.hitch(this, function(cat) {
                var split = cat.symbology.split(",");
                var symbol = split[0];
                var color = split[1];
                if (symbol === "Diamond") {
                	icon = '<span style="color:' + color + '">' + symbols[symbol] + '</span>';
                } else {
                	icon = '<span class="' + symbols[symbol] + '" style="color:' + color + '; font-size:17px;"></span>';
                }
            }));


            var createDateText = "Imported 1/2015";

            if (this.item.createdDate) {
            	createDateText = "Created: " +dateHandling.kubDate(this.item.createdDate);
            }
            this.set("leftLabel", this.item.title);
            this.set("leftBody", this.item.street);
            this.set("rightText",  createDateText);
            this.set("rightIcon", icon);
        }
    });
});