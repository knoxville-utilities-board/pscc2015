//>>built
define("esri/tasks/IdentifyParameters", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/json", "dojo/has", "../kernel", "../layerUtils", "../geometry/jsonUtils", "../geometry/scaleUtils"], function(f, n, g, e, r, s, h, p, q) {
    var d = f(null, {
        declaredClass: "esri.tasks.IdentifyParameters",
        constructor: function() {
            this.layerOption = d.LAYER_OPTION_TOP
        },
        geometry: null,
        spatialReference: null,
        layerIds: null,
        tolerance: null,
        returnGeometry: !1,
        mapExtent: null,
        width: 400,
        height: 400,
        dpi: 96,
        layerDefinitions: null,
        timeExtent: null,
        layerTimeOptions: null,
        dynamicLayerInfos: null,
        toJson: function(b) {
            var c = b && b.geometry || this.geometry,
                a = this.mapExtent,
                d = this.spatialReference,
                k = this.layerIds;
            b = {
                tolerance: this.tolerance,
                returnGeometry: this.returnGeometry,
                imageDisplay: this.width + "," + this.height + "," + this.dpi,
                maxAllowableOffset: this.maxAllowableOffset
            };
            if (c) {
                var l = c.toJson();
                delete l.spatialReference;
                b.geometry = e.toJson(l);
                b.geometryType = p.getJsonType(c)
            }
            d ? b.sr = d.wkid || e.toJson(d.toJson()) : c && c.spatialReference ? b.sr = c.spatialReference.wkid || e.toJson(c.spatialReference.toJson()) :
                a && a.spatialReference && (b.sr = a.spatialReference.wkid || e.toJson(a.spatialReference.toJson()));
            a && (b.mapExtent = a.xmin + "," + a.ymin + "," + a.xmax + "," + a.ymax);
            b.layers = this.layerOption;
            k && (b.layers += ":" + k.join(","));
            b.layerDefs = h._serializeLayerDefinitions(this.layerDefinitions);
            c = this.timeExtent;
            b.time = c ? c.toJson().join(",") : null;
            b.layerTimeOptions = h._serializeTimeOptions(this.layerTimeOptions);
            if (this.dynamicLayerInfos && 0 < this.dynamicLayerInfos.length) {
                var a = q.getScale({
                        extent: a,
                        width: this.width,
                        spatialReference: a.spatialReference
                    }),
                    f = h._getLayersForScale(a, this.dynamicLayerInfos),
                    m = [];
                g.forEach(this.dynamicLayerInfos, function(b) {
                    if (!b.subLayerIds) {
                        var a = b.id;
                        if ((!this.layerIds || this.layerIds && -1 !== g.indexOf(this.layerIds, a)) && -1 !== g.indexOf(f, a)) {
                            var c = {
                                id: a
                            };
                            c.source = b.source && b.source.toJson();
                            var d;
                            this.layerDefinitions && this.layerDefinitions[a] && (d = this.layerDefinitions[a]);
                            d && (c.definitionExpression = d);
                            var e;
                            this.layerTimeOptions && this.layerTimeOptions[a] && (e = this.layerTimeOptions[a]);
                            e && (c.layerTimeOptions = e.toJson());
                            m.push(c)
                        }
                    }
                }, this);
                a = e.toJson(m);
                "[]" === a && (a = "[{}]");
                b.dynamicLayers = a
            }
            return b
        }
    });
    n.mixin(d, {
        LAYER_OPTION_TOP: "top",
        LAYER_OPTION_VISIBLE: "visible",
        LAYER_OPTION_ALL: "all"
    });
    return d
});