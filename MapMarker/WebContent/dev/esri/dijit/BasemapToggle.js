require({cache:{
'url:esri/dijit/templates/BasemapToggle.html':"<div class=\"${theme}\" role=\"presentation\" style=\"display:none;\">\n    <div class=\"${_css.container}\">\n        <div data-dojo-attach-point=\"_toggleNode\" title=\"${_i18n.widgets.basemapToggle.toggle}\" role=\"button\" class=\"${_css.toggleButton}\"></div>\n    </div>\n</div>"}});
//>>built
define("esri/dijit/BasemapToggle", ["require", "dojo/Evented", "dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "dijit/_WidgetBase", "dijit/a11yclick", "dijit/_TemplatedMixin", "dojo/on", "dojo/text!./templates/BasemapToggle.html", "dojo/i18n!../nls/jsapi", "dojo/dom-class", "dojo/dom-style", "dojo/dom-construct", "../basemaps"], function(t, k, l, d, u, v, m, n, p, f, q, r, e, g, h, s) {
    return l("esri.dijit.BasemapToggle", [m, p, k], {
        templateString: q,
        options: {
            theme: "BasemapToggle",
            map: null,
            visible: !0,
            basemap: "hybrid",
            defaultBasemap: "streets",
            basemaps: s
        },
        constructor: function(a,
            c) {
            var b = d.mixin({}, this.options, a);
            this.domNode = c;
            this._i18n = r;
            this.set("map", b.map);
            this.set("theme", b.theme);
            this.set("visible", b.visible);
            this.set("basemaps", b.basemaps);
            this.set("basemap", b.basemap);
            this.set("defaultBasemap", b.defaultBasemap);
            this.watch("theme", this._updateThemeWatch);
            this.watch("visible", this._visible);
            this._css = {
                container: "basemapContainer",
                toggleButton: "toggleButton",
                basemapImage: "basemapImage",
                basemapImageContainer: "basemapImageContainer",
                basemapImageBG: "basemapBG",
                basemapTitle: "basemapTitle"
            }
        },
        postCreate: function() {
            this.inherited(arguments);
            this.own(f(this._toggleNode, n, d.hitch(this, this.toggle)))
        },
        startup: function() {
            this.map || (this.destroy(), console.log("BasemapToggle::map required"));
            if (this.map.loaded) this._init();
            else f.once(this.map, "load", d.hitch(this, function() {
                this._init()
            }))
        },
        destroy: function() {
            this.inherited(arguments)
        },
        show: function() {
            this.set("visible", !0)
        },
        hide: function() {
            this.set("visible", !1)
        },
        toggle: function() {
            var a = this.map.getBasemap();
            a && this.set("defaultBasemap", a);
            var a = this.get("defaultBasemap"),
                c = this.get("basemap"),
                b = {
                    previousBasemap: a,
                    currentBasemap: c
                };
            a !== c ? (this.map.setBasemap(c), this.set("basemap", a), this._basemapChange()) : b.error = Error("BasemapToggle::Current basemap is same as new basemap");
            this.emit("toggle", b)
        },
        _init: function() {
            this._visible();
            this._basemapChange();
            this.own(f(this.map, "basemap-change", d.hitch(this, function() {
                this._basemapChange()
            })));
            this.set("loaded", !0);
            this.emit("load", {})
        },
        _getBasemapInfo: function(a) {
            var c = this.get("basemaps");
            if (c && c.hasOwnProperty(a)) return c[a]
        },
        _updateImage: function() {
            var a = this.get("basemap"),
                a = this._getBasemapInfo(a),
                c = a.thumbnailUrl,
                b;
            b = "" + ('\x3cdiv class\x3d"' + this._css.basemapImageContainer + '"\x3e');
            b += '\x3cdiv class\x3d"' + this._css.basemapImage + '"\x3e\x3cdiv class\x3d"' + this._css.basemapImageBG + '" style\x3d"background-image:url(' + c + ')" title\x3d"' + a.title + '"\x3e\x3c/div\x3e\x3c/div\x3e';
            b += '\x3cdiv title\x3d"' + a.title + '" class\x3d"' + this._css.basemapTitle + '"\x3e' + a.title + "\x3c/div\x3e";
            b += "\x3cdiv\x3e";
            h.empty(this._toggleNode);
            h.place(b, this._toggleNode, "only")
        },
        _basemapChange: function() {
            var a = this.map.getBasemap();
            a && this.set("defaultBasemap", a);
            var a = this.get("defaultBasemap"),
                c = this.get("basemap");
            this._updateImage();
            e.remove(this._toggleNode, a);
            e.add(this._toggleNode, c)
        },
        _updateThemeWatch: function(a, c, b) {
            this.get("loaded") && (e.remove(this.domNode, c), e.add(this.domNode, b))
        },
        _visible: function() {
            this.get("visible") ? g.set(this.domNode, "display", "block") : g.set(this.domNode, "display", "none")
        }
    })
});