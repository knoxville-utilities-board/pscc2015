//>>built
define("esri/tasks/ServiceAreaParameters", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/json", "dojo/has", "../kernel", "../lang", "../graphicsUtils"], function(f, h, c, k, l, g, e) {
    return f(null, {
        declaredClass: "esri.tasks.ServiceAreaParameters",
        accumulateAttributes: null,
        attributeParameterValues: null,
        defaultBreaks: null,
        doNotLocateOnRestrictedElements: !0,
        excludeSourcesFromPolygons: null,
        facilities: null,
        impedanceAttribute: null,
        mergeSimilarPolygonRanges: !1,
        outputGeometryPrecision: null,
        outputGeometryPrecisionUnits: null,
        outputLines: null,
        outputPolygons: null,
        outSpatialReference: null,
        overlapLines: !1,
        overlapPolygons: !1,
        pointBarriers: null,
        polygonBarriers: null,
        polylineBarriers: null,
        restrictionAttributes: null,
        restrictUTurns: null,
        returnFacilities: !1,
        returnPointBarriers: !1,
        returnPolylgonBarriers: !1,
        returnPolylineBarriers: !1,
        splitLinesAtBreaks: !1,
        splitPolygonsAtBreaks: !1,
        travelDirection: null,
        trimOuterPolygon: !1,
        trimPolygonDistance: null,
        trimPolygonDistanceUnits: null,
        useHierarchy: null,
        timeOfDay: null,
        toJson: function(d) {
            var b = {
                    returnFacilities: this.returnFacilities,
                    returnBarriers: this.returnPointBarriers,
                    returnPolygonBarriers: this.returnPolygonBarriers,
                    returnPolylineBarriers: this.returnPolylineBarriers,
                    mergeSimilarPolygonRanges: this.mergeSimilarPolygonRanges,
                    overlapLines: this.overlapLines,
                    overlapPolygons: this.overlapPolygons,
                    splitLinesAtBreaks: this.splitLinesAtBreaks,
                    splitPolygonsAtBreaks: this.splitPolygonsAtBreaks,
                    trimOuterPolygon: this.trimOuterPolygon,
                    accumulateAttributeNames: this.accumulateAttributes ? this.accumulateAttributes.join(",") : null,
                    attributeParameterValues: this.attributeParameterValues &&
                        c.toJson(this.attributeParameterValues),
                    defaultBreaks: this.defaultBreaks ? this.defaultBreaks.join(",") : null,
                    excludeSourcesFromPolygons: this.excludeSourcesFromPolygons ? this.excludeSourcesFromPolygons.join(",") : null,
                    impedanceAttributeName: this.impedanceAttribute,
                    outputGeometryPrecision: this.outputGeometryPrecision,
                    outputGeometryPrecisionUnits: this.outputGeometryPrecisionUnits,
                    outputLines: this.outputLines,
                    outputPolygons: this.outputPolygons,
                    outSR: this.outSpatialReference ? this.outSpatialReference.wkid ||
                        c.toJson(this.outSpatialReference.toJson()) : null,
                    restrictionAttributeNames: this.restrictionAttributes ? this.restrictionAttributes.join(",") : null,
                    restrictUTurns: this.restrictUTurns,
                    travelDirection: this.travelDirection,
                    trimPolygonDistance: this.trimPolygonDistance,
                    trimPolygonDistanceUnits: this.trimPolygonDistanceUnits,
                    useHierarchy: this.useHierarchy,
                    timeOfDay: this.timeOfDay && this.timeOfDay.getTime()
                },
                a = this.facilities;
            "esri.tasks.FeatureSet" === a.declaredClass && 0 < a.features.length ? b.facilities = c.toJson({
                type: "features",
                features: e._encodeGraphics(a.features, d && d["facilities.features"]),
                doNotLocateOnRestrictedElements: this.doNotLocateOnRestrictedElements
            }) : "esri.tasks.DataLayer" === a.declaredClass ? b.facilities = a : "esri.tasks.DataFile" === a.declaredClass && (b.facilities = c.toJson({
                type: "features",
                url: a.url,
                doNotLocateOnRestrictedElements: this.doNotLocateOnRestrictedElements
            }));
            a = function(a, b) {
                return !a ? null : "esri.tasks.FeatureSet" === a.declaredClass ? 0 < a.features.length ? c.toJson({
                    type: "features",
                    features: e._encodeGraphics(a.features,
                        d && d[b])
                }) : null : "esri.tasks.DataLayer" === a.declaredClass ? a : "esri.tasks.DataFile" === a.declaredClass ? c.toJson({
                    type: "features",
                    url: a.url
                }) : c.toJson(a)
            };
            this.pointBarriers && (b.barriers = a(this.pointBarriers, "pointBarriers.features"));
            this.polygonBarriers && (b.polygonBarriers = a(this.polygonBarriers, "polygonBarriers.features"));
            this.polylineBarriers && (b.polylineBarriers = a(this.polylineBarriers, "polylineBarriers.features"));
            return g.filter(b, function(a) {
                if (null !== a) return !0
            })
        }
    })
});