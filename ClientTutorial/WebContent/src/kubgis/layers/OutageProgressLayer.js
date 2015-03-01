define(["dojo/_base/array",
    "dojo/_base/Color",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "esri/geometry/Point",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/symbols/Font",
    "esri/symbols/TextSymbol"],

function(array, Color, declare, lang, Point, Graphic, GraphicsLayer, Font, TextSymbol) {

    return declare([GraphicsLayer], {

        map: null,

        _events: [],

        _deferreds: [],

        refreshTime: 4000,

        mapService: null,

        item: null,

        showEventDetailsLink: true,

        showNavigationLink: false,

        showNotAssessed: true,

        showAssessed: true,

        showAssignedForRepair: true,

        constructor: function( /*Object*/ kwArgs) {
            console.log("constructor()");

            lang.mixin(this, kwArgs);

            this.disableMouseEvents();
        },

        destroy: function() {
            console.log("destroy()");

            // remove events
            if (this._events && this._events.length) {
                for (var i = 0; i < this._events.length; i++) {
                    this._events[i].remove();
                }
            }

            // clear data
            this.clear();

            // remove layer
            this.map.removeLayer(this);
        },

        update: function(data) {
            console.log("update()");
            this.data = data;
            this.clear();
            this._addMarkers();
        },

        updateVisibility: function() {
            console.log("updateVisibility()");
            this.clear();
            this._addMarkers();
        },

        clear: function() {
            console.log("clear()");

            this.inherited(arguments);

            // remove timer
            if (this._refreshTimer) {
                clearTimeout(this._refreshTimer);
            }

            array.forEach(this._deferreds, function(def) {
                def.cancel();
            });
            this._deferreds = [];

            this.map.infoWindow.hide();
        },

        _addMarkers: function() {
            console.log("_addMarkers()");
            var data = this.data;

            array.forEach(data.outageItems, function(outage) {

                if (outage.assessmentStatus != "Not Assessed") {

                    var point = new Point(outage.x, outage.y, this.map.spatialReference);

                    var attribute = {
                        "assessmentStatus": outage.assessmentStatus,
                        "County": outage.county,
                        "CustomerCount": outage.customerCount,
                        "eventNumber": outage.eventNumber
                    };

                    var marker = this._getMarker(outage);

                    var graphic = new Graphic(point, marker, attribute);

                    if (graphic) {
                        this.add(graphic);
                    }
                }
            }, this);
        },

        _getMarker: function(outage) {
            var alpha = 0.8;
            if (outage.assessmentStatus == "Not Assessed" && !this.showNotAssessed) {
                return;
            }
            if (outage.assessmentStatus == "Assessed" && !this.showAssessed) {
                return;
            }
            if (outage.assessmentStatus == "Assigned for Repair") {
                alpha = 0.3;
                if (!this.showAssignedForRepair) {
                    return;
                }
            }

            var markerColor = new Color([255, 255, 255, alpha]);

            var size = 15;
            if (outage.customerCount < 10) {
                size = 5;
            } else if (outage.customerCount < 50) {
                size = 7;
            } else if (outage.customerCount < 200) {
                size = 10;
            } else if (outage.customerCount < 500) {
                size = 13;
            }

            var yoffset = 0 - Math.floor(size / 2);

            var font = new Font({
                family: "sans-serif",
                size: size,
                weight: Font.WEIGHT_BOLD
            });
            var marker = new TextSymbol({
                text: "A",
                font: font,
                yoffset: yoffset,
                horizontalAlignment: "middle",
                color: markerColor
            });

            return marker;
        }
    });
});