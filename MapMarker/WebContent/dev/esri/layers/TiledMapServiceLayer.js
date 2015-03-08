//>>built
define("esri/layers/TiledMapServiceLayer", ["dojo/_base/declare", "dojo/_base/connect", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/url", "dojo/dom-construct", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojox/collections/ArrayList", "dojox/gfx/matrix", "../kernel", "../config", "../sniff", "../domUtils", "../tileUtils", "../geometry/Point", "../geometry/Rect", "../geometry/Extent", "./layer"], function(P, s, E, A, J, q, K, L, m, M, N, v, Q, x, O, F, z, B, R, S) {
    var C = Q.defaults.map.zoomDuration;
    return P(S, {
        declaredClass: "esri.layers.TiledMapServiceLayer",
        constructor: function(a,
            c) {
            s.connect(this, "onLoad", this, "_initTiledLayer");
            this._lowestLevel = (this._displayLevels = c ? c.displayLevels : null) ? this._displayLevels[0] : 0;
            this.resampling = c ? c.resampling : void 0;
            this._resamplingTolerance = c ? c.resamplingTolerance : null;
            this.exclusionAreas = c ? c.exclusionAreas : null;
            var d = E.hitch;
            this._addImage = d(this, this._addImage);
            this._tileLoadHandler = d(this, this._tileLoadHandler);
            this._tileErrorHandler = d(this, this._tileErrorHandler);
            this._tilePopPop = d(this, this._tilePopPop);
            this._cleanUpRemovedImages =
                d(this, this._cleanUpRemovedImages);
            this._fireOnUpdateEvent = d(this, this._fireOnUpdateEvent);
            this._transitionEnd = d(this, this._transitionEnd);
            this._tileMapCallback = d(this, this._tileMapCallback)
        },
        opacity: 1,
        isPNG32: !1,
        _multiple: 1,
        _initTiledLayer: function() {
            var a = this.tileInfo,
                c = a.lods;
            this.resampling = null != this.resampling ? this.resampling : !1;
            this._tileW = a.width;
            this._tileH = a.height;
            var d = this.scales = [],
                b = this._displayLevels,
                e = "esri.layers.WMTSLayer" === this.declaredClass && 96 != a.dpi,
                f = -Infinity,
                h = Infinity,
                g = this.fullExtent,
                m = new z(g.xmin, g.ymax),
                g = new z(g.xmax, g.ymin),
                l = F.getContainingTileCoords,
                k, p, r, q = c.length;
            for (r = 0; r < q; r++)
                if (p = c[r], e && (p.scale = 96 * p.scale / a.dpi), k = l(a, m, p), p.startTileRow = 0 > k.row ? 0 : k.row, p.startTileCol = 0 > k.col ? 0 : k.col, k = l(a, g, p), p.endTileRow = k.row, p.endTileCol = k.col, !b || -1 !== A.indexOf(b, p.level)) d[r] = p.scale, f = p.scale > f ? p.scale : f, h = p.scale < h ? p.scale : h;
            e && (a.dpi = 96); - Infinity !== f && !this._hasMin && this.setMinScale(f);
            Infinity !== h && !this._hasMax && this.setMaxScale(h);
            this.setExclusionAreas(this.exclusionAreas);
            this._patchIE = 6 <= x("ie") && 7 > x("ie") && (this.isPNG32 || "Mixed" === a.format)
        },
        _isMapAtVisibleScale: function() {
            var a = this.inherited(arguments);
            if (a) {
                var c;
                c = this._map;
                var a = this.scales,
                    d = c.getScale(),
                    b = !1,
                    e = c.width > c.height ? c.width : c.height;
                for (c = 0; c < a.length; c++)
                    if (Math.abs(a[c] - d) / a[c] < 1 / e) {
                        b = !0;
                        break
                    }
                a = b
            }
            return a
        },
        _setMap: function(a, c, d, b) {
            this.inherited(arguments);
            this._map = a;
            var e = this._div = q.create("div", null, c),
                f = a.__visibleDelta,
                h = s.connect,
                g = v._css.names,
                u = {
                    position: "absolute",
                    width: a.width + "px",
                    height: a.height + "px",
                    overflow: "visible"
                };
            "css-transforms" === a.navigationMode ? (u[g.transform] = v._css.translate(-f.x, -f.y), m.set(e, u), delete u[g.transform], u[g.transition] = g.transformName + " " + C + "ms ease", m.set(this._active = q.create("div", null, e), u), this._active._remove = 0, this._passives = []) : (u.left = -f.x + "px", u.top = -f.y + "px", m.set(e, u));
            this._onResizeHandler_connect = h(a, "onResize", this, "_onResizeHandler");
            this._opacityChangeHandler_connect = h(this, "onOpacityChange", this, "_opacityChangeHandler");
            f = this.tileInfo;
            h = f.spatialReference;
            g = h._getInfo();
            (this._wrap = a.wrapAround180 && h._isWrappable() && Math.abs(g.origin[0] - f.origin.x) <= g.dx) && F._addFrameInfo(f, g);
            this.setExclusionAreas(this.exclusionAreas);
            this.evaluateSuspension();
            if (this.suspended && !a.loaded) var l = s.connect(a, "onLoad", this, function() {
                s.disconnect(l);
                l = null;
                this.setExclusionAreas(this.exclusionAreas);
                this.evaluateSuspension()
            });
            return e
        },
        _unsetMap: function(a, c) {
            this.suspended || this._suspendImpl();
            q.destroy(this._div);
            this._map = this._div = null;
            var d =
                s.disconnect;
            d(this._onResizeHandler_connect);
            d(this._opacityChangeHandler_connect);
            this.inherited(arguments)
        },
        onSuspend: function() {
            this.inherited(arguments);
            this._suspendImpl()
        },
        _suspendImpl: function() {
            O.hide(this._div);
            clearTimeout(this._wakeTimer);
            this._wakeTimer = null;
            this._disableDrawConnectors();
            var a = this._tiles,
                c = this._tileIds,
                d = this._loadingList,
                b, e, f = s.disconnect,
                h = q.destroy;
            d && 0 < d.count && (d.forEach(function(c) {
                if (b = a[c]) f(b._onload_connect), f(b._onerror_connect), f(b._onabort_connect), b._onload_connect =
                    b._onerror_connect = b._onabort_connect = null
            }), d.clear(), this._fireUpdateEnd());
            this._removeList.clear();
            for (d = c.length - 1; 0 <= d; d--)(b = (e = c[d]) && a[e]) && h(b);
            if ("css-transforms" === this._map.navigationMode) {
                c = this._active;
                e = this._passives;
                var g;
                this._noDom = 0;
                for (d = e.length - 1; 0 <= d; d--) g = e[d], g._endHandle && f(g._endHandle), g._matrix = g._multiply = g._endHandle = null, g._marked = g._remove = 0, e.splice(d, 1), h(g);
                c._matrix = c._multiply = null;
                c._marked = c._remove = 0
            }
            this._tileIds = this._tiles = this._tileBounds = this._ct = this._loadingList =
                this._removeList = this._standby = null
        },
        onResume: function() {
            this.inherited(arguments);
            this._tileIds = [];
            this._tiles = [];
            this._tileBounds = [];
            this._ct = null;
            this._removeList = new M;
            this._loadingList = new M;
            O.show(this._div);
            this._enableDrawConnectors();
            this._wakeTimer = this._wakeTimer || setTimeout(E.hitch(this, function() {
                this.suspended || this._onExtentChangeHandler(this._map.extent, null, !0, this._map.__LOD)
            }), 0)
        },
        _enableDrawConnectors: function() {
            var a = this._map,
                c = s.connect;
            if ("css-transforms" === a.navigationMode) {
                if (this._onScaleHandler_connect =
                    c(a, "onScale", this, this._onScaleHandler), x("esri-touch") || x("esri-pointer")) {
                    this._standby = [];
                    var d = this,
                        b = function() {
                            d._noDom = 1
                        };
                    this._onPanStartHandler_connect = c(a, "onPanStart", b);
                    this._onZoomStartHandler_connect = c(a, "onZoomStart", b)
                }
            } else this._onZoomHandler_connect = c(a, "onZoom", this, "_onZoomHandler");
            this._onPanHandler_connect = c(a, "onPan", this, "_onPanHandler");
            this._onExtentChangeHandler_connect = c(a, "onExtentChange", this, "_onExtentChangeHandler")
        },
        _disableDrawConnectors: function() {
            var a = s.disconnect;
            a(this._onPanHandler_connect);
            a(this._onZoomHandler_connect);
            a(this._onScaleHandler_connect);
            a(this._onExtentChangeHandler_connect);
            a(this._onPanStartHandler_connect);
            a(this._onZoomStartHandler_connect);
            this._onPanHandler_connect = this._onZoomHandler_connect = this._onScaleHandler_connect = this._onExtentChangeHandler_connect = this._onPanStartHandler_connect = this._onZoomStartHandler_connect = null
        },
        _onResizeHandler: function(a, c, d) {
            a = {
                width: c + "px",
                height: d + "px"
            };
            c = m.set;
            c(this._div, a);
            if ("css-transforms" ===
                this._map.navigationMode) {
                this._active && c(this._active, a);
                for (d = this._passives.length - 1; 0 <= d; d--) c(this._passives[d], a)
            }
        },
        _onExtentChangeHandler: function(a, c, d, b) {
            c = this._map;
            var e = this._standby,
                f;
            clearTimeout(this._wakeTimer);
            this._wakeTimer = null;
            if (!c._isPanningOrZooming()) {
                if ("css-transforms" === c.navigationMode) {
                    if (d)
                        for (b = this._passives.length - 1; 0 <= b; b--) f = this._passives[b], m.set(f, v._css.names.transition, "none"), f._marked ? (this._passives.splice(b, 1), f.parentNode && f.parentNode.removeChild(f),
                            q.destroy(f)) : 0 < f.childNodes.length && (f._multiply = f._multiply ? N.multiply(f._matrix, f._multiply) : f._matrix);
                    this._noDom = 0;
                    if (e && e.length)
                        for (b = e.length - 1; 0 <= b; b--) f = e[b], m.set(f, "visibility", "visible"), this._tilePopPop(f), e.splice(b, 1)
                }
                this._fireUpdateStart();
                this._rrIndex = 0;
                b = F.getCandidateTileInfo(c, this.tileInfo, a);
                a = c.__visibleDelta;
                if (!this._ct || b.lod.level !== this._ct.lod.level || d) {
                    f = b && this._ct && b.lod.level !== this._ct.lod.level;
                    this._ct = b;
                    var h = this._tiles,
                        g = this._tileIds,
                        u = this._tileBounds,
                        l = this._removeList,
                        k, p = g.length;
                    this._cleanUpRemovedImages();
                    for (b = 0; b < p; b++) e = g[b], k = h[e], u[e] = g[b] = null, "css-transforms" === c.navigationMode && (f && k.parentNode && c.fadeOnZoom) && (k._fadeOut = f, k.parentNode._remove++), l.add(k);
                    d && (this._tileIds = [], this._tiles = [], this._tileBounds = [])
                }
                b = a.x;
                d = a.y;
                "css-transforms" === c.navigationMode ? (e = {}, e[v._css.names.transform] = v._css.translate(b, d), m.set(this._div, e)) : m.set(this._div, {
                    left: b + "px",
                    top: d + "px"
                });
                this.__coords_dx = b;
                this.__coords_dy = d;
                this._updateImages(new B(0,
                    0, a.width, a.height));
                0 === this._loadingList.count ? (this._cleanUpRemovedImages(), this.onUpdate(), this._fireUpdateEnd()) : this._fireOnUpdate = !0;
                d = this._tileW;
                h = this._tileH;
                a = new B(-a.x, -a.y, a.width, a.height);
                for (b = this._tileIds.length - 1; 0 <= b; b--)(e = this._tileIds[b]) ? (f = this._tiles[e], g = L.getMarginBox(f), g = new B(g.l, g.t, d, h), "css-transforms" === c.navigationMode && (g.x = f._left, g.y = f._top), a.intersects(g) ? this._tileBounds[e] = g : (this._loadingList.contains(e) && this._tilePopPop(f), q.destroy(f), this._tileIds.splice(b,
                    1), delete this._tileBounds[e], delete this._tiles[e])) : (this._tileIds.splice(b, 1), delete this._tileBounds[e], delete this._tiles[e])
            }
        },
        _onPanHandler: function(a, c) {
            var d = this._map,
                b = d.__visibleDelta.offset(c.x, c.y);
            this.__coords_dx = this.__coords_dy = 0;
            "css-transforms" === d.navigationMode ? (d = {}, d[v._css.names.transform] = v._css.translate(b.x, b.y), m.set(this._div, d), !x("esri-touch") && !x("esri-pointer") && this._updateImages({
                x: -b.x,
                y: -b.y,
                width: b.width,
                height: b.height
            })) : (m.set(this._div, {
                left: b.x + "px",
                top: b.y +
                    "px"
            }), this._updateImages({
                x: -b.x,
                y: -b.y,
                width: b.width,
                height: b.height
            }));
            0 < this._loadingList.count && (this._fireUpdateStart(), this._fireOnUpdate = !0)
        },
        _onScaleHandler: function(a, c) {
            var d, b = {},
                e = v._css.names,
                f = this._map;
            for (d = this._passives.length - 1; 0 <= d; d--) {
                var h = this._passives[d];
                0 === h.childNodes.length ? (this._passives.splice(d, 1), q.destroy(h)) : ("none" === h.style[e.transition] && m.set(h, e.transition, e.transformName + " " + C + "ms ease"), m.set(h, e.transition, c ? "none" : e.transformName + " " + C + "ms ease"), h._matrix =
                    a, b[e.transform] = v._css.matrix(h._multiply ? N.multiply(a, h._multiply) : a), m.set(h, b))
            }
            this._active && 0 === this._active.childNodes.length || (m.set(this._active, e.transition, c ? "none" : e.transformName + " " + C + "ms ease"), this._active._matrix = a, b[e.transform] = v._css.matrix(this._active._matrix), m.set(this._active, b), this._passives.push(this._active), b = {
                position: "absolute",
                width: f.width + "px",
                height: f.height + "px",
                overflow: "visible"
            }, b[e.transition] = e.transformName + " " + C + "ms ease", m.set(this._active = q.create("div",
                null, this._div), b), this._active._remove = 0, f.fadeOnZoom && q.place(this._active, this._div, "first"))
        },
        _onZoomHandler: function(a, c, d) {
            a = L.getMarginBox(this._div);
            d = d.offset(-a.l, -a.t);
            if (!this._previousScale || 1 === c) this._previousScale = 1;
            var b, e = this._tileW * c,
                f = this._tileH * c,
                h = this._tileBounds,
                g = this._tiles,
                u = this._previousScale,
                l = this._multiple,
                k = m.set,
                p, r;
            if ((a = x("ie")) && 8 > a) A.forEach(this._tileIds, function(a) {
                r = "";
                b = h[a];
                p = g[a].style.margin.split(" ");
                A.forEach(p, function(a) {
                    "" !== r && (r += " ");
                    a = parseFloat(a);
                    r += a / u * c + "px"
                });
                k(g[a], {
                    left: b.x - (e - b.width) * (d.x - b.x) / b.width + "px",
                    top: b.y - (f - b.height) * (d.y - b.y) / b.height + "px",
                    margin: 1 !== l && -1 === r.indexOf("NaN") ? r : "",
                    zoom: c
                })
            });
            else {
                var q = e * l,
                    T = f * l,
                    n, v;
                A.forEach(this._tileIds, function(a) {
                    r = "";
                    b = h[a];
                    n = b.x - (e - b.width) * (d.x - b.x) / b.width;
                    v = b.y - (f - b.height) * (d.y - b.y) / b.height;
                    p = g[a].style.margin.split(" ");
                    A.forEach(p, function(a) {
                        "" !== r && (r += " ");
                        a = parseFloat(a);
                        r += a / u * c + "px"
                    });
                    k(g[a], {
                        left: n + "px",
                        top: v + "px",
                        margin: 1 !== l && -1 === r.indexOf("NaN") ? r : "",
                        width: q + "px",
                        height: T + "px"
                    })
                })
            }
            this._previousScale = c
        },
        _updateImages: function(a) {
            if (this._ct) {
                var c, d = this._tileW,
                    b = this._tileH,
                    e = this._ct;
                c = e.lod;
                var e = e.tile,
                    f = e.offsets,
                    h = e.coords,
                    g = h.row,
                    h = h.col,
                    m = c.level,
                    l = this.opacity,
                    k = this._tileIds,
                    p = this._loadingList,
                    r = this._addImage,
                    q = this._map.id,
                    v = this.id,
                    n = a.x,
                    s = a.y,
                    x = c.startTileRow,
                    z = c.endTileRow,
                    C = c.startTileCol,
                    E = c.endTileCol,
                    F = A.indexOf,
                    y, t, B = f.x - this.__coords_dx,
                    G = f.y - this.__coords_dy;
                t = d - B + -a.x;
                var w = b - G + -a.y;
                y = Math.ceil;
                t = 0 < t ? t % d : d - Math.abs(t) % d;
                w = 0 < w ? w % b : b -
                    Math.abs(w) % b;
                n = 0 < n ? Math.floor((n + B) / d) : y((n - (d - B)) / d);
                s = 0 < s ? Math.floor((s + G) / b) : y((s - (b - G)) / b);
                G = n + y((a.width - t) / d);
                a = s + y((a.height - w) / b);
                var D, H, I;
                this._wrap && (D = c._frameInfo, H = D[0], I = D[1], D = D[2]);
                for (w = n; w <= G; w++)
                    for (n = s; n <= a; n++) y = g + n, t = h + w, this._wrap && (t < I ? (t %= H, t = t < I ? t + H : t) : t > D && (t %= H)), !this._isExcluded(m, y, t) && (y >= x && y <= z && t >= C && t <= E) && (c = q + "_" + v + "_tile_" + m + "_" + n + "_" + w, -1 === F(k, c) && (p.add(c), k.push(c), r(m, n, y, w, t, c, d, b, l, e, f)))
            }
        },
        _cleanUpRemovedImages: function() {
            var a = this._removeList,
                c = q.destroy,
                d, b = v._css.names;
            a.forEach(function(a) {
                a._fadeOut || (a.style.filter = "", a.style.zoom = 1, c(a))
            });
            if ("css-transforms" === this._map.navigationMode)
                for (d = this._passives.length - 1; 0 <= d; d--) {
                    var e = this._passives[d];
                    0 === e.childNodes.length ? (this._passives.splice(d, 1), c(e)) : this._map.fadeOnZoom && (!e._marked && e._remove === e.childNodes.length) && (e._marked = 1, 2048 > v._css.getScaleFromMatrix(m.get(e, b.transform)) ? (m.set(e, b.transition, "opacity 0.65s"), m.set(e, "opacity", 0), s.disconnect(e._endHandle), e._endHandle = s.connect(e,
                        b.endEvent, this._transitionEnd)) : this._transitionEnd({
                        propertyName: "opacity",
                        target: e
                    }))
                }
            a.clear()
        },
        _transitionEnd: function(a) {
            var c = a.target;
            "opacity" === a.propertyName && (s.disconnect(c._endHandle), c._endHandle = null, a = A.indexOf(this._passives, c), -1 < a && this._passives.splice(a, 1), c.parentNode && c.parentNode.removeChild(c), q.destroy(c))
        },
        _addImage: function(a, c, d, b, e, f, h, g, u, l, k) {
            if (this._patchIE) l = this._tiles[f] = q.create("div"), l.id = f, K.add(l, "layerTile"), m.set(l, {
                left: h * b - k.x + "px",
                top: g * c - k.y + "px",
                width: h +
                    "px",
                height: g + "px",
                filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src\x3d'" + this.getTileUrl(a, d, e) + "', sizingMethod\x3d'scale')"
            }), 1 > u && m.set(l, "opacity", u), a = l.appendChild(q.create("div")), m.set(a, {
                opacity: 0,
                width: h + "px",
                height: g + "px"
            }), this._div.appendChild(l), this._loadingList.remove(f), this._fireOnUpdateEvent();
            else {
                l = this._tiles[f] = q.create("img");
                var p = s.connect;
                l.id = f;
                K.add(l, "layerTile");
                b = h * b - k.x;
                k = g * c - k.y;
                c = this._map;
                var r = v._css.names;
                h = {
                    width: h + "px",
                    height: g + "px",
                    visibility: "hidden"
                };
                "css-transforms" === c.navigationMode ? (h[r.transform] = v._css.translate(b, k), m.set(l, h), l._left = b, l._top = k) : (h.left = b + "px", h.top = k + "px", m.set(l, h));
                1 > u && m.set(l, "opacity", u);
                l._onload_connect = p(l, "onload", this, "_tileLoadHandler");
                l._onerror_connect = p(l, "onerror", E.hitch(this, "_tileErrorHandler", d, e));
                l._onabort_connect = p(l, "onabort", this, "_tileAbortHandler");
                if (this.tileMap) this.tileMap.getTile(a, d, e, f, this._tileMapCallback);
                else if (f = this.getTileUrl(a, d, e, l)) this._failedRequests && this._failedRequests[f] ?
                    (m.set(l, this._failedRequests[f].css), l.src = this._failedRequests[f].src, this._multiple = parseInt(this._failedRequests[f].css.width) / this._tileW) : (this._multiple = 1, l.src = f);
                "css-transforms" === c.navigationMode ? this._active.appendChild(l) : this._div.appendChild(l)
            }
        },
        _tileMapCallback: function(a, c) {
            var d, b;
            !this.suspended && this._tiles[c.id] && (this._multiple = 2 * (c.level - a.level) || 1, b = this._tiles[c.id], d = this.tileMap.style(a, c), m.set(b, d), b.src = this.getTileUrl(a.level, a.row, a.col))
        },
        getTileUrl: function(a, c,
            d) {},
        _reCheckTS: /[\?\&]_ts=/ig,
        _reReplaceTS: /([\?\&]_ts=)[0-9]+/ig,
        addTimestampToURL: function(a) {
            var c = this._refreshTS;
            c && (a = this._reCheckTS.test(a) ? a.replace(this._reReplaceTS, "$$$1" + c) : a + ((-1 === a.indexOf("?") ? "?" : "\x26") + "_ts\x3d" + c));
            return a
        },
        refresh: function() {
            this.suspended || (this._refreshTS = (new Date).getTime(), this._onExtentChangeHandler(this._map.extent, null, !0, this._map.__LOD))
        },
        _tilePopPop: function(a) {
            var c = s.disconnect;
            c(a._onload_connect);
            c(a._onerror_connect);
            c(a._onabort_connect);
            a._onload_connect =
                a._onerror_connect = a._onabort_connect = null;
            this._loadingList.remove(a.id);
            this._fireOnUpdateEvent()
        },
        _tileLoadHandler: function(a) {
            a = a.currentTarget;
            this._noDom ? this._standby.push(a) : (m.set(a, "visibility", "visible"), this._tilePopPop(a))
        },
        _tileAbortHandler: function(a) {
            a = a.currentTarget;
            this.onError(Error("Unable to load tile: " + a.src));
            m.set(a, "visibility", "hidden");
            this._tilePopPop(a)
        },
        _tileErrorHandler: function(a, c, d) {
            d = d.currentTarget;
            var b, e, f = !0;
            if (this.tileMap || !this.resampling) f = !1;
            else if (b =
                new J(d.src), b = b.path.split("/"), b = parseInt(b[b.length - 3]), e = this._ct.lod.level - b + 1, this._multiple = Math.pow(2, e), b === this._lowestLevel || 0 === this._resamplingTolerance || this._resamplingTolerance && Math.log(this._multiple) / Math.LN2 > this._resamplingTolerance) f = !1;
            f ? this._resample(d, a, c) : (this.onError(Error("Unable to load tile: " + d.src)), m.set(d, "visibility", "hidden"), this._tilePopPop(d))
        },
        _resample: function(a, c, d) {
            var b = (new J(a.src)).path.split("/"),
                e = this._multiple,
                f = parseInt(b[b.length - 3]) - 1,
                h = parseInt(c /
                    e),
                g = parseInt(d / e),
                b = d % e,
                u = c % e,
                h = this.getTileUrl(f, h, g);
            c = this.getTileUrl(f + Math.log(e) / Math.LN2, c, d);
            e = {
                width: this._tileW * e + "px",
                height: this._tileH * e + "px",
                margin: "-" + this._tileW * u + "px 0 0 " + ("-" + this._tileH * b + "px")
            };
            this._failedRequests || (this._failedRequests = {});
            this._failedRequests[c] = {
                src: h,
                css: e
            };
            m.set(a, e);
            x("chrome") && a.setAttribute("src", null);
            a.src = h
        },
        _fireOnUpdateEvent: function() {
            0 === this._loadingList.count && (this._cleanUpRemovedImages(), this._fireOnUpdate && (this._fireOnUpdate = !1, this.onUpdate(),
                this._fireUpdateEnd()))
        },
        setOpacity: function(a) {
            if (this.opacity != a) this.onOpacityChange(this.opacity = a)
        },
        onOpacityChange: function() {},
        _opacityChangeHandler: function(a) {
            var c = m.set,
                d, b, e;
            if ("css-transforms" === this._map.navigationMode) {
                if (this._active) {
                    e = this._active.childNodes;
                    for (d = e.length - 1; 0 <= d; d--) c(e[d], "opacity", a)
                }
                for (d = this._passives.length - 1; 0 <= d; d--) {
                    e = this._passives[d].childNodes;
                    for (b = e.length - 1; 0 <= b; b--) c(e[b], "opacity", a)
                }
            } else {
                e = this._div.childNodes;
                for (d = e.length - 1; 0 <= d; d--) c(e[d],
                    "opacity", a)
            }
        },
        setExclusionAreas: function(a) {
            this.exclusionAreas = a;
            if (this.loaded && this._map && this._map.loaded) {
                var c = this._map.spatialReference,
                    d = this.tileInfo,
                    b = d.origin,
                    e = d.lods,
                    f = e[0].level,
                    h = e[e.length - 1].level,
                    g, m, l, k, p, r, s, q, n;
                if (!this.exclusionAreas || !this.exclusionAreas.length) this._exclusionsPerZoom = null;
                else {
                    this._exclusionsPerZoom = [];
                    m = 0;
                    for (l = a.length; m < l; m++)
                        if (g = a[m], (n = g.geometry) && "extent" === n.type && n.xmin <= n.xmax && n.ymin <= n.ymax) {
                            if (!c.equals(n.spatialReference))
                                if (c._canProject(n.spatialReference)) c.isWebMercator() ?
                                    (q = z.lngLatToXY(n.xmin, n.ymin), n = z.lngLatToXY(n.xmax, n.ymax)) : (q = z.xyToLngLat(n.xmin, n.ymin, !0), n = z.xyToLngLat(n.xmax, n.ymax, !0)), n = new R(q[0], q[1], n[0], n[1], c);
                                else continue;
                            s = -1;
                            if (g.minZoom && -1 !== g.minZoom) s = g.minZoom;
                            else if (g.minScale && -1 !== g.minScale) {
                                k = 0;
                                for (p = e.length; k < p; k++)
                                    if (e[k].scale <= g.minScale) {
                                        s = e[k].level;
                                        break
                                    }
                            }
                            s = Math.max(s, f);
                            q = -1;
                            if (g.maxZoom && -1 !== g.maxZoom) q = g.maxZoom;
                            else if (g.maxScale && -1 !== g.maxScale) {
                                k = 0;
                                for (p = e.length; k < p; k++)
                                    if (e[k].scale < g.maxScale) {
                                        q = e[k - 1].level;
                                        break
                                    } else if (e[k].scale ===
                                    g.maxScale) {
                                    q = e[k].level;
                                    break
                                }
                            }
                            q = -1 === q ? h : Math.min(q, h);
                            for (g = s; g <= q; g++) {
                                k = 0;
                                for (p = e.length; k < p; k++)
                                    if (e[k].level === g) {
                                        r = e[k];
                                        break
                                    }
                                r && (this._exclusionsPerZoom[g] || (this._exclusionsPerZoom[g] = []), k = 1 / r.resolution / d.rows, p = 1 / r.resolution / d.cols, this._exclusionsPerZoom[g].push({
                                    rowFrom: Math.floor((b.y - n.ymax) * k),
                                    rowTo: Math.ceil((b.y - n.ymin) * k),
                                    colFrom: Math.floor((n.xmin - b.x) * p),
                                    colTo: Math.ceil((n.xmax - b.x) * p)
                                }))
                            }
                        }
                }
                this.suspended || this._onExtentChangeHandler(this._map.extent, null, !0, this._map.__LOD)
            }
        },
        _isExcluded: function(a, c, d) {
            var b, e, f;
            if (!this._exclusionsPerZoom) return !1;
            b = this._exclusionsPerZoom[a];
            if (!b) return !1;
            e = 0;
            for (f = b.length; e < f; e++)
                if (a = b[e], c >= a.rowFrom && c < a.rowTo && d >= a.colFrom && d < a.colTo) return !0;
            return !1
        }
    })
});