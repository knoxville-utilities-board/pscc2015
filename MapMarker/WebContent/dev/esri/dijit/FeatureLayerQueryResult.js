//>>built
define("esri/dijit/FeatureLayerQueryResult", ["esri/main", "dojo/_base/declare", "dojo/Evented", "dojo/_base/lang", "dojo/_base/kernel", "dojo/_base/Deferred", "dojo/DeferredList", "dojo/_base/array"], function(h, k, l, e, f, g, m, n) {
    var d = function(a) {
        function b(c) {
            a[c] || (a[c] = function() {
                var b = arguments;
                return g.when(a, function(a) {
                    Array.prototype.unshift.call(b, a.features || a);
                    return d(f[c].apply(f, b))
                })
            })
        }
        if (!a) return a;
        a.then && (a = e.delegate(a));
        a.total || (a.total = g.when(a, function(a) {
            return h._isDefined(a.total) ? a.total : a.length || 0
        }));
        b("forEach");
        b("filter");
        b("map");
        b("some");
        b("every");
        return a
    };
    e.setObject("dijit.FeatureLayerQueryResult", d);
    return d
});