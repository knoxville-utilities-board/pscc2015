require({cache:{
'url:esri/dijit/templates/Directions.html':"<div class=\"${options.theme}\" role=\"presentation\">\n    <div data-dojo-attach-point=\"_widgetContainer\" class=\"${_css.widgetContainerClass}\" role=\"presentation\">\n        <div class=\"${_css.stopsContainerClass}\" role=\"presentation\">\n            <table class=\"${_css.stopsClass}\" data-dojo-attach-point=\"_dndNode\"></table>\n            <div class=\"${_css.clearClass}\"></div>\n            <div class=\"${_css.stopsButtonContainerClass}\">\n                <div class=\"${_css.stopsAddDestinationClass}\">\n                    <div tabindex=\"0\" role=\"button\" data-dojo-attach-point=\"_activateButton\" title=\"${_i18n.widgets.directions.activate}\" class=\"${_css.activateButtonClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass} ${_css.stopsPressedButtonClass}\"></div>\n                    <div role=\"button\" class=\"${_css.linkButtonClass} ${_css.stopsAddDestinationClass}\" data-dojo-attach-point=\"_addDestinationNode\">${_i18n.widgets.directions.addDestination}</div>\n                </div>\n                <div class=\"${_css.travelModesContainerClass}\" data-dojo-attach-point=\"_travelModeContainerNode\">\n                    <div tabindex=\"0\" role=\"button\" class=\"${_css.stopsTravelModeCarClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass} ${_css.stopsPressedButtonClass}\" travel-mode-key=\"Driving\" data-dojo-attach-point=\"_useTravelModeCarNode\">${_i18n.widgets.directions.travelMode.car}</div>\n                    <div tabindex=\"0\" role=\"button\" class=\"${_css.stopsTravelModeTruckClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass}\" travel-mode-key=\"Trucking\" data-dojo-attach-point=\"_useTravelModeTruckNode\">${_i18n.widgets.directions.travelMode.truck}</div>\n                    <div tabindex=\"0\" role=\"button\" class=\"${_css.stopsTravelModeWalkingClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass} ${_css.stopsButtonTabLastClass}\" travel-mode-key=\"Walking\" data-dojo-attach-point=\"_useTravelModeWalkingNode\">${_i18n.widgets.directions.travelMode.walking}</div>\n                    <div class=\"${_css.clearClass}\"></div>\n                </div>\n                <div role=\"button\" class=\"${_css.linkButtonClass} ${_css.stopsOptionsButtonClass}\" data-dojo-attach-point=\"_optionsButtonNode\">${_i18n.widgets.directions.showOptions}</div>\n            \t<div class=\"${_css.clearClass}\"></div>\n            </div>\n            <div role=\"presentation\" class=\"${_css.stopsOptionsMenuClass}\" data-dojo-attach-point=\"_optionsMenuNode\">\n                <div class=\"${_css.stopsOptionsCheckboxesClass}\">\n                    <ul>\n                        <li class=\"${_css.stopsFindOptimalOrderClass}\" data-dojo-attach-point=\"_findOptimalOrderItemNode\"><input tabindex=\"0\" data-dojo-attach-point=\"_findOptimalOrderNode\" type=\"checkbox\" id=\"${id}_find_optimal_order\" /><label for=\"${id}_find_optimal_order\">${_i18n.widgets.directions.findOptimalOrder}</label></li>\n                        <li class=\"${_css.stopsReturnToStartClass}\" data-dojo-attach-point=\"_returnToStartItemNode\"><input tabindex=\"0\" data-dojo-attach-point=\"_returnToStartNode\" type=\"checkbox\" id=\"${id}_stopsReturnToStart\" /><label for=\"${id}_stopsReturnToStart\">${_i18n.widgets.directions.returnToStart}</label></li>\n                        <li class=\"${_css.stopsUseTrafficClass}\" data-dojo-attach-point=\"_useTrafficItemNode\"><input tabindex=\"0\" data-dojo-attach-point=\"_useTrafficNode\" type=\"checkbox\" id=\"${id}_stopsUseTraffic\" /><label for=\"${id}_stopsUseTraffic\">${_i18n.widgets.directions.useTraffic}</label></li>\n                    </ul>\n                </div>\n                <div class=\"${_css.stopsOptionsToggleContainerClass}\">\n                    <div class=\"${_css.stopsOptionsUnitsContainerClass}\"  data-dojo-attach-point=\"_travelModeDistanceUnitsNode\">\n                        <div tabindex=\"0\" role=\"button\" class=\"${_css.stopsOptionsUnitsMiClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass}\" data-dojo-attach-point=\"_useMilesNode\">${_i18n.widgets.directions.units.MILES.abbr}</div>\n                        <div tabindex=\"0\" role=\"button\" class=\"${_css.stopsOptionsUnitsKmClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass} ${_css.stopsButtonTabLastClass} ${_css.stopsPressedButtonClass}\" data-dojo-attach-point=\"_useKilometersNode\">${_i18n.widgets.directions.units.KILOMETERS.abbr}</div>\n                        <div class=\"${_css.clearClass}\"></div>\n                    </div>\n                    <div class=\"${_css.stopsOptionsImpedanceContainerClass}\" data-dojo-attach-point=\"_travelModeImpedanceNode\">\n                        <div tabindex=\"0\" role=\"button\" class=\"${_css.stopsOptionsImpedanceTimeClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass} ${_css.stopsPressedButtonClass}\" travel-mode-key=\"Time\" data-dojo-attach-point=\"_useTravelModeTimeNode\">${_i18n.widgets.directions.impedance.fastest}</div>\n                        <div tabindex=\"0\" role=\"button\" class=\"${_css.stopsOptionsImpedanceDistanceClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass} ${_css.stopsButtonTabLastClass}\" travel-mode-key=\"Distance\" data-dojo-attach-point=\"_useTravelModeDistanceNode\">${_i18n.widgets.directions.impedance.shortest}</div>\n                        <div class=\"${_css.clearClass}\"></div>\n                    </div>\n                    <div class=\"${_css.clearClass}\"></div>\n                </div>\n                <div class=\"${_css.clearClass}\"></div>\n            </div>\n            <div class=\"${_css.stopsGetDirectionsContainerClass}\">\n                <div tabindex=\"0\" role=\"button\" class=\"${_css.stopsButtonClass} ${_css.stopsGetDirectionsClass}\" data-dojo-attach-point=\"_getDirectionsButtonNode\">${_i18n.widgets.directions.getDirections}</div>\n                <div tabindex=\"0\" role=\"button\" class=\"${_css.linkButtonClass} ${_css.stopsClearDirectionsClass}\" data-dojo-attach-point=\"_clearDirectionsButtonNode\">${_i18n.widgets.directions.clearDirections}</div>\n                <div class=\"${_css.clearClass}\"></div>\n            </div>\n    \t</div>\n    \t<div class=\"${_css.clearClass}\"></div>\n    \t<div data-dojo-attach-point=\"_errorNode\" role=\"presentation\"></div>\n    \t<div class=\"${_css.resultsContainerClass}\" role=\"presentation\">\n        \t<div class=\"${_css.routesContainerClass}\" data-dojo-attach-point=\"_resultsNode\" role=\"presentation\"></div>\n    \t</div>\n    </div>\n</div>"}});
//>>built
define("esri/dijit/Directions", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/Color", "dijit/a11yclick", "dijit/_TemplatedMixin", "dojo/keys", "dojo/has", "dojo/on", "dojo/mouse", "dojo/dom", "dojo/dom-geometry", "dojo/dom-style", "dojo/dom-class", "dojo/dom-attr", "dojo/query", "dojo/number", "dojo/i18n!../nls/jsapi", "dojo/text!./templates/Directions.html", "./Geocoder", "dojo/dom-construct", "dojo/promise/all", "dojo/Deferred", "dojo/dnd/Source", "../kernel", "../graphic", "../units", "../InfoTemplate", "../SpatialReference", "../layers/ArcGISDynamicMapServiceLayer", "../geometry/Point", "../geometry/Extent", "../geometry/Polyline", "../geometry/mathUtils", "../symbols/PictureMarkerSymbol", "../symbols/SimpleLineSymbol", "../symbols/TextSymbol", "../symbols/Font", "./_EventedWidget", "../tasks/FeatureSet", "../tasks/RouteTask", "../tasks/RouteParameters", "../tasks/GeometryService", "../tasks/PrintTask", "../tasks/PrintParameters", "../tasks/PrintTemplate", "../toolbars/edit", "../request", "../config", "../tasks/ProjectParameters", "dojo/uacss"], function(A, O, d, n, D, s, P, z, ha, k, F, B, Q, p, h, u, x, E, g, R, G, t, H, m, S, ia, y, q, I, J, T, U, V, K, W, w, L, X, C, Y, Z, $, aa, M, ba, ca, da, N, ea, fa, ga) {
    return O("esri.dijit.Directions", [Y, P], {
        templateString: R,
        basePath: A.toUrl("."),
        active: !0,
        _eventMap: {
            load: !0,
            "directions-start": !0,
            "directions-finish": ["result"],
            "directions-clear": !0,
            "segment-select": ["graphic"],
            "segment-highlight": ["graphic"],
            error: ["error"],
            "stops-update": ["stops"]
        },
        _tmDrivingTime: "Driving Time",
        _tmTruckingTime: "Trucking Time",
        _tmWalkingTime: "Walking Time",
        _tmDrivingDistance: "Driving Distance",
        _tmTruckingDistance: "Trucking Distance",
        _tmWalkingDistance: "Walking Distance",
        constructor: function(a, b) {
            this._css = {
                widgetContainerClass: "esriDirectionsContainer",
                stopsContainerClass: "esriStopsContainer",
                reverseStopsClass: "esriStopsReverse",
                addStopsClass: "esriStopsAdd",
                stopsClass: "esriStops",
                stopsRemovableClass: "esriStopsRemovable",
                stopsButtonContainerClass: "esriStopsButtons",
                stopsOptionsButtonClass: "esriStopsOptionsButton",
                stopsAddDestinationClass: "esriStopsAddDestination",
                stopsGetDirectionsContainerClass: "esriStopsGetDirectionsContainer",
                stopsGetDirectionsClass: "esriStopsGetDirections",
                stopsClearDirectionsClass: "esriStopsClearDirections",
                stopsOptionsOptionsEnabledClass: "esriStopsOptionsEnabled",
                stopsOptionsMenuClass: "esriStopsOptionsMenu",
                stopsFindOptimalOrderClass: "esriFindOptimalOrderOption",
                stopsUseTrafficClass: "esriUseTrafficOption",
                stopsReturnToStartClass: "esriReturnToStartOption",
                stopsOptionsCheckboxesClass: "esriOptionsCheckboxes",
                stopsOptionsToggleContainerClass: "esriOptionsToggleContainer",
                stopsOptionsUnitsContainerClass: "esriOptionsUnitsContainer",
                stopsOptionsUnitsMiClass: "esriOptionsUnitsMi",
                stopsOptionsUnitsKmClass: "esriOptionsUnitsKm",
                stopsOptionsImpedanceContainerClass: "esriOptionsImpedanceContainer",
                stopsOptionsImpedanceTimeClass: "esriOptionsImpedanceTime",
                stopsOptionsImpedanceDistanceClass: "esriOptionsImpedanceDistance",
                travelModesContainerClass: "esriTravelModesContainer",
                stopsTravelModeCarClass: "esriTravelModeCar",
                stopsTravelModeTruckClass: "esriTravelModeTruck",
                stopsTravelModeWalkingClass: "esriTravelModeWalking",
                stopClass: "esriStop",
                stopOriginClass: "esriStopOrigin",
                stopDestinationClass: "esriStopDestination",
                stopUnreachedFirstOrLastClass: "esriStopUnreachedFirstOrLast",
                stopUnreachedClass: "esriStopUnreached",
                esriStopGeocoderColumnClass: "esriStopGeocoderColumn",
                esriStopReverseColumnClass: "esriStopReverseColumn",
                stopDnDHandleClass: "esriStopDnDHandle",
                stopDnDHandleClassHidden: "esriStopDnDHandleHidden",
                stopIconColumnClass: "esriStopIconColumn",
                stopIconClass: "esriStopIcon",
                stopIconRemoveColumnClass: "esriStopIconRemoveColumn",
                stopIconRemoveClass: "esriStopIconRemove",
                stopIconRemoveClassHidden: "esriStopIconRemoveHidden",
                resultsContainerClass: "esriResultsContainer",
                resultsLoadingClass: "esriResultsLoading",
                resultsPrintClass: "esriResultsPrint",
                resultsSummaryClass: "esriResultsSummary",
                resultsViewFullRouteClass: "esriResultsViewFullRoute",
                resultsRouteNameClass: "esriResultsRouteName",
                resultsRouteButtonContainerClass: "esriResultsButtonsContainer",
                routesContainerClass: "esriRoutesContainer",
                routesClass: "esriRoutes",
                routesErrorClass: "esriRoutesError",
                routeClass: "esriRoute",
                routeTextColumnClass: "esriRouteTextColumn",
                routeTextClass: "esriRouteText",
                routeLengthClass: "esriRouteLength",
                routeOriginClass: "esriDMTStopOrigin",
                routeDestinationClass: "esriDMTStopDestination",
                routeLastClass: "esriDMTStopLast",
                routeInfoClass: "esriRouteInfo",
                routeIconColumnClass: "esriRouteIconColumn",
                routeIconClass: "esriRouteIcon",
                infoWindowRouteClass: "esriInfoWindowRoute",
                routeZoomClass: "esriRouteZoom",
                esriPrintPageClass: "esriPrintPage",
                esriPrintBarClass: "esriPrintBar",
                esriPrintButtonClass: "esriPrintButton",
                esriCloseButtonClass: "esriCloseButton",
                esriPrintMainClass: "esriPrintMain",
                esriPrintHeaderClass: "esriPrintHeader",
                esriPrintLogoClass: "esriPrintLogo",
                esriPrintMapClass: "esriPrintMap",
                esriPrintNameClass: "esriPrintName",
                esriPrintNotesClass: "esriPrintNotes",
                esriPrintLengthClass: "esriPrintLength",
                esriPrintDirectionsClass: "esriPrintDirections",
                esriPrintFooterClass: "esriPrintFooter",
                esriPrintStopLabelClass: "esriPrintStopLabel",
                clearClass: "esriClear",
                dndDragBodyClass: "esriDndDragDirection",
                stopsButtonClass: "esriDirectionsButton",
                stopsButtonTabClass: "esriDirectionsTabButton",
                stopsButtonTabLastClass: "esriDirectionsTabLastButton",
                stopsPressedButtonClass: "esriDirectionsPressedButton",
                linkButtonClass: "esriLinkButton",
                activateButtonClass: "esriActivateButton"
            };
            this.options = {
                map: null,
                autoSolve: !0,
                minStops: 2,
                maxStops: 20,
                theme: "simpleDirections",
                alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                directions: null,
                returnToStart: !1,
                optimalRoute: !1,
                routeTaskUrl: location.protocol + "//route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
                printTaskUrl: location.protocol + "//utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
                geometryTaskUrl: location.protocol + "//utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer",
                routeParams: {},
                stops: ["", ""],
                geocoderOptions: {
                    autoComplete: !1,
                    autoNavigate: !1
                },
                stopsInfoTemplate: new I("Location", "${address}${error}"),
                segmentInfoTemplate: new I("Route", '\x3cdiv class\x3d"${maneuverType}"\x3e\x3cdiv class\x3d"' + this._css.routeIconClass +
                    " " + this._css.infoWindowRouteClass + '"\x3e\x3cstrong\x3e${step}.\x3c/strong\x3e ${formattedText}\x3c/div\x3e\x3c/div\x3e'),
                textSymbolFont: new C("11px", C.STYLE_NORMAL, C.VARIANT_NORMAL, C.WEIGHT_NORMAL, "Arial, Helvetica, sans-serif"),
                textSymbolColor: new D([255, 255, 255]),
                textSymbolOffset: {
                    x: 0,
                    y: 10.875
                },
                fromSymbol: (new w({
                    url: this.basePath + "/images/Directions/greenPoint.png",
                    height: 21.75,
                    width: 15.75,
                    type: "esriPMS"
                })).setOffset(0, 10.875),
                fromSymbolDrag: (new w({
                    url: this.basePath + "/images/Directions/greenPointMove.png",
                    height: 21.75,
                    width: 15.75,
                    type: "esriPMS"
                })).setOffset(0, 10.875),
                stopSymbol: (new w({
                    url: this.basePath + "/images/Directions/bluePoint.png",
                    height: 21.75,
                    width: 15.75,
                    type: "esriPMS"
                })).setOffset(0, 10.875),
                stopSymbolDrag: (new w({
                    url: this.basePath + "/images/Directions/bluePointMove.png",
                    height: 21.75,
                    width: 15.75,
                    type: "esriPMS"
                })).setOffset(0, 10.875),
                toSymbol: (new w({
                    url: this.basePath + "/images/Directions/redPoint.png",
                    height: 21.75,
                    width: 15.75,
                    type: "esriPMS"
                })).setOffset(0, 10.875),
                toSymbolDrag: (new w({
                    url: this.basePath +
                        "/images/Directions/redPointMove.png",
                    height: 21.75,
                    width: 15.75,
                    type: "esriPMS"
                })).setOffset(0, 10.875),
                unreachedSymbol: (new w({
                    url: this.basePath + "/images/Directions/grayPoint.png",
                    height: 21.75,
                    width: 15.75,
                    type: "esriPMS"
                })).setOffset(0, 10.875),
                unreachedSymbolDrag: (new w({
                    url: this.basePath + "/images/Directions/grayPointMove.png",
                    height: 21.75,
                    width: 15.75,
                    type: "esriPMS"
                })).setOffset(0, 10.875),
                routeSymbol: (new L).setColor(new D([0, 69, 117, 1])).setWidth(4),
                segmentSymbol: (new L).setColor(new D([0, 122, 194, 1])).setWidth(8),
                printPage: "",
                printTemplate: "",
                autoCenterAtSegmentStart: !0,
                focusOnNewStop: !0,
                dragging: !0,
                canModifyStops: !0,
                directionsLengthUnits: null,
                traffic: !1,
                trafficLayer: null,
                showPrintPage: !0,
                showSegmentPopup: !0,
                showSegmentHighlight: !0,
                showReverseStopsButton: !0,
                showReturnToStartOption: !0,
                showOptimalRouteOption: !0,
                showTravelModesOption: !0,
                showMilesKilometersOption: !0,
                showClearButton: !1
            };
            this.defaults = d.mixin({}, this.options, a);
            this._sortId = "_dndId_" + this.id;
            this._stopReference = "_dndStop_" + this.id;
            this._i18n = g;
            this.domNode = b
        },
        postCreate: function() {
            this.inherited(arguments);
            this.own(k(this._activateButton, s, d.hitch(this, function() {
                this._activate(!this.active)
            })));
            this.own(k(this._addDestinationNode, s, d.hitch(this, this._addStopButton)));
            this.own(k(this._optionsButtonNode, s, d.hitch(this, this._toggleOptionsMenu)));
            this.own(k(this._findOptimalOrderNode, s, d.hitch(this, this._toggleCheckbox)));
            this.own(k(this._returnToStartNode, s, d.hitch(this, this._toggleCheckbox)));
            this.own(k(this._useTrafficNode, s, d.hitch(this,
                this._toggleCheckbox)));
            this.own(k(this._useMilesNode, s, d.hitch(this, this._toggleUnits)));
            this.own(k(this._useKilometersNode, s, d.hitch(this, this._toggleUnits)));
            this.own(k(this._useTravelModeTimeNode, s, d.hitch(this, this._toggleTravelModeImpedance)));
            this.own(k(this._useTravelModeDistanceNode, s, d.hitch(this, this._toggleTravelModeImpedance)));
            this.own(k(this._useTravelModeCarNode, s, d.hitch(this, this._toggleTravelMode)));
            this.own(k(this._useTravelModeTruckNode, s, d.hitch(this, this._toggleTravelMode)));
            this.own(k(this._useTravelModeWalkingNode, s, d.hitch(this, this._toggleTravelMode)));
            this.own(k(this._getDirectionsButtonNode, s, d.hitch(this, this._solveAndZoom)));
            this.own(k(this._clearDirectionsButtonNode, s, d.hitch(this, function() {
                this.clearDirections();
                this.onDirectionsClear()
            })));
            this._setWidgetProperties();
            this._activate(this.active)
        },
        startup: function() {
            this.inherited(arguments);
            this._init()
        },
        destroy: function() {
            this._disconnectEvents();
            t.empty(this.domNode);
            this.inherited(arguments)
        },
        activate: function() {
            this._activate(!0)
        },
        deactivate: function() {
            this._activate(!1)
        },
        _activate: function(a) {
            this.active = a;
            this._addStopOnMapClickListener && this._addStopOnMapClickListener.remove();
            this.active ? (this.map && (this.map.activeDirectionsWidget && this.map.activeDirectionsWidget !== this && this.map.activeDirectionsWidget.deactivate(), this.map.activeDirectionsWidget = this, this._addStopOnMapClickListener = k(this.map, "click", d.hitch(this, function(a) {
                    this.addStop(new y(a.mapPoint)).then(d.hitch(this, function() {
                        1 < this.stopGraphics.length && this.getDirections()
                    }))
                }))),
                h.add(this._activateButton, this._css.stopsPressedButtonClass)) : h.remove(this._activateButton, this._css.stopsPressedButtonClass)
        },
        _destroyGeocoders: function() {
            var a = this.get("geocoders");
            if (a && a.length)
                for (var b = 0; b < a.length; b++) a[b] && a[b].destroy();
            this.set("geocoders", [])
        },
        _disconnectEvents: function() {
            this.clearDirections(!0);
            var a;
            if (this._watchEvents && this._watchEvents.length)
                for (a = 0; a < this._watchEvents.length; a++) this._watchEvents[a].unwatch();
            if (this._onEvents && this._onEvents.length)
                for (a = 0; a <
                    this._onEvents.length; a++) this._onEvents[a].remove();
            if (this._geocoderFindEvents && this._geocoderFindEvents.length)
                for (a = 0; a < this._geocoderFindEvents.length; a++) this._geocoderFindEvents[a].remove();
            if (this._geocoderWatchEvents && this._geocoderWatchEvents.length)
                for (a = 0; a < this._geocoderWatchEvents.length; a++) this._geocoderWatchEvents[a].unwatch();
            if (this._geocoderSelectEvents && this._geocoderSelectEvents.length)
                for (a = 0; a < this._geocoderSelectEvents.length; a++) this._geocoderSelectEvents[a].remove();
            this._onEvents = [];
            this._watchEvents = [];
            this._geocoderSelectEvents = [];
            this._geocoderFindEvents = [];
            this._geocoderWatchEvents = [];
            this._disconnectResults();
            this._destroyGeocoders();
            this._destroyGlobalGeocoder();
            this._destroyDnD()
        },
        clearDirections: function() {
            this.get("routeParams") && this.get("routeParams").stops && (this.get("routeParams").stops.features.length ? this.get("routeParams").stops.features = [] : arguments.length || this.reset());
            this.set("directions", null);
            this._clearDisplayBeforeSolve();
            this._clearDisplayAfterSolve();
            this._removeTrafficLayer()
        },
        reset: function() {
            this._setWidgetProperties();
            this._init()
        },
        onLoad: function() {},
        onDirectionsStart: function() {
            this._clearDisplayBeforeSolve();
            this.set("solving", !0)
        },
        onDirectionsFinish: function() {
            this.set("solving", !1)
        },
        onDirectionsClear: function() {},
        onSegmentSelect: function() {},
        onSegmentHighlight: function() {},
        onStopsUpdate: function() {},
        onError: function() {},
        removeStops: function() {
            return this._enqueue(function() {
                this.clearErrors();
                return this._removeStops()
            })
        },
        removeStop: function(a) {
            return this._enqueue(function() {
                if (this.stops.length >
                    this.get("minStops")) return this.clearErrors(), this._removeStop(a);
                var b = new m;
                b.reject();
                return b.promise
            })
        },
        updateStops: function(a) {
            return this._enqueue(function() {
                this.clearErrors();
                return this._updateStops(a)
            })
        },
        addStops: function(a, b) {
            return this._enqueue(function() {
                this.clearErrors();
                return this._addStops(a, b)
            })
        },
        addStop: function(a, b) {
            return this._enqueue(function() {
                this.clearErrors();
                return this._addStop(a, b)
            })
        },
        updateStop: function(a, b) {
            return this._enqueue(function() {
                this.clearErrors();
                return this._updateStop(a,
                    b)
            })
        },
        clearErrors: function() {
            this.errors = [];
            this._errorNode && (this._errorNode.innerHTML = "")
        },
        getDirections: function() {
            return this._enqueue(function() {
                this._removeEmptyStops();
                this.clearErrors();
                var a = new m;
                this._calculateValidStops() >= this.get("minStops") ? (this.onDirectionsStart(), this._dnd.sync(), this._sortGeocoders(), this._getCandidates(this.get("stops")).then(d.hitch(this, function(b) {
                    this.stops = b;
                    this._setStops();
                    var c = this._validateStops(b);
                    c.error ? (b = g.widgets.directions.error.locator, (c = this.get("geocoders")[c.index]) &&
                        (b = g.widgets.directions.error.unknownStop.replace("\x3cname\x3e", c.get("value"))), this._resultError(b), this.set("directions", null), this._clearRouteGraphics(), a.reject(b), this.onDirectionsFinish(Error([b]))) : this._configureRoute(a)
                }), d.hitch(this, function(b) {
                    this.set("directions", null);
                    this._clearRouteGraphics();
                    a.reject(b);
                    this.onDirectionsFinish()
                }))) : (this.clearDirections(!0), this.createRouteSymbols(), a.reject(g.widgets.directions.error.notEnoughStops));
                return a.promise
            })
        },
        unhighlightSegment: function() {
            this.get("map") &&
                (this.get("map").graphics && this.get("showSegmentHighlight")) && (this.get("map").graphics.remove(this._segmentGraphic), this._segmentGraphic = null)
        },
        highlightSegment: function(a) {
            "undefined" === typeof a && (a = 0);
            a = this.get("directions").features[a];
            var b = new K(a.geometry),
                c = b.getPoint(0, 0),
                f = b.getPoint(0, 1);
            W.getLength(c, f) || (b = c);
            this.unhighlightSegment();
            (this._segmentGraphic = new y(b, this.get("segmentSymbol"), a.attributes, this.get("segmentInfoTemplate"))) && this.get("map") && this.get("map").graphics && this.get("showSegmentHighlight") &&
                this.get("map").graphics.add(this._segmentGraphic)
        },
        zoomToSegment: function(a) {
            "undefined" === typeof a && (a = 0);
            if (this.get("map")) {
                var b = this.get("directions").features[a],
                    c = (new K(b.geometry)).getExtent(),
                    c = this.get("map").setExtent(c, !0);
                c.then(d.hitch(this, function() {
                    this._showSegmentPopup(b, a)
                }));
                return c.promise
            }
            return null
        },
        centerAtSegmentStart: function(a) {
            "undefined" === typeof a && (a = 0);
            if (this.get("map")) {
                var b = this.get("directions").features[a],
                    c = b.geometry.getPoint(0, 0);
                this.get("map").centerAt(c).then(d.hitch(this,
                    function() {
                        this._showSegmentPopup(b, a)
                    }))
            }
        },
        zoomToFullRoute: function() {
            return this.get("map") ? (this._clearInfoWindow(), this.unhighlightSegment(), this.get("map").setExtent(this.get("directions").extent, !0)) : null
        },
        setListIcons: function() {
            var a, b = this._dnd.getAllNodes();
            for (a = 0; a < b.length; a++) {
                var c = x("." + this._css.stopIconClass, b[a])[0];
                c && (c.innerHTML = this._getLetter(a));
                h.remove(b[a], this._css.stopOriginClass + " " + this._css.stopDestinationClass + " " + this._css.stopUnreachedClass + " " + this._css.stopUnreachedFirstOrLastClass);
                c = this.stopGraphics && this.stopGraphics[a] && this.stopGraphics[a].attributes ? this.stopGraphics[a].attributes.Status : void 0;
                c = 0 < c && 6 > c;
                0 === a ? h.add(b[a], c ? this._css.stopUnreachedFirstOrLastClass : this._css.stopOriginClass) : a === b.length - 1 && !this._startReturn ? h.add(b[a], c ? this._css.stopUnreachedFirstOrLastClass : this._css.stopDestinationClass) : c && h.add(b[a], this._css.stopUnreachedClass)
            }
            a = x("[data-reverse-td]", this._dndNode)[0];
            t.destroy(a);
            this.get("showReverseStopsButton") && t.create("td", {
                "data-reverse-td": "true",
                rowspan: b.length,
                className: this._css.esriStopReverseColumnClass,
                innerHTML: '\x3cdiv role\x3d"button" class\x3d"' + this._css.reverseStopsClass + '" data-reverse-stops\x3d"true" title\x3d"' + g.widgets.directions.reverseDirections + '"\x3e\x3c/div\x3e',
                onmouseover: function(a) {
                    a.stopPropagation()
                },
                onmouseout: function(a) {
                    a.stopPropagation()
                }
            }, b[0])
        },
        addRouteSymbols: function() {
            if (this.stopGraphics.length && this.get("map") && this.get("map").graphics)
                for (var a = 0; a < this.stopGraphics.length; a++)
                    if (this.stopGraphics[a]) {
                        this.get("map").graphics.add(this.stopGraphics[a]);
                        var b = this.stopGraphics[a].getDojoShape();
                        b && b.moveToFront();
                        this.get("map").graphics.add(this.textGraphics[a]);
                        (b = this.textGraphics[a].getDojoShape()) && b.moveToFront()
                    }
        },
        createRouteSymbols: function() {
            this._clearStopGraphics();
            for (var a = this.get("stops"), b = 0; b < a.length; b++) {
                var c = a[b];
                if (c && c.feature) {
                    var f = c.feature.attributes ? c.feature.attributes.Status : void 0,
                        e = this._setStopSymbol(b, a.length + (this._startReturn ? 1 : 0), !1, f),
                        d = this._defaultSR;
                    this.get("map") && (d = this.get("map").spatialReference);
                    var d =
                        new U(c.feature.geometry.x, c.feature.geometry.y, d),
                        v = this._getLetter(b),
                        v = new X(v, this.get("textSymbolFont"), this.get("textSymbolColor"));
                    this.get("textSymbolOffset") && v.setOffset(this.get("textSymbolOffset").x, this.get("textSymbolOffset").y);
                    v = new y(d, v);
                    v._textGraphic = !0;
                    v._index = b;
                    var l = c.feature.attributes,
                        c = new y(d, e, {
                            address: c.name,
                            Status: f,
                            SourceID: l && l.SourceID ? l.SourceID : null,
                            SourceOID: l && l.SourceOID ? l.SourceOID : null,
                            PosAlong: l && l.PosAlong ? l.PosAlong : null,
                            SideOfEdge: l && l.SideOfEdge ? l.SideOfEdge : null
                        }, this.get("stopsInfoTemplate"));
                    c._drag = !0;
                    c._index = b;
                    this.stopGraphics[b] = c;
                    this.textGraphics[b] = v
                }
            }
            this.set("stopGraphics", this.stopGraphics);
            this.set("textGraphics", this.textGraphics);
            this.addRouteSymbols();
            this.setListIcons()
        },
        setTravelMode: function(a) {
            var b = new m,
                c = this.serviceDescription;
            if (c && c.supportedTravelModes && c.supportedTravelModes.length) {
                for (var c = c.supportedTravelModes, f = !1, e = !1, d = 0; d < c.length; d++)
                    if (c[d].name === a && c[d]._nodeTravelMode && c[d]._nodeImpedance) {
                        e = !0;
                        if (f = this.travelModeName !==
                            a) this.set("travelModeName", c[d].name), this.routeParams.travelMode = c[d].itemId, k.emit(c[d]._nodeTravelMode, "click", {
                            bubbles: !1,
                            cancelable: !0
                        }), k.emit(c[d]._nodeImpedance, "click", {
                            bubbles: !1,
                            cancelable: !0
                        });
                        break
                    }
                e ? f ? this._solveAndZoom().always(function() {
                    b.resolve(a)
                }) : b.resolve(a) : b.reject(a);
                this._useTrafficNode && (c = a === this._tmDrivingTime, this._useTrafficNode.disabled = !c, !c && this._useTrafficNode.checked && this._removeTrafficLayer())
            } else b.reject(a);
            return b.promise
        },
        getSupportedTravelModeNames: function() {
            var a = [],
                b = this.serviceDescription;
            if (b && b.supportedTravelModes && b.supportedTravelModes.length)
                for (var b = b.supportedTravelModes, c = 0; c < b.length; c++) a.push(b[c].name);
            return a
        },
        setDirectionsLengthUnits: function(a) {
            var b = new m;
            h.remove(this._useMilesNode, this._css.stopsPressedButtonClass);
            h.remove(this._useKilometersNode, this._css.stopsPressedButtonClass);
            a === q.KILOMETERS ? h.add(this._useKilometersNode, this._css.stopsPressedButtonClass) : a === q.MILES && h.add(this._useMilesNode, this._css.stopsPressedButtonClass);
            this.directionsLengthUnits !== a ? a === q.KILOMETERS || a === q.METERS || a === q.MILES || a === q.NAUTICAL_MILES ? (this.directionsLengthUnits = a, this.autoSolve ? this.getDirections().always(function() {
                b.resolve(a)
            }) : b.resolve(a)) : b.reject(a) : b.resolve(a);
            return b.promise
        },
        _showLoadingSpinner: function(a) {
            void 0 === a && (a = this._requestQueueTail && !this._requestQueueTail.isFulfilled() && this.loaded);
            a ? h.add(this._widgetContainer, this._css.resultsLoadingClass) : h.remove(this._widgetContainer, this._css.resultsLoadingClass)
        },
        _enqueue: function() {
            var a =
                new m,
                b = arguments;
            this._requestQueueTail || (this._requestQueueTail = new m, this._requestQueueTail.resolve());
            this._requestQueueTail.promise.always(d.hitch(this, function() {
                var c = b[0];
                try {
                    var f = c.call(this);
                    f && "object" === typeof f && f.hasOwnProperty("isFulfilled") ? f.then(d.hitch(this, function(b) {
                        a.resolve(b);
                        this._showLoadingSpinner()
                    }), d.hitch(this, function(b) {
                        a.reject(b);
                        this._showLoadingSpinner()
                    })) : (a.resolve(f), this._showLoadingSpinner())
                } catch (e) {
                    a.reject(e), this._showLoadingSpinner()
                }
            }));
            this._requestQueueTail =
                a;
            this._showLoadingSpinner();
            return a.promise
        },
        _createDnD: function() {
            this._dnd = new S(this._dndNode, {
                skipForm: !0,
                withHandles: !0
            })
        },
        _destroyDnD: function() {
            t.empty(this._dndNode);
            this._dnd && (this._dnd.destroy(), this._dnd = null)
        },
        _usingAGOL: function() {
            return -1 < this.get("routeTaskUrl").search(/^https?:\/\/route[^.]*\.arcgis\.com.*$/i)
        },
        _setGeocoderOptions: function() {
            var a = {
                theme: this.get("theme")
            };
            this.defaults.geocoderOptions.autoComplete || (a.maxLocations = 1);
            var b = {
                map: this.get("map")
            };
            this.geocoderOptions =
                d.mixin(a, this.defaults.geocoderOptions, b)
        },
        _setDefaultUnits: function() {
            if (this.get("directionsLengthUnits")) this.setDirectionsLengthUnits(this.directionsLengthUnits);
            else {
                var a = q.KILOMETERS;
                this.defaults.routeParams.directionsLengthUnits ? a = this.defaults.routeParams.directionsLengthUnits : this.defaults.routeParams.directionsLanguage && (a = "en" === this.defaults.routeParams.directionsLanguage ? q.MILES : q.KILOMETERS);
                this.set("directionsLengthUnits", a)
            }
        },
        _setTrafficOptions: function() {
            this.defaults.hasOwnProperty("showTrafficOption") ?
                this.set("showTrafficOption", this.defaults.showTrafficOption) : this._usingAGOL() && this.set("showTrafficOption", !0);
            this._usingAGOL() && (this.get("trafficLayer") || this.set("trafficLayer", new T(location.protocol + "//traffic.arcgis.com/arcgis/rest/services/World/Traffic/MapServer", {
                opacity: 0.4
            })))
        },
        _updateCanModifyStops: function() {
            this.get("canModifyStops") ? this._showAddDestination() : this._hideAddDestination()
        },
        _setWidgetProperties: function() {
            this._stopsReady = !1;
            this._disconnectEvents();
            this.set("loaded", !1);
            this.set("map", this.defaults.map);
            this.set("alphabet", this.defaults.alphabet);
            this.set("directions", this.defaults.directions);
            this.set("directionsLanguage", this.defaults.directionsLanguage);
            this.set("routeTaskUrl", this.defaults.routeTaskUrl);
            this.set("printTaskUrl", this.defaults.printTaskUrl);
            this.set("geometryTaskUrl", this.defaults.geometryTaskUrl);
            this.set("stops", []);
            this.set("textSymbolFont", this.defaults.textSymbolFont);
            this.set("textSymbolColor", this.defaults.textSymbolColor);
            this.set("textSymbolOffset",
                this.defaults.textSymbolOffset);
            this.set("fromSymbol", this.defaults.fromSymbol);
            this.set("fromSymbolDrag", this.defaults.fromSymbolDrag);
            this.set("stopSymbol", this.defaults.stopSymbol);
            this.set("stopSymbolDrag", this.defaults.stopSymbolDrag);
            this.set("toSymbol", this.defaults.toSymbol);
            this.set("toSymbolDrag", this.defaults.toSymbolDrag);
            this.set("unreachedSymbol", this.defaults.unreachedSymbol);
            this.set("unreachedSymbolDrag", this.defaults.unreachedSymbolDrag);
            this.set("routeSymbol", this.defaults.routeSymbol);
            this.set("segmentSymbol", this.defaults.segmentSymbol);
            this.set("showPrintPage", this.defaults.showPrintPage);
            this.set("showSegmentPopup", this.defaults.showSegmentPopup);
            this.set("showSegmentHighlight", this.defaults.showSegmentHighlight);
            this.set("autoCenterAtSegmentStart", this.defaults.autoCenterAtSegmentStart);
            this.set("showReverseStopsButton", this.defaults.showReverseStopsButton);
            this.set("focusOnNewStop", this.defaults.focusOnNewStop);
            this.set("dragging", this.defaults.dragging);
            this.set("canModifyStops",
                this.defaults.canModifyStops);
            this.set("theme", this.defaults.theme);
            this.set("showReturnToStartOption", this.defaults.showReturnToStartOption);
            this.set("showOptimalRouteOption", this.defaults.showOptimalRouteOption);
            this.set("optimalRoute", this.defaults.optimalRoute);
            this.set("returnToStart", this.defaults.returnToStart);
            this.set("traffic", this.defaults.traffic);
            this.set("trafficLayer", this.defaults.trafficLayer);
            this.set("minStops", this.defaults.minStops);
            this.set("maxStops", this.defaults.maxStops);
            this.set("printPage", this.defaults.printPage);
            this.set("autoSolve", this.defaults.autoSolve);
            this.set("directionsLengthUnits", this.defaults.directionsLengthUnits);
            this.set("stopsInfoTemplate", this.defaults.stopsInfoTemplate);
            this.set("segmentInfoTemplate", this.defaults.segmentInfoTemplate);
            this.set("geocoders", []);
            this.set("showTravelModesOption", this.defaults.showTravelModesOption);
            this.set("showMilesKilometersOption", this.defaults.showMilesKilometersOption);
            this.set("showClearButton", this.defaults.showClearButton);
            this._defaultSR = new J(4326);
            this._updateCanModifyStops()
        },
        _setStopsAttr: function(a) {
            this._stopsReady ? (a || (a = []), this._updateStops(a), this._setStops()) : this._set("stops", a)
        },
        _updateStops: function(a) {
            this.stops || (this.stops = []);
            a || (a = []);
            var b = this.stops.length;
            return a && a.length ? this._getCandidates(a).then(d.hitch(this, function(a) {
                var d = a.length,
                    e = 0,
                    e = 0;
                if (d === b)
                    for (e = 0; e < d; e++) this._updateStopInsert(a[e], e);
                else if (d > b) {
                    if (b)
                        for (e; e < b; e++) this._updateStopInsert(a[e], e);
                    for (e; e < d; e++) this._insertStop(a[e],
                        e)
                } else {
                    for (var g = b - d, e = 0; e < g; e++) this._removeStop();
                    for (e = 0; e < d; e++) this._updateStopInsert(a[e], e)
                }
                this._setStops()
            })) : this._removeStops()
        },
        _removeStops: function() {
            var a = d.clone(this.get("stops")),
                b = new m;
            if (this.stops.length) {
                for (; this.stops.length;) this._removeStop();
                b.resolve(a)
            } else b.reject("no stops to remove");
            return b.promise
        },
        _removeStop: function(a) {
            var b = new m;
            if (this.stops.length) {
                "undefined" === typeof a && (a = this.stops.length - 1);
                var c = this.stops.splice(a, 1);
                this._setStops();
                var d = this._dnd.getAllNodes()[a],
                    e = this.get("geocoders");
                e[a].destroy();
                e.splice(a, 1);
                this.set("geocoders", e);
                this._geocoderSelectEvents[d.id].remove();
                this._geocoderFindEvents[d.id].remove();
                this._geocoderWatchEvents[d.id].unwatch();
                t.destroy(d);
                this._dnd.sync();
                this._stopsRemovable();
                this._optionsMenu();
                this._checkMaxStops();
                this.setListIcons();
                this._sortGeocoders();
                b.resolve(c, a)
            } else b.reject(g.widgets.directions.error.cantRemoveStop);
            return b.promise
        },
        _removeTrafficLayer: function() {
            var a = this.get("trafficLayer"),
                b = this.get("map");
            a && b && b.removeLayer(a);
            this._trafficLayerAdded = !1
        },
        _addStops: function(a, b) {
            for (var c = 0; c < Math.min(a.length, this.maxStops - this.stopGraphics.length); c++) this.addStop(a[c], void 0 === b ? b : b + c)
        },
        _addStop: function(a, b) {
            var c = new m;
            this._checkMaxStops();
            this.maxStopsReached ? (this._resultError(g.widgets.directions.error.maximumStops), c.reject(g.widgets.directions.error.maximumStops)) : this._getCandidate(a).then(d.hitch(this, function(a) {
                b = this._insertStop(a, b);
                this._setStops();
                c.resolve(a, b)
            }), d.hitch(this, function(a) {
                c.reject(a)
            }));
            return c.promise
        },
        _removeEmptyStops: function() {
            if (this.stops.length > this.get("minStops"))
                for (var a = this.stops.length - 1; this.stops.length > this.get("minStops") && -1 < a; a--) {
                    var b = this.stops[a];
                    (!b || !b.name) && this._removeStop(a)
                }
        },
        _setReverseGeocode: function(a, b, c) {
            if (a.feature.geometry && -1 < c) {
                var d = {
                    address: a.name
                };
                this.stopGraphics[c] && (this.stopGraphics[c].setAttributes(d), this.stopGraphics[c].setGeometry(b));
                this.textGraphics[c] && (this.textGraphics[c].setAttributes(d), this.textGraphics[c].setGeometry(b));
                this.set("stopGraphics", this.stopGraphics);
                this.set("textGraphics", this.textGraphics);
                this._moveInProgress || this._unsetDraggableObject(this._dragGraphic);
                this.get("geocoders")[c] && this.get("geocoders")[c].set("value", a.name);
                this.stops[c] = a;
                this.stops[c].feature.setGeometry(b);
                this._setStops();
                this.get("autoSolve") && this.getDirections()
            }
        },
        _insertStop: function(a, b) {
            var c, d;
            if (void 0 === b)
                for (c = 0; c < this.geocoders.length; c++) {
                    if (!this.geocoders[c].get("value")) {
                        d = this.geocoders[c];
                        break
                    }
                } else c = b, this.geocoders[c] &&
                    !this.geocoders[c].get("value") && (d = this.geocoders[c]);
            d && (void 0 === b || b === c) ? (d.set("value", a.name), this.stops[c] = a, d[this._stopReference] = a) : (void 0 === b && (b = this.geocoders.length), this._createGeocoder(a, b))
        },
        _createGeocoder: function(a, b) {
            var c = this._dnd.getAllNodes(),
                f = !1,
                e = !1,
                r = c.length;
            c[b] ? (e = c[b], f = !0) : f = e = !1;
            var v = d.hitch(this, function(a, b) {
                    var c = b ? this._css.stopDnDHandleClass : this._css.stopDnDHandleClassHidden,
                        d = b ? this._css.stopDnDHandleClassHidden : this._css.stopDnDHandleClass;
                    h.replace(a.children[0],
                        c, d);
                    2 < this.geocoders.length && (c = b ? this._css.stopIconRemoveClass : this._css.stopIconRemoveClassHidden, d = b ? this._css.stopIconRemoveClassHidden : this._css.stopIconRemoveClass, h.replace(a.children[3].children[0], c, d))
                }),
                l = t.create("tr", {
                    className: this._css.stopClass,
                    onmouseover: function() {
                        v(this, !0)
                    },
                    onmouseout: function() {
                        v(this, !1)
                    }
                });
            t.create("td", {
                className: this._css.stopDnDHandleClassHidden + " dojoDndHandle"
            }, l);
            c = t.create("td", {
                className: this._css.stopIconColumnClass
            }, l);
            t.create("div", {
                className: this._css.stopIconClass +
                    " dojoDndHandle",
                innerHTML: this._getLetter(r),
                "data-center-at": "true"
            }, c);
            r = t.create("td", {
                className: this._css.esriStopGeocoderColumnClass
            }, l);
            r = t.create("div", {}, r);
            this.get("canModifyStops") && (c = t.create("td", {
                className: this._css.stopIconRemoveColumnClass
            }, l), t.create("div", {
                className: this._css.stopIconRemoveClassHidden,
                role: "button",
                "data-remove": "true"
            }, c));
            this._dnd.insertNodes(!1, [l], f, e);
            this.stops.splice(b, 0, a);
            f = d.mixin({}, this.get("geocoderOptions"), {
                value: a.name
            });
            f = new G(f, r);
            f[this._sortId] =
                l.id;
            f[this._stopReference] = a;
            e = this.get("geocoders");
            e.splice(b, 0, f);
            f.startup();
            this.set("geocoders", e);
            e = d.hitch(this, function(a) {
                if (a && (a.results || a.result)) {
                    var b = this._dnd.getAllNodes(),
                        b = n.indexOf(b, l),
                        c = !0;
                    a.results && a.results.results && a.results.results.length ? (this._setStops(), this.stops[b] = a.results.results[0]) : a.result ? (this._setStops(), this.stops[b] = a.result) : (this._removeStopButton(b), this.set("directions", null), this._resultError(g.widgets.directions.error.unknownStop.replace("\x3cname\x3e",
                        a.target.get("value"))), this._clearRouteGraphics(), c = !1);
                    c && this._solveAndZoom()
                }
            });
            r = f.on("select", e);
            this._geocoderSelectEvents[l.id] = r;
            e = f.on("find-results", e);
            this._geocoderFindEvents[l.id] = e;
            e = f.watch("value", d.hitch(this, function(a, b, c) {
                a = this._dnd.getAllNodes();
                a = n.indexOf(a, l);
                this.stops[a] && c !== this.stops[a].name && (this.stops[a] = {
                    name: c
                }, this._setStops())
            }));
            this._geocoderWatchEvents[l.id] = e;
            this._checkMaxStops();
            this.setListIcons();
            this.get("focusOnNewStop") && f.focus();
            this._stopsRemovable();
            this._optionsMenu();
            this._sortGeocoders()
        },
        _validateStops: function(a) {
            if (a)
                for (var b = 0; b < a.length; b++)
                    if (!a[b] || !a[b].feature) return {
                        error: !0,
                        index: b
                    };
            return {
                error: !1
            }
        },
        _sortStops: function() {
            this.stops.length && (this.stops.sort(d.hitch(this, function(a, b) {
                for (var c, d, e = 0; e < this.get("geocoders").length; e++) this.geocoders[e][this._stopReference] === a ? c = e : this.geocoders[e][this._stopReference] === b && (d = e);
                return c > d ? 1 : d > c ? -1 : 0
            })), this._setStops())
        },
        _getCandidate: function(a) {
            var b = new m,
                c = typeof a,
                f = {
                    name: ""
                };
            a ? "object" === c && a.hasOwnProperty("feature") && a.hasOwnProperty("name") ? b.resolve(a) : "object" === c && a.hasOwnProperty("address") && a.hasOwnProperty("location") ? (c = this._globalGeocoder._hydrateResult(a), b.resolve(c)) : "object" === c && a.hasOwnProperty("name") && !a.name ? b.resolve(f) : ("object" === c && a.hasOwnProperty("name") && (a = a.name), this._globalGeocoder ? this._globalGeocoder.find(a).then(d.hitch(this, function(c) {
                c.results && c.results.length ? a.geometry && !isNaN(a.geometry.x) && !isNaN(a.geometry.y) && this.map.spatialReference.wkid ===
                    a.geometry.spatialReference.wkid ? (c.results[0].feature.geometry = a.geometry, b.resolve(c.results[0])) : !c.results[0].feature.geometry || isNaN(c.results[0].feature.geometry.x) || isNaN(c.results[0].feature.geometry.y) ? (this._resultError(g.widgets.directions.error.locator), b.reject(g.widgets.directions.error.locator)) : b.resolve(c.results[0]) : (this._resultError(g.widgets.directions.error.locator), b.reject(g.widgets.directions.error.locator))
            }), d.hitch(this, function() {
                this._decorateUngeocodedStop(a).then(b.resolve,
                    b.reject)
            })) : (this._resultError(g.widgets.directions.error.locatorUndefined), b.reject(g.widgets.directions.error.locatorUndefined))) : b.resolve(f);
            return b.promise
        },
        _updateStopInsert: function(a, b) {
            this.get("geocoders")[b] && (this.get("geocoders")[b].set("value", a.name), this.stops[b] = a, this._setStops())
        },
        _updateStop: function(a, b) {
            var c = new m;
            this.stops ? ("undefined" === typeof b && (b = this.stops.length - 1), this._getCandidate(a).then(d.hitch(this, function(a) {
                this._updateStopInsert(a, b);
                c.resolve(a)
            }), d.hitch(this,
                function(a) {
                    c.reject(a)
                }))) : c.reject("could not update stop");
            return c.promise
        },
        _renderDirections: function() {
            var a = this.get("directions"),
                b = "";
            if (this._resultsNode) {
                b += '\x3cdiv class\x3d"' + this._css.resultsRouteNameClass + '"\x3e';
                b += a.routeName;
                b += "\x3c/div\x3e";
                b += '\x3cdiv class\x3d"' + this._css.clearClass + '"\x3e\x3c/div\x3e';
                if (a.totalLength || a.totalTime) {
                    var c = this._formatDistance(a.totalLength, g.widgets.directions.units[this._getUnits(this.get("directionsLengthUnits"))].name),
                        f = this._formatTime(a.totalTime),
                        b = b + ('\x3cdiv class\x3d"' + this._css.resultsSummaryClass + '"\x3e');
                    c && (b += c);
                    c && f && (b += " \x26middot; ");
                    f && (b += f);
                    b += "\x3c/div\x3e"
                }
                b += '\x3cdiv class\x3d"' + this._css.clearClass + '"\x3e\x3c/div\x3e';
                b += '\x3cdiv class\x3d"' + this._css.resultsRouteButtonContainerClass + '"\x3e';
                b += '\x3cdiv role\x3d"button" class\x3d"' + this._css.linkButtonClass + " " + this._css.resultsViewFullRouteClass + '" data-full-route\x3d"true"\x3e' + g.widgets.directions.viewFullRoute + "\x3c/div\x3e";
                this.get("showPrintPage") && (b += '\x3cdiv tabindex\x3d"0" role\x3d"button" title\x3d"' +
                    g.widgets.directions.print + '" class\x3d"' + this._css.resultsPrintClass + '" data-print-directions\x3d"true"\x3e\x3c/div\x3e');
                var b = b + ('\x3cdiv class\x3d"' + this._css.clearClass + '"\x3e\x3c/div\x3e'),
                    b = b + "\x3c/div\x3e",
                    b = b + ('\x3cdiv class\x3d"' + this._css.routesClass + '"\x3e'),
                    b = b + ('\x3ctable summary\x3d"' + a.routeName + '"\x3e'),
                    b = b + '\x3ctbody role\x3d"menu"\x3e',
                    e = function(a, b, c) {
                        for (var d = 0; d < a.length; d++) {
                            var f = a[d].feature.attributes;
                            if (f && f.Sequence === b) return 0 === f.Status || 6 === f.Status ? b : e(a, b + 1)
                        }
                        return c ?
                            1 : e(a, 1, !0)
                    },
                    r = e(this.stops, 1);
                n.forEach(a.features, d.hitch(this, function(c, d) {
                    var f = this._css.routeClass;
                    c.attributes && (c.attributes.step = d + 1);
                    c.attributes.maneuverType && (f += " " + c.attributes.maneuverType);
                    0 === d && 1 === r ? f += " " + this._css.routeOriginClass : d === a.features.length - 1 && (f += " " + this._css.routeDestinationClass);
                    d === a.features.length - 1 && (f += " " + this._css.routeLastClass);
                    b += '\x3ctr tabindex\x3d"0" role\x3d"menuitem" class\x3d"' + f + " " + this._css.routeZoomClass + '" data-segment\x3d"' + d + '"\x3e';
                    b +=
                        '\x3ctd class\x3d"' + this._css.routeIconColumnClass + '"\x3e';
                    b += '\x3cdiv class\x3d"' + this._css.routeIconClass + '"\x3e';
                    "esriDMTDepart" === c.attributes.maneuverType ? (r = e(this.stops, r), b += this._getLetter(r - 1), r++) : "esriDMTStop" === c.attributes.maneuverType && (r = e(this.stops, r), b += this._getLetter(r - 1));
                    b += "\x3c/div\x3e";
                    b += "\x3c/td\x3e";
                    b += '\x3ctd class\x3d"' + this._css.routeTextColumnClass + '"\x3e';
                    b += '\x3cdiv class\x3d"' + this._css.routeInfoClass + '"\x3e';
                    b += '\x3cdiv class\x3d"' + this._css.routeTextClass + '"\x3e';
                    var f = a.strings[d],
                        h;
                    if (f) {
                        var k = c.attributes.text;
                        for (h = 0; h < f.length; h++) k = this._boldText(k, f[h].string);
                        c.attributes.formattedText = k
                    } else c.attributes.formattedText = c.attributes.text;
                    b += "\x3cstrong\x3e" + E.format(c.attributes.step) + ".\x3c/strong\x3e " + c.attributes.formattedText;
                    b += "\x3c/div\x3e";
                    f = this._formatDistance(c.attributes.length, g.widgets.directions.units[this._getUnits(this.get("directionsLengthUnits"))].abbr);
                    h = this._formatTime(c.attributes.time);
                    f && (b += '\x3cdiv class\x3d"' + this._css.routeLengthClass +
                        '"\x3e', b += f, h && (b += " " + h), b += "\x3c/div\x3e");
                    b += "\x3c/div\x3e";
                    b += "\x3c/td\x3e";
                    b += "\x3c/tr\x3e"
                }));
                b += "\x3c/tbody\x3e";
                b += "\x3c/table\x3e";
                b += "\x3c/div\x3e";
                this._resultsNode && (this._resultsNode.innerHTML = b);
                this._disconnectResults();
                (c = x("[data-segment]", this._resultsNode)) && c.length && n.forEach(c, d.hitch(this, function(b) {
                    var c = k(b, F.enter, d.hitch(this, function() {
                        var c = parseInt(u.get(b, "data-segment"), 10);
                        this.highlightSegment(c);
                        this.onSegmentHighlight(a.features[c])
                    }));
                    this._resultEvents.push(c);
                    c = k(b, "focusin", d.hitch(this, function() {
                        var c = parseInt(u.get(b, "data-segment"), 10);
                        this.highlightSegment(c);
                        this.onSegmentHighlight(a.features[c])
                    }));
                    this._resultEvents.push(c);
                    c = k(b, "focusout", d.hitch(this, function() {
                        this.unhighlightSegment()
                    }));
                    this._resultEvents.push(c);
                    c = k(b, F.leave, d.hitch(this, function() {
                        this.unhighlightSegment()
                    }));
                    this._resultEvents.push(c);
                    this.get("autoCenterAtSegmentStart") && (c = k(b, "click, keydown", d.hitch(this, function(c) {
                        if (c && ("click" === c.type || "keydown" === c.type && c.keyCode ===
                                z.ENTER)) c = parseInt(u.get(b, "data-segment"), 10), this.centerAtSegmentStart(c), this.onSegmentSelect(a.features[c])
                    })), this._resultEvents.push(c))
                }))
            }
        },
        _showRoute: function(a) {
            if (!this._moveInProgress) {
                this.editToolbar.deactivate();
                this._clearDisplayAfterSolve();
                this.set("solveResult", a);
                var b = a.routeResults[0].directions;
                this.set("directions", b);
                var c = a.routeResults[0].stops;
                if (c && c.length) {
                    var f = [],
                        e, h = c.length;
                    this._startReturn && h--;
                    for (e = 0; e < h; e++) {
                        var g = c[e],
                            g = {
                                extent: new V({
                                    xmin: g.geometry.x - 0.25,
                                    ymin: g.geometry.y - 0.25,
                                    xmax: g.geometry.x + 0.25,
                                    ymax: g.geometry.y + 0.25,
                                    spatialReference: g.geometry.spatialReference
                                }),
                                feature: g,
                                name: g.attributes.Name
                            };
                        f.push(g)
                    }
                    this.stops = f;
                    for (e = 0; e < this.stops.length; e++) this._updateStop(this.stops[e], e);
                    this._setStops()
                }
                this.set("mergedRouteGraphic", new y(b.mergedGeometry, this.get("routeSymbol")));
                if (this.get("map") && this.get("map").graphics) {
                    var k = [];
                    n.forEach(b.features, d.hitch(this, function(a) {
                        a.setSymbol(this.get("routeSymbol"));
                        this.get("map").graphics.add(a);
                        k.push(a);
                        (a = a.getDojoShape()) && a.moveToBack()
                    }));
                    this.set("displayedRouteGraphics", k)
                }
                this.createRouteSymbols();
                this._renderDirections();
                this.onDirectionsFinish(a)
            }
        },
        _setGeocodersStopReference: function() {
            if (this.geocoders)
                for (var a = 0; a < this.geocoders.length; a++) this.geocoders[a] && this.stops[a] && (this.geocoders[a][this._stopReference] = this.stops[a])
        },
        _setStops: function() {
            this._setGeocodersStopReference();
            this.createRouteSymbols();
            this._set("stops", this.stops);
            this.onStopsUpdate(this.stops)
        },
        _getCandidates: function(a) {
            var b = [];
            if (a && a.length) {
                for (var c = 0; c < a.length; c++) b.push(this._getCandidate(a[c]));
                return H(b)
            }
            a = new m;
            a.resolve([]);
            return a.promise
        },
        _clearResultsHTML: function() {
            this._resultsNode && (this._resultsNode.innerHTML = "")
        },
        _showSegmentPopup: function(a) {
            if (a && this.get("showSegmentPopup") && this.get("map") && this.get("map").infoWindow) {
                var b = a.geometry.getPoint(0, 0);
                a = new y(b, null, a.attributes, this.get("segmentInfoTemplate"));
                this.get("map").infoWindow.setFeatures([a]);
                this.get("map").infoWindow.show(b)
            }
        },
        _removeStopButton: function(a) {
            this.stops.length >
                this.get("minStops") ? this.removeStop(a) : (this._setStops(), this._clearDisplayBeforeSolve(), this._clearDisplayAfterSolve())
        },
        _addStopButton: function() {
            this.addStop(void 0, this.stops.length)
        },
        _sortGeocoders: function() {
            var a = this._dnd.getAllNodes();
            this.geocoders.sort(d.hitch(this, function(b, c) {
                return this._sortGeocodersToNodes(b, c, a, this._sortId)
            }));
            this._sortStops()
        },
        _disconnectResults: function() {
            if (this._resultEvents && this._resultEvents.length)
                for (var a = 0; a < this._resultEvents.length; a++) this._resultEvents[a] &&
                    this._resultEvents[a].remove();
            this._resultEvents = []
        },
        _formatTime: function(a) {
            var b, c = "";
            b = Math.round(a);
            a = Math.floor(b / 60);
            b = Math.floor(b % 60);
            a && (c += a + " ", c = 1 < a ? c + g.widgets.directions.time.hours : c + g.widgets.directions.time.hour);
            a && b && (c += " ");
            b && (c += b + " ", c = 1 < b ? c + g.widgets.directions.time.minutes : c + g.widgets.directions.time.minute);
            return c
        },
        _formatDistance: function(a, b) {
            var c = Math.round(100 * a) / 100;
            return 0 === c ? "" : E.format(c) + " " + b
        },
        _setMoveSymbol: function(a) {
            this._moveSymbolSet = !0;
            var b = this._setStopSymbol(a._index,
                this.stopGraphics.length, !0, a.attributes.Status);
            a.setSymbol(b)
        },
        _unsetMoveSymbol: function(a) {
            var b = this._setStopSymbol(a._index, this.stopGraphics.length, !1, a.attributes.Status);
            a.setSymbol(b);
            this._moveSymbolSet = !1
        },
        _removeTextGraphic: function(a) {
            a = this.textGraphics[a];
            this.get("map").graphics.remove(a)
        },
        _setDraggableObject: function(a) {
            a._drag && (this.get("map") && this.get("map").graphics) && (this.get("map")._directionsWidgetDragging = !0, this._removeTextGraphic(a._index), this._dragGraphic = a, this._dragGeometry =
                a.geometry, this.editToolbar.activate(N.MOVE, a))
        },
        _setTextGraphic: function(a) {
            if (a._drag && this.get("map") && this.get("map").graphics) {
                var b = this.textGraphics[a._index];
                b.setGeometry(a.geometry);
                this.get("map").graphics.add(b);
                (a = b.getDojoShape()) && a.moveToFront()
            }
        },
        _unsetDraggableObject: function(a) {
            a._drag && (this.get("map")._directionsWidgetDragging = !1, this._moveSymbolSet && this._unsetMoveSymbol(a), this._setTextGraphic(a), this.editToolbar.deactivate())
        },
        _isMyStopGraphic: function(a) {
            return -1 < n.indexOf(this.get("stopGraphics"),
                a) || -1 < n.indexOf(this.get("textGraphics"), a)
        },
        _editToolbar: function() {
            this.get("map") ? this.set("editToolbar", new N(this.get("map"))) : this.set("editToolbar", null)
        },
        _destroyGlobalGeocoder: function() {
            this._globalGeocoder && (this._globalGeocoder.destroy(), this._globalGeocoder = null)
        },
        _createGlobalGeocoder: function() {
            var a = new m;
            this._globalGeocoder = new G(this.get("geocoderOptions"), t.create("div"));
            k.once(this._globalGeocoder, "load", d.hitch(this, function() {
                a.resolve()
            }, function(b) {
                a.reject(b)
            }));
            this._globalGeocoder.startup();
            return a.promise
        },
        _init: function() {
            if (this.get("map"))
                if (this.get("map").loaded) this._configure();
                else k.once(this.get("map"), "load", d.hitch(this, function() {
                    this._configure()
                }));
            else this._configure()
        },
        _setDefaultStops: function() {
            var a = new m;
            this.defaults.stops && this.defaults.stops.length ? this._updateStops(this.defaults.stops).then(d.hitch(this, function() {
                    this.get("focusOnNewStop") && (this.get("geocoders") && this.get("geocoders").length) && this.get("geocoders")[0].focus();
                    this._removeEmptyStops();
                    a.resolve()
                }),
                a.reject) : a.resolve();
            return a.promise
        },
        _configure: function() {
            this._createDnD();
            this._setGeocoderOptions();
            this._createGlobalGeocoder().then(d.hitch(this, function() {
                this._editToolbar();
                this._enqueue(d.hitch(this, function() {
                    this._usingAGOL() || (this.printTaskUrl = this.geometryTaskUrl = null);
                    this._createGeometryTask();
                    this._createPrintTask();
                    var a = new m,
                        b = [this._createRouteTask(), this._setDefaultStops()];
                    H(b).then(d.hitch(this, function() {
                        this._setDefaultUnits();
                        this._setTrafficOptions();
                        this._setMenuNodeValues();
                        this._setupEvents();
                        this._stopsReady = !0;
                        this.set("loaded", !0);
                        this.onLoad();
                        a.resolve(!0)
                    }), function(b) {
                        a.reject(b)
                    });
                    return a.promise
                }))
            }))
        },
        _calculateValidStops: function() {
            for (var a = 0, b = this.stops, c = 0; c < b.length; c++) b[c] && b[c].name && a++;
            return a
        },
        _setStopSymbol: function(a, b, c, d) {
            return void 0 === d || 0 === d || 6 === d ? 0 === a ? this.get(c ? "fromSymbolDrag" : "fromSymbol") : a === b - 1 ? this.get(c ? "toSymbolDrag" : "toSymbol") : this.get(c ? "stopSymbolDrag" : "stopSymbol") : this.get(c ? "unreachedSymbolDrag" : "unreachedSymbol")
        },
        _addTrafficLayer: function() {
            var a = this.get("trafficLayer"),
                b = this.get("map");
            b && (a && !this._trafficLayerAdded) && (b.addLayer(a), a.show(), this._trafficLayerAdded = !0)
        },
        _toggleUnits: function(a) {
            a.target === this._useMilesNode ? this.setDirectionsLengthUnits(q.MILES) : a.target === this._useKilometersNode && this.setDirectionsLengthUnits(q.KILOMETERS)
        },
        _toggleTravelModeImpedance: function(a) {
            h.add(a.target, this._css.stopsPressedButtonClass);
            a.target === this._useTravelModeTimeNode ? h.remove(this._useTravelModeDistanceNode,
                this._css.stopsPressedButtonClass) : a.target === this._useTravelModeDistanceNode && h.remove(this._useTravelModeTimeNode, this._css.stopsPressedButtonClass);
            this._travelModeImpedanceKey = a.target.attributes["travel-mode-key"].value;
            this.setTravelMode(this._travelModeKey + " " + this._travelModeImpedanceKey)
        },
        _toggleTravelMode: function(a) {
            h.add(a.target, this._css.stopsPressedButtonClass);
            a.target === this._useTravelModeCarNode ? (h.remove(this._useTravelModeTruckNode, this._css.stopsPressedButtonClass), h.remove(this._useTravelModeWalkingNode,
                this._css.stopsPressedButtonClass)) : a.target === this._useTravelModeTruckNode ? (h.remove(this._useTravelModeCarNode, this._css.stopsPressedButtonClass), h.remove(this._useTravelModeWalkingNode, this._css.stopsPressedButtonClass)) : a.target === this._useTravelModeWalkingNode && (h.remove(this._useTravelModeCarNode, this._css.stopsPressedButtonClass), h.remove(this._useTravelModeTruckNode, this._css.stopsPressedButtonClass));
            this._travelModeKey = a.target.attributes["travel-mode-key"].value;
            this.setTravelMode(this._travelModeKey +
                " " + this._travelModeImpedanceKey)
        },
        _toggleCheckbox: function(a) {
            var b = u.get(a.target, "checked");
            a.target === this._findOptimalOrderNode ? this.set("optimalRoute", b) : a.target === this._useTrafficNode ? this.set("traffic", b) : a.target === this._returnToStartNode && this.set("returnToStart", b)
        },
        _configureRouteOptions: function() {
            var a = this.get("routeParams");
            a.directionsLengthUnits = this.get("directionsLengthUnits");
            a.findBestSequence = this.get("optimalRoute");
            a.returnStops = !0;
            this.get("traffic") ? (a.startTime = new Date,
                a.startTimeIsUTC = !0, this._addTrafficLayer()) : (a.startTime = null, a.startTimeIsUTC = null, this._removeTrafficLayer());
            if (this.get("returnToStart") && this.stopGraphics.length) {
                var b = new y(this.stopGraphics[0].geometry, null, this.stopGraphics[0].attributes),
                    c = this.stopGraphics.slice(0);
                this._startReturn = b;
                c.push(b);
                a.stops.features = c
            } else this._startReturn = null, a.stops.features = this.stopGraphics;
            this.set("routeParams", a)
        },
        _configureRoute: function(a) {
            this.createRouteSymbols();
            this._configureRouteOptions();
            this.routeTask.solve(this.routeParams, d.hitch(this, function(b) {
                this._showRoute(b);
                a.resolve(b)
            }), d.hitch(this, function(b) {
                for (var c = 0; c < this.stops.length; c++) this.stops[c].feature.attributes = d.mixin(this.stops[c].feature.attributes, {
                    Status: 5
                });
                this.set("directions", null);
                this._clearDisplayAfterSolve();
                this.createRouteSymbols();
                this._routeTaskError(b);
                a.reject(b)
            }))
        },
        _boldText: function(a, b) {
            return a.replace(RegExp("(^|\\s)(" + b + ")(\\s|$)", "ig"), "$1\x3cstrong\x3e$2\x3c/strong\x3e$3")
        },
        _clearStopGraphics: function() {
            if (this.stopGraphics &&
                this.stopGraphics.length && this.get("map") && this.get("map").graphics)
                for (var a = 0; a < this.stopGraphics.length; a++) this.get("map").graphics.remove(this.stopGraphics[a]), this.get("map").graphics.remove(this.textGraphics[a]);
            this.set("stopGraphics", []);
            this.set("textGraphics", [])
        },
        _clearRouteGraphics: function() {
            var a = this.get("displayedRouteGraphics"),
                b = this.get("map");
            a && (a.length && b && b.graphics) && (n.forEach(a, function(a) {
                b.graphics.remove(a)
            }), this.set("displayedRouteGraphics", []));
            this.unhighlightSegment()
        },
        _clearInfoWindow: function() {
            this.get("map") && this.get("map").infoWindow && (this.get("map").infoWindow.hide(), this.get("map").infoWindow.features && this.get("map").infoWindow.clearFeatures())
        },
        _clearDisplayBeforeSolve: function() {
            this._clearInfoWindow();
            this._clearResultsHTML()
        },
        _clearDisplayAfterSolve: function() {
            this._clearStopGraphics();
            this._clearRouteGraphics();
            this.clearErrors()
        },
        _getLetter: function(a) {
            var b = this.get("alphabet"),
                c = "";
            b && b.length && (a = a || 0, a >= b.length && (c = this._getLetter(Math.floor(a /
                this.alphabet.length) - 1), a %= this.alphabet.length), "string" === typeof b ? c += b.substr(a, 1) : b instanceof Array && (c += b[a]));
            return c
        },
        _solveAndZoom: function() {
            if (this.get("autoSolve")) return this.getDirections().then(d.hitch(this, function() {
                this.zoomToFullRoute()
            }));
            var a = new m;
            a.resolve();
            return a.promise
        },
        _setupEvents: function() {
            var a = k(this._dndNode, "[data-reverse-stops]:click, [data-reverse-stops]:keydown", d.hitch(this, function(a) {
                a && ("click" === a.type || "keydown" === a.type && a.keyCode === z.ENTER) && this._reverseStops()
            }));
            this._onEvents.push(a);
            a = k(this._resultsNode, "[data-print-directions]:click, [data-print-directions]:keydown", d.hitch(this, function(a) {
                a && ("click" === a.type || "keydown" === a.type && a.keyCode === z.ENTER) && this._printDirections()
            }));
            this._onEvents.push(a);
            a = k(this._resultsNode, "[data-full-route]:click, [data-full-route]:keydown", d.hitch(this, function(a) {
                a && ("click" === a.type || "keydown" === a.type && a.keyCode === z.ENTER) && this.zoomToFullRoute()
            }));
            this._onEvents.push(a);
            a = k(this._dndNode, "[data-remove]:click, [data-remove]:keydown",
                d.hitch(this, function(a) {
                    if (a && ("click" === a.type || "keydown" === a.type && a.keyCode === z.ENTER)) {
                        var c = x("[data-remove]", this._dndNode);
                        a = n.indexOf(c, a.target);
                        this._removeStopButton(a)
                    }
                }));
            this._onEvents.push(a);
            this._onEvents.push(k(this._dndNode, "[data-center-at]:click, [data-center-at]:keydown", d.hitch(this, function(a) {
                if (a && ("click" === a.type || "keydown" === a.type && a.keyCode === z.ENTER)) {
                    var c = x("[data-center-at]", this._dndNode);
                    a = n.indexOf(c, a.target);
                    this.stops[a] && (this.stops[a].feature && this.stops[a].feature.geometry) &&
                        this.map.centerAndZoom(this.stops[a].feature.geometry)
                }
            })));
            a = k(this._dnd, "Drop", d.hitch(this, function() {
                this._dnd.sync();
                this._sortGeocoders();
                this.setListIcons();
                this._calculateValidStops() === this.get("geocoders").length && this.get("routeParams").stops.features.length && this._solveAndZoom()
            }));
            this._onEvents.push(a);
            a = k(this._dnd, "DndStart", d.hitch(this, function() {
                var a = x("body")[0];
                h.add(a, this._css.dndDragBodyClass)
            }));
            this._onEvents.push(a);
            a = k(this._dnd, "DndDrop, DndCancel", d.hitch(this, function() {
                var a =
                    x("body")[0];
                h.remove(a, this._css.dndDragBodyClass)
            }));
            this._onEvents.push(a);
            this.get("map") && this.get("map").graphics && (a = this.get("map").graphics.on("mouse-over", d.hitch(this, function(a) {
                if (this.get("dragging") && !this.get("map")._directionsWidgetDragging) {
                    var c;
                    this._isMyStopGraphic(a.graphic) && (a.graphic._drag ? (c = this.editToolbar.getCurrentState(), c.graphic || this._setDraggableObject(a.graphic), this._moveSymbolSet || this._setMoveSymbol(a.graphic)) : a.graphic._textGraphic && (c = this.editToolbar.getCurrentState(),
                        this.stopGraphics[a.graphic._index] && (c.graphic || this._setDraggableObject(this.stopGraphics[a.graphic._index]), this._moveSymbolSet || this._setMoveSymbol(this.stopGraphics[a.graphic._index]))))
                }
            })), this._onEvents.push(a), a = this.get("map").graphics.on("mouse-out", d.hitch(this, function(a) {
                this.get("dragging") && this._isMyStopGraphic(a.graphic) && !this._moveInProgress && a.graphic._drag && this._unsetDraggableObject(a.graphic)
            })), this._onEvents.push(a), this._editToolbarEvents());
            a = this.watch("theme", this._updateThemeWatch);
            this._watchEvents.push(a);
            a = this.watch("canModifyStops", this._updateCanModifyStops);
            this._watchEvents.push(a);
            a = this.watch("showReturnToStartOption", this._optionsMenu);
            this._watchEvents.push(a);
            a = this.watch("showOptimalRouteOption", this._optionsMenu);
            this._watchEvents.push(a);
            a = this.watch("returnToStart", this._setMenuNodeValues);
            this._watchEvents.push(a);
            a = this.watch("optimalRoute", this._setMenuNodeValues);
            this._watchEvents.push(a);
            a = this.watch("routeTaskUrl", d.hitch(this, function() {
                this._createRouteTask();
                this._setTrafficOptions()
            }));
            this._watchEvents.push(a);
            this._watchEvents.push(this.watch("printTaskUrl", d.hitch(this, function() {
                this._createPrintTask()
            })));
            this._watchEvents.push(this.watch("geometryTaskUrl", d.hitch(this, function() {
                this._createGeometryTask()
            })));
            a = this.watch("routeParams", d.hitch(this, function() {
                this._createRouteParams();
                this._setDefaultUnits()
            }));
            this._watchEvents.push(a);
            a = this.watch("geocoderOptions", d.hitch(this, function() {
                this._setGeocoderOptions();
                this._createGlobalGeocoder()
            }));
            this._watchEvents.push(a);
            a = this.watch("showReverseStopsButton", this.setListIcons);
            this._watchEvents.push(a);
            a = this.watch("showPrintPage", this._renderDirections);
            this._watchEvents.push(a);
            a = this.watch("trafficLayer", this._trafficLayerUpdate);
            this._watchEvents.push(a);
            a = this.watch("editToolbar", this._editToolbarEvents);
            this._watchEvents.push(a);
            a = this.watch("showTravelModesOption", this._showTravelModesOption);
            this._watchEvents.push(a);
            a = this.watch("showMilesKilometersOption", this._showMilesKilometersOption);
            this._watchEvents.push(a);
            a = this.watch("showClearButton", this._showClearButton);
            this._watchEvents.push(a);
            a = this.watch("directionsLengthUnits", this.setDirectionsLengthUnits);
            this._watchEvents.push(a)
        },
        _editToolbarEvents: function() {
            var a = k(this.editToolbar, "graphic-click", d.hitch(this, function(a) {
                this.get("map") && this.get("map").infoWindow && (this.get("map").infoWindow.setFeatures([a.graphic]), this.get("map").infoWindow.show(a.graphic.geometry))
            }));
            this._onEvents.push(a);
            a = k(this.editToolbar, "graphic-first-move",
                d.hitch(this, function() {
                    this._moveInProgress = !0
                }));
            this._onEvents.push(a);
            a = k(this.editToolbar, "graphic-move-stop", d.hitch(this, function(a) {
                this._moveInProgress = !1;
                this._unsetDraggableObject(a.graphic);
                if (this._dragGeometry !== a.graphic.geometry) {
                    this._currentEditableGraphic = a.graphic;
                    if (this.get("autoSolve")) this.onDirectionsStart();
                    this._globalGeocoder.find(a.graphic.geometry).then(d.hitch(this, function(c) {
                        c && c.results.length ? this._setReverseGeocode(c.results[0], c.geometry, n.indexOf(this.stopGraphics,
                            a.graphic)) : this._reverseGeocodeError(Error(g.widgets.directions.error.locator))
                    }), d.hitch(this, function() {
                        this._decorateUngeocodedStop(a.graphic).then(d.hitch(this, function(c) {
                            this._setReverseGeocode(c, c.feature.geometry, n.indexOf(this.stopGraphics, a.graphic))
                        }))
                    }))
                }
            }));
            this._onEvents.push(a)
        },
        _decorateUngeocodedStop: function(a) {
            var b = new m,
                c = function(c, d) {
                    b.resolve({
                        name: void 0 === c ? g.widgets.directions.unlocatedStop : c.toFixed(6) + " " + d.toFixed(6),
                        feature: a
                    })
                };
            if (a.geometry)
                if (a.geometry.spatialReference &&
                    4326 !== a.geometry.spatialReference.wkid)
                    if (this.map && this.map.spatialReference && this.map.spatialReference.isWebMercator()) A(["../geometry/webMercatorUtils"], function(b) {
                        b = b.xyToLngLat(a.geometry.x, a.geometry.y);
                        c(b[0], b[1])
                    });
                    else if (this._geometryService) {
                var f = new ga;
                f.outSR = new J(4326);
                f.geometries = [a.geometry];
                this._geometryService.project(f).then(d.hitch(this, function(b) {
                    b && b.length ? c(b[0].x, b[0].y) : c(a.geometry.x, a.geometry.y)
                }), d.hitch(this, function() {
                    c()
                }))
            } else c(a.geometry.x, a.geometry.y);
            else c(a.geometry.x, a.geometry.y);
            else c();
            return b.promise
        },
        _trafficLayerUpdate: function(a, b, c) {
            a = this.get("map");
            b && (a && this._trafficLayerAdded) && (a.removeLayer(b), this._trafficLayerAdded = !1);
            c && (a && this.get("traffic") && !this._trafficLayerAdded) && (a.addLayer(c), c.show(), this._trafficLayerAdded = !0)
        },
        _reverseGeocodeError: function(a) {
            this.onDirectionsFinish(a);
            a = g.widgets.directions.error.locator;
            this._resultError(a);
            this._clearRouteGraphics();
            this._currentEditableGraphic.setAttributes({
                error: a
            });
            this._updateStop({
                name: ""
            }, this._currentEditableGraphic._index)
        },
        _routeTaskError: function(a) {
            var b = g.widgets.directions.error.routeTask,
                c = a.details;
            c && 1 === c.length && ("The distance between any inputs must be less than 50 miles (80 kilometers) when walking." === c[0] ? b = g.widgets.directions.error.maxWalkingDistance : "Driving a truck is currently not supported outside of North America and Central America." === c[0] && (b = g.widgets.directions.error.nonNAmTruckingMode));
            this._resultError(b);
            this.onDirectionsFinish(a)
        },
        _resultError: function(a) {
            var b = "";
            this.errors.push(a);
            b += '\x3cdiv class\x3d"' + this._css.routesErrorClass + '"\x3e';
            if (this.errors.length) {
                for (var b = b + "\x3cul\x3e", c = 0; c < this.errors.length; c++) b += "\x3cli\x3e" + this.errors[c] + "\x3c/li\x3e";
                b += "\x3c/ul\x3e"
            }
            b += "\x3c/div\x3e";
            this._errorNode && (this._errorNode.innerHTML = b);
            this.onError(a)
        },
        _getUnits: function(a) {
            switch (a) {
                case q.KILOMETERS:
                    return "KILOMETERS";
                case q.METERS:
                    return "METERS";
                case q.NAUTICAL_MILES:
                    return "NAUTICAL_MILES";
                default:
                    return "MILES"
            }
        },
        _createRouteTask: function() {
            var a = new m;
            this.set("routeTask", new $(this.get("routeTaskUrl")));
            this._usingAGOL() && this._setTravelModeComponentsVisibility(!0);
            this._createRouteParams();
            ea({
                url: this.get("routeTask").url,
                content: {
                    f: "json"
                },
                handleAs: "json",
                callbackParamName: "callback"
            }).then(d.hitch(this, function(b) {
                if (b.networkDataset) {
                    this.set("serviceDescription", b);
                    this._showTravelModesOption();
                    if (this._hasAGOLTravelModes) {
                        var c = this.getSupportedTravelModeNames(),
                            c = this.travelModeName && c.length && -1 <
                            n.indexOf(c, this.travelModeName) ? this.travelModeName : this._tmDrivingTime,
                            d = c.split(" ");
                        this._travelModeKey = d[0];
                        this._travelModeImpedanceKey = d[1];
                        this.setTravelMode(c)
                    }
                    b.serviceLimits && b.serviceLimits.Route_MaxStops && this.set("maxStops", b.serviceLimits.Route_MaxStops);
                    a.resolve()
                } else this._resultError(g.widgets.directions.error.cantFindRouteServiceDescription), a.reject(g.widgets.directions.error.cantFindRouteServiceDescription)
            }), d.hitch(this, function() {
                this._resultError(g.widgets.directions.error.cantFindRouteServiceDescription);
                a.reject(g.widgets.directions.error.cantFindRouteServiceDescription)
            }));
            return a.promise
        },
        _createPrintTask: function() {
            this._printService = (this.printTaskUrl = this._usingAGOL() ? this.printTaskUrl : this.defaults.printTaskUrl) ? new ba(this.printTaskUrl, {
                async: !1
            }) : null;
            var a = new da;
            a.exportOptions = {
                width: 670,
                height: 750,
                dpi: 96
            };
            a.format = "PNG32";
            a.layout = "MAP_ONLY";
            a.preserveScale = !1;
            a.showAttribution = !1;
            var b = new ca;
            b.map = this.map;
            b.outSpatialReference = this.map.spatialReference;
            b.template = a;
            this._printParams =
                b
        },
        _createGeometryTask: function() {
            this._geometryService = null;
            this._usingAGOL() ? this._geometryService = new M(this.geometryTaskUrl) : this.geometryTaskUrl = (this._geometryService = this.defaults.geometryTaskUrl ? new M(this.defaults.geometryTaskUrl) : fa.defaults.geometryService) ? this._geometryService.url : null
        },
        _showTravelModesOption: function() {
            var a = this.get("serviceDescription"),
                b = !this.showTravelModesOption || !a;
            if (a) {
                this._hasAGOLTravelModes = (a = a.supportedTravelModes) && a.length ? !0 : !1;
                var c = {};
                c[this._tmDrivingTime] =
                    null;
                c[this._tmTruckingTime] = null;
                c[this._tmWalkingTime] = null;
                c[this._tmDrivingDistance] = null;
                c[this._tmTruckingDistance] = null;
                c[this._tmWalkingDistance] = null;
                if (this._hasAGOLTravelModes)
                    for (var d in c)
                        if (c.hasOwnProperty(d)) {
                            for (var e = !1, g = 0; g < a.length; g++)
                                if (a[g].name === d) {
                                    c[d] = a[g].itemId;
                                    a[g]._nodeTravelMode = -1 < d.indexOf("Driving") ? this._useTravelModeCarNode : -1 < d.indexOf("Trucking") ? this._useTravelModeTruckNode : this._useTravelModeWalkingNode;
                                    a[g]._nodeImpedance = -1 < d.indexOf("Time") ? this._useTravelModeTimeNode :
                                        this._useTravelModeDistanceNode;
                                    e = !0;
                                    break
                                }
                            if (!e) {
                                this._hasAGOLTravelModes = !1;
                                break
                            }
                        }
                b = b || !this._hasAGOLTravelModes;
                this.showTravelModesOption = this.showTravelModesOption && this._hasAGOLTravelModes
            }
            this._setTravelModeComponentsVisibility(!b)
        },
        _setTravelModeComponentsVisibility: function(a) {
            p.set(this._travelModeContainerNode, "display", a ? "inline-block" : "none");
            p.set(this._travelModeImpedanceNode, "display", a ? "inline-block" : "none");
            p.set(this._useTravelModeTruckNode, "display", this.hideTruckingMode ? "none" :
                "inline-block");
            p.set(this._travelModeImpedanceNode, "display", this.hideFastestShortestOption ? "none" : "inline-block")
        },
        _showMilesKilometersOption: function() {
            p.set(this._travelModeDistanceUnitsNode, "display", this.showMilesKilometersOption ? "block" : "none")
        },
        _showClearButton: function() {
            p.set(this._clearDirectionsButtonNode, "display", this.showClearButton ? "inline-block" : "none")
        },
        _createRouteParams: function() {
            var a = {
                directionsOutputType: "complete",
                stops: new Z,
                returnDirections: !0,
                doNotLocateOnRestrictedElements: !0
            };
            this.get("map") ? a.outSpatialReference = this.get("map").spatialReference : a.outSpatialReference = this._defaultSR;
            this.get("routeParams") || (this.routeParams = {});
            var b = new aa;
            this.routeParams = d.mixin(b, {
                returnRoutes: !1,
                preserveFirstStop: !0,
                preserveLastStop: !0
            }, this.get("routeParams"), a)
        },
        _reverseStops: function() {
            var a = this._dnd.getAllNodes();
            a.length && (a.reverse(), this._dnd.clearItems(), this._dnd.insertNodes(!1, a), this._dnd.sync(), this._stopsRemovable(), this._optionsMenu(), this._checkMaxStops(), this.setListIcons(),
                this._sortGeocoders(), this._solveAndZoom())
        },
        _sortGeocodersToNodes: function(a, b, c, d) {
            b = b[d];
            a = B.byId(a[d]);
            d = B.byId(b);
            a = n.indexOf(c, a);
            d = n.indexOf(c, d);
            for (b = 0; b < c.length; b++) {
                if (b === a) return -1;
                if (b === d) return 1
            }
        },
        _setMenuNodeValues: function() {
            var a = this.get("optimalRoute");
            this._findOptimalOrderNode && u.set(this._findOptimalOrderNode, "checked", a);
            a = this.get("returnToStart");
            this._returnToStartNode && u.set(this._returnToStartNode, "checked", a);
            a = this.get("traffic");
            this._useTrafficNode && u.set(this._useTrafficNode,
                "checked", a);
            switch (this.get("directionsLengthUnits")) {
                case q.KILOMETERS:
                    u.set(this._useKilometersNode, "checked", !0);
                    u.set(this._useMilesNode, "checked", !1);
                    break;
                case q.MILES:
                    u.set(this._useKilometersNode, "checked", !1), u.set(this._useMilesNode, "checked", !0)
            }
            this._showMilesKilometersOption();
            this._showClearButton()
        },
        _optionsMenu: function() {
            this._useTrafficItemNode && (this.get("showTrafficOption") ? p.set(this._useTrafficItemNode, "display", "block") : p.set(this._useTrafficItemNode, "display", "none"));
            this._returnToStartItemNode &&
                (this.get("showReturnToStartOption") ? p.set(this._returnToStartItemNode, "display", "block") : p.set(this._returnToStartItemNode, "display", "none"));
            this._findOptimalOrderItemNode && (this.get("showOptimalRouteOption") && 4 <= this.stops.length ? p.set(this._findOptimalOrderItemNode, "display", "block") : p.set(this._findOptimalOrderItemNode, "display", "none"));
            this.stops.length >= this.get("minStops") ? h.add(this._widgetContainer, this._css.stopsOptionsOptionsEnabledClass) : (h.remove(this._widgetContainer, this._css.stopsOptionsOptionsEnabledClass),
                this._optionsMenuNode && "block" === p.get(this._optionsMenuNode, "display") && this._toggleOptionsMenu(), this._configureRouteOptions())
        },
        _stopsRemovable: function() {
            this.get("geocoders").length > this.get("minStops") ? h.add(this._widgetContainer, this._css.stopsRemovableClass) : h.remove(this._widgetContainer, this._css.stopsRemovableClass)
        },
        _checkMaxStops: function() {
            this.stops.length < this.get("maxStops") ? (this._showAddDestination(), this.set("maxStopsReached", !1)) : (this._hideAddDestination(), this.set("maxStopsReached", !0))
        },
        _updateThemeWatch: function(a, b, c) {
            h.remove(this.domNode, b);
            h.add(this.domNode, c)
        },
        _toggleOptionsMenu: function() {
            this._optionsMenuNode && ("block" === p.get(this._optionsMenuNode, "display") ? (p.set(this._optionsMenuNode, "display", "none"), this._optionsButtonNode.innerHTML = g.widgets.directions.showOptions) : (p.set(this._optionsMenuNode, "display", "block"), this._optionsButtonNode.innerHTML = g.widgets.directions.hideOptions))
        },
        _hideAddDestination: function() {
            h.remove(this._widgetContainer, this._css.addStopsClass)
        },
        _showAddDestination: function() {
            h.add(this._widgetContainer, this._css.addStopsClass)
        },
        _getAbsoluteUrl: function() {
            var a = A.toUrl(".");
            if (/^https?\:/i.test(a)) return a;
            if (/^\/\//i.test(a)) return window.location.protocol + a;
            if (/^\//i.test(a)) return window.location.protocol + "//" + window.location.host + a
        },
        _getManeuverImage: function(a) {
            if (a) {
                var b = this._getAbsoluteUrl() + "/images/Directions/maneuvers/";
                return "esriDMTStop" === a || "esriDMTDepart" === a ? "" : b + a + ".png"
            }
            return ""
        },
        _loadPrintDirections: function(a) {
            var b =
                this.get("printTemplate");
            if (!b) {
                var c = this._getAbsoluteUrl() + "/css/Directions.css",
                    f = this._getAbsoluteUrl() + "/css/DirectionsPrint.css",
                    e = this._getAbsoluteUrl() + "/images/Directions/print-logo.png",
                    h;
                h = Q.isBodyLtr() ? "ltr" : "rtl";
                b = "";
                b += "\x3c!DOCTYPE HTML\x3e";
                b += '\x3chtml lang\x3d"en" class\x3d"' + this.get("theme") + '" dir\x3d"' + h + '"\x3e';
                b += "\x3chead\x3e";
                b += '\x3cmeta charset\x3d"utf-8"\x3e';
                b += '\x3cmeta http-equiv\x3d"X-UA-Compatible" content\x3d"IE\x3dEdge,chrome\x3d1"\x3e';
                b += "\x3ctitle\x3e" + this.get("directions").routeName +
                    "\x3c/title\x3e";
                b += '\x3clink rel\x3d"stylesheet" media\x3d"screen" type\x3d"text/css" href\x3d"' + c + '" /\x3e';
                b += '\x3clink rel\x3d"stylesheet" media\x3d"print" type\x3d"text/css" href\x3d"' + f + '" /\x3e';
                b += "\x3c/head\x3e";
                b += '\x3cbody class\x3d"' + this._css.esriPrintPageClass + '"\x3e';
                b += '\x3cdiv class\x3d"' + this._css.esriPrintBarClass + '"\x3e';
                b += '\x3cdiv class\x3d"' + this._css.esriCloseButtonClass + '" title\x3d"' + g.common.close + '" onclick\x3d"window.close();"\x3e' + g.common.close + "\x3c/div\x3e";
                b += '\x3cdiv id\x3d"printButton" class\x3d"' +
                    this._css.esriPrintButtonClass + '" title\x3d"' + g.widgets.directions.print + '" onclick\x3d"window.print();"\x3e' + g.widgets.directions.print + "\x3c/div\x3e";
                b += "\x3c/div\x3e";
                b += '\x3cdiv class\x3d"' + this._css.esriPrintMainClass + '"\x3e';
                b += '\x3cdiv class\x3d"' + this._css.esriPrintHeaderClass + '"\x3e';
                b += '\x3cimg class\x3d"' + this._css.esriPrintLogoClass + '" src\x3d"' + e + '" /\x3e';
                b += '\x3cdiv class\x3d"' + this._css.esriPrintNameClass + '"\x3e' + this.get("directions").routeName + "\x3c/div\x3e";
                b += '\x3cdiv class\x3d"' +
                    this._css.esriPrintLengthClass + '"\x3e' + this._formatDistance(this.get("directions").totalLength, g.widgets.directions.units[this._getUnits(this.get("directionsLengthUnits"))].name) + ". " + this._formatTime(this.get("directions").totalTime) + "\x3c/div\x3e";
                a && (b += '\x3cdiv id\x3d"divMap" class\x3d"esriPrintMap esriPrintWait"\x3e\x3c/div\x3e', b += '\x3chr class\x3d"esriNoPrint"/\x3e');
                var b = b + '\x3cdiv id\x3d"print_helper"\x3e\x3c/div\x3e',
                    b = b + ('\x3ctextarea onkeyup\x3d"document.getElementById(\'print_helper\').innerHTML\x3dthis.value;" id\x3d"print_area" class\x3d"' +
                        this._css.esriPrintNotesClass + '" placeholder\x3d"' + g.widgets.directions.printNotes + '"\x3e\x3c/textarea\x3e'),
                    b = b + ('\x3cdiv class\x3d"' + this._css.clearClass + '"\x3e\x3c/div\x3e'),
                    b = b + "\x3c/div\x3e",
                    b = b + ('\x3cdiv class\x3d"' + this._css.esriPrintDirectionsClass + '"\x3e'),
                    b = b + "\x3ctable\x3e",
                    b = b + "\x3ctbody\x3e",
                    k = 0;
                n.forEach(this.get("directions").features, d.hitch(this, function(a, c) {
                    var d = this.get("directions").strings[c],
                        e;
                    if (d) {
                        var f = a.attributes.text;
                        for (e = 0; e < d.length; e++) f = this._boldText(f, d[e].string);
                        a.attributes.formattedText = f
                    } else a.attributes.formattedText = a.attributes.text;
                    d = "";
                    this.get("directions").features.length === c + 1 && (d = this._css.routeLastClass);
                    a.attributes && (a.attributes.step = c + 1);
                    b += '\x3ctr class\x3d"' + d + '"\x3e';
                    b += '\x3ctd class\x3d"' + this._css.routeIconColumnClass + '"\x3e';
                    var d = this._getManeuverImage(a.attributes.maneuverType),
                        h;
                    0 === c ? (h = this._getLetter(k), k++) : "esriDMTStop" === a.attributes.maneuverType ? h = this._getLetter(k) : "esriDMTDepart" === a.attributes.maneuverType && (h = this._getLetter(k),
                        k++);
                    d ? b += '\x3cimg src\x3d"' + d + '" /\x3e' : h && (b += '\x3cdiv class\x3d"' + this._css.esriPrintStopLabelClass + '"\x3e', b += h, b += "\x3c/div\x3e");
                    b += "\x3c/td\x3e";
                    b += '\x3ctd class\x3d"' + this._css.routeTextColumnClass + '"\x3e';
                    b += "\x3cdiv\x3e\x3cstrong\x3e" + E.format(a.attributes.step) + ".\x3c/strong\x3e " + a.attributes.formattedText + "\x3c/div\x3e";
                    b += "\x3c/td\x3e";
                    b += '\x3ctd class\x3d"' + this._css.routeTextColumnClass + '"\x3e';
                    b += '\x3cdiv class\x3d"' + this._css.routeLengthClass + '"\x3e' + this._formatDistance(a.attributes.length,
                        g.widgets.directions.units[this._getUnits(this.get("directionsLengthUnits"))].abbr) + "\x3c/div\x3e";
                    b += "\x3c/td\x3e";
                    b += "\x3c/tr\x3e"
                }));
                b += "\x3c/tbody\x3e";
                b += "\x3c/table\x3e";
                b += "\x3c/div\x3e";
                b += '\x3cdiv class\x3d"' + this._css.esriPrintFooterClass + '"\x3e';
                b += "\x3cp\x3e" + g.widgets.directions.printDisclaimer + "\x3c/p\x3e";
                b += "\x3c/div\x3e";
                b += "\x3c/div\x3e";
                b += "\x3c/body\x3e";
                b += "\x3c/html\x3e"
            }
            this._printWindow.document.open("text/html", "replace");
            this._printWindow.document.write(b);
            this._printWindow.document.close()
        },
        _printDirections: function() {
            var a = screen.width / 2,
                b = screen.height / 1.5,
                a = "toolbar\x3dno, location\x3dno, directories\x3dno, status\x3dyes, menubar\x3dno, scrollbars\x3dyes, resizable\x3dyes, width\x3d" + a + ", height\x3d" + b + ", top\x3d" + (screen.height / 2 - b / 2) + ", left\x3d" + (screen.width / 2 - a / 2);
            this.get("printPage") ? (window.directions = this.get("directions"), window.open(this.get("printPage"), "directions_widget_print", a, !0)) : (this._printWindow = window.open("", "directions_widget_print", a, !0), this._loadPrintDirections(!!this._printService),
                this._printService && A(["dojo/_base/window"], d.hitch(this, function(a) {
                    this.zoomToFullRoute().then(d.hitch(this, function(b) {
                        this._printService.execute(this._printParams, d.hitch(this, function(b) {
                            a.withDoc(this._printWindow.document, function() {
                                var a = B.byId("divMap");
                                a && (h.remove(a, "esriPrintWait"), h.add(a, "esriPageBreak"), t.create("img", {
                                    src: b.url,
                                    "class": "esriPrintMapImg"
                                }, a))
                            })
                        }), d.hitch(this, function(b) {
                            a.withDoc(this._printWindow.document, function() {
                                var a = B.byId("divMap");
                                a && h.remove(a, "esriPrintWait")
                            });
                            console.log("Error while calling print service:\n " + b)
                        }))
                    }))
                })))
        }
    })
});