require({cache:{
'url:esri/dijit/GeocodeMatch/templates/Popup.html':"<div>\n  <div  class=\"esri-popup-con\" data-dojo-attach-point='esri_popupHeader'>\n    <div><span>${i18n.widgets.geocodeMatch.popup.addressTitle}</span></div>\n    <p data-dojo-attach-point='_addressTag'>${i18n.widgets.geocodeMatch.popup.loadingPH}</p>\n  </div>\n  <div  class=\"esri-popup-con\" data-dojo-attach-point='esri_popupContent'>\n    <div><span>${i18n.widgets.geocodeMatch.popup.locationTitle}</span></div>\n    <p data-dojo-attach-point='_Xtag'></p>\n    <p data-dojo-attach-point='_Ytag'></p>\n  </div>\n  <div class=\"esri-popup-button-con\">\n    <div data-dojo-attach-point='_matchButton' data-dojo-type=\"dijit.form.Button\">${i18n.widgets.geocodeMatch.popup.matchButtonLabel}</div>\n    <div data-dojo-attach-point='_discardButton' data-dojo-type=\"dijit.form.Button\">${i18n.widgets.geocodeMatch.popup.discardButtonLabel}</div>\n  </div>\n</div>"}});
//>>built
define("esri/dijit/GeocodeMatch/Popup", ["require", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/lang", "dojo/Evented", "dojo/on", "dojo/uacss", "dojo/text!./templates/Popup.html", "dojo/i18n!../../nls/jsapi", "dijit/form/Button", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "../../kernel", "../../geometry/webMercatorUtils"], function(h, k, l, d, m, e, s, n, f, g, p, q, t, r) {
    h.toUrl("..");
    return l([p, q, m], {
        templateString: n,
        i18n: f,
        reverseRange: 100,
        constructor: function(a, u) {
            if (a.rowData && (this._graphicID = a.graphic.attributes.id, a.rowData.address))
                if ("object" === typeof a.rowData.address) {
                    var c =
                        "",
                        b;
                    for (b in a.rowData.address) a.rowData.address.hasOwnProperty(b) && (c += a.rowData.address[b] + " ");
                    this._address = c
                } else this._address = a.rowData.address;
            a.reverseRange && (this.reverseRange = a.reverseRange)
        },
        postCreate: function() {
            this.inherited(arguments);
            var a;
            this._address && this._addressTag ? this._addressTag.innerHTML = this._address : this.geocodeMatch._locator.locationToAddress(this.graphic.geometry, this.reverseRange).then(d.hitch(this, function(a) {
                a = a.address;
                var c = "",
                    b;
                this.graphic.attributes.reverseGeocodeResults =
                    a;
                if ("object" === typeof a) {
                    for (b in a) a.hasOwnProperty(b) && null !== a[b] && "Loc_name" !== b && (c += a[b] + " ");
                    this._addressTag && (this._addressTag.innerHTML = c)
                } else this._addressTag && (this._addressTag.innerHTML = a);
                this._matchButtonRef.set("disabled", !1)
            }), d.hitch(this, function() {
                this._addressTag && (this._addressTag.innerHTML = f.widgets.geocodeMatch.popup.noAddress);
                this._matchButtonRef.set("disabled", !1)
            }));
            a = r.webMercatorToGeographic(this.graphic.geometry);
            this._Xtag.innerHTML = this.i18n.widgets.geocodeMatch.popup.xTitle +
                a.x.toFixed(6);
            this._Ytag.innerHTML = this.i18n.widgets.geocodeMatch.popup.yTitle + a.y.toFixed(6);
            this._matchButtonRef = new g({
                label: this.i18n.widgets.geocodeMatch.popup.matchButtonLabel,
                "class": "esri_PopupButton esri_matchButton",
                disabled: !0
            }, this._matchButton);
            this._discardButtonRef = new g({
                label: this.i18n.widgets.geocodeMatch.popup.discardButtonLabel,
                "class": "esri_PopupButton esri_deleteButton"
            }, this._discardButton);
            this._listenerHandles = [e(this._matchButtonRef, "click", d.hitch(this, function() {
                this.graphic.attributes.type ===
                    this.i18n.widgets.geocodeMatch.customLabel ? this.geocodeMatch._matchCustomFeature(this.graphic) : this.geocodeMatch._matchFeature(this.graphic.attributes.id);
                this.map.infoWindow.hide()
            })), e(this._discardButtonRef, "click", d.hitch(this, function() {
                this.map._layers[this.graphicsLayer.id].remove(this.graphic);
                this.map.infoWindow.hide()
            }))];
            !0 === this.graphic.attributes.matched ? (this._discardButtonRef.destroy(), this._matchButtonRef.destroy()) : !1 === this.graphic.attributes.matched && this._address && (this._discardButtonRef.destroy(),
                this._matchButtonRef.set("disabled", !1));
            this.emit("load", {
                matchButtonRef: this._matchButtonRef,
                discardButtonRef: this._discardButtonRef
            })
        },
        startup: function() {
            this.inherited(arguments);
            this.emit("load", {
                matchButtonRef: this._matchButtonRef,
                discardButtonRef: this._discardButtonRef
            })
        },
        destroy: function() {
            this.inherited(arguments);
            k.forEach(this._listenerHandles, function(a) {
                a.remove()
            })
        }
    })
});