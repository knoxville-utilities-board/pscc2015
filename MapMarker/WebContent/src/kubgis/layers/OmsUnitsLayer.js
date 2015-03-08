define(["dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "esri/Color",
    "esri/geometry/Point",
    "esri/graphic",
    "esri/InfoTemplate",
    "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "util/dateHandling",
    "dojo/text!./templates/OmsUnitsLayer.html"],

function(array, declare, lang, on, Color, Point, Graphic, InfoTemplate, GraphicsLayer, SimpleMarkerSymbol, dateHandling, template) {

    var truck = "M276.2,397.4l-24.7-61.9c-1.2-3.2-3.6-5.1-7.2-5.1H102.1c-3,0-6,2.5-7.2,5.1l-24.7,61.9H276.2z M300.9,449.2c0-14.5-10.8-25.9-24.7-25.9c-13.9,0-24.7,11.4-24.7,25.9s11.4,25.9,24.7,25.9C289.5,475.1,300.9,463.7,300.9,449.2 M68.4,475.1c13.9,0,24.7-11.4,24.7-25.9s-10.8-25.9-24.7-25.9s-24.7,11.4-24.7,25.9S54.5,475.1,68.4,475.1 M91.3,521.2v25.9c0,14.5-10.8,25.9-24.7,25.9c-13.3,0-24.7-11.4-24.7-25.9v-25.9H17.2v-84l0,0c0-18.3,12-33.5,27.7-38.5l28.9-71.4c4.2-10.1,13.9-17.7,25.3-17.7h147c11.4,0,21.7,7.6,25.3,17.7l28.9,71.4c16.3,4.4,27.7,20.2,27.7,38.5l0,0v84h-24.7v25.9c0,14.5-10.8,25.9-24.7,25.9c-13.3,0-24.7-11.4-24.7-25.9v-25.9H91.3z";

    var black = new Color([0, 0, 0, 1]);
    var blue = new Color([0, 102, 255, 1]);
    var green = new Color([0, 255, 0, 0.9]);
    var orange = new Color([255, 117, 56, 1]);
    var red = new Color([237, 41, 57, 1]);
    var gray = new Color([119, 119, 119, 1]);

    var unitStatusColor = {
        "Available Mobile": blue,
        "Available Voice": blue,
        "Acknowledge": green,
        "Enroute": green,
        "Dispatch Assigned": orange,
        "Dispatch": orange,
        "Arrive": red,
        "Out of Service": gray
    };

    return declare([GraphicsLayer], {

        map: null,

        infoTemplate: null,

        _events: [],

        _deferreds: [],

        refreshTime: 4000,

        filter: null,

        unitService: null,

        constructor: function( /*Object*/ kwArgs) {
            console.log("constructor()");

            lang.mixin(this, kwArgs);

            this.infoTemplate = new InfoTemplate({
                title: "Unit: ${unitId}",
                content: template
            });

            // Events    
            var visChange = on(this, "visibility-change", lang.hitch(this, function() {
                console.log("visibility-change");
                this.clear();
                this.loop(0);
            }));
            this._events.push(visChange);

            this.loop();
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
            this._getData();
        },

        loop: function(ms) {
            console.log("loop()");

            if (this.visible) {
                if (this._refreshTimer) {
                    clearTimeout(this._refreshTimer);
                }
                // default to refresh time
                var refresh = this.refreshTime;

                // use param time if set
                if (typeof ms !== "undefined") {
                    refresh = ms;
                }
                this._refreshTimer = setTimeout(lang.hitch(this, function() {
                    this.emit("new-data");
                }), refresh);
            }
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

        _getData: function() {
            console.log("_getData()");

            if (!this.layerClick) {
                this.layerClick = on(this.getNode(), "click", lang.hitch(this, this._showInfoWindow));
            }

            var deferred = this.unitService.getList(this.filter);

            deferred.then(lang.hitch(this, function(response) {
                this._addMarkers(response.data);

                this.emit("data-complete", response.data);
            }), lang.hitch(this, function(error) {
                if (error.dojoType !== "cancel") {
                    this.emit("data-error");
                }
            }));

            this._deferreds.push(deferred);
        },

        _addMarkers: function(data) {
            console.log("_addMarkers()");

            array.forEach(data, function(unit) {
                var point = new Point((unit.xuor / 1200) + 1789569.7058, (unit.yuor / 1200) + 1789569.7058, this.map.spatialReference);

                var attribute = {
                    "unitId": unit.unitId,
                    "unitStatus": unit.unitStatus,
                    "eventNumber": unit.eventNumber,
                    "speed": unit.speed,
                    "logTime": dateHandling.kubDateTime(unit.logTime)
                };

                var marker = this._getMarker(unit);
                var graphic = new Graphic(point, marker, attribute);

                if (graphic) {
                    this.add(graphic);
                }

                if (data.length == 1) {
                    var evt = {
                        stopPropagation: function() {},
                        graphic: graphic,
                        mapPoint: point
                    };
                    this._showInfoWindow(evt);
                }
            }, this);

        },

        _getMarker: function(unit) {
            var color = unitStatusColor[unit.unitStatus] || black;
            var marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_PATH, 13, null, color);
            return marker.setPath(truck);
        },

        _showInfoWindow: function(evt) {
            evt.stopPropagation();
            var graphic = evt.graphic;

            this.map.infoWindow.hide();
            this.map.infoWindow.setFeatures([graphic]);

            if (this.showNavigationLink) {
                var navigateAction = {
                    label: "Navigate",
                    type: "navigate",
                    owner: this,
                    event: {
                        navigateTo: graphic.geometry
                    }
                };
                this.map.infoWindow.addAction(navigateAction);
            }

            this.map.centerAt(graphic.geometry).then(lang.hitch(this, function() {
                this.map.infoWindow.show(graphic.geometry);
            }));
        }
    });
});
