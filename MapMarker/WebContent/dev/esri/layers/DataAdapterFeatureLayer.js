//>>built
define("esri/layers/DataAdapterFeatureLayer", ["../declare", "dojo/_base/lang", "dojo/_base/array", "dojo/when", "./FeatureLayer", "../renderers/SimpleRenderer", "../symbols/SimpleFillSymbol", "../symbols/SimpleMarkerSymbol", "../symbols/SimpleLineSymbol"], function(g, d, e, f, h, k, l, m, n) {
    return g("esri.layers.DataAdapterFeatureLayer", h, {
        locationProvider: null,
        dataAdapter: null,
        dataAdapterQuery: null,
        _preventInit: !0,
        constructor: function(b, c) {
            this.dataAdapterQuery = c && c.dataAdapterQuery;
            this.locationProvider = c && c.locationProvider;
            if ((this.dataAdapter = b) && this.locationProvider &&
                this.dataAdapterQuery) {
                var a = d.hitch(this, this._init, c);
                if (this.locationProvider.loaded) this._queryDataAdapter().then(a);
                else this.locationProvider.on("load", d.hitch(this, function() {
                    this._queryDataAdapter().then(a)
                }))
            }
        },
        _queryDataAdapter: function() {
            function b(a, b) {
                return {
                    idField: a.idField,
                    fields: e.filter(a.fields, function(b) {
                        return -1 !== e.indexOf(c.dataAdapterQuery.outFields, b.name) || b.name === a.idField
                    }),
                    recordSet: b
                }
            }
            var c = this;
            return f(this.dataAdapter.getTableInfo(this.dataAdapterQuery.tableId)).then(function(a) {
                return f(c.dataAdapter.query(c.dataAdapterQuery)).then(d.partial(b,
                    a))
            })
        },
        _init: function(b, c) {
            var a;
            switch (this.locationProvider.geometryType) {
                case "esriGeometryPoint":
                case "esriGeometryMultipoint":
                    a = new m;
                    break;
                case "esriGeometryPolyline":
                    a = new n;
                    break;
                case "esriGeometryPolygon":
                    a = new l
            }
            a = {
                layerDefinition: {
                    geometryType: this.locationProvider.geometryType,
                    objectIdField: c.idField,
                    fields: c.fields,
                    drawingInfo: {
                        renderer: (new k(a)).toJson()
                    }
                },
                featureSet: {
                    features: c.recordSet.features
                }
            };
            this.on("load", d.hitch(this, this._locateFeatures));
            this._initFeatureLayer(a, b)
        },
        _locateFeatures: function() {
            var b =
                this,
                c = this.getMap(),
                a = function() {
                    b.updating = !0;
                    b.locationProvider.locate(b.graphics, {
                        outSpatialReference: c.spatialReference
                    }).then(function() {
                        b._fireUpdateEnd()
                    })
                };
            if (c && !this._located)
                if (this._located = !0, this.locationProvider.loaded) a();
                else this.locationProvider.on("load", a)
        },
        _setMap: function() {
            var b = this.inherited(arguments);
            this._locateFeatures();
            return b
        }
    })
});