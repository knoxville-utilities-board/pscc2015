define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/_base/Color",
    "dojo/Evented",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/InfoTemplate"],

function(declare, lang, array, Color, Evented, SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol, InfoTemplate) {

    var lightBlue = new Color("#00FFFF");
    var red = new Color("#FF0000");
    var snow = new Color("snow");
    var blueTransparent = new Color([0, 255, 255, 0.65]);
    var yellowTransparent = new Color([255, 255, 0, 0.25]);
    var redTransparent = new Color([255, 0, 0, 0.65]);

    return declare([Evented], {

        graphics: null,

        map: null,

        showNavigationLink: true,

        constructor: function(kwArgs) {
            console.info("constructor()");
            lang.mixin(this, kwArgs);
        },

        doDrawSelect: function(map, response, clearGraphic, highLight) {
            console.info("doDrawSelect()", response);

            var symbol, polyline, marker, symbolOutline;

            //InfoTemplate
            var infoTemplate = new InfoTemplate("${displayFieldName} :: ${value}");

            if (clearGraphic) {
                console.info("clearingGraphic");
                map.graphics.clear();
                map.infoWindow.hide();
            }

            var markerOutline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, snow, 2);

            if (highLight) {
                symbolOutline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, lightBlue, 5);
                symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, symbolOutline, yellowTransparent);

                polyline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, lightBlue, 5);

                marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 15, markerOutline, blueTransparent);
            } else {
                symbolOutline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, red, 2);
                symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, symbolOutline, yellowTransparent);

                polyline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, red, 2);

                marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, markerOutline, redTransparent);
            }

            return array.map(response, lang.hitch(this, function(result) {
                var feature = result;

                if (feature.geometry) {
                    feature.geometry.setSpatialReference(map.spatialReference);

                    if (feature.geometry.type == "polyline") {
                        feature.setSymbol(polyline);
                    } else if (feature.geometry.type == "polygon") {
                        feature.setSymbol(symbol);
                    } else {
                        feature.setSymbol(marker);
                    }

                    map.infoWindow.hide();
                    feature.setInfoTemplate(infoTemplate);
                    map.graphics.add(feature);

                    if (highLight) {
                        map.infoWindow.setFeatures([feature]);

                        var geometry = feature.geometry;
                        var navigateTo = geometry;
                        if (geometry.type === "polyline") {
                            navigateTo = geometry.getPoint(0, 0);
                        }

                        var navigateAction = {
                            label: "Navigate",
                            type: "navigate",
                            owner: this,
                            event: {
                                navigateTo: navigateTo
                            }
                        };
                        map.infoWindow.addAction(navigateAction);

                        if (feature.geometry.type == "point") {
                            map.infoWindow.show(feature.geometry);
                        } else {
                            map.infoWindow.show(feature._extent.getCenter());
                        }

                        if (feature.hasOwnProperty('_extent')) {
                            map.centerAt(feature._extent.getCenter());
                        }
                    }
                }
            }));
        },

        clearGraphics: function() {
            this.pointGraphics.clear();
            this.polylineGraphics.clear();
            this.polygonGraphics.clear();
            this.drawToolbar.deactivate();
        }
    });
});