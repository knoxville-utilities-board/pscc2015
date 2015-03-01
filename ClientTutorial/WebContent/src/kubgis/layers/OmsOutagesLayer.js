define(["dojo/_base/array",
    "dojo/_base/Color",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/date/stamp",
    "dojo/on",
    "esri/geometry/Point",
    "esri/graphic",
    "esri/InfoTemplate",
    "esri/lang",
    "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "dojo/text!./templates/OmsOutageLayer.html"],

function(array, Color, declare, lang, dateStamp, on, Point, Graphic, InfoTemplate, esriLang, GraphicsLayer, SimpleMarkerSymbol, SimpleLineSymbol, template) {

    return declare([GraphicsLayer], {

        map: null,

        infoTemplate: null,

        _events: [],

        _deferreds: [],

        refreshTime: 4000,

        mapService: null,

        item: null,

        showEventDetailsLink: true,

        showNavigationLink: false,

        isProgressMap: false,

        showNotAssessed: true,

        showAssessed: true,

        showAssignedForRepair: true,

        constructor: function( /*Object*/ kwArgs) {
            console.log("constructor()");

            lang.mixin(this, kwArgs);

            this.infoTemplate = new InfoTemplate("Event: ${eventNumber}", template);

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

        update: function() {
            console.log("update()");
            this._getData();
        },

        updateVisibility: function() {
            console.log("updateVisibility()");
            this.clear();
            this._addMarkers(this.item);
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
            } else {
                this.item = null;
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

            var deferred = this.mapService.getCurrentOutageData();

            deferred.then(lang.hitch(this, function(response) {
                this.item = response.data;

                this.item.totalOutage = response.data.totalOutages;
                this.item.dataLastUpdated = response.data.outageDataId;
                this.item.electricCustomers = response.data.totalElectricCustomers;

                var dataTimeStamp = dateStamp.fromISOString(this.item.dataLastUpdated);
                var projectedNewTime = new Date();

                projectedNewTime.setTime(dataTimeStamp.getTime() + 1000 * 60 * 15);

                var timeUntilNew = this.item.timeUntilNew = (projectedNewTime - new Date());

                this.emit("data-complete", this.item);

                this.clear();
                this.loop(timeUntilNew);

                this._addMarkers(this.item);
            }), lang.hitch(this, function(error) {
                this.emit("data-error");
            }));

            this._deferreds.push(deferred);
        },

        _addMarkers: function(data) {
            console.log("_addMarkers()");

            // Sort object by customer count
            data.outageItems = data.outageItems.sort(function(obj1, obj2) {
                return obj1.customerCount - obj2.customerCount;
            });

            array.forEach(data.outageItems, function(outage) {

                var point = new Point(outage.x, outage.y, this.map.spatialReference);

                var infoTemplate = new InfoTemplate("Event: ${eventNumber}", "Loading...");

                var attribute = {
                    "County": outage.county,
                    "CustomerCount": outage.customerCount,
                    "eventNumber": outage.eventNumber
                };

                var marker = this._getMarker(outage);

                var graphic = new Graphic(point, marker, attribute, infoTemplate);

                if (graphic) {
                    this.add(graphic);
                }
            }, this);
        },

        _getMarker: function(outage) {
            var alpha = 0.8;
            if (this.isProgressMap && outage.assessmentStatus == "Not Assessed" && !this.showNotAssessed) {
                return;
            }
            if (this.isProgressMap && outage.assessmentStatus == "Assessed" && !this.showAssessed) {
                return;
            }
            if (this.isProgressMap && outage.assessmentStatus == "Assigned for Repair") {
                alpha = 0.3;
                if (!this.showAssignedForRepair) {
                    return;
                }
            }

            // outline color for markers
            var outlineColor = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([204, 204, 204, alpha]), 2);

            var blackMarkerColor = new Color([0, 0, 0, alpha]);
            var orangeMarkerColor = new Color([255, 150, 0, alpha]);
            var greenMarkerColor = new Color([50, 190, 60, alpha]);
            var purpleMarkerColor = new Color([150, 80, 160, alpha]);
            var redMarkerColor = new Color([255, 0, 0, alpha]);

            var marker = {};

            if (outage.customerCount < 10) {
                marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, outlineColor, blackMarkerColor);
            } else if (outage.customerCount < 50) {
                marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 15, outlineColor, orangeMarkerColor);
            } else if (outage.customerCount < 200) {
                marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 20, outlineColor, greenMarkerColor);
            } else if (outage.customerCount < 500) {
                marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 25, outlineColor, purpleMarkerColor);
            } else if (outage.customerCount >= 500) {
                marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 30, outlineColor, redMarkerColor);
            }

            return marker;
        },

        _showInfoWindow: function(evt) {
            console.log("_getOutageDetails()");
            evt.stopPropagation();

            var graphic = evt.graphic;
            this.map.infoWindow.hide();

            var postData = {
                eventNumber: graphic.attributes.eventNumber
            };

            this.mapService.getOutageDetails(postData).then(lang.hitch(this, function(response) {
                lang.mixin(graphic.attributes, response.data);

                evt.graphic.infoTemplate = new InfoTemplate("Event: ${eventNumber}", template);

                this.map.infoWindow.setFeatures([graphic]);
                this.map.infoWindow.setTitle(esriLang.substitute(graphic.attributes, graphic.infoTemplate.title));
                this.map.infoWindow.setContent(esriLang.substitute(graphic.attributes, graphic.infoTemplate.content));

                if (this.showEventDetailsLink) {
                    var action = {
                        label: "Event Details",
                        type: "event-details",
                        owner: this,
                        event: {
                            eventNumber: graphic.attributes.eventNumber
                        }
                    };

                    this.map.infoWindow.addAction(action);
                }

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
            }), lang.hitch(this, function(err) {
                var errorText = '<span class="kub-error">Error retrieving Event Details</span>';

                //setting both because with some clicks one works and other times the other works, sigh
                //when only the infoWindow worked, the title bar is blank
                evt.graphic.infoTemplate = new InfoTemplate("Event: ${eventNumber}", errorText);
                this.map.infoWindow.setContent(errorText);
            })).always(lang.hitch(this, function() {
                this.emit("show-info", {
                    eventNumber: graphic.attributes.eventNumber
                });
                this.map.centerAt(graphic.geometry).then(lang.hitch(this, function() {
                    this.map.infoWindow.show(graphic.geometry);
                }));
            }));
        }
    });
});