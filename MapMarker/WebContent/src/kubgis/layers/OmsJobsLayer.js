define(["dojo/_base/array",
    "dojo/_base/Color",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "esri/geometry/Point",
    "esri/geometry/scaleUtils",
    "esri/graphic",
    "esri/InfoTemplate",
    "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "dojo/text!./templates/OmsJobsLayer.html"],

function(array, Color, declare, lang, on, Point, scaleUtils, Graphic, InfoTemplate, GraphicsLayer, SimpleLineSymbol, SimpleMarkerSymbol, template) {

    return declare([GraphicsLayer], {

        id: "OmsJobsLayer",

        map: null,

        infoTemplate: null,

        _events: [],

        _deferreds: [],

        graphicList: [],

        constructor: function( /*Object*/ kwArgs) {
            console.log("constructor()");

            lang.mixin(this, kwArgs);

            this.infoTemplate = new InfoTemplate("Job: ${eventNumber}", template);

            // Events    
            var visChange = on(this, "visibility-change", lang.hitch(this, function() {
                console.log("visibility-change");
            }));

            this._events.push(visChange);

            var layerClick = this.on("click", lang.hitch(this, this._showInfoWindow));

            this._events.push(layerClick);

            this.eventStateful.watch("eventData", lang.hitch(this, this.update));
            if (this.eventStateful.eventData) {
                this.update(null, null, this.eventStateful.eventData);
            }
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

        update: function(name, oldValue, newValue) {
            console.log("update()");

            this.infoWindowEventNumber = null;
            if (this.map.infoWindow.isShowing) {
                if (this.map.infoWindow.features[0].attributes && this.map.infoWindow.features[0].attributes.eventNumber) {
                    this.infoWindowEventNumber = this.map.infoWindow.features[0].attributes.eventNumber;
                }
            }

            this.clear();
            this._addMarkers(newValue);

            if (this.infoWindowEventNumber) {
                array.forEach(this.graphics, lang.hitch(this, function(graphic) {
                    if (graphic.attributes.eventNumber == this.infoWindowEventNumber) {
                        this.map.infoWindow.hide();
                        this.map.infoWindow.setFeatures([graphic]);

                        var detailAction = {
                            label: "Job Details",
                            type: "job-details",
                            owner: this,
                            event: {
                                eventNumber: graphic.attributes.eventNumber
                            }
                        };
                        this.map.infoWindow.addAction(detailAction);

                        var navigateAction = {
                            label: "Navigate",
                            type: "navigate",
                            owner: this,
                            event: {
                                navigateTo: graphic.geometry
                            }
                        };
                        this.map.infoWindow.addAction(navigateAction);

                        this.map.infoWindow.show(graphic.geometry);
                    }
                }));
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
        },

        zoomToGraphic: function(zoomToJob) {
            array.forEach(this.graphics, lang.hitch(this, function(graphic) {
                if (graphic.attributes.eventNumber == zoomToJob) {
                    zoomToJob = null;

                    this.map.infoWindow.hide();
                    this.map.infoWindow.setFeatures([graphic]);

                    var detailAction = {
                        label: "Job Details",
                        type: "job-details",
                        owner: this,
                        event: {
                            eventNumber: graphic.attributes.eventNumber
                        }
                    };
                    this.map.infoWindow.addAction(detailAction);

                    var navigateAction = {
                        label: "Navigate",
                        type: "navigate",
                        owner: this,
                        event: {
                            navigateTo: graphic.geometry
                        }
                    };
                    this.map.infoWindow.addAction(navigateAction);

                    this.map.infoWindow.show(graphic.geometry);
                    this.map.setExtent(scaleUtils.getExtentForScale(this.map, this.map.getMaxScale()).centerAt(graphic.geometry));
                }
            }));
        },

        _addMarkers: function(data) {
            console.log("_addMarkers()");

            for (var i = 0; i < data.length; i++) {
                var job = data[i];
                if (job.x && job.y) {
                    var point = new Point((job.x / 1200) + 1789569.7058, (job.y / 1200) + 1789569.7058, this.map.spatialReference);

                    var attribute = {
                        "eventNumber": job.eventNumber,
                        "location": job.location,
                        "typeCode": job.typeCode,
                        "subTypeCode": job.subTypeCode,
                        "kubShortDescription": job.kubShortDescription,
                        "kubCisArea": job.kubCisArea
                    };

                    var marker = this._getMarker(job);

                    var graphic = new Graphic(point, marker, attribute);

                    if (graphic) {
                        this.add(graphic);
                    }
                }
            }
            if (this.zoomToJob) {
                this.zoomToGraphic(this.zoomToJob);
                this.zoomToJob = null;
            }
        },

        _getMarker: function(job) {

            // outline color for markers
            var outlineColor = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#cccccc"), 1);

            var blackMarkerColor = new Color([0, 0, 0, 0.65]);
            var redMarkerColor = new Color([255, 0, 0, 0.65]);
            var greenMarkerColor = new Color([119, 147, 60, 0.65]);

            var color;
            switch (job.unitStatus) {
                case "7":
                    color = redMarkerColor;
                    break;
                case "15":
                    color = blackMarkerColor;
                    break;
                case "8":
                    color = greenMarkerColor;
                    break;
                case "9":
                    color = greenMarkerColor;
                    break;
            }

            var marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_DIAMOND, 12, outlineColor, color);

            return marker;
        },

        _showInfoWindow: function(evt) {
            evt.stopPropagation();

            this.map.infoWindow.hide();
            this.map.infoWindow.setFeatures([evt.graphic]);

            var detailAction = {
                label: "Job Details",
                type: "job-details",
                owner: this,
                event: {
                    eventNumber: evt.graphic.attributes.eventNumber
                }
            };
            this.map.infoWindow.addAction(detailAction);

            var navigateAction = {
                label: "Navigate",
                type: "navigate",
                owner: this,
                event: {
                    navigateTo: evt.graphic.geometry
                }
            };
            this.map.infoWindow.addAction(navigateAction);

            this.map.centerAt(evt.graphic.geometry).then(lang.hitch(this, function() {
                this.map.infoWindow.show(evt.graphic.geometry);
            }));
        }
    });
});
