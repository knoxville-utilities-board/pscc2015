define(["dojo/_base/array",
    "dojo/_base/Color",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "esri/graphic",
    "esri/InfoTemplate",
    "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "dojo/text!./templates/AddressLookupLayer.html"],

function(array, Color, declare, lang, on, Graphic, InfoTemplate, GraphicsLayer, SimpleMarkerSymbol, SimpleLineSymbol, Query, QueryTask, template) {

    return declare([GraphicsLayer], {

        map: null,

        _events: [],

        _deferreds: [],

        filter: null,

        constructor: function( /*Object*/ kwArgs) {
            console.log("constructor()");

            lang.mixin(this, kwArgs);

            // Events    
            var visChange = on(this, "visibility-change", lang.hitch(this, function() {
                console.log("visibility-change");
                this.clear();
                this.loop(0);
            }));
            this._events.push(visChange);

            var layerClick = this.on("click", lang.hitch(this, this._showInfoWindow));

            this._events.push(layerClick);

            this.infoTemplate = new InfoTemplate("${CUSTOMERNAME}", template);

            this.queryTask = new QueryTask("http://kub.org/MaximoSpatial/maximo_service/MapServer/5");
        },


        getByAddress: function(value) {
            if (value.length > 3) {
                var field = "ADDRESS1";
                var searchTerm = value.trim().replace(" ", "%").replace(",", "%");
                this.query(searchTerm, field);
            }
        },

        getByName: function(value) {
            if (value.length > 3) {
                var field = "CUSTOMERNAME";
                var searchTerm = value.trim().replace(" ", "%").replace(",", "%");
                this.query(searchTerm, field);
            }
        },

        query: function(value, param, type) {
            var query = new Query();
            query.outSpatialReference = this.map.spatialReference;
            query.returnGeometry = true;
            query.start = "0";
            query.num = "6";
            query.where = "Upper(" + param + ") LIKE Upper('%" + value + "%')";
            query.outFields = ["CUSTOMERNAME", "ADDRESS1", "CITY", "STATE", "POSTAL", "PHONE", "ACCOUNTID", "PREMISEID", "PREMISETYPE"];

            this.emit("data-loading");
            clearTimeout(this.timeoutHandler);
            this.timeoutHandler = setTimeout(lang.hitch(this, function() {
                this.queryTask.execute(query, lang.hitch(this, function(response) {
                    if (param == "ADDRESS1") {
                        this.emit("address-complete", response.features.slice(0, 6));
                    }
                    if (param == "CUSTOMERNAME") {
                        this.emit("name-complete", response.features.slice(0, 6));
                    }
                }));
            }), 1000);
        },

        showLocation: function(location) {
            this.clear();

            var outlineColor = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#cccccc"), 2);
            var markerColor = new Color([40, 40, 255, 0.65]);

            var marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, outlineColor, markerColor);

            var point = location.geometry;

            var phoneNumberRE = /(\d{3})\/(\d{3})\-(\d{4})/;

            var matches = location.attributes.PHONE.match(phoneNumberRE);
            if (matches && matches.length > 1) {
                location.attributes.PHONE = matches[1] + "-" + matches[2] + "-" + matches[3];
            }

            location.attributes.ACCOUNTLINK = "#/customer/" + location.attributes.ACCOUNTID;

            var graphic = new Graphic(point, marker, location.attributes, this.infoTemplate);

            if (graphic) {
                this.add(graphic);
            }

            var evt = {
                stopPropagation: function() {},
                graphic: graphic,
                mapPoint: point
            };
            this._showInfoWindow(evt);
            this.emit("data-complete");

            return graphic;
        },

        destroy: function() {
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

        update: function() {
            console.log("update()");

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

        _showInfoWindow: function(evt) {

            evt.stopPropagation();

            this.map.infoWindow.hide();
            this.map.infoWindow.setFeatures([evt.graphic]);

            var navigateAction = {
                label: "Navigate",
                type: "navigate",
                owner: this,
                event: {
                    navigateTo: evt.graphic.geometry
                }
            };
            this.map.infoWindow.addAction(navigateAction);

            this.map.infoWindow.show(evt.mapPoint);
            this.map.setExtent(this.map.extent.centerAt(evt.graphic.geometry));
        }
    });
});
