//>>built
define("esri/dijit/HorizontalSlider", ["dijit/form/HorizontalRuleLabels", "dijit/form/HorizontalSlider", "dojo/_base/declare", "dojo/_base/lang", "dojo/has", "esri/kernel"], function(b, c, d, e, f, g) {
    return d("esri.dijit.HorizontalSlider", c, {
        baseClass: "esriHorizontalSlider",
        showButtons: !1,
        labels: null,
        constructor: function(a) {
            a = a || {};
            a.labels && (this.labels = a.labels)
        },
        buildRendering: function() {
            this.inherited(arguments);
            this.labels && (new b({
                labels: this.labels
            })).placeAt(this.bottomDecoration)
        }
    })
});