define(["dojo/_base/array",
    "dojo/_base/Color",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/number",
    "dojo/on",
    "dojo/sniff",
    "esri/config",
    "esri/graphic",
    "esri/InfoTemplate",
    "esri/layers/GraphicsLayer",
    "esri/SpatialReference",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/tasks/FeatureSet",
    "esri/tasks/RouteParameters",
    "esri/tasks/RouteTask",
    "esri/units",
    "dojo/text!./templates/NavigationLayer.html"],

function(array, Color, declare, lang, number, on, sniff, esriConfig, Graphic, InfoTemplate, GraphicsLayer, SpatialReference, SimpleMarkerSymbol, SimpleLineSymbol, FeatureSet, RouteParameters, RouteTask, esriUnits, template) {

    var pin = "M367 286c-55-48-183-6-146 80 8 20 27 33 41 48 23 26 43 59 43 95 0-45 29-81 58-112C395 364 408 321 367 286z";
    var red = new Color("#FE2E19");
    var gray = new Color("#B3B3B3");
    var darkGray = new Color("#303030");
    var white = new Color("#FFFFFF");

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

            var layerClick = this.on("click", lang.hitch(this, "_showInfoWindow"));

            this._events.push(layerClick);

            this.infoTemplate = new InfoTemplate("", template);

            //Add a network analyst server with related parameters to execute the routing task.
            this.routeTask = new RouteTask("//tasks.arcgisonline.com/ArcGIS/rest/services/NetworkAnalysis/ESRI_Route_NA/NAServer/Route");
            this.routeParams = this.routeParams = new RouteParameters();
            this.routeParams.stops = new FeatureSet();
            this.routeParams.returnRoutes = false;
            this.routeParams.returnDirections = true;
            this.routeParams.directionsLengthUnits = esriUnits.MILES;
            this.routeParams.outSpatialReference = this.map.spatialReference;

            //Show the route when the routing task is solved successfully, otherwise fire errorHandler.
            this.routeTask.on("solve-complete", lang.hitch(this, this.showRoute));
            this.routeTask.on("error", lang.hitch(this, this.errorHandler));
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

        //Execute a routing task when clicking "get direction".
        getDirections: function(fromLoc, toLoc) {
            this.routeParams.stops.features = [];
            this.clear();

            var ios = sniff("ios");
            var android = sniff("android");

            if (ios || android) {
                esriConfig.defaults.geometryService.project([toLoc], new SpatialReference(4326)).then(lang.hitch(this, function(projectedPoints) {
                    var toPoint = projectedPoints[0];

                    if (ios) {
                        window.location = "maps:daddr=" + toPoint.y + "," + toPoint.x;
                        console.log("IOS Maps - maps:daddr=" + toPoint.y + "," + toPoint.x);
                    } else if (android) {
                        window.location = "geo:" + toPoint.y + "," + toPoint.x + "?q=" + toPoint.y + "," + toPoint.x;
                        console.log("Android Maps - geo:" + toPoint.y + "," + toPoint.x + "?q=" + toPoint.y + "," + toPoint.x);
                    }
                }), lang.hitch(this, function(error) {
                    this.configureRoute(fromLoc, toLoc);
                }));
            } else {
                this.configureRoute(fromLoc, toLoc);
            }
        },

        //Check if the origin and destination addresses are executed successfully
        //and solve the routing task.
        configureRoute: function(fromLoc, toLoc) {
            //Configure symbols to be used for destinations and route segments.
            var outline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, darkGray, 3);
            var fromSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 12, outline, white);

            outline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, gray, 10);
            var toSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_PATH, 32, outline, red);
            toSymbol.setPath(pin);

            this.routeParams.stops.features[0] = this.add(new Graphic(fromLoc, fromSymbol, {
                address: "Starting Point"
            }));

            this.routeParams.stops.features[1] = this.add(new Graphic(toLoc, toSymbol, {
                address: "Destination"
            }));

            var features = this.routeParams.stops.features;
            if (features[0] !== null && features[1] !== null) {
                esriConfig.defaults.io.alwaysUseProxy = false;
                this.routeTask.solve(this.routeParams);
                esriConfig.defaults.io.alwaysUseProxy = true;
            }
        },

        //Show the result of the routing task.
        showRoute: function(e) {
            var directions = this.directions = e.result.routeResults[0].directions;
            this.directionFeatures = directions.features;
            var routeSymbol = new SimpleLineSymbol().setColor(new Color([0, 0, 255, 0.5])).setWidth(4);

            // Zoom to results.
            this.map.setExtent(directions.mergedGeometry.getExtent(), true);

            // Add route to the map.
            var routeGraphic = new Graphic(directions.mergedGeometry, routeSymbol);
            this.add(routeGraphic);
            routeGraphic.getShape().moveToBack();
            this.map.setExtent(directions.extent, true);

            //Display the directions.
            var directionsInfo = e.result.routeResults[0].directions.features;
            var totalDistance = number.format(directions.totalLength);
            var totalLength = number.format(directions.totalTime);
            var data = array.map(directionsInfo, function(feature, index) {
                return {
                    "detail": feature.attributes.text,
                    "index": index,
                    "distance": number.format(feature.attributes.length, {
                        places: 2
                    })
                };
            });


            for (var i = 0; i < this.directionFeatures.length; i++) {
                this.directionFeatures[i].infoTemplate = new InfoTemplate("Distance: " + data[i].distance, template);
            }

            var routeInfo = {
                totalDistance: totalDistance,
                totalLength: totalLength,
                data: data
            };

            this.emit("navigation-complete", {
                routeInfo: routeInfo
            });
        },

        //Display any errors that were caught when attempting to solve the route.
        errorHandler: function(err) {
            alert("An error occured\n" + err);
        },

        zoomToSegment: function(e) {
            var segmentGraphic;
            //Grid row id corresponds to the segment to highlight
            var index = e.index;
            var segment = this.directionFeatures[index];
            var segmentSymbol = new SimpleLineSymbol().setColor(new Color([255, 0, 0, 0.5])).setWidth(8);

            this.map.setExtent(segment.geometry.getExtent(), true);
            if (!segmentGraphic) {
                segmentGraphic = this.add(new Graphic(segment.geometry, segmentSymbol));
            } else {
                segmentGraphic.setGeometry(segment.geometry);
            }
        },

        _showInfoWindow: function(evt) {
            evt.stopPropagation();

            this.map.infoWindow.hide();
            this.map.infoWindow.setFeatures(this.directionFeatures);

            this.map.infoWindow.show(evt.mapPoint);
            this.map.setExtent(this.directions.extent, true);
        }
    });
});