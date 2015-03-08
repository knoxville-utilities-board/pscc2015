define(["dojo/_base/Color",
    "dojo/_base/declare",
    "esri/dijit/LocateButton",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "./MapButton"],

function(Color, declare, LocateButton, SimpleLineSymbol, SimpleMarkerSymbol, MapButton) {

    var kubBlue = new Color("#063c6f");
    var gray = new Color("#B3B3B3");

    return declare([LocateButton, MapButton], {
        fontIcon: "fa fa-crosshairs mapButtonIcon",

        postCreate: function() {
            this.inherited(arguments);
            var outline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, gray, 3);
            this.symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 20, outline, kubBlue);

            this.on("locate", function(evt) {
                evt.graphic.attr("class", "locateGraphic");
            });
        },

        buildRendering: function() {
            this.inherited(arguments);
            this._locateNode = this.domNode;
        }
    });
});