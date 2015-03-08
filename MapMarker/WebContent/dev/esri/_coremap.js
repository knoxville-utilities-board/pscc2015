//>>built
define("esri/_coremap", ["require", "module", "dojo/_base/kernel", "dojo/_base/declare", "dojo/_base/connect", "dojo/_base/Deferred", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/event", "dojo/_base/unload", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/sniff", "dijit/registry", "dojox/gfx/matrix", "./kernel", "./config", "./basemaps", "./lang", "./Evented", "./fx", "./deferredUtils", "./tileUtils", "./PluginTarget", "./geometry/Point", "./geometry/ScreenPoint", "./geometry/Extent", "./geometry/Rect", "./geometry/mathUtils", "./geometry/scaleUtils", "./geometry/screenUtils", "./geometry/webMercatorUtils", "./layers/GraphicsLayer", "./layers/TileInfo", "./layers/LOD", "./layers/ArcGISTiledMapServiceLayer", "./layers/OpenStreetMapLayer", "./dijit/Popup", "./plugins/popupManager", "dojo/uacss"], function(P, ia, ja, ka, z, aa, H, m, Aa, la, ma, na, X, Q, U, V, R, oa, pa, Ba, qa, D, t, ra, ba, sa, ca, ta, M, C, A, N, ua, G, da, Y, E, va, wa, xa, ea, ya) {
    function fa(a, b) {
        var c = a.lods;
        c.sort(function(a, b) {
            return a.scale > b.scale ? -1 : a.scale < b.scale ? 1 : 0
        });
        var d = [],
            c = m.filter(c, function(a) {
                if (-1 === I(d, a.scale)) return d.push(a.scale), !0
            }),
            e = b.lods = [],
            f;
        m.forEach(c, function(a, b) {
            f = e[b] = new wa(a);
            f.level = b
        });
        b.tileInfo = new va(S(a, {
            lods: e
        }))
    }
    var Z, T = da.toMapPoint,
        $ = da.toScreenPoint,
        W = z.connect,
        O = z.disconnect,
        x = H.hitch,
        B = V.set,
        I = m.indexOf,
        S =
        H.mixin,
        ga = 0,
        J = qa.defaults.map,
        za = function() {};
    return ka([ra, ta], {
        declaredClass: "esri._CoreMap",
        resizeDelay: 300,
        invalidExtent: "Map does not have a valid extent.",
        invalidGeometry: "Geometry (wkid: ${geometry}) cannot be converted to spatial reference of the map (wkid: ${map})",
        unknownBasemap: 'Unable to find basemap definition for: "${basemapName}". Try one of these: ${list}',
        invalidBasemap: 'Unable to add basemap: "${basemapName}".',
        unknownLayerType: 'Unknown basemap layer type: "${type}" found in basemap definition for: "${basemapName}".',
        visible: !0,
        _eventMap: {
            "basemap-change": !0,
            "extent-change": ["extent", "delta", "levelChange", "lod"],
            "layer-add": ["layer"],
            "layer-add-result": ["layer", "error"],
            "layer-remove": ["layer"],
            "layer-reorder": ["layer", "index"],
            "layer-resume": ["layer"],
            "layer-suspend": ["layer"],
            "layers-add-result": ["layers"],
            "layers-removed": !0,
            "layers-reordered": ["layerIds"],
            load: ["map"],
            pan: ["extent", "delta"],
            "pan-end": ["extent", "delta"],
            "pan-start": ["extent", "screenPoint"],
            reposition: ["x", "y"],
            resize: ["extent", "width", "height"],
            scale: ["matrix", "immediate"],
            "time-extent-change": ["timeExtent"],
            "before-unload": ["map"],
            unload: ["map"],
            "update-end": ["error"],
            "update-start": !0,
            zoom: ["extent", "zoomFactor", "anchor"],
            "zoom-end": ["extent", "zoomFactor", "anchor", "level"],
            "zoom-start": ["extent", "zoomFactor", "anchor", "level"],
            click: !0,
            "dbl-click": !0,
            "key-down": !0,
            "key-up": !0,
            "mouse-down": !0,
            "mouse-drag": !0,
            "mouse-drag-end": !0,
            "mouse-drag-start": !0,
            "mouse-move": !0,
            "mouse-out": !0,
            "mouse-over": !0,
            "mouse-up": !0,
            "mouse-wheel": !0,
            "basic-tap": !0,
            "double-tap": !0,
            "pinch-end": !0,
            "pinch-move": !0,
            "pinch-start": !0,
            "processed-double-tap": !0,
            "processed-tap": !0,
            "swipe-end": !0,
            "swipe-move": !0,
            "swipe-start": !0,
            tap: !0,
            "two-finger-tap": !0
        },
        constructor: function(a, b) {
            var c = this;
            this.registerConnectEvents();
            S(this, {
                _internalLayerIds: [],
                _layers: [],
                _layerDivs: [],
                _layerSize: 0,
                _connects: [],
                _zoomAnimDiv: null,
                _zoomAnim: null,
                _layersDiv: null,
                _firstLayerId: null,
                _delta: null,
                _cursor: null,
                _ratioW: 1,
                _ratioH: 1,
                _params: null,
                cursor: null,
                layerIds: [],
                graphicsLayerIds: [],
                graphics: null,
                _labels: null,
                loaded: !1,
                __panning: !1,
                __zooming: !1,
                __container: null,
                root: null,
                __LOD: null,
                __tileInfo: null,
                __visibleRect: null,
                __visibleDelta: null,
                _rids: []
            });
            var d = this.container = ma.byId(a),
                e = this.id = na.get(d, "id") || oa.getUniqueId(this.declaredClass);
            X.add(d, "map");
            var f = U.getContentBox(d),
                g = X.add,
                h = Q.create;
            this.position = new C(0, 0);
            this._reposition();
            var k = this.width = f.w || J.width,
                l = this.height = f.h || J.height;
            0 === f.w && B(d, "width", k + "px");
            0 === f.h && B(d, "height", l + "px");
            var u = this.root = h("div", {
                id: e + "_root",
                style: {
                    width: k + "px",
                    height: l + "px",
                    direction: "ltr"
                }
            });
            g(u, "container");
            f = this.__container = h("div", {
                id: e + "_container"
            }, u);
            B(f, "position", "absolute");
            g(f, "container");
            d.appendChild(u);
            d = this._params = S({
                slider: !0,
                nav: !1,
                zoom: -1,
                minZoom: -1,
                maxZoom: -1,
                scale: -1,
                minScale: 0,
                maxScale: 0,
                showInfoWindowOnClick: !0,
                displayGraphicsOnPan: !0,
                wrapAround180: !0,
                fitExtent: !1,
                optimizePanAnimation: !0
            }, b || {});
            this.wrapAround180 = d.wrapAround180;
            this.optimizePanAnimation = d.optimizePanAnimation;
            t.isDefined(d.resizeDelay) &&
                (this.resizeDelay = d.resizeDelay);
            d.lods && (fa({
                rows: 512,
                cols: 512,
                dpi: 96,
                format: "JPEG",
                compressionQuality: 75,
                origin: {
                    x: -180,
                    y: 90
                },
                spatialReference: {
                    wkid: 4326
                },
                lods: d.lods
            }, d), this.__tileInfo = d.tileInfo);
            this.extent = d.extent;
            this._extentUtil({
                mapCenter: d.center,
                targetLevel: d.zoom,
                targetScale: d.scale
            });
            this.__visibleRect = new N(0, 0, k, l);
            this.__visibleDelta = new N(0, 0, k, l);
            e = this._layersDiv = h("div", {
                id: e + "_layers"
            });
            g(e, "layersDiv");
            f.appendChild(e);
            this._zoomAnimDiv = h("div", {
                style: {
                    position: "absolute"
                }
            });
            d.infoWindow ? this.infoWindow = d.infoWindow : (g = this.infoWindow = new ya(d.popupOptions, h("div")), g.startup(), g._ootb = !0, B(g.domNode, "zIndex", 40));
            d.showLabels && (P(["./layers/LabelLayer"], function(a) {
                Z = a;
                c._createLabelLayer()
            }), this.on("load", function() {
                c._createLabelLayer()
            }));
            this.addPlugin(this._getAbsMid("./plugins/popupManager"), {
                enabled: d.showInfoWindowOnClick
            });
            this._zoomStartHandler = x(this, this._zoomStartHandler);
            this._zoomingHandler = x(this, this._zoomingHandler);
            this._zoomEndHandler = x(this, this._zoomEndHandler);
            this._panningHandler = x(this, this._panningHandler);
            this._panEndHandler = x(this, this._panEndHandler);
            this._endTranslate = x(this, this._endTranslate);
            la.addOnWindowUnload(this, this.destroy)
        },
        _getAbsMid: function(a) {
            return P.toAbsMid ? P.toAbsMid(a) : ia.id.replace(/\/[^\/]*$/ig, "/") + a
        },
        _cleanUp: function() {
            var a = this.infoWindow;
            a && (a._ootb && a.destroy ? a.destroy() : a.unsetMap(this), delete this.infoWindow);
            O(this._tsTimeExtentChange_connect);
            this.removePlugin("./plugins/popupManager");
            Q.destroy(this.root);
            this.root =
                null
        },
        _addLayer: function(a, b, c) {
            var d = a.id = a.id || (a instanceof E ? J.graphicsLayerNamePrefix : J.layerNamePrefix) + ga++;
            this._layers[d] = a;
            var e, f;
            if (b === this.layerIds || b === this.graphicsLayerIds) e = this._layerSize, this._layerSize++;
            a._isRefLayer = "top" === c;
            c = !t.isDefined(c) || 0 > c || c > b.length || "top" === c ? b.length : c;
            0 === e && (this._firstLayerId = d);
            if (!a._isRefLayer)
                for (;
                    (f = this.getLayer(b[c - 1])) && f._isRefLayer;) c--;
            b.splice(c, 0, d);
            var g = x(this, this._addLayerHandler),
                h = this;
            c = this._connects;
            f = function() {
                a.loaded ?
                    h._onLoadFix ? (h._onLoadFix = !1, setTimeout(function() {
                        g(a)
                    }, 0)) : g(a) : (h[d + "_addtoken_load"] = W(a, "onLoad", h, "_addLayerHandler"), h[d + "_addtoken_err"] = W(a, "onError", h, function(c) {
                        g(a, c, b)
                    }))
            };
            this.loaded || 0 === e || a.loaded && -1 === I(this.graphicsLayerIds, d) ? f() : c.push(W(this, "onLoad", f));
            return a
        },
        _addLayerHandler: function(a, b, c) {
            var d = this.id,
                e = a.id,
                f = I(a instanceof E ? this.graphicsLayerIds : this.layerIds, e),
                g = f,
                h = !1,
                k = this._params;
            O(this[e + "_addtoken_load"]);
            O(this[e + "_addtoken_err"]);
            if (b) delete this._layers[e], -1 !== f && (c.splice(f, 1), this.onLayerAddResult(a, b));
            else {
                -1 === f && (f = I(this._internalLayerIds, e), g = 20 + f, h = !0);
                if (e === this._firstLayerId) {
                    b = a.spatialReference;
                    if ((c = this.extent && this.extent.spatialReference) && !c.equals(b) && (a.tileInfo || !a.url)) c = null;
                    c = this.spatialReference = c || b;
                    this.wrapAround180 = this.wrapAround180 && c && c._isWrappable() ? !0 : !1;
                    a.tileInfo && (this.__tileInfo ? (b = this.__tileInfo.lods, this.__tileInfo = S({}, a.tileInfo), this.__tileInfo.lods = b) : (fa(S({}, a.tileInfo), k), this.__tileInfo = k.tileInfo));
                    if (this.wrapAround180) {
                        b = this.__tileInfo;
                        c = c._getInfo();
                        if (!b || Math.abs(c.origin[0] - b.origin.x) > c.dx) this.wrapAround180 = !1;
                        this.wrapAround180 && b && ca._addFrameInfo(b, c)
                    }
                    k.units = a.units;
                    if ((b = this.__tileInfo && this.__tileInfo.lods) && b.length) {
                        c = k.minScale;
                        var f = k.maxScale,
                            l = -1,
                            u = -1,
                            n = !1,
                            ha = !1,
                            q;
                        for (q = 0; q < b.length; q++) 0 < c && (!n && c >= b[q].scale) && (l = b[q].level, n = !0), 0 < f && (!ha && f >= b[q].scale) && (u = 0 < q ? b[q - 1].level : -1, ha = !0); - 1 === k.minZoom && (k.minZoom = 0 === c ? b[0].level : l); - 1 === k.maxZoom && (k.maxZoom = 0 === f ? b[b.length -
                            1].level : u);
                        for (q = 0; q < b.length; q++) k.minZoom === b[q].level && (k.minScale = b[q].scale), k.maxZoom === b[q].level && (k.maxScale = b[q].scale)
                    } else k.minZoom = k.maxZoom = k.zoom = -1
                }
                a instanceof E ? (this._gc || (this._gc = new E._GraphicsContainer, this._gc._setMap(this, this._layersDiv).id = d + "_gc"), g = a._setMap(this, this._gc._surface), g.id = d + "_" + e, this._layerDivs[e] = g, this._reorderLayers(this.graphicsLayerIds)) : (g = a._setMap(this, this._layersDiv, g, this.__LOD), g.id = d + "_" + e, this._layerDivs[e] = g, this._reorderLayers(this.layerIds), !h && -1 !== a.declaredClass.indexOf("VETiledLayer") && this._onBingLayerAdd(a));
                e === this._firstLayerId && (this.graphics = new E({
                    id: d + "_graphics",
                    displayOnPan: k.displayGraphicsOnPan
                }), this._addLayer(this.graphics, this._internalLayerIds, 20));
                if (a === this.graphics) {
                    c = this._layers[this._firstLayerId];
                    d = k.zoom;
                    g = k.scale;
                    b = k.center;
                    c = c.initialExtent || c.fullExtent;
                    this._firstLayerId = null;
                    this.extent && (this.extent = this._convertGeometry(this, this.extent));
                    !this.extent && c && (b && (b = this._convertGeometry(c, b)), b && (c =
                        c.centerAt(b)));
                    if (b = this.extent || c && new A(c.toJson())) - 1 < d ? b = this.__getExtentForLevel(d, null, b).extent : 0 < g && (b = G.getExtentForScale(this, g, b));
                    if (!b) {
                        console.log("Map: " + this.invalidExtent);
                        return
                    }
                    d = this._fixExtent(b, k.fitExtent);
                    this.extent = d.extent;
                    this.__LOD = d.lod;
                    this.__setExtent(this.extent, null, null, k.fitExtent);
                    this.loaded = !0;
                    this.attr("data-loaded", "");
                    this.infoWindow.setMap(this);
                    this.onLoad(this)
                }
                h || (this.onLayerAdd(a), this.onLayerAddResult(a));
                O(this[e + "_addLayerHandler_connect"])
            }
        },
        _convertGeometry: function(a,
            b) {
            var c = a && a.spatialReference,
                d = b && b.spatialReference;
            c && (d && !c.equals(d)) && (c._canProject(d) ? c.isWebMercator() ? b = Y.geographicToWebMercator(b) : 4326 === c.wkid && (b = Y.webMercatorToGeographic(b, !0)) : (console.log("Map: " + t.substitute({
                geometry: d.wkid || d.wkt,
                map: c.wkid || c.wkt
            }, this.invalidGeometry)), b = null));
            return b
        },
        _reorderLayers: function(a) {
            var b = this.onLayerReorder,
                c = Q.place,
                d = this._layerDivs,
                e = this._layers,
                f = this._gc ? this._gc._surface.getEventSource() : null;
            if (a === this.graphicsLayerIds) m.forEach(a,
                function(a, g) {
                    var h = d[a];
                    h && (c(h.getEventSource(), f, g), b(e[a], g))
                });
            else {
                var g = this.graphics,
                    h = g ? g.id : null,
                    k = this._layersDiv,
                    l;
                m.forEach(a, function(a, f) {
                    l = d[a];
                    a !== h && l && (c(l, k, f), b(e[a], f))
                });
                f && (f = 9 > R("ie") ? f.parentNode : f, c(f, f.parentNode, a.length))
            }
            this.onLayersReordered([].concat(a))
        },
        _zoomStartHandler: function() {
            this.__zoomStart(this._zoomAnimDiv.startingExtent, this._zoomAnimDiv.anchor)
        },
        _zoomingHandler: function(a) {
            var b = parseFloat(a.left),
                c = parseFloat(a.top);
            a = new A(b, c - parseFloat(a.height),
                b + parseFloat(a.width), c, this.spatialReference);
            b = this.extent.getWidth() / a.getWidth();
            this.__zoom(a, b, this._zoomAnimDiv.anchor)
        },
        _zoomEndHandler: function() {
            var a = this._zoomAnimDiv,
                b = a.extent,
                c = this.extent.getWidth() / b.getWidth(),
                d = a.anchor,
                e = a.newLod,
                f = a.levelChange;
            a.extent = a.anchor = a.levelChange = a.startingExtent = a.newLod = this._delta = this._zoomAnim = null;
            this.__zoomEnd(b, c, d, e, f)
        },
        _panningHandler: function(a) {
            if (isNaN(parseFloat(a.left)) || isNaN(parseFloat(a.top))) {
                var b = Math.round,
                    c = this._panAnim.node;
                a.left = -1 * (this._delta.x - b(this.width / 2)) + "px";
                a.top = -1 * (this._delta.y - b(this.height / 2)) + "px";
                V.set(c, "left", a.left);
                V.set(c, "top", a.top)
            }
            a = new C(parseFloat(a.left), parseFloat(a.top));
            b = this.toMap(a);
            this.onPan(this.extent.offset(this.extent.xmin - b.x, this.extent.ymax - b.y), a)
        },
        _panEndHandler: function(a) {
            this.__panning = !1;
            var b = Math.round;
            a = new C(-b(parseFloat(a.style.left)), -b(parseFloat(a.style.top)));
            var b = a.x,
                c = a.y,
                d = this.__visibleRect,
                e = this.__visibleDelta;
            d.x += -b;
            d.y += -c;
            e.x += -b;
            e.y += -c;
            B(this._zoomAnimDiv, {
                left: "0px",
                top: "0px"
            });
            var d = this.extent,
                e = this._ratioW,
                f = this._ratioH,
                d = new A(d.xmin + b / e, d.ymin - c / f, d.xmax + b / e, d.ymax - c / f, this.spatialReference);
            a.setX(-a.x);
            a.setY(-a.y);
            this._delta = this._panAnim = null;
            this._updateExtent(d);
            this.onPanEnd(d, a);
            this._fireExtChg([d, a, !1, this.__LOD])
        },
        _fixExtent: function(a, b) {
            for (var c = this._reshapeExtent(a), d = 1.25; !0 === b && (c.extent.getWidth() < a.getWidth() || c.extent.getHeight() < a.getHeight()) && 0 < c.lod.level && 3 >= d;) c = this._reshapeExtent(a.expand(d)), d += 0.25;
            return c
        },
        _getFrameWidth: function() {
            var a = -1,
                b = this.spatialReference._getInfo();
            this.__LOD ? (b = this.__LOD._frameInfo) && (a = b[3]) : b && (a = Math.round(2 * b.valid[1] / (this.extent.getWidth() / this.width)));
            return a
        },
        _fixAspectRatio: function(a) {
            var b = a.getWidth(),
                c = a.getHeight(),
                d = b / c,
                e = this.width / this.height,
                f = 0,
                g = 0;
            this.width > this.height ? b > c ? e > d ? f = c * e - b : g = b / e - c : f = c * e - b : this.width < this.height ? b < c ? e > d ? f = c * e - b : g = b / e - c : g = b / e - c : b < c ? f = c - b : b > c && (g = b / e - c);
            f && (a.xmin -= f / 2, a.xmax += f / 2);
            g && (a.ymin -= g / 2, a.ymax += g / 2);
            return a
        },
        _reshapeExtent: function(a) {
            a =
                this._fixAspectRatio(a);
            return this._getAdjustedExtent(a)
        },
        _getAdjustedExtent: function(a) {
            if (this.__tileInfo) return ca.getCandidateTileInfo(this, this.__tileInfo, a);
            var b = G.getScale(this, a),
                c = this.getMinScale(),
                d = this.getMaxScale(),
                e = !d || b >= d;
            c && !(b <= c) ? a = G.getExtentForScale(this, c, a) : e || (a = G.getExtentForScale(this, d, a));
            return {
                extent: a
            }
        },
        _onBingLayerAdd: function(a) {
            this["__" + a.id + "_vis_connect"] = z.connect(a, "onVisibilityChange", this, "_toggleBingLogo");
            this._toggleBingLogo(a.visible)
        },
        _onBingLayerRemove: function(a) {
            z.disconnect(this["__" +
                a.id + "_vis_connect"]);
            delete this["__" + a.id + "_vis_connect"];
            var b = m.some(this.layerIds, function(b) {
                return (a = this._layers[b]) && a.visible && -1 !== a.declaredClass.indexOf("VETiledLayer")
            }, this);
            this._toggleBingLogo(b)
        },
        _toggleBingLogo: function(a) {
            a && !this._bingLogo ? (a = {
                    left: this._mapParams && this._mapParams.nav ? "25px" : ""
                }, 6 === R("ie") && (a.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled\x3d'true', sizingMethod\x3d'crop', src\x3d'" + P.toUrl("./images/map/bing-logo-lg.png") + "')"), a = this._bingLogo =
                Q.create("div", {
                    style: a
                }, this.root), X.add(a, "bingLogo-lg")) : !a && this._bingLogo && (Q.destroy(this._bingLogo), delete this._bingLogo)
        },
        __panStart: function(a, b) {
            var c = this._zoomAnim,
                d = this._panAnim;
            if (c && c._active) c.stop(), c._fire("onEnd", [c.node]);
            else if (d && d._active) {
                d.stop();
                this._panAnim = null;
                var d = d.curve.getValue(d._getStep()),
                    c = Math.round(parseFloat(d.left)),
                    d = Math.round(parseFloat(d.top)),
                    e = this.navigationManager._dragOrigin;
                this.__pan(c, d);
                e && (e.x -= c, e.y -= d);
                return
            }
            this.__panning = !0;
            this.onPanStart(this.extent,
                new C(a, b))
        },
        __pan: function(a, b) {
            var c = this.extent,
                d = this._ratioW,
                e = this._ratioH;
            this.onPan(new A(c.xmin - a / d, c.ymin + b / e, c.xmax - a / d, c.ymax + b / e, this.spatialReference), new C(a, b))
        },
        __panEnd: function(a, b) {
            var c = this.__visibleRect,
                d = this.__visibleDelta;
            c.x += a;
            c.y += b;
            d.x += a;
            d.y += b;
            var c = new C(a, b),
                d = this.extent,
                e = this._ratioW,
                f = this._ratioH,
                d = new A(d.xmin - a / e, d.ymin + b / f, d.xmax - a / e, d.ymax + b / f, this.spatialReference);
            this.__panning = !1;
            this._updateExtent(d);
            this.onPanEnd(d, c);
            this._fireExtChg([d, c, !1, this.__LOD])
        },
        __zoomStart: function(a, b) {
            this.__zooming = !0;
            this.onZoomStart(a, 1, b, this.__LOD ? this.__LOD.level : null)
        },
        __zoom: function(a, b, c) {
            this.onZoom(a, b, c)
        },
        __zoomEnd: function(a, b, c, d, e) {
            B(this._layersDiv, {
                left: "0px",
                top: "0px"
            });
            this._delta = new C(0, 0);
            this.__visibleRect.x = this.__visibleRect.y = 0;
            a = new A(a);
            this.__LOD = d;
            this._ratioW = this.width / a.getWidth();
            this._ratioH = this.height / a.getHeight();
            var f = this._delta;
            this._delta = null;
            this.__zooming = !1;
            this._updateExtent(a, e);
            this.onZoomEnd(a, b, c, d ? d.level : null);
            this._fireExtChg([a,
                f, e, d
            ])
        },
        _extentUtil: function(a, b, c, d, e) {
            var f = new aa,
                g, h, k, l, u, n, m, q, v, y, r = this.width,
                p = this.height,
                L, s, w;
            a && (g = a.numLevels, h = a.targetLevel, L = t.isDefined(h), k = a.factor, l = a.mapAnchor, u = a.screenAnchor, n = a.mapCenter, s = a.levelOrFactor, m = a.targetScale, q = t.isDefined(m) && 0 < m);
            b && (v = b.dx, y = b.dy, n = b.mapCenter);
            H.isArray(n) && (n = new M(n));
            var z = this._panAnim;
            b = (a = this._stopAnim()) ? a.divExtent : this.extent;
            var B = this.__tileInfo,
                F = this._params;
            if (!this.loaded) {
                if (c) b && (c = this._convertGeometry(b, c)), c && (this.extent =
                    c, F.zoom = F.scale = -1, F.center = null);
                else if (n || L || q) {
                    if (n)
                        if (b) {
                            if (n = this._convertGeometry(b, n)) this.extent = b.centerAt(n), F.center = null
                        } else F.center = n;
                    L && -1 < h ? (F.zoom = h, F.scale = -1) : q && (F.scale = m, F.zoom = -1)
                }
                f.resolve();
                return f
            }
            if (n && (n = this._convertGeometry(this, n), !n) || l && (l = this._convertGeometry(this, l), !l) || c && (c = this._convertGeometry(this, c), !c)) return f.reject(), f;
            z && (l && u) && (l = T(this.extent, r, p, u));
            a && (l && u) && (l = T(a.divExtent, r, p, u));
            L && (B ? (g = this.getMinZoom(), L = this.getMaxZoom(), h < g ? h = g : h >
                L && (h = L), g = h - (a ? a.level : this.getLevel())) : (g = 0 < h ? -1 : 1, w = s ? h : null));
            if (!c)
                if (t.isDefined(g)) B ? (r = a ? a.level : this.getLevel(), p = this.__getExtentForLevel(r + g, n, b).extent) : (p = (a ? a.end : this.extent).expand(w || (0 < g ? 0.5 * g : 2 * -g)), w && n && (p = p.centerAt(n))), p && (n ? c = p : (r = l || b.getCenter(), v = b.ymax - (p.getHeight() - b.getHeight()) * (r.y - b.ymax) / b.getHeight(), r = b.xmin - (p.getWidth() - b.getWidth()) * (r.x - b.xmin) / b.getWidth(), c = new A(r, v - p.getHeight(), r + p.getWidth(), v, this.spatialReference)));
                else if (q) c = G.getExtentForScale(this,
                m, b);
            else if (t.isDefined(k)) c = b.expand(k);
            else if (v || y) a ? (c = a.end, l = c.getCenter(), w = $(c, r, p, l), w.x += v, w.y += y, w = T(c, r, p, w), c = c.offset(w.x - l.x, w.y - l.y)) : (v = new C(r / 2 + v, p / 2 + y), y = T(b, r, p, v), p = b.getWidth(), v = b.getHeight(), r = y.x - p / 2, y = y.y - v / 2, c = new A(r, y, r + p, y + v, this.spatialReference));
            c || (n ? (b = a ? a.end : b, p = b.getWidth(), v = b.getHeight(), r = n.x - p / 2, y = n.y - v / 2, c = new A(r, y, r + p, y + v, this.spatialReference)) : a && (c = a.end));
            c ? (this._extentDfd && -1 === this._extentDfd.fired && (this._extentDfd.then(null, za), this._extentDfd.reject()),
                this._extentDfd = f, this.__setExtent(c, null, u, d, a, e)) : f.reject();
            return f
        },
        __setExtent: function(a, b, c, d, e, f) {
            try {
                if (this._firstLayerId) this.extent = a;
                else {
                    var g = !0,
                        h = this.spatialReference,
                        k = e ? e.divExtent : this.extent,
                        l = this._fixExtent(a, d || !1);
                    a = l.extent;
                    var u = a.getWidth(),
                        n = a.getHeight(),
                        m = Math.round;
                    if (k) var q = m(1E6 * k.getWidth()),
                        v = m(1E6 * u),
                        y = m(1E6 * k.getHeight()),
                        r = m(1E6 * n),
                        g = q !== v || y !== r;
                    var p, t, s = e && e.rect,
                        w = e && e.divExtent;
                    if (J.zoomDuration && g && k) {
                        w = w || new A(k);
                        s = s || {
                            left: k.xmin,
                            top: k.ymax,
                            width: k.getWidth(),
                            height: k.getHeight()
                        };
                        t = {
                            left: a.xmin,
                            top: a.ymax,
                            width: u,
                            height: n
                        };
                        var z = new M(a.xmin, a.ymax, h),
                            D = new M(a.xmin, a.ymin, h),
                            F = new M(this.extent.xmin, this.extent.ymax, h),
                            E = new M(this.extent.xmin, this.extent.ymin, h);
                        p = ua.getLineIntersection(F, z, E, D, h);
                        !p && !e && (g = !1)
                    }
                    this._ratioW = this.width / u;
                    this._ratioH = this.height / n;
                    var K = this._zoomAnimDiv;
                    if (g) B(this._layersDiv, {
                        left: "0px",
                        top: "0px"
                    }), b = new C(0, 0), this.__visibleRect.x = this.__visibleRect.y = 0, s && t ? (this._delta = b, K.id = "_zAD", K.startingExtent = w, K.extent =
                        a, K.levelChange = g, K.newLod = l.lod, K.anchor = c ? c : !p && e ? e.anchor : $(this.extent, this.width, this.height, p), this._zoomAnim = ba.resize({
                            node: K,
                            start: s,
                            end: t,
                            duration: J.zoomDuration,
                            rate: J.zoomRate,
                            beforeBegin: !e ? this._zoomStartHandler : null,
                            onAnimate: this._zoomingHandler,
                            onEnd: this._zoomEndHandler
                        }).play(), this._fireOnScale(this.extent.getWidth() / a.getWidth(), K.anchor)) : (this._updateExtent(a, g), this._fireExtChg([this.extent, b, g, this.__LOD = l.lod]));
                    else if (!this.__panning)
                        if (!1 === this.loaded || f) this._updateExtent(a,
                            g), this._fireExtChg([this.extent, b, g, this.__LOD = l.lod]);
                        else {
                            this.__panning = !0;
                            s = (new N(0, 0, this.width, this.height, this.spatialReference)).getCenter();
                            s.x = m(s.x);
                            s.y = m(s.y);
                            var x = this._delta = this.toScreen(a.getCenter()),
                                G = Math.abs(s.x - x.x),
                                H = Math.abs(s.y - x.y);
                            5E4 < G || 5E4 < H ? (this.__visibleRect.x = this.__visibleRect.y = this.__visibleDelta.x = this.__visibleDelta.y = 0, this.__panning = !1, this._delta = null, this._updateExtent(a, !1), this._fireExtChg([this.extent, new C(0, 0), !0, this.__LOD])) : this.optimizePanAnimation &&
                                (G > 2 * this.width || H > 2 * this.height) ? (b = new C(s.x - x.x, s.y - x.y), this.__panStart(s.x, s.y), this.__pan(b.x, b.y), this.__panEnd(b.x, b.y)) : (this.onPanStart(this.extent, new C(0, 0)), this._panAnim = ba.slideTo({
                                    node: K,
                                    left: s.x - x.x,
                                    top: s.y - x.y,
                                    duration: J.panDuration,
                                    rate: J.panRate,
                                    onAnimate: this._panningHandler,
                                    onEnd: this._panEndHandler
                                }), this._panAnim.play())
                        }
                }
            } catch (I) {
                console.log(I.stack), console.error(I)
            }
        },
        _fireOnScale: function(a, b, c) {
            if ("css-transforms" === this.navigationMode) {
                var d = this.__visibleDelta;
                this.onScale(pa.scaleAt(a, {
                    x: -1 * (this.width / 2 - (b.x - d.x)),
                    y: -1 * (this.height / 2 - (b.y - d.y))
                }), c)
            }
        },
        _stopAnim: function() {
            var a = this._zoomAnim,
                b = this._panAnim;
            if (a && a._active) {
                a.stop();
                var b = a.curve.getValue(a._getStep()),
                    c = parseFloat(b.left),
                    d = parseFloat(b.top),
                    a = a.node;
                return {
                    anchor: a.anchor,
                    start: a.startingExtent,
                    end: a.extent,
                    level: a.newLod && a.newLod.level,
                    rect: b,
                    divExtent: new A(c, d - parseFloat(b.height), c + parseFloat(b.width), d, this.spatialReference)
                }
            }
            b && b._active && (b.stop(), b._fire("onEnd", [b.node]))
        },
        __getExtentForLevel: function(a,
            b, c) {
            var d = this.__tileInfo,
                d = d && d.lods;
            a = t.isDefined(a) ? a : 0;
            c = c || this.extent;
            b = b || c && c.getCenter();
            if (d) {
                if (b) {
                    c = this.getMinZoom();
                    var e = this.getMaxZoom();
                    a > e && (a = e);
                    a < c && (a = c);
                    a = d[a];
                    d = this.width * a.resolution / 2;
                    c = this.height * a.resolution / 2;
                    return {
                        extent: new A(b.x - d, b.y - c, b.x + d, b.y + c, b.spatialReference),
                        lod: a
                    }
                }
            } else if (c) return {
                extent: c.expand(!a || 1 > a ? 1 : a).centerAt(b)
            };
            console.log("Map: " + this.invalidExtent)
        },
        _jobs: 0,
        _incr: function() {
            1 === ++this._jobs && (this.updating = !0, this.attr("data-updating", ""),
                this.onUpdateStart())
        },
        _decr: function() {
            var a = --this._jobs;
            a ? 0 > a && (this._jobs = 0) : (this.updating = !1, this.attr("data-updating"), this.onUpdateEnd())
        },
        _fireEvent: function(a, b) {
            this[a] && this[a].apply(this, b)
        },
        _updateExtent: function(a, b) {
            this.extent = a;
            b && this._setClipRect();
            var c = this.spatialReference;
            c && (c.isWebMercator() ? this.geographicExtent = Y.webMercatorToGeographic(this._getAvailExtent(), !0) : 4326 === c.wkid && (this.geographicExtent = new A(this._getAvailExtent().toJson())))
        },
        _fireExtChg: function(a) {
            this.attr("data-zoom",
                this.getZoom());
            this.attr("data-scale", this.getScale());
            this._fireEvent("onExtentChange", a);
            if (a = this._extentDfd) delete this._extentDfd, a.resolve()
        },
        attr: function(a, b) {
            var c = this.container;
            c && (null == b ? c.removeAttribute(a) : c.setAttribute(a, b));
            return this
        },
        onUpdateStart: function() {},
        onUpdateEnd: function() {},
        onLoad: function() {
            this._setClipRect()
        },
        onBeforeUnload: function() {},
        onUnload: function() {},
        onExtentChange: function(a, b, c) {},
        onTimeExtentChange: function() {},
        onLayerAdd: function() {},
        onLayerAddResult: function() {},
        onLayersAddResult: function() {},
        onLayerRemove: function() {},
        onLayersRemoved: function() {},
        onLayerReorder: function() {},
        onLayersReordered: function() {},
        onLayerSuspend: function() {},
        onLayerResume: function() {},
        onPanStart: function() {},
        onPan: function() {},
        onPanEnd: function() {},
        onScale: function() {},
        onZoomStart: function() {},
        onZoom: function() {},
        onZoomEnd: function() {},
        onResize: function() {
            this._setClipRect()
        },
        onReposition: function() {},
        destroy: function() {
            this._destroyed || (this.onBeforeUnload(this), this.removeAllLayers(),
                this._cleanUp(), this._gc && this._gc._cleanUp(), this._destroyed = !0, this.onUnload(this))
        },
        setCursor: function(a) {
            B(this.__container, "cursor", this.cursor = a)
        },
        setMapCursor: function(a) {
            this.setCursor(this._cursor = a)
        },
        resetMapCursor: function() {
            this.setCursor(this._cursor)
        },
        setInfoWindow: function(a) {
            var b = this.infoWindow;
            b && b.unsetMap(this);
            this.infoWindow = a;
            this.loaded && a && a.setMap(this)
        },
        setInfoWindowOnClick: function(a) {
            this._params.showInfoWindowOnClick = a;
            this.popupManager && this.popupManager.set("enabled",
                a)
        },
        getInfoWindowAnchor: function(a) {
            return this.infoWindow && this.infoWindow._getAnchor && this.infoWindow._getAnchor(a) || "upperright"
        },
        toScreen: function(a, b) {
            return $(this.extent, this.width, this.height, a, b)
        },
        toMap: function(a) {
            return T(this.extent, this.width, this.height, a)
        },
        addLayer: function(a, b) {
            a && !this.getLayer(a.id) && this._addLayer(a, a instanceof E ? this.graphicsLayerIds : this.layerIds, b);
            return a
        },
        addLayers: function(a) {
            var b = [],
                c = a.length,
                d, e, f = a.length;
            d = z.connect(this, "onLayerAddResult", function(e,
                f) {
                -1 !== m.indexOf(a, e) && (c--, b.push({
                    layer: e,
                    success: !f,
                    error: f
                }), c || (z.disconnect(d), this.onLayersAddResult(b)))
            });
            for (e = 0; e < f; e++) this.addLayer(a[e]);
            return this
        },
        removeLayer: function(a, b) {
            var c = a.id,
                d = a instanceof E ? this.graphicsLayerIds : this.layerIds,
                e = I(d, c);
            0 <= e && (d.splice(e, 1), a instanceof E ? (O(this["_gl_" + a.id + "_click_connect"]), a.loaded && a._unsetMap(this, this._gc._surface)) : a.loaded && (a._unsetMap(this, this._layersDiv), -1 !== a.declaredClass.indexOf("VETiledLayer") && this._onBingLayerRemove(a)),
                delete this._layers[c], delete this._layerDivs[c], b || this._reorderLayers(d), this.onLayerRemove(a))
        },
        removeAllLayers: function() {
            var a = this.layerIds,
                b;
            for (b = a.length - 1; 0 <= b; b--) this.removeLayer(this._layers[a[b]], 1);
            a = this.graphicsLayerIds;
            for (b = a.length - 1; 0 <= b; b--) this.removeLayer(this._layers[a[b]], 1);
            this.onLayersRemoved()
        },
        reorderLayer: function(a, b) {
            H.isString(a) && (ja.deprecated(this.declaredClass + ": Map.reorderLayer(/*String*/ id, /*Number*/ index) deprecated. Use Map.reorderLayer(/*Layer*/ layer, /*Number*/ index).",
                null, "v2.0"), a = this.getLayer(a));
            var c = a.id,
                d, e = a instanceof E ? this.graphicsLayerIds : this.layerIds;
            0 > b ? b = 0 : b >= e.length && (b = e.length - 1);
            d = I(e, c); - 1 === d || d === b || (e.splice(d, 1), e.splice(b, 0, c), this._reorderLayers(e))
        },
        getLayer: function(a) {
            return this._layers[a]
        },
        setExtent: function(a, b) {
            a = new A(a.toJson());
            var c = a.getWidth(),
                d = a.getHeight();
            return 0 === c && 0 === d ? this.centerAt(new M({
                x: a.xmin,
                y: a.ymin,
                spatialReference: a.spatialReference && a.spatialReference.toJson()
            })) : this._extentUtil(null, null, a, b)
        },
        centerAt: function(a) {
            return this._extentUtil(null, {
                mapCenter: a
            })
        },
        centerAndZoom: function(a, b) {
            return this._extentUtil({
                targetLevel: b,
                mapCenter: a,
                levelOrFactor: !0
            })
        },
        getScale: function() {
            return this.__LOD ? this.__LOD.scale : G.getScale(this)
        },
        getResolution: function() {
            return this.__LOD ? this.__LOD.resolution : this.extent ? this.extent.getWidth() / this.width : 0
        },
        getResolutionInMeters: function() {
            return this.getResolution() * (G.getUnitValue(this.spatialReference) || 20015077 / 180)
        },
        getMinScale: function() {
            return this._params.minScale
        },
        getMaxScale: function() {
            return this._params.maxScale
        },
        setScale: function(a) {
            return this._extentUtil({
                targetScale: a
            })
        },
        getLayersVisibleAtScale: function(a) {
            var b = [];
            (a = a || this.getScale()) && m.forEach(this.layerIds.concat(this.graphicsLayerIds), function(c) {
                c = this.getLayer(c);
                c.isVisibleAtScale(a) && b.push(c)
            }, this);
            return b
        },
        getNumLevels: function() {
            var a = this.getMinZoom(),
                b = this.getMaxZoom();
            return a === b && 0 > a ? 0 : b - a + 1
        },
        getLevel: function() {
            return this.__LOD ? this.__LOD.level : -1
        },
        setLevel: function(a) {
            if (-1 < a) return this._extentUtil({
                targetLevel: a
            })
        },
        getZoom: function() {
            return this.getLevel()
        },
        setZoom: function(a) {
            return this.setLevel(a)
        },
        getMinZoom: function() {
            return this._params.minZoom
        },
        getMaxZoom: function() {
            return this._params.maxZoom
        },
        setBasemap: function(a) {
            var b;
            H.isObject(a) ? (b = a, a = b.title) : b = D && D[a];
            if (b) {
                this._basemapDfd && -1 === this._basemapDfd.fired && this._basemapDfd.cancel();
                var c = [],
                    d = [],
                    e = 0;
                m.forEach(b.baseMapLayers || b.layers, function(b) {
                    var f, g = {
                        id: b.id,
                        displayLevels: b.displayLevels,
                        opacity: t.isDefined(b.opacity) ? b.opacity : null,
                        visible: t.isDefined(b.visibility) ? b.visibility : null
                    };
                    if (b.type) switch (b.type) {
                        case "OpenStreetMap":
                            f = new ea(g);
                            break;
                        default:
                            console.log("Map.setBasemap: " + t.substitute({
                                basemapName: a,
                                type: b.type
                            }, this.unknownLayerType))
                    } else {
                        f = b.url;
                        if ("https:" === window.location.protocol && (-1 !== f.search(/^http\:\/\/server\.arcgisonline\.com/i) || -1 !== f.search(/^http\:\/\/services\.arcgisonline\.com/i) || -1 !== f.search(/^http\:\/\/.+\.arcgis\.com/i))) f = f.replace(/http:/i, "https:");
                        f = new xa(f, g)
                    }
                    f && (c.push(f), d.push(b), b.isReference || e++)
                }, this);
                if (!c.length || !e) console.log("Map.setBasemap: " +
                    t.substitute({
                        basemapName: a
                    }, this.invalidBasemap));
                else {
                    var f = {
                        basemapName: a,
                        infos: d,
                        layers: c
                    };
                    if (this.loaded) {
                        var g = this,
                            h = new aa(sa._dfdCanceller),
                            k = function(a) {
                                h._pendingLayers--;
                                a = m.indexOf(f.layers, this);
                                if (-1 < a && (a = h._layerEvents[a])) z.disconnect(a[0]), z.disconnect(a[1]);
                                0 >= h._pendingLayers && (delete h._layerEvents, delete g._basemapDfd, 0 > h.fired && h.callback(f))
                            };
                        this._basemapDfd = h;
                        h._pendingLayers = 0;
                        h._layerEvents = {};
                        m.forEach(c, function(a, b) {
                            a && (h._pendingLayers++, a.loaded ? k(a) : h._layerEvents[b] = [z.connect(a, "onLoad", a, k), z.connect(a, "onError", a, k)])
                        });
                        h.addCallback(x(this, this._basemapLoaded))
                    } else this._basemapLoaded(f)
                }
            } else {
                b = [];
                for (var l in D) b.push(l);
                console.log("Map.setBasemap: " + t.substitute({
                    basemapName: a,
                    list: b.join(",")
                }, this.unknownBasemap))
            }
        },
        _basemapLoaded: function(a) {
            var b = a.layers,
                c = a.infos,
                d = 0,
                e = !0,
                f;
            this.loaded && (m.forEach(b, function(a, b) {
                a.loaded && (c[b].isReference || d++)
            }), e = d);
            e && (this.basemapLayerIds && (f = {
                    basemapName: this._basemap,
                    infos: D && D[this._basemap] && D[this._basemap].baseMapLayers
                },
                f.basemapName || (m.forEach(this.basemapLayerIds, function(a) {
                    if (this.getLayer(a) instanceof ea) return f.basemapName = "osm", f.infos = D && D.osm && D.osm.baseMapLayers, !1
                }, this), f.basemapName || (f = null))), this._removeBasemap(), this._basemap = a.basemapName, this.basemapLayerIds = this._addBasemap(b, c), this.attr("data-basemap", this.getBasemap()), this.emit("basemap-change", {
                current: a,
                previous: f
            }))
        },
        _addBasemap: function(a, b) {
            var c = [],
                d = [],
                e = 0;
            m.forEach(a, function(a, g) {
                b[g].isReference ? c.push(a) : (this.addLayer(a, e++),
                    d.push(a.id))
            }, this);
            c.length && m.forEach(c, function(a) {
                this.addLayer(a, "top");
                d.push(a.id)
            }, this);
            return d
        },
        _removeBasemap: function() {
            var a = this.basemapLayerIds,
                b;
            a && a.length && m.forEach(a, function(a) {
                (b = this.getLayer(a)) && this.removeLayer(b)
            }, this)
        },
        getBasemap: function() {
            return this._basemap || ""
        },
        translate: function(a, b) {
            a = a || 0;
            b = b || 0;
            if (!this._txTimer) {
                this._tx = this._ty = 0;
                var c = this.toScreen(this.extent.getCenter());
                this.__panStart(c.x, c.y)
            }
            this._tx += a;
            this._ty += b;
            this.__pan(this._tx, this._ty);
            clearTimeout(this._txTimer);
            this._txTimer = setTimeout(this._endTranslate, 150)
        },
        _endTranslate: function() {
            clearTimeout(this._txTimer);
            this._txTimer = null;
            var a = this._tx,
                b = this._ty;
            this._tx = this._ty = 0;
            this.__panEnd(a, b)
        },
        setTimeExtent: function(a) {
            a = (this.timeExtent = a) ? new a.constructor(a.toJson()) : null;
            this.onTimeExtentChange(a)
        },
        setTimeSlider: function(a) {
            this.timeSlider && (O(this._tsTimeExtentChange_connect), this.timeSlider = this._tsTimeExtentChange_connect = null);
            a && (this.timeSlider = a, this.setTimeExtent(a.getCurrentTimeExtent()),
                this._tsTimeExtentChange_connect = W(a, "onTimeExtentChange", this, "setTimeExtent"))
        },
        setVisibility: function(a) {
            if (this.visible !== a) {
                this.visible = a;
                a || (this._display = this.container.style.display);
                this.container.style.display = a ? this._display : "none";
                if (this.autoResize) {
                    var b = a ? "resume" : "pause";
                    this._rszSignal[b]();
                    this._oriSignal[b]()
                }
                a && this.resize()
            }
            return this
        },
        resize: function(a) {
            var b = this,
                c = function() {
                    clearTimeout(b._resizeT);
                    b.reposition();
                    b._resize()
                };
            clearTimeout(b._resizeT);
            !0 === a ? c() : b._resizeT =
                setTimeout(c, b.resizeDelay)
        },
        _resize: function() {
            var a = this.width,
                b = this.height,
                c = U.getContentBox(this.container);
            if (!(a === c.w && b === c.h)) {
                var d = this._zoomAnim || this._panAnim;
                d && (d.stop(), d._fire("onEnd", [d.node]));
                B(this.root, {
                    width: (this.width = c.w) + "px",
                    height: (this.height = c.h) + "px"
                });
                c = this.width;
                d = this.height;
                this.attribution && this.attribution.domNode && V.set(this.attribution.domNode, "maxWidth", Math.floor(c * this._mapParams.attributionWidth) + "px");
                this.__visibleRect.update(this.__visibleRect.x, this.__visibleRect.y,
                    c, d);
                this.__visibleDelta.update(this.__visibleDelta.x, this.__visibleDelta.y, c, d);
                var e = new N(this.extent),
                    a = (new N(e.x, e.y, e.width * (c / a), e.height * (d / b), this.spatialReference)).getExtent();
                this.onResize(a, c, d);
                this._extentUtil(null, null, a, null, !0)
            }
        },
        reposition: function() {
            this._reposition();
            this.onReposition(this.position.x, this.position.y)
        },
        _reposition: function() {
            var a = U.position(this.container, !0),
                b = U.getPadBorderExtents(this.container);
            this.position.update(a.x + b.l, a.y + b.t)
        },
        _setClipRect: function() {
            delete this._clip;
            var a = 7 >= R("ie") || void 0 === R("ie") && 7 <= R("trident") ? "rect(auto,auto,auto,auto)" : "auto";
            if (this.wrapAround180) {
                var b = this.width,
                    c = this.height,
                    d = this._getFrameWidth(),
                    e = b - d;
                0 < e && (a = e / 2, a = "rect(0px," + (a + d) + "px," + c + "px," + a + "px)", c = this.extent.getWidth(), b = c * (d / b), this._clip = [(c - b) / 2, b])
            }
            B(this.__container, "clip", a)
        },
        _getAvailExtent: function() {
            var a = this.extent,
                b = this._clip;
            if (b) {
                if (!a._clip) {
                    var c = new N(a);
                    c.width = b[1];
                    c.x += b[0];
                    a._clip = c.getExtent()
                }
                return a._clip
            }
            return a
        },
        _fixedPan: function(a, b) {
            return this._extentUtil(null, {
                dx: a,
                dy: b
            })
        },
        panUp: function() {
            return this._fixedPan(0, -0.75 * this.height)
        },
        panUpperRight: function() {
            return this._fixedPan(0.75 * this.width, -0.75 * this.height)
        },
        panRight: function() {
            return this._fixedPan(0.75 * this.width, 0)
        },
        panLowerRight: function() {
            return this._fixedPan(0.75 * this.width, 0.75 * this.height)
        },
        panDown: function() {
            return this._fixedPan(0, 0.75 * this.height)
        },
        panLowerLeft: function() {
            return this._fixedPan(-0.75 * this.width, 0.75 * this.height)
        },
        panLeft: function() {
            return this._fixedPan(-0.75 * this.width,
                0)
        },
        panUpperLeft: function() {
            return this._fixedPan(-0.75 * this.width, -0.75 * this.height)
        },
        enableSnapping: function(a) {
            a = a || {};
            if ("esri.SnappingManager" === a.declaredClass) this.snappingManager = a;
            else {
                var b = ga++,
                    c = this;
                this._rids && this._rids.push(b);
                P(["./SnappingManager"], function(d) {
                    var e = c._rids ? m.indexOf(c._rids, b) : -1; - 1 !== e && (c._rids.splice(e, 1), c.snappingManager = new d(H.mixin({
                        map: c
                    }, a)))
                })
            }
            return this.snappingManager
        },
        disableSnapping: function() {
            this.snappingManager && this.snappingManager.destroy();
            this.snappingManager = null
        },
        _createLabelLayer: function() {
            function a() {
                b._labels.removeAllFeatureLayers();
                m.forEach(b.graphicsLayerIds, function(a) {
                    a = b.getLayer(a);
                    "function" === typeof a.applyEdits && b._labels.addFeatureLayer(a)
                })
            }
            var b = this;
            !this._labels && (Z && this.loaded) && (this._labels = new Z({
                id: "_internal_LabelLayer"
            }), this._labels._setMap(this, this._gc._surface), a(), this.on("layers-reordered", a))
        }
    })
});