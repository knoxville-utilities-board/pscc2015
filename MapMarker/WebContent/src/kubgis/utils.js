define(["dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/has",
    "bootstrapmap/bootstrapmap",
    "esri/config",
    "esri/geometry/Extent",
    "esri/geometry/Point",
    "esri/tasks/GeometryService",
    "kubgis/defaults",
    "kubgis/dijit/Popup"],

function(lang, dom, domConstruct, has, bootstrapmap, esriConfig, Extent, Point, GeometryService, defaults, Popup) {

    return {
        createWebMap: function(mapDiv, options) {
            console.log("createMap()");

            // Normalize value to dom id, can accept both domNodes and dom ids
            mapDiv = dom.byId(mapDiv);
            if (mapDiv.id) {
                mapDiv = mapDiv.id;
            }

            var config;
            config = defaults;

            // popup dijit
            var customPopup = new Popup({}, domConstruct.create("div"));

            //add a custom popup and default Extent
            lang.mixin(config.mapOptions, {
                infoWindow: customPopup,
                extent: new Extent({
                    xmin: 2345357.59,
                    ymin: 542768.095,
                    xmax: 2767757.59,
                    ymax: 699518.095,
                    spatialReference: {
                        wkid: 2915
                    }
                }).centerAt(new Point([2590751.668154596, 624587.9073357609]))
            });

            //override defaults
            if (options && options.mapOptions) {
                lang.mixin(config.mapOptions, options.mapOptions);
            }
            if (options && options.webmap && options.webmap.itemData) {
                lang.mixin(config.webmap.itemData, options.webmap.itemData);
            }

            //Use the proxy for secured services
            if (config.proxyurl) {
                esriConfig.defaults.io.proxyUrl = config.proxyurl;
                esriConfig.defaults.io.alwaysUseProxy = true;
            }

            esriConfig.defaults.geometryService = new GeometryService(defaults.helperServices.geometry.url);

            if (!has("touch")) {
                config.scrollWheelZoom = true;
            }

            return bootstrapmap.createWebMap(config.webmap, mapDiv, config);
        }
    };
});