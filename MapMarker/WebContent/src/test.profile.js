/**
 * This is the default application build profile used by the EMW. While it looks similar, this build profile
 * is different from the package build profile at `kub/package.js` in the following ways:
 *
 * 1. you can have multiple application build profiles (e.g. one for desktop, one for tablet, etc.), but only one
 *    package build profile;
 * 2. the package build profile only configures the `resourceTags` for the files in the package, whereas the
 *    application build profile tells the build system how to build the entire application.
 *
 * Look to `util/build/buildControlDefault.js` for more information on available options and their default values.
 */


/* jshint unused: false */
var profile = {
    basePath: "./",
    releaseDir: "../release",
    hasReport: true,
    cssOptimize: "comments",
    stripConsole: "all",
    selectorEngine: "lite",
    copyTests: false,

    defaultConfig: {
        mblAlwaysHideAddressBar: true,
        deps: ["fastclick", "jquery", "moment", "bootstrap", "bootstrap-datetimepicker", "bootstrap-jasny"],
        callback: function(FastClick) {
            FastClick.attach(document.body);
        },
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
    }, {
        name: "app",
        location: "./app"
    }, {
        name: "common",
        location: "./common"
    }, {
        name: "kubgis",
        location: "./kubgis"
    }, {
        name: "util",
        location: "./util"
    }, {
        name: "images",
        location: "./images"
    }],

    layers: {
        "dojo/dojo": {
            include: [
                "dojo/dojo",

                "dojo/cldr/nls/gregorian",
                "dojo/cldr/supplemental",
                "dojo/data/util/filter",
                "dojo/data/util/simpleFetch",
                "dojo/data/util/sorter",
                "dojo/date",
                "dojo/date/locale",
                "dojo/fx",
                "dojo/io/iframe",
                "dojo/io/script",
                "dojo/NodeList-traverse",
                "dojo/request/iframe",
                "dojo/request/script",
                "dojo/uacss",

                "dgrid/extensions/ColumnHider",
                "dgrid/extensions/ColumnResizer",
                "dgrid/extensions/DijitRegistry",
                "dgrid/OnDemandGrid",
                "dgrid/Selection",

                "dojox/collections/_base",
                "dojox/collections/ArrayList",
                "dojox/data/CsvStore",
                "dojox/gfx",
                "dojox/gfx/_base",
                "dojox/gfx/matrix",
                "dojox/gfx/path",
                "dojox/gfx/renderer",
                "dojox/gfx/shape",
                "dojox/gfx/svg",
                "dojox/validate/_base",
                "dojox/validate/regexp",
                "dojox/validate/web",
                "dojox/xml/parser",

                "xstyle/core/load-css",

                "common/routing/routeHandler",
                "common/routing/router",
                "common/routing/RouterBase",
                "common/stores/Cache",
                "common/stores/KubJsonRest",
                "common/stores/KubJsonStore",
                "common/ui/_ListMixin",
                "common/ui/_ModelApiMixin",
                "common/ui/ActionCard",
                "common/ui/Alert",
                "common/ui/Appbar",
                "common/ui/AppContainer",
                "common/ui/Button",
                "common/ui/CheckBox",
                "common/ui/DateTimePicker",
                "common/ui/DetailView",
                "common/ui/DropdownList",
                "common/ui/DropdownListItem",
                "common/ui/DropdownStoreList",
                "common/ui/FilteredStoreList",
                "common/ui/Form",
                "common/ui/FormItem",
                "common/ui/GenericDropdownListItem",
                "common/ui/GenericListItem",
                "common/ui/Growler",
                "common/ui/List",
                "common/ui/ListDetailView",
                "common/ui/ListItem",
                "common/ui/LoginForm",
                "common/ui/LoginModal",
                "common/ui/NewFeatures",
                "common/ui/Overlay",
                "common/ui/Panel",
                "common/ui/PickerSearchBox",
                "common/ui/ReleaseNotes",
                "common/ui/ReleaseNotesItem",
                "common/ui/ResultsSearchBox",
                "common/ui/Row",
                "common/ui/SearchBox",
                "common/ui/SideNav",
                "common/ui/SideNavDropdown",
                "common/ui/SideNavFooterItem",
                "common/ui/SideNavListItem",
                "common/ui/StoreList",
                "common/ui/SummaryCard",
                "common/ui/TabContainer",
                "common/ui/Table",
                "common/ui/TextArea",
                "common/ui/TextBox",
                "common/ui/ToolCard",
                "common/ui/View",
                "common/ui/WcmPanel",

                "esri/arcgis/csv",
                "esri/dijit/HomeButton",
                "esri/dijit/LocateButton",
                "esri/layers/ArcGISDynamicMapServiceLayer",
                "esri/layers/ArcGISImageServiceLayer",
                "esri/layers/CSVLayer",
                "esri/layers/DataSource",
                "esri/layers/DynamicLayerInfo",
                "esri/layers/DynamicMapServiceLayer",
                "esri/layers/GeoRSSLayer",
                "esri/layers/ImageParameters",
                "esri/layers/ImageServiceParameters",
                "esri/layers/JoinDataSource",
                "esri/layers/KMLFolder",
                "esri/layers/KMLGroundOverlay",
                "esri/layers/KMLLayer",
                "esri/layers/LayerDataSource",
                "esri/layers/LayerDrawingOptions",
                "esri/layers/LayerMapSource",
                "esri/layers/LayerSource",
                "esri/layers/MosaicRule",
                "esri/layers/PurgeOptions",
                "esri/layers/QueryDataSource",
                "esri/layers/RasterDataSource",
                "esri/layers/RasterFunction",
                "esri/layers/ServiceGeneratedFeatureCollection",
                "esri/layers/StreamLayer",
                "esri/layers/StreamTrackManager",
                "esri/layers/TableDataSource",
                "esri/layers/WebTiledLayer",
                "esri/layers/WMSLayer",
                "esri/layers/WMSLayerInfo",
                "esri/tasks/ImageServiceIdentifyParameters",
                "esri/tasks/ImageServiceIdentifyResult",
                "esri/tasks/ImageServiceIdentifyTask",
                "esri/virtualearth/VETiledLayer",

                "bootstrapmap/bootstrapmap",

                "kubgis/defaults",
                "kubgis/dijit/Popup",
                "kubgis/layers/AddressLookupLayer",
                "kubgis/layers/ConstructionLayer",
                "kubgis/layers/NavigationLayer",
                "kubgis/layers/OmsJobsLayer",
                "kubgis/layers/OmsOutagesLayer",
                "kubgis/layers/OmsUnitsLayer",
                "kubgis/utils",

                "util/dateHandling",
                "util/stringHandling",

                "app/main",
                "app/routing/registerRoutes",

                "jquery",
                "bootstrap",
                "moment",
                "fastclick",
                "bootstrap-datetimepicker",
                "bootstrap-jasny"],
            includeLocales: ["en-us"],
            boot: true,
            customBase: true
        }
    }
};