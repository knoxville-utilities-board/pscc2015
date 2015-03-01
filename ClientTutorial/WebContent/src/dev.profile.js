/* jshint unused: false */
var profile = {
    basePath: "./",
    releaseDir: "../dev",
    hasReport: true,
    copyTests: false,

    defaultConfig: {
        hasCache: {
            "dojo-built": 1,
            "dojo-loader": 1,
            "dom": 1,
            "host-browser": 1,
            "config-selectorEngine": "lite"
        },
        async: 1
    },

    packages: [{
        name: "dojo",
        location: "c:/DEV/dojo/v_003/src/dojo"
    }, {
        name: "dijit",
        location: "c:/DEV/dojo/v_003/src/dijit"
    }, {
        name: "dojox",
        location: "c:/DEV/dojo/v_003/src/dojox"
    }, {
        name: "esri",
        location: "c:/DEV/dojo/v_003/src/esri"
    }, {
        name: "dgrid",
        location: "c:/DEV/dojo/v_003/src/dgrid"
    }, {
        name: "put-selector",
        location: "c:/DEV/dojo/v_003/src/put-selector"
    }, {
        name: "xstyle",
        location: "c:/DEV/dojo/v_003/src/xstyle"
    }, {
        name: "jquery",
        location: "./vendor/jquery",
        main: "jquery"
    }, {
        name: "fastclick",
        location: "./vendor/fastclick",
        main: "fastclick"
    }, {
        name: "moment",
        location: "./vendor/moment",
        main: "moment"
    }, {
        name: "bootstrap",
        location: "./vendor/bootstrap",
        main: "bootstrap"
    }, {
        name: "bootstrapmap",
        location: "./vendor/bootstrapmap"
    }, {
        name: "bootstrap-datetimepicker",
        location: "./vendor/bootstrap-datetimepicker",
        main: "bootstrap-datetimepicker"
    }, {
        name: "bootstrap-jasny",
        location: "./vendor/bootstrap-jasny",
        main: "bootstrap-jasny"
    }],

    layers: {
        "dojo/dojo": {
            include: [
                "dojo/dojo",
                "dojo/_base/array",
                "dojo/_base/browser",
                "dojo/_base/Color",
                "dojo/_base/config",
                "dojo/_base/declare",
                "dojo/_base/event",
                "dojo/_base/fx",
                "dojo/_base/html",
                "dojo/_base/json",
                "dojo/_base/lang",
                "dojo/_base/loader",
                "dojo/_base/NodeList",
                "dojo/_base/query",
                "dojo/_base/url",
                "dojo/_base/window",
                "dojo/_base/xhr",
                "dojo/cache",
                "dojo/cldr/monetary",
                "dojo/cldr/nls/currency",
                "dojo/cldr/nls/gregorian",
                "dojo/cldr/nls/number",
                "dojo/cldr/supplemental",
                "dojo/cookie",
                "dojo/currency",
                "dojo/data/util/filter",
                "dojo/data/util/simpleFetch",
                "dojo/data/util/sorter",
                "dojo/date",
                "dojo/date/locale",
                "dojo/date/stamp",
                "dojo/Deferred",
                "dojo/DeferredList",
                "dojo/dom",
                "dojo/dom-class",
                "dojo/dom-construct",
                "dojo/dom-form",
                "dojo/dom-style",
                "dojo/errors/RequestError",
                "dojo/errors/RequestTimeoutError",
                "dojo/Evented",
                "dojo/_firebug/firebug",
                "dojo/fx/easing",
                "dojo/has",
                "dojo/hash",
                "dojo/io/iframe",
                "dojo/io/script",
                "dojo/io-query",
                "dojo/i18n",
                "dojo/json",
                "dojo/main",
                "dojo/number",
                "dojo/on",
                "dojo/parser",
                "dojo/promise/all",
                "dojo/query",
                "dojo/ready",
                "dojo/regexp",
                "dojo/request",
                "dojo/request/default",
                "dojo/request/handlers",
                "dojo/request/iframe",
                "dojo/request/script",
                "dojo/request/util",
                "dojo/request/watch",
                "dojo/request/xhr",
                "dojo/request/notify",
                "dojo/router",
                "dojo/router/RouterBase",
                "dojo/selector/_loader",
                "dojo/selector/lite",
                "dojo/store/Memory",
                "dojo/store/Observable",
                "dojo/store/JsonRest",
                "dojo/store/util/QueryResults",
                "dojo/store/util/SimpleQueryEngine",
                "dojo/string",
                "dojo/text",
                "dojo/uacss",
                "dojo/when",
                "dojo/window",

                "dijit/_WidgetBase",
                "dijit/_Widget",
                "dijit/_Templated",
                "dijit/_TemplatedMixin",
                "dijit/_WidgetsInTemplateMixin",
                "dijit/registry",
                "dijit/_OnDijitClickMixin",

                "dojox/validate",
                "dojox/validate/_base",
                "dojox/validate/regexp",
                "dojox/validate/web",
                "dojox/xml/parser",
                
                "jquery",
                "bootstrap",
                "moment",
                "fastclick",
                "bootstrap-datetimepicker",
                "bootstrap-jasny",

                "esri/arcgis/utils",
                "esri/config",
                "esri/dijit/Attribution",
                "esri/dijit/Geocoder",
                "esri/dijit/HomeButton",
                "esri/dijit/Legend",
                "esri/dijit/LocateButton",
                "esri/dijit/Popup",
                "esri/dijit/PopupMobile",
                "esri/dijit/Scalebar",
                "esri/geometry/Extent",
                "esri/geometry/Point",
                "esri/geometry/scaleUtils",
                "esri/graphic",
                "esri/graphicsUtils",
                "esri/InfoTemplate",
                "esri/kernel",
                "esri/lang",
                "esri/layers/FeatureLayer",
                "esri/layers/GraphicsLayer",
                "esri/map",
                "esri/renderers/UniqueValueRenderer",
                "esri/symbols/PictureMarkerSymbol",
                "esri/symbols/SimpleFillSymbol",
                "esri/symbols/SimpleLineSymbol",
                "esri/symbols/SimpleMarkerSymbol",
                "esri/tasks/GeometryService",
                "esri/tasks/IdentifyTask",
                "esri/tasks/IdentifyParameters",
                "esri/toolbars/draw",
                "esri/urlUtils",

                "xstyle/has-class"],
            includeLocales: ["en-us"],
            boot: true,
            customBase: true
        }
    }
};