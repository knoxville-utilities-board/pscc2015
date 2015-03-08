//>>built
define("esri/layers/GraphicsLayer", ["dojo/_base/declare", "dojo/_base/connect", "dojo/_base/lang", "dojo/_base/array", "dojo/dom-attr", "dojo/dom-construct", "dojo/dom-style", "dojox/gfx", "dojox/gfx/matrix", "./layer", "../kernel", "../lang", "../sniff", "../Color", "../domUtils", "../symbols/MarkerSymbol", "../symbols/SimpleMarkerSymbol", "../geometry/Point", "../geometry/ScreenPoint", "../geometry/Extent", "../geometry/mathUtils", "../geometry/screenUtils", "../PluginTarget"], function(x, v, y, n, I, N, G, A, u, S, T, O, H, U, D, V, w, P, J, B, Q, K, W) {
    var L, M = -1 !== A.renderer.toLowerCase().indexOf("svg"),
        E = -1 !== A.renderer.toLowerCase().indexOf("canvas"),
        t = 9 > H("ie"),
        R = H("esri-touch"),
        X = x(null, {
            declaredClass: "esri.layers._GraphicsContainer",
            _setMap: function(a, b) {
                var c, e = this._connects = [];
                this._map = a;
                E ? (c = N.create("div", {
                        style: "overflow: visible; position: absolute;"
                    }, b), this._surface = {
                        getEventSource: function() {
                            return c
                        }
                    }, e.push(v.connect(c, "onmousedown", this, this._canvasDownHandler)), e.push(v.connect(c, "onmouseup", this, this._canvasUpHandler)), e.push(v.connect(c, "onclick", this, this._canvasClickHandler)),
                    L.prototype._canvas = !0) : (c = (this._surface = A.createSurface(b, a.width, a.height)).getEventSource(), G.set(c = t ? c.parentNode : c, {
                    overflow: "visible",
                    position: "absolute"
                }));
                e.push(v.connect(a, "onResize", this, "_onResizeHandler"));
                return c
            },
            _onResizeHandler: function(a, b, c) {
                a = this._surface.getEventSource();
                var e = this._map,
                    d;
                t && G.set(a = a.parentNode, {
                    width: b + "px",
                    height: c + "px",
                    clip: "rect(0px " + b + "px " + c + "px 0px)"
                });
                I.set(a, "width", b);
                I.set(a, "height", c);
                this._surface.declaredClass || n.forEach(a.childNodes, function(a) {
                    I.set(a,
                        "width", b);
                    I.set(a, "height", c)
                });
                e.loaded && (e.graphics.suspended || (e.graphics._resized = !0), n.forEach(e.graphicsLayerIds, function(a) {
                    d = e.getLayer(a);
                    d.suspended || (d._resized = !0)
                }))
            },
            _cleanUp: function() {
                n.forEach(this._connects, v.disconnect, v);
                this._map = this._surface = null
            },
            _processEvent: function(a) {
                var b = this._map;
                a.screenPoint = new J(a.pageX - b.position.x, a.pageY - b.position.y);
                a.mapPoint = b.toMap(a.screenPoint)
            },
            _canvasDownHandler: function(a) {
                this._processEvent(a);
                this._downPt = a.screenPoint.x + "," + a.screenPoint.y
            },
            _canvasUpHandler: function(a) {
                this._processEvent(a);
                this._upPt = a.screenPoint.x + "," + a.screenPoint.y
            },
            _tolerance: 15,
            _isPrimaryMatch: function(a, b, c, e) {
                if (!a.visible || !b) return !1;
                var d = b.getTransformedBoundingBox(),
                    g;
                return d ? (g = new B(d[0].x, d[0].y, d[2].x, d[2].y), delete g.spatialReference, R ? g.intersects(c) : g.contains(e)) : n.some(b.children || [], function(a) {
                    d = a.getTransformedBoundingBox();
                    g = new B(d[0].x, d[0].y, d[2].x, d[2].y);
                    delete g.spatialReference;
                    return R ? g.intersects(c) : g.contains(e)
                })
            },
            _canvasClickHandler: function(a) {
                if (this._downPt &&
                    this._upPt && this._downPt === this._upPt) {
                    this._processEvent(a);
                    var b = this._map,
                        c = n.map(b.graphicsLayerIds, function(a) {
                            return b.getLayer(a)
                        });
                    c.push(b.graphics);
                    c.reverse();
                    var c = n.filter(c, function(a) {
                            return a.loaded && a._mouseEvents && !a.suspended && (!O.isDefined(a.opacity) || 0 < a.opacity)
                        }),
                        e = a.screenPoint,
                        d = this._tolerance,
                        g = e.x - d,
                        f = e.y + d,
                        h = e.x + d,
                        d = e.y - d,
                        k = new B(g, d, h, f),
                        g = b.toMap(new J(g, f)),
                        h = b.toMap(new J(h, d)),
                        f = g.spatialReference._getInfo(),
                        l = new B(B.prototype._normalizeX(g.x, f).x, g.y, B.prototype._normalizeX(h.x,
                            f).x, h.y, g.spatialReference),
                        m;
                    delete k.spatialReference;
                    n.some(c, function(a) {
                        a = n.filter(a.graphics, function(a) {
                            return this._isPrimaryMatch(a, a.getDojoShape(), k, e) || !(!a._bgShape || !this._isPrimaryMatch(a, a._bgShape, k, e))
                        }, this);
                        a.reverse();
                        if (0 < a.length) {
                            var c;
                            n.some(a, function(a) {
                                return a.geometry && l.intersects(a.geometry) ? (c = a, !0) : !1
                            });
                            if (c) return m = c, !0
                        }
                        return !1
                    }, this);
                    if (m && (c = m.getLayer())) a.graphic = m, c.onClick(a)
                }
            }
        });
    L = x(S, {
        declaredClass: "esri.layers._GraphicsLayer",
        managedSuspension: !0,
        surfaceType: E ?
            "canvas-2d" : A.renderer,
        _eventMap: {
            "graphic-add": ["graphic"],
            "graphic-remove": ["graphic"],
            "renderer-change": ["renderer"]
        },
        constructor: function(a, b) {
            if (a && (y.isString(a) || y.isObject(a) && (a.layerDefinition || a.query))) a = b;
            this._params = y.mixin({
                displayOnPan: !0,
                drawMode: !0,
                styling: !0
            }, a || {});
            var c = this._params.dataAttributes;
            "string" === typeof c && (c = [c]);
            this.styling = M ? this._params.styling : !0;
            this.dataAttributes = c;
            this.infoTemplate = a && a.infoTemplate;
            this.graphics = [];
            this._draw = y.hitch(this, this._draw);
            this._refresh =
                y.hitch(this, this._refresh);
            this.registerConnectEvents()
        },
        getNode: function() {
            return this._div && this._div.getEventSource()
        },
        setDrawMode: function(a) {
            this._params.drawMode = a
        },
        renderer: null,
        _setMap: function(a, b) {
            this.inherited(arguments);
            this._map = a;
            this._wrap = a.wrapAround180;
            this._srInfo = a.spatialReference._getInfo();
            this._canvas ? (b = A.createSurface(b.getEventSource(), a.width, a.height), G.set(b.rawNode, "position", "absolute"), this._div = b.createGroup(), this._renderProto = this._div.constructor.prototype._render,
                this._div._render = y.hitch(this, this._canvasRender)) : this._div = b.createGroup();
            this._bgGroup = this._div.createGroup();
            this._div.getEventSource().id = this.id + "_layer";
            var c = this.opacity;
            O.isDefined(c) && 1 > c && this.setOpacity(c, !0);
            return this._div
        },
        _unsetMap: function(a, b) {
            n.forEach(this.graphics, function(a) {
                a._shape = null
            });
            this._canvas ? (b = this._div.getParent(), b._parent = {}, N.destroy(b.rawNode), b.destroy()) : (this._div.clear(), b.remove(this._div), N.destroy(this._div.getEventSource()));
            this._map = this._div =
                null;
            clearTimeout(this._wakeTimer);
            this._wakeTimer = null;
            this._disableDrawConnectors();
            this.inherited(arguments)
        },
        _onZoomStartHandler: function() {
            D.hide(this._div.getEventSource())
        },
        _onExtentChangeHandler: function(a, b, c, e) {
            clearTimeout(this._wakeTimer);
            this._wakeTimer = null;
            c ? (a = this._map.__visibleRect, b = this._div, this._evalSDRenderer(), this._refresh(!0), b.setTransform(u.translate({
                    x: a.x,
                    y: a.y
                })), this._renderProto && b.surface.pendingRender ? this._dirty = !0 : this.suspended || D.show(b.getEventSource())) : this._resized &&
                (this._refresh(!1), this._resized = !1);
            if (0 < this.graphics.length) this.onUpdate()
        },
        _canvasRender: function() {
            var a = this._div;
            this._dirty && (delete this._dirty, this.suspended || D.show(a.getEventSource()));
            return this._renderProto.apply(a, arguments)
        },
        _refresh: function(a) {
            var b = this.graphics,
                c = b.length,
                e, d = this._draw;
            for (e = 0; e < c; e++) d(b[e], a)
        },
        refresh: function() {
            this._refresh(!0)
        },
        redraw: function() {
            this._refresh(!0)
        },
        _onPanHandler: function(a, b) {
            this._panDx = b.x;
            this._panDy = b.y;
            var c = this._map.__visibleRect;
            this._div.setTransform(u.translate({
                x: c.x + b.x,
                y: c.y + b.y
            }))
        },
        _onPanEndUpdateHandler: function(a, b) {
            if (!this._params._child && (b.x !== this._panDx || b.y !== this._panDy)) {
                var c = this._map.__visibleRect;
                this._div.setTransform(u.translate({
                    x: c.x,
                    y: c.y
                }))
            }
            this._refresh(!1);
            if (this.graphics.length) this.onUpdate()
        },
        _onPanStartHandler: function() {
            D.hide(this._div.getEventSource())
        },
        _onPanEndHandler: function() {
            var a = this._map.__visibleRect,
                b = this._div;
            b.setTransform(u.translate({
                x: a.x,
                y: a.y
            }));
            this._refresh(!1);
            this._renderProto &&
                b.surface.pendingRender ? this._dirty = !0 : D.show(b.getEventSource());
            if (this.graphics.length) this.onUpdate()
        },
        onSuspend: function() {
            this.inherited(arguments);
            D.hide(this._div.getEventSource());
            clearTimeout(this._wakeTimer);
            this._wakeTimer = null;
            this._disableDrawConnectors()
        },
        onResume: function(a) {
            this.inherited(arguments);
            a.firstOccurrence && this._evalSDRenderer();
            this._enableDrawConnectors();
            this._wakeTimer = this._wakeTimer || setTimeout(y.hitch(this, function() {
                this.suspended || this._onExtentChangeHandler(null,
                    null, !0)
            }), 0)
        },
        _enableDrawConnectors: function() {
            var a = this._map,
                b = v.connect;
            this._disableDrawConnectors();
            this._params.displayOnPan ? (this._params._child || (this._onPanHandler_connect = b(a, "onPan", this, "_onPanHandler")), this._onPanEndHandler_connect = b(a, "onPanEnd", this, "_onPanEndUpdateHandler")) : (this._onPanStartHandler_connect = b(a, "onPanStart", this, "_onPanStartHandler"), this._onPanEndHandler_connect = b(a, "onPanEnd", this, "_onPanEndHandler"));
            this._onZoomStartHandler_connect = b(a, "onZoomStart", this, "_onZoomStartHandler");
            this._onExtentChangeHandler_connect = b(a, "onExtentChange", this, "_onExtentChangeHandler")
        },
        _disableDrawConnectors: function() {
            var a = v.disconnect;
            a(this._onExtentChangeHandler_connect);
            a(this._onZoomStartHandler_connect);
            a(this._onPanHandler_connect);
            a(this._onPanStartHandler_connect);
            a(this._onPanEndHandler_connect);
            this._onExtentChangeHandler_connect = this._onZoomStartHandler_connect = this._onPanHandler_connect = this._onPanStartHandler_connect = this._onPanEndHandler_connect = null
        },
        _updateExtent: function(a) {
            var b =
                a.geometry;
            if (b) {
                if (!(a._extent = b.getExtent())) {
                    var c, e;
                    if ("esri.geometry.Point" === b.declaredClass) c = b.x, e = b.y;
                    else if ("esri.geometry.Multipoint" === b.declaredClass) c = b.points[0][0], e = b.points[0][1];
                    else {
                        a._extent = null;
                        return
                    }
                    a._extent = new B(c, e, c, e, b.spatialReference)
                }
            } else a._extent = null
        },
        _intersects: function(a, b, c) {
            var e = a.spatialReference,
                d = b.spatialReference,
                g = e && d && !e.equals(d) && e._canProject(d) && 4326 === d.wkid;
            if (this._wrap && !c) {
                c = [];
                var e = a._getFrameWidth(),
                    f = this._srInfo,
                    h = a._clip ? a._getAvailExtent() :
                    a.extent,
                    k, l, m, q, p = [];
                k = b._partwise;
                g && (h = a.geographicExtent, f = d._getInfo());
                a = h._getParts(f);
                if (k && k.length) {
                    b = [];
                    d = 0;
                    for (g = k.length; d < g; d++) b = b.concat(k[d]._getParts(f))
                } else b = b._getParts(f);
                d = 0;
                for (g = b.length; d < g; d++) {
                    m = b[d];
                    f = 0;
                    for (h = a.length; f < h; f++)
                        if (q = a[f], q.extent.intersects(m.extent)) {
                            k = 0;
                            for (l = m.frameIds.length; k < l; k++) c.push((q.frameIds[0] - m.frameIds[k]) * e)
                        }
                }
                d = 0;
                for (g = c.length; d < g; d++) k = c[d], n.indexOf(c, k) === d && p.push(k);
                return p.length ? p : null
            }
            return (g ? a.geographicExtent : a.extent).intersects(b) ? [0] : null
        },
        _defaultMarker: {
            type: "simplemarkersymbol",
            style: "square",
            size: 1,
            xoffset: 0,
            yoffset: 0,
            angle: 0
        },
        _draw: function(a, b) {
            if (this._params.drawMode && this._map && !this.suspended) try {
                var c = a._extent,
                    e, d, g = !M || this.styling,
                    f = M && this.dataAttributes,
                    h = a.getDojoShape(),
                    k;
                if (a.visible && c && (e = this._intersects(this._map, c, a.geometry._originOnly)) && (d = g ? this._getSymbol(a) : this._defaultMarker)) {
                    if (!a._offsets || a._offsets.join(",") !== e.join(",") ? a._offsets = e : k = !0, !h || b || !k) {
                        var l = a.geometry.type,
                            c = {
                                graphic: a
                            },
                            m = a._bgShape,
                            q = g && !a.symbol ? this._getRenderer(a) : null,
                            p = q && q.backgroundFillSymbol;
                        if ("point" === l) this._isInvalidShape(d, h) && this._removeShape(a), a._shape = this._drawPoint(this._div, a.geometry, d, a.getDojoShape(), e, q, a), g && this._symbolizePoint(a.getDojoShape(), d, q, a);
                        else if ("multipoint" === l) this._drawMarkers(a, d, e, q), g && this._symbolizeMarkers(a, d, q);
                        else {
                            var n, l = d,
                                C, F;
                            g && (l = (n = d.isInstanceOf(V) ? d : null) ? p : d);
                            l && l === p && (C = this._bgGroup);
                            m && !C && this._removeBgShape(a);
                            l && (!C && this._isInvalidShape(l, a._shape) &&
                                this._removeShape(a, !1), F = this._drawShape(a, e, C || this._div, C ? m : a.getDojoShape()), g && this._symbolizeShape(F, l, !p && q, a), a[C ? "_bgShape" : "_shape"] = F);
                            n && (this._isInvalidShape(n, a._shape) && this._removeShape(a, !1), F = this._drawPoint(this._div, a.geometry.getCentroid(), n, a._shape, e, q, a), this._symbolizePoint(F, n, q, a), a._shape = F)
                        }
                        E || (a._bgShape && this._initNode(a, a._bgShape, a._bgShape !== m, c, f), a._shape && this._initNode(a, a._shape, a._shape !== h, c, f));
                        c.node = a.getNode();
                        this.onGraphicDraw(c)
                    }
                } else h && this._removeShape(a)
            } catch (Y) {
                this._errorHandler(Y,
                    a)
            }
        },
        _initNode: function(a, b, c, e, d) {
            if (b = b && b.getNode()) b.e_graphic = a, this._addDataAttrs(a, d, b), c && (e.node = b, this.onGraphicNodeAdd(e))
        },
        _removeShape: function(a, b) {
            var c = a.getDojoShape(),
                e = c && c.getNode();
            c && (c.removeShape(), c.destroy());
            a._shape = a._offsets = null;
            !1 !== b && this._removeBgShape(a);
            if (e && (e.e_graphic = null, !E)) this.onGraphicNodeRemove({
                graphic: a,
                node: e
            })
        },
        _removeBgShape: function(a) {
            var b = a._bgShape,
                c = b && b.getNode();
            b && (b.removeShape(), b.destroy(), a._bgShape = null);
            if (c && (c.e_graphic = null, !E)) this.onGraphicNodeRemove({
                graphic: a,
                node: c
            })
        },
        _addDataAttrs: function(a, b, c) {
            var e = a.attributes,
                d, g = b ? b.length : 0,
                f = this._getRenderer(a);
            if (c && e) {
                for (d = 0; d < g; d++)(c = b[d]) && a.attr("data-" + c, e[c]);
                !this.styling && f && (f.getBreakIndex ? (b = f.getBreakIndex(a), a.attr("data-class-break", -1 !== b ? b : null)) : f.getUniqueValueInfo && (b = f.getUniqueValueInfo(a), a.attr("data-unique-value", b ? b.value : null)))
            }
        },
        _drawShape: function(a, b, c, e) {
            a = a.geometry;
            var d = a.type,
                g = this._map,
                f = g.extent,
                h = g.width,
                k = g.height,
                g = g.__visibleRect,
                l = [],
                m, q;
            m = "extent" === d;
            if ("rect" ===
                d || m) l = {
                x: 0,
                y: 0,
                spatialReference: a.spatialReference
            }, l.x = m ? a.xmin : a.x, l.y = m ? a.ymax : a.y, d = K.toScreenPoint(f, h, k, l), l.x = m ? a.xmax : a.x + a.width, l.y = m ? a.ymin : a.y + a.height, a = K.toScreenPoint(f, h, k, l), b = {
                x: d.x - g.x + b[0],
                y: d.y - g.y,
                width: Math.abs(a.x - d.x),
                height: Math.abs(a.y - d.y)
            }, 0 === b.width && (b.width = 1), 0 === b.height && (b.height = 1), e = this._drawRect(c, e, b);
            else if ("polyline" === d || "polygon" === d) {
                m = 0;
                for (q = b.length; m < q; m++) l = l.concat(K._toScreenPath(f, h, k, a, -g.x + b[m], -g.y));
                e = this._drawPath(c, e, l);
                this._rendererLimits &&
                    ("polyline" === d ? this._clipPolyline(e, a) : this._clipPolygon(e, a))
            }
            return e
        },
        _drawRect: function(a, b, c) {
            return b ? b.setShape(c) : a.createRect(c)
        },
        _drawImage: function(a, b, c) {
            return b ? b.setShape(c) : a.createImage(c)
        },
        _drawCircle: function(a, b, c) {
            return b ? b.setShape(c) : a.createCircle(c)
        },
        _drawPath: function() {
            return t ? function(a, b, c, e) {
                c = e ? c : c.join(" ");
                if (b) return b.setShape(c);
                b = a.createObject(e ? A.Path : A.EsriPath, c);
                a._overrideSize(b.getEventSource());
                return b
            } : function(a, b, c, e) {
                c = e ? c : c.join(" ");
                return b ?
                    b.setShape(c) : a.createPath(c)
            }
        }(),
        _drawText: function(a, b, c) {
            return b ? b.setShape(c) : a.createText(c)
        },
        _evalSDRenderer: function(a) {
            var b = this._map,
                c = this.renderer,
                e, d = this._rndForScale;
            b && (b.loaded && c && c.getRendererInfo) && (e = "zoom" === c.rangeType ? c.getRendererInfoByZoom(b.getZoom()) : c.getRendererInfoByScale(b.getScale()));
            this._rndForScale = e && e.renderer;
            !a && this._rndForScale != d && this.emit("renderer-change", {
                renderer: this._rndForScale
            })
        },
        _getRenderer: function(a) {
            var b = this._rndForScale || this.renderer;
            a && (b && b.getObservationRenderer) && (b = b.getObservationRenderer(a));
            return b
        },
        _getSymbol: function(a) {
            var b = this._getRenderer();
            return a.symbol || b && b.getSymbol(a)
        },
        _getVariable: function(a, b) {
            return a ? a[b] || n.filter(a.visualVariables, function(a) {
                return a.type === b
            })[0] : null
        },
        _applyOpacity: function(a, b, c, e) {
            b = b.getOpacity(e, {
                opacityInfo: c
            });
            null != b && (a = new U(a), a.a = b);
            return a
        },
        _symbolizeShape: function(a, b, c, e) {
            var d = b.getStroke(),
                g = b.getFill();
            b = b.type;
            var f, h, k = this._getVariable(c, "sizeInfo"),
                l = this._getVariable(c,
                    "colorInfo"),
                m = this._getVariable(c, "opacityInfo"),
                k = k ? c.getSize(e, {
                    sizeInfo: k,
                    resolution: this._map.getResolutionInMeters()
                }) : null;
            if (c && (l || m) && "picturefillsymbol" !== b) - 1 !== b.indexOf("linesymbol") ? (f = d && d.color, l && (f = c.getColor(e, {
                colorInfo: l
            }) || f), f && m && (f = this._applyOpacity(f, c, m, e))) : g && g.toCss && (h = g, l && (h = c.getColor(e, {
                colorInfo: l
            }) || h), h && m && (h = this._applyOpacity(h, c, m, e)));
            a.setStroke(null == k && !f ? d : y.mixin({}, d, k && {
                width: k
            }, f && {
                color: f
            })).setFill(h || g)
        },
        _smsToPath: function() {
            return t ? function(a,
                b, c, e, d, g, f, h, k) {
                switch (b) {
                    case a.STYLE_SQUARE:
                        return ["M", d + "," + f, "L", g + "," + f, g + "," + h, d + "," + h, "X", "E"];
                    case a.STYLE_CROSS:
                        return ["M", c + "," + f, "L", c + "," + h, "M", d + "," + e, "L", g + "," + e, "E"];
                    case a.STYLE_X:
                        return ["M", d + "," + f, "L", g + "," + h, "M", d + "," + h, "L", g + "," + f, "E"];
                    case a.STYLE_DIAMOND:
                        return ["M", c + "," + f, "L", g + "," + e, c + "," + h, d + "," + e, "X", "E"];
                    case a.STYLE_TARGET:
                        return ["M", d + "," + f, "L", g + "," + f, g + "," + h, d + "," + h, d + "," + f, "M", d - k + "," + e, "L", d + "," + e, "M", c + "," + (f - k), "L", c + "," + f, "M", g + k + "," + e, "L", g + "," + e, "M", c + "," + (h +
                            k), "L", c + "," + h, "E"]
                }
            } : function(a, b, c, e, d, g, f, h, k) {
                switch (b) {
                    case a.STYLE_SQUARE:
                        return ["M", d + "," + f, g + "," + f, g + "," + h, d + "," + h, "Z"];
                    case a.STYLE_CROSS:
                        return ["M", c + "," + f, c + "," + h, "M", d + "," + e, g + "," + e];
                    case a.STYLE_X:
                        return ["M", d + "," + f, g + "," + h, "M", d + "," + h, g + "," + f];
                    case a.STYLE_DIAMOND:
                        return ["M", c + "," + f, g + "," + e, c + "," + h, d + "," + e, "Z"];
                    case a.STYLE_TARGET:
                        return ["M", d + "," + f, g + "," + f, g + "," + h, d + "," + h, d + "," + f, "M", d - k + "," + e, d + "," + e, "M", c + "," + (f - k), c + "," + f, "M", g + k + "," + e, g + "," + e, "M", c + "," + (h + k), c + "," + h]
                }
            }
        }(),
        _pathStyles: {
            square: 1,
            cross: 1,
            x: 1,
            diamond: 1,
            target: 1
        },
        _typeMaps: {
            picturemarkersymbol: "image",
            picturefillsymbol: "path",
            simplefillsymbol: "path",
            simplelinesymbol: "path",
            cartographiclinesymbol: "path",
            textsymbol: "text"
        },
        _isInvalidShape: function(a, b) {
            var c = b && b.shape && b.shape.type,
                e = a && a.type,
                d = a && a.style;
            "rect" === c && (c = "path");
            e && (d = this._typeMaps[e] || d);
            this._pathStyles[d] && (d = "path");
            return "shieldlabelsymbol" === e ? !0 : !(!c || !(d && c !== d))
        },
        _drawPoint: function(a, b, c, e, d, g, f) {
            var h = c.type,
                k = this._map,
                l = k.__visibleRect,
                m = K.toScreenPoint(k.extent,
                    k.width, k.height, b).offset(-l.x + d[0], -l.y),
                l = m.x,
                q = m.y,
                p;
            b = [];
            var n = g && g.rotationInfo ? g.getRotationAngle(f) : null,
                C = this._getVariable(g, "sizeInfo");
            g = C ? g.getSize(f, {
                sizeInfo: C,
                shape: c.style,
                resolution: k.getResolutionInMeters()
            }) : null;
            n && b.push(u.rotategAt(n, m));
            (0 !== c.xoffset || 0 !== c.yoffset) && b.push(u.translate(c.xoffset, -c.yoffset));
            0 !== c.angle && b.push(u.rotategAt(c.angle, m));
            if ("simplemarkersymbol" === h) switch (p = c.style, h = Math.round, g = null != g ? g : c.size, p) {
                case w.STYLE_SQUARE:
                case w.STYLE_CROSS:
                case w.STYLE_X:
                case w.STYLE_DIAMOND:
                    c =
                        isNaN(g) ? 16 : g / 2;
                    p = this._drawPath(a, e, this._smsToPath(w, p, l, q, h(l - c), h(l + c), h(q - c), h(q + c)));
                    break;
                case w.STYLE_TARGET:
                    m = c._targetWidth / 2;
                    g = c._targetHeight / 2;
                    p = this._drawPath(a, e, this._smsToPath(w, p, l, q, h(l - m), h(l + m), h(q - g), h(q + g), c._spikeSize));
                    break;
                case w.STYLE_PATH:
                    p = this._drawPath(a, e, c.path, !0);
                    c = p.getBoundingBox();
                    a = this._getScaleMatrix(c, g);
                    (1 !== a.xx || 1 !== a.yy) && b.push(u.scaleAt(a.xx, a.yy, m));
                    b.push(u.translate(-(c.x + c.width / 2) + l, -(c.y + c.height / 2) + q));
                    break;
                default:
                    c = isNaN(g) ? 16 : g / 2, p = this._drawCircle(a,
                        e, {
                            cx: l,
                            cy: q,
                            r: c
                        })
            } else "shieldlabelsymbol" === h ? (p = c.width, m = c.height, e = a.createGroup(), p = a.createImage({
                    x: l - p / 2,
                    y: q - m / 2,
                    width: p,
                    height: m,
                    src: c.url
                }), e.add(p), null != c.font && (q += 0.2 * c.getHeight(), a = a.createText({
                    type: "text",
                    text: c.text,
                    x: l,
                    y: q,
                    align: "middle",
                    decoration: c.decoration,
                    rotated: c.rotated,
                    kerning: c.kerning
                }), a.setFont(c.font), a.setFill(c.color), e.add(a)), p = e) : "picturemarkersymbol" === h ? (p = null != g ? g : c.width, m = null != g ? g : c.height, p = this._drawImage(a, e, {
                    x: l - p / 2,
                    y: q - m / 2,
                    width: p,
                    height: m,
                    src: c.url
                })) :
                "textsymbol" === h && (p = this._drawText(a, e, {
                    type: "text",
                    text: c.text,
                    x: l,
                    y: q,
                    align: c.getSVGAlign(),
                    decoration: c.decoration || c.font && c.font.decoration,
                    rotated: c.rotated,
                    kerning: c.kerning
                }), M && (a = p.getNode(), l = c.getSVGBaseline(), c = c.getSVGBaselineShift(), a && (a.setAttribute("dominant-baseline", l), c && a.setAttribute("baseline-shift", c))));
            p.setTransform(u.multiply(b));
            p._wrapOffsets = d;
            return p
        },
        _getScaleMatrix: function(a, b) {
            var c = a.width / a.height,
                e = 1,
                d = 1;
            isNaN(b) || (1 < c ? (e = b / a.width, d = b / c / a.height) : (d = b / a.height,
                e = b * c / a.width));
            return {
                xx: e,
                yy: d
            }
        },
        _symbolizePoint: function(a, b, c, e) {
            var d = b.type;
            if (!("shieldlabelsymbol" === d || "picturemarkersymbol" === d)) {
                var g;
                if ("textsymbol" === d) a.setFont(b.font).setFill(b.getFill());
                else {
                    g = b.getStroke();
                    b = b.getFill();
                    if (c) {
                        var f = this._getVariable(c, "colorInfo"),
                            h = this._getVariable(c, "opacityInfo");
                        f && (b = c.getColor(e, {
                            colorInfo: f
                        }) || b);
                        b && h && (b = this._applyOpacity(b, c, h, e))
                    }
                    "simplemarkersymbol" === d && a.setFill(b).setStroke(g)
                }
            }
        },
        _drawMarkers: function(a, b, c, e) {
            var d = a.geometry,
                g = d.points,
                f = a.getDojoShape() || this._div.createGroup(),
                h, k, l = g.length,
                m = [],
                q = 0,
                p, n = c ? c.length : 0;
            f.children[0] && this._isInvalidShape(b, f.children[0]) && f.clear();
            for (k = 0; k < l; k++) {
                h = g[k];
                for (p = 0; p < n; p++) m[0] = c[p], this._drawPoint(f, {
                    x: h[0],
                    y: h[1],
                    spatialReference: d.spatialReference
                }, b, f.children[q++], m, e, a)
            }
            b = f.children.length;
            if (l * c.length < b)
                for (k = b - 1; k >= l * c.length; k--) f.children[k].removeShape();
            a._shape = f
        },
        _symbolizeMarkers: function(a, b, c) {
            var e = a.getDojoShape().children,
                d, g = e.length;
            for (d = 0; d < g; d++) this._symbolizePoint(e[d],
                b, c, a)
        },
        _errorHandler: function(a, b) {
            a.message = b ? "Unable to draw graphic (geometry:" + (b.geometry ? b.geometry.declaredClass : null) + ", symbol:" + (b.symbol ? b.symbol.declaredClass : null) + "): " + a.message : "Unable to draw graphic (null): " + a.message;
            this.inherited(arguments)
        },
        _rendererLimits: function() {
            var a, b, c;
            H("ff") ? (a = 16125, b = -32250, c = 32250) : t ? (a = 1E5, b = -1E5, c = 1E5) : H("chrome") && 6 > H("chrome") && (a = 8150, b = -1E4, c = 1E4);
            if (a) return {
                clipLimit: a,
                rangeMin: b,
                rangeMax: c,
                clipBBox: [-a, -a, a, a],
                clipSegments: [
                    [
                        [-a, -a],
                        [a, -a]
                    ],
                    [
                        [a, -a],
                        [a, a]
                    ],
                    [
                        [a, a],
                        [-a, a]
                    ],
                    [
                        [-a, a],
                        [-a, -a]
                    ]
                ]
            }
        }(),
        _clipPolyline: function(a, b) {
            var c = this._getCorners(a, b),
                e = c.br,
                d = this._rendererLimits,
                g = d.rangeMin,
                f = d.rangeMax,
                h = d.clipBBox,
                k = d.clipSegments,
                d = this._isPointWithinRange,
                l = this._isPointWithinBBox,
                m = this._getClipperIntersection,
                q = this._getPlaneIndex;
            if (!d(c.tl, g, f) || !d(e, g, f)) {
                t && this._createSegments(a);
                var p = [];
                n.forEach(a.segments, function(a) {
                    a = a.args;
                    var c = a.length,
                        b = [],
                        e;
                    for (e = 0; e < c; e += 2) {
                        var d = [a[e], a[e + 1]],
                            g = [a[e + 2], a[e + 3]],
                            f = l(d, h),
                            n = l(g,
                                h);
                        if (f ^ n) {
                            if (n = m([d, g], k)) f ? (e ? b.push(n[1]) : b.push(d, n[1]), p.push(b), b = []) : b.push(n[1], g)
                        } else f ? e ? b.push(g) : b.push(d, g) : (n = q(d, h), f = q(g, h), -1 === n || (-1 === f || n === f) || (d = m([d, g], k, !0), 0 < d.length && (d[n] || (n = d[n[0]] ? n[0] : n[1]), d[f] || (f = d[f[0]] ? f[0] : f[1]), g = d[n], d = d[f], g && b.push(g), d && (b.push(d), p.push(b), b = []))))
                    }
                    p.push(b)
                });
                a.setShape(this._getPathStringFromPaths(p))
            }
        },
        _clipPolygon: function(a, b) {
            var c = this._getCorners(a, b),
                e = c.br,
                d = this._rendererLimits,
                g = d.clipLimit,
                f = d.rangeMin,
                h = d.rangeMax,
                k = d.clipBBox,
                l = d.clipSegments,
                d = this._isPointWithinRange,
                m = this._isPointWithinBBox,
                q = this._getClipperIntersection,
                p = this._getPlaneIndex,
                v = Q._pointLineDistance;
            if (!d(c.tl, f, h) || !d(e, f, h)) t && this._createSegments(a), c = n.map(a.segments, function(a) {
                var b = a.args,
                    c = b.length,
                    e = [];
                a = [];
                var d;
                for (d = 0; d < c; d += 2) {
                    var f = [b[d], b[d + 1]],
                        h = [b[d + 2], b[d + 3]];
                    if (d === c - 2) {
                        e.push(f);
                        break
                    }
                    var s = m(f, k),
                        r = m(h, k);
                    e.push(f);
                    if (s ^ r) {
                        if (r = q([f, h], l)) f = r[1], f[s ? "inOut" : "outIn"] = !0, e.push(f), a.push([s ? "INOUT" : "OUTIN", e.length - 1, r[0]])
                    } else if (!s) {
                        var s =
                            p(f, k),
                            z = p(h, k); - 1 === s || (-1 === z || s === z) || (r = q([f, h], l, !0), 0 < r.length ? (r[s] || (s = r[s[0]] ? s[0] : s[1]), r[z] || (z = r[z[0]] ? z[0] : z[1]), f = r[s], h = r[z], f && (f.outIn = !0, e.push(f), a.push(["OUTIN", e.length - 1, s])), h && (h.inOut = !0, e.push(h), a.push(["INOUT", e.length - 1, z]))) : y.isArray(s) && y.isArray(z) && (r = s.concat(z), r.sort(), "0123" === r.join("") && (r = [], 3 === s[0] + s[1] ? r.push([g, -g], [-g, g]) : r.push([-g, -g], [g, g]), s = v(r[0], [f, h]), f = v(r[1], [f, h]), e.push(s < f ? r[0] : r[1]))))
                    }
                }
                var t = k[0],
                    u = k[1],
                    w = k[2],
                    x = k[3];
                n.forEach(e, function(a) {
                    a[0] <
                        t && (a[1] >= u && a[1] <= x ? a[0] = t : (a[0] = t, a[1] = a[1] < u ? u : x))
                });
                n.forEach(e, function(a) {
                    a[1] < u && (a[0] >= t && a[0] <= w ? a[1] = u : (a[1] = u, a[0] = a[0] < t ? t : w))
                });
                n.forEach(e, function(a) {
                    a[0] > w && (a[1] >= u && a[1] <= x ? a[0] = w : (a[0] = w, a[1] = a[1] < u ? u : x))
                });
                n.forEach(e, function(a) {
                    a[1] > x && (a[0] >= t && a[0] <= w ? a[1] = x : (a[1] = x, a[0] = a[0] < t ? t : w))
                });
                b = 0;
                c = a.length;
                if (0 < c) {
                    do {
                        h = a[b];
                        d = a[(b + 1) % c];
                        if (h[2] === d[2] && "INOUT" === h[0] && "OUTIN" === d[0])
                            if (f = h[1], d = d[1], f < d)
                                for (f += 1; f < d; f++) e[f][2] = !0;
                            else if (f > d) {
                            for (f += 1; f < e.length; f++) e[f][2] = !0;
                            for (f = 0; f < d; f++) e[f][2] = !0
                        }
                        b = (b + 1) % c
                    } while (0 !== b)
                }
                c = e[0];
                b = e[e.length - 1];
                c[2] && (b[2] = !0, n.some(a, function(a) {
                    return 1 === a[1] ? (e.splice(e.length - 1, 0, y.clone(e[1])), !0) : !1
                }));
                e = n.filter(e, function(a) {
                    return a[2] ? !1 : !0
                });
                for (b = 0; b < e.length - 1; b++)
                    if (c = e[b], (d = e[b + 1]) && !(c[0] !== d[0] || c[1] !== d[1])) d.outIn ? c.outIn = !0 : d.inOut && (c.inOut = !0), e.splice(b + 1, 1);
                c = Math.abs;
                a = [];
                for (b = 0; b < e.length - 1; b++) {
                    h = e[b];
                    f = h[0];
                    h = h[1];
                    s = c(f) === g;
                    r = c(h) === g;
                    d = e[b + 1];
                    z = d[0];
                    d = d[1];
                    var A = c(z) === g,
                        B = c(d) === g;
                    s && B ? a.push([b + 1, [f, d]]) : r && A && a.push([b + 1, [z, h]])
                }
                for (b = a.length - 1; 0 <= b; b--) d = a[b], f = e[d[0] - 1], c = e[d[0]], !f.outIn && (!f.inOut && !c.outIn && !c.inOut) && e.splice(d[0], 0, d[1]);
                c = e[0];
                b = e[e.length - 1];
                (c[0] !== b[0] || c[1] !== b[1]) && e.push(c);
                return e
            }), a.setShape(this._getPathStringFromPaths(c))
        },
        _getCorners: function(a, b) {
            if (t) {
                var c = this._map,
                    e = b.getExtent(),
                    d = e.spatialReference,
                    g = c.toScreen(new P(e.xmin, e.ymax, d)),
                    c = c.toScreen(new P(e.xmax, e.ymin, d));
                return {
                    tl: g,
                    br: c
                }
            }
            g = a.getTransformedBoundingBox();
            return {
                tl: g[0],
                br: g[2]
            }
        },
        _createSegments: function(a) {
            a.shape.path = a.vmlPath;
            a.segmented = !1;
            a._confirmSegmented();
            var b = a.segments;
            1 < b.length && (a.segments = n.filter(b, function(a, b, d) {
                b = d[b + 1];
                return "M" === a.action && b && "L" === b.action ? (a.args = a.args.concat(b.args), !0) : !1
            }))
        },
        _getPathStringFromPaths: function(a) {
            t ? (a = n.map(a, function(a) {
                return "m " + n.map(a, function(a, b) {
                    return (1 === b ? "l " : "") + a.join(",")
                }).join(" ")
            }), a.push("e")) : a = n.map(a, function(a) {
                return "M " + n.map(a, function(a) {
                    return a.join(",")
                }).join(" ")
            });
            return a.join(" ")
        },
        _isPointWithinBBox: function(a, b) {
            var c = b[1],
                e = b[2],
                d = b[3],
                g = a[0],
                f = a[1];
            return g > b[0] && g < e && f > c && f < d ? !0 : !1
        },
        _isPointWithinRange: function(a, b, c) {
            var e = a.x;
            a = a.y;
            return e < b || a < b || e > c || a > c ? !1 : !0
        },
        _getClipperIntersection: function(a, b, c) {
            var e, d = Q._getLineIntersection2,
                g = Math.round,
                f = {
                    length: 0
                };
            for (e = 0; 4 > e; e++) {
                var h = d(a, b[e]);
                if (h)
                    if (h[0] = g(h[0]), h[1] = g(h[1]), c) f[e] = h, f.length++;
                    else return [e, h]
            }
            return c ? f : null
        },
        _getPlaneIndex: function(a, b) {
            var c = a[0],
                e = a[1],
                d = b[0],
                g = b[1],
                f = b[2],
                h = b[3];
            return c <= d ? e >=
                g && e <= h ? 3 : e < g ? [0, 3] : [2, 3] : e <= g ? c >= d && c <= f ? 0 : c < d ? [3, 0] : [1, 0] : c >= f ? e >= g && e <= h ? 1 : e < g ? [0, 1] : [2, 1] : e >= h ? c >= d && c <= f ? 2 : c < d ? [3, 2] : [1, 2] : -1
        },
        onGraphicAdd: function() {},
        onGraphicRemove: function() {},
        onGraphicNodeAdd: function() {},
        onGraphicNodeRemove: function() {},
        onGraphicDraw: function() {},
        onGraphicsClear: function() {},
        onRendererChange: function() {},
        onOpacityChange: function() {},
        setInfoTemplate: function(a) {
            this.infoTemplate = a
        },
        add: function(a, b) {
            if (a._graphicsLayer === this) return a;
            b || this.graphics.push(a);
            a._graphicsLayer =
                this;
            a._layer = this;
            this._updateExtent(a);
            this._draw(a);
            if (!b) this.onGraphicAdd(a);
            return a
        },
        remove: function(a, b) {
            if (!b) {
                var c;
                if (-1 === (c = n.indexOf(this.graphics, a))) return null;
                a = this.graphics.splice(c, 1)[0]
            }
            a.getDojoShape() && this._removeShape(a);
            a._shape = a._graphicsLayer = null;
            this.onGraphicRemove(a);
            return a
        },
        clear: function(a, b) {
            for (var c = this.graphics; 0 < c.length;) this.remove(c[0]);
            if (!b) this.onGraphicsClear()
        },
        _setIEOpacity: function(a, b) {
            var c = a && a.getNode();
            if (c) {
                var e = a.strokeStyle,
                    d = c.stroke;
                e && d && (d.opacity = e.color.a * b);
                e = a.fillStyle;
                d = c.fill;
                e && d && ("tile" === d.type ? G.set(c, "opacity", b) : d.opacity = e.a * b)
            }
        },
        setOpacity: function(a, b) {
            if (b || this.opacity != a) {
                var c = this._div;
                c && (t ? (n.forEach(this.graphics, function(b) {
                    this._setIEOpacity(b._shape, a);
                    this._setIEOpacity(b._bgShape, a)
                }, this), c._esriIeOpacity = a, this._bgGroup._esriIeOpacity = a) : this._canvas ? G.set(c.getEventSource(), "opacity", a) : c.getEventSource().setAttribute("opacity", a));
                this.opacity = a;
                if (!b) this.onOpacityChange(a)
            }
        },
        setRenderer: function(a) {
            this.renderer =
                a;
            this._evalSDRenderer(!0);
            this.emit("renderer-change", {
                renderer: this._rndForScale || a
            })
        }
    });
    x = x([L, W], {
        declaredClass: "esri.layers.GraphicsLayer",
        constructor: function() {
            this.enableMouseEvents = y.hitch(this, this.enableMouseEvents);
            this.disableMouseEvents = y.hitch(this, this.disableMouseEvents);
            this._processEvent = y.hitch(this, this._processEvent);
            this._initLayer()
        },
        _initLayer: function() {
            this.loaded = !0;
            this.onLoad(this)
        },
        _setMap: function() {
            var a = this.inherited("_setMap", arguments);
            this.enableMouseEvents();
            return a
        },
        _unsetMap: function() {
            this.disableMouseEvents();
            this.inherited("_unsetMap", arguments)
        },
        _processEvent: function(a) {
            var b = this._map,
                c = a.target,
                e;
            a.screenPoint = new J(a.pageX - b.position.x, a.pageY - b.position.y);
            for (a.mapPoint = b.toMap(a.screenPoint); c && !(e = c.e_graphic);) c = c.parentNode;
            if (e) return a.graphic = e, a
        },
        _onMouseOverHandler: function(a) {
            if (this._processEvent(a)) this.onMouseOver(a)
        },
        _onMouseMoveHandler: function(a) {
            if (this._processEvent(a)) this.onMouseMove(a)
        },
        _onMouseDragHandler: function(a) {
            if (this._processEvent(a)) this.onMouseDrag(a)
        },
        _onMouseOutHandler: function(a) {
            if (this._processEvent(a)) this.onMouseOut(a)
        },
        _onMouseDownHandler: function(a) {
            this._downGr = this._downPt = null;
            this._processEvent(a) && (v.disconnect(this._onmousemove_connect), v.disconnect(this._onmousedrag_connect), this._onmousedrag_connect = v.connect(this._div.getEventSource(), "onmousemove", this, "_onMouseDragHandler"), this._downGr = a.graphic, this._downPt = a.screenPoint.x + "," + a.screenPoint.y, this.onMouseDown(a))
        },
        _onMouseUpHandler: function(a) {
            this._upGr = this._upPt = null;
            this._processEvent(a) &&
                (v.disconnect(this._onmousedrag_connect), v.disconnect(this._onmousemove_connect), this._onmousemove_connect = v.connect(this._div.getEventSource(), "onmousemove", this, "_onMouseMoveHandler"), this._upGr = a.graphic, this._upPt = a.screenPoint.x + "," + a.screenPoint.y, this.onMouseUp(a))
        },
        _onClickHandler: function(a) {
            if (this._processEvent(a)) {
                var b = this._downGr,
                    c = this._upGr;
                b && (c && b === c && this._downPt === this._upPt) && (t && (T._ieGraphic = a.graphic), this.onClick(a))
            }
        },
        _onDblClickHandler: function(a) {
            if (this._processEvent(a)) this.onDblClick(a)
        },
        onMouseOver: function() {},
        onMouseMove: function() {},
        onMouseDrag: function() {},
        onMouseOut: function() {},
        onMouseDown: function() {},
        onMouseUp: function() {},
        onClick: function() {},
        onDblClick: function() {},
        enableMouseEvents: function() {
            if (!this._mouseEvents) {
                var a = v.connect,
                    b = this._div.getEventSource();
                E || (this._onmouseover_connect = a(b, "onmouseover", this, "_onMouseOverHandler"), this._onmousemove_connect = a(b, "onmousemove", this, "_onMouseMoveHandler"), this._onmouseout_connect = a(b, "onmouseout", this, "_onMouseOutHandler"),
                    this._onmousedown_connect = a(b, "onmousedown", this, "_onMouseDownHandler"), this._onmouseup_connect = a(b, "onmouseup", this, "_onMouseUpHandler"), this._onclick_connect = a(b, "onclick", this, "_onClickHandler"), this._ondblclick_connect = a(b, "ondblclick", this, "_onDblClickHandler"));
                this._mouseEvents = !0
            }
        },
        disableMouseEvents: function() {
            if (this._mouseEvents) {
                var a = v.disconnect;
                a(this._onmouseover_connect);
                a(this._onmousemove_connect);
                a(this._onmousedrag_connect);
                a(this._onmouseout_connect);
                a(this._onmousedown_connect);
                a(this._onmouseup_connect);
                a(this._onclick_connect);
                a(this._ondblclick_connect);
                this._mouseEvents = !1
            }
        }
    });
    x._GraphicsContainer = X;
    x._GraphicsLayer = L;
    return x
});