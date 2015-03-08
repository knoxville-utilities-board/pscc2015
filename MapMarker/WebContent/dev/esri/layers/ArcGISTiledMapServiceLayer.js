//>>built
define("esri/layers/ArcGISTiledMapServiceLayer", ["dojo/_base/kernel", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/json", "dojo/has", "dojo/io-query", "../kernel", "../urlUtils", "../SpatialReference", "./TiledMapServiceLayer", "./ArcGISMapServiceLayer", "./TileInfo", "./TimeInfo", "./TileMap"], function(l, m, e, n, p, x, h, y, k, q, r, s, t, u, v) {
    return m([r, s], {
        declaredClass: "esri.layers.ArcGISTiledMapServiceLayer",
        _agolAttrs: "Canvas/World_Dark_Gray_Base Canvas/World_Dark_Gray_Reference Canvas/World_Light_Gray_Base Canvas/World_Light_Gray_Reference Ocean/World_Ocean_Base Ocean/World_Ocean_Reference Ocean_Basemap Reference/World_Boundaries_and_Places Reference/World_Boundaries_and_Places_Alternate Reference/World_Transportation World_Imagery World_Street_Map World_Topo_Map".split(" "),
        constructor: function(a, b) {
            b && (b.roundrobin && (l.deprecated(this.declaredClass + " : Constructor option 'roundrobin' deprecated. Use option 'tileServers'."), b.tileServers = b.roundrobin), this._setTileServers(b.tileServers), this._loadCallback = b.loadCallback);
            this._params = e.mixin({}, this._url.query);
            if (n.some(["servicesdev.arcgisonline.com/arcgis/rest/services", "services.arcgisonline.com/arcgis/rest/services", "servicesqa.arcgisonline.com/arcgis/rest/services"], function(b) {
                    return -1 < a.toLowerCase().indexOf(b.toLowerCase())
                })) {
                if (this.resampling = !(b && !1 === b.resampling)) this.tileMap = new v(this)
            } else this.resampling = b && null != b.resampling ? b.resampling : void 0;
            this._initLayer = e.hitch(this, this._initLayer);
            var c = b && b.resourceInfo;
            c ? this._initLayer(c) : (this._load = e.hitch(this, this._load), this._load())
        },
        _TILE_FORMATS: {
            PNG: "png",
            PNG8: "png",
            PNG24: "png",
            PNG32: "png",
            JPG: "jpg",
            JPEG: "jpg",
            GIF: "gif"
        },
        _setTileServers: function(a) {
            if (a && 0 < a.length) {
                this.tileServers = a;
                var b, c = a.length;
                for (b = 0; b < c; b++) a[b] = k.urlToObject(a[b]).path
            }
        },
        _initLayer: function(a, b) {
            this.inherited(arguments);
            this.resourceInfo = p.toJson(a);
            this.tileInfo = new t(a.tileInfo);
            this.resampling = null == this.resampling ? !!a.resampling : this.resampling;
            !this.spatialReference && this.tileInfo.spatialReference && (this.spatialReference = new q(this.tileInfo.spatialReference.toJson()));
            this.isPNG32 = "PNG24" === this.tileInfo.format || "PNG32" === this.tileInfo.format;
            a.timeInfo && (this.timeInfo = new u(a.timeInfo));
            var c = this._url.path,
                f = this._loadCallback,
                w = "file:" === window.location.protocol ? "http:" : window.location.protocol,
                d = c.match(/^https?\:\/\/(server|services)\.arcgisonline\.com\/arcgis\/rest\/services\/([^\/]+(\/[^\/]+)*)\/mapserver/i),
                d = d && d[2];
            if (!this.tileServers)
                if (a.tileServers) this._setTileServers(a.tileServers);
                else {
                    var g = -1 !== c.search(/^https?\:\/\/server\.arcgisonline\.com/i),
                        e = -1 !== c.search(/^https?\:\/\/services\.arcgisonline\.com/i);
                    if (g || e) this._setTileServers([c, c.replace(g ? /server\.arcgisonline/i : /services\.arcgisonline/i, g ? "services.arcgisonline" : "server.arcgisonline")])
                }
            if (d) {
                d = d.toLowerCase();
                for (c = 0; c < this._agolAttrs.length; c++)
                    if (g = this._agolAttrs[c], g.toLowerCase() === d) {
                        this.hasAttributionData = !0;
                        this.attributionDataUrl =
                            this.attributionDataUrl || w + "//static.arcgis.com/attribution/" + g;
                        break
                    }
            }
            this.loaded = !0;
            this.onLoad(this);
            f && (delete this._loadCallback, f(this))
        },
        getTileUrl: function(a, b, c) {
            var f = this.tileServers,
                e = this._getToken(),
                d = this._url.query;
            a = (f ? f[b % f.length] : this._url.path) + "/tile/" + a + "/" + b + "/" + c;
            this.resampling && !this.tileMap && (a += "?blankTile\x3dfalse");
            d && (a = this.resampling && !this.tileMap ? a + ("\x26" + h.objectToQuery(d)) : a + ("?" + h.objectToQuery(d)));
            if (e && (!d || !d.token)) a += (-1 === a.indexOf("?") ? "?" : "\x26") + "token\x3d" +
                e;
            a = this.addTimestampToURL(a);
            return k.addProxy(a)
        }
    })
});