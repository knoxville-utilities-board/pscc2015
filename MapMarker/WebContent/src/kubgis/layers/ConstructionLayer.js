define(["dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/date/stamp",
    "esri/geometry/Point",
    "esri/graphic",
    "esri/InfoTemplate",
    "esri/layers/GraphicsLayer",
    "esri/symbols/PictureMarkerSymbol",
    "dojo/text!./templates/ConstructionLayer.html"],

function(array, declare, lang, dateStamp, Point, Graphic, InfoTemplate, GraphicsLayer, PictureMarkerSymbol, template) {

    return declare([GraphicsLayer], {

        map: null,

        infoTemplate: null,

        _events: [],

        _deferreds: [],

        refreshTime: 4000,

        item: null,

        showNavigationLink: true,

        paymentLocationsStore: null,

        constructor: function( /*Object*/ kwArgs) {
            console.log("constructor()");

            lang.mixin(this, kwArgs);

            this.infoTemplate = new InfoTemplate("${utility}", template);

            var layerClick = this.on("click", lang.hitch(this, this._showInfoWindow));

            this._events.push(layerClick);

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
                    this._getData();
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
        },

        _getData: function() {
            console.log("_getData()");

            var request = this.mapService.getConstructionProjects();

            request.then(lang.hitch(this, function(response) {
                console.log("response.data", response.data);
                this.item = response.data;

                var dataTimeStamp = dateStamp.fromISOString(this.item.lastRefreshedDate);
                var projectedNewTime = new Date();

                projectedNewTime.setTime(dataTimeStamp.getTime() + 1000 * 60 * 15);

                var timeUntilNew = this.item.timeUntilNew = (projectedNewTime - new Date());

                this.emit("data-complete", this.item);

                this.clear();
                this.loop(timeUntilNew);

                this._addMarkers(response.data.navItems.electricProjects);
                this._addMarkers(response.data.navItems.gasProjects);
                this._addMarkers(response.data.navItems.wasteWaterProjects);
                this._addMarkers(response.data.navItems.waterProjects);
            }), lang.hitch(this, function(error) {
                this.emit("data-error");
            }));
        },

        _addMarkers: function(data) {
            console.log("_addMarkers()");

            data.forEach(lang.hitch(this, function(project) {
                project.linkHidden = project.linkUrl ? "" : "hidden";

                var point = new Point("" + project.x, "" + project.y, this.map.spatialReference);

                var marker = this._getMarker(project);

                var graphic = new Graphic(point, marker, project);

                if (graphic) {
                    this.add(graphic);
                }
            }));
        },

        _getMarker: function(project) {
            var marker;
            //TODO correct paths for both src and release
            if (project.utility == "Gas") {
                marker = new PictureMarkerSymbol("release/images/gasMarker.png", 16, 16);
            } else if (project.utility == "Electric") {
                marker = new PictureMarkerSymbol("release/images/electricMarker.png", 16, 16);
            } else if (project.utility == "Water") {
                marker = new PictureMarkerSymbol("release/images/waterMarker.png", 16, 16);
            } else {
                marker = new PictureMarkerSymbol("release/images/sewerMarker.png", 16, 16);
            }

            return marker;
        },

        _showInfoWindow: function(evt) {
            console.log("_showInfoWindow()");

            evt.stopPropagation();

            this.map.infoWindow.hide();
            this.map.infoWindow.setFeatures([evt.graphic]);
            this.map.infoWindow.show(evt.mapPoint);
            this.map.setExtent(this.map.extent.centerAt(evt.graphic.geometry));

            if (this.showNavigationLink) {
                var navigateAction = {
                    label: "Navigate",
                    type: "navigate",
                    owner: this,
                    event: {
                        navigateTo: evt.graphic.geometry
                    }
                };
                this.map.infoWindow.addAction(navigateAction);
            }

            this.map.infoWindow.show(new Point(evt.graphic.geometry.x, evt.graphic.geometry.y, this.map.spatialReference));
            this.emit("show-info", {
                projectName: evt.graphic.attributes.projectName
            });
        },

        showByName: function(name) {
            array.forEach(this.graphics, lang.hitch(this, function(graphic) {
                if (graphic.attributes.projectName == name) {
                    this._showInfoWindow({
                        stopPropagation: function() {},
                        mapPoint: graphic.geometry,
                        graphic: graphic
                    });
                }
            }));
        }
    });
});
