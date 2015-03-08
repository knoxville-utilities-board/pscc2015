require({cache:{
'url:esri/dijit/VisibleScaleRangeSlider/templates/ScalePreview.html':"<div class=\"${baseClass}\">\n  <div class=\"${baseClass}Header\">${labels.preview}</div>\n  <img data-dojo-attach-point=\"dap_scalePreviewThumbnail\" class=\"${baseClass}Thumbnail\"/>\n</div>\n"}});
//>>built
define("esri/dijit/VisibleScaleRangeSlider/ScalePreview", ["../../kernel", "dijit/_TemplatedMixin", "dijit/_WidgetBase", "dojo/_base/declare", "dojo/_base/lang", "dojo/dom-style", "dojo/has", "dojo/i18n!../../nls/jsapi", "dojo/text!./templates/ScalePreview.html"], function(h, c, d, e, k, b, l, f, g) {
    return e([d, c], {
        declaredClass: "esri.dijit.VisibleScaleRangeSlider.ScalePreview",
        baseClass: "esriScalePreview",
        templateString: g,
        labels: f.visibleScaleRangeSlider,
        source: null,
        _setSourceAttr: function(a) {
            this.source !== a && (this._set("source", a), b.set(this.dap_scalePreviewThumbnail,
                "backgroundImage", a))
        },
        backgroundPosition: null,
        _setBackgroundPositionAttr: function(a) {
            this.backgroundPosition !== a && (this._set("backgroundPosition", a), b.set(this.dap_scalePreviewThumbnail, "backgroundPosition", a))
        }
    })
});