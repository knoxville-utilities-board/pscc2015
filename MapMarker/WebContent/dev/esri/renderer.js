//>>built
define("esri/renderer", ["./renderers/Renderer", "./renderers/SimpleRenderer", "./renderers/UniqueValueRenderer", "./renderers/ClassBreaksRenderer", "./renderers/TemporalRenderer", "./renderers/SymbolAger", "./renderers/TimeClassBreaksAger", "./renderers/TimeRampAger", "./renderers/jsonUtils"], function(b, l, n, p, h, k, f, d, c) {
    return {
        Renderer: b,
        SimpleRenderer: l,
        UniqueValueRenderer: n,
        ClassBreaksRenderer: p,
        TemporalRenderer: h,
        SymbolAger: k,
        TimeClassBreaksAger: f,
        TimeRampAger: d,
        jsonUtils: c
    }
});