require({cache:{
'url:esri/dijit/RendererSlider/templates/RendererSlider.html':"<div class=\"${_css.container}\" data-dojo-attach-point=\"_containerNode\">\n  <div class=\"${_css.topLabelNode}\" data-dojo-attach-point=\"_topNode\"></div>\n  <div class=\"${_css.slidernode}\" data-dojo-attach-point=\"_sliderNode\">\n    <div class=\"${_css.sliderarea}\" data-dojo-attach-point=\"_sliderArea\"></div>\n    <div class=\"${_css.sliderarearight}\" data-dojo-attach-point=\"_sliderAreaRight\"></div>\n  </div>\n  <div class=\"${_css.bottomLabelNode}\" data-dojo-attach-point=\"_botNode\"></div>\n</div>"}});
//>>built
define("esri/dijit/RendererSlider", ["../kernel", "dijit/_OnDijitClickMixin", "dijit/_TemplatedMixin", "dijit/_WidgetBase", "dijit/Tooltip", "dijit/form/NumberTextBox", "dojo/i18n!../nls/jsapi", "dojo/on", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/lang", "dojo/dnd/move", "dojo/dom-construct", "dojo/dom-style", "dojo/Evented", "dojo/number", "dojo/has", "dojo/text!./RendererSlider/templates/RendererSlider.html"], function(J, v, w, x, K, C, D, t, y, E, b, F, u, A, G, p, L, H) {
    return E("esri.dijit.RendererSlider", [x, v, w, G], {
        templateString: H,
        minimum: 0,
        maximum: 100,
        values: [50],
        precision: 0,
        theme: "Slider",
        intermediateChanges: !1,
        minLabel: null,
        maxLabel: null,
        _visibleLabels: ["data", "handle"],
        jsapiBundle: D.widgets.rendererSlider,
        type: null,
        handles: [],
        primaryHandle: null,
        _valueDifferenceByIndex: [],
        _primaryHandleIdx: null,
        _currentTopValue: [],
        constructor: function(b, k) {
            this.inherited(arguments);
            this.domNode = k;
            this._css = {
                container: "esriRendererSlider",
                slidernode: "sliderNode",
                sliderarea: "sliderArea",
                sliderarearight: "sliderAreaRight",
                topLabelNode: "topLabelNode",
                bottomLabelNode: "bottomLabelNode"
            };
            this.showLabels = b.showLabels || this.showLabels
        },
        startup: function() {
            this.inherited(arguments);
            this._generateMoveables();
            this.watch("values", this._valuesChange)
        },
        _generateMoveables: function() {
            var I = this._sliderNode,
                k = A.get(this._sliderArea, "height"),
                f = this.get("minimum"),
                l = this.get("maximum"),
                c = this.get("minLabel"),
                v = this.get("maxLabel"),
                g = this.get("precision"),
                s = this.get("step") || Math.pow(10, -g),
                r = this.get("showLabels"),
                w = this.get("showTicks"),
                z = b.hitch(this, this.setValue),
                x = this.get("values"),
                B;
            !1 !==
                r && "heatmapSlider" === this.type ? (this._topNode.innerHTML = "High", this._botNode.innerHTML = "Low") : !0 === r || "object" === typeof r && -1 !== r.indexOf("data") ? (this._topNode.innerHTML = p.format(v || l, {
                    places: g
                }), this._botNode.innerHTML = p.format(c || f, {
                    places: g
                })) : (this._topNode.innerHTML = "\x26nbsp;", this._botNode.innerHTML = "\x26nbsp;");
            this._primaryHandleIdx = null;
            this.moveables = B = y.map(x, b.hitch(this, function(m, d) {
                m.primaryHandle && (this._primaryHandleIdx = d);
                if ("object" === typeof m && m.hidden) return null;
                "object" ===
                typeof m && (m = m.value);
                var n, e, h, c;
                n = Math.round((1 - (m - f) / (l - f)) * k);
                e = u.create("div", {
                    style: "top: " + n + "px",
                    className: "moveable"
                }, I);
                n = u.create("div", {
                    className: "handler"
                }, e);
                e._handler = n;
                if ("heatmapSlider" !== this.type && (!0 === r || "object" === typeof r && -1 !== r.indexOf("handles"))) h = u.create("div", {
                    className: "handlerLabel",
                    innerHTML: p.format(m, {
                        places: g
                    })
                }, e), e._label = h, t(h, "click", b.hitch(this, function(a) {
                    if (!e._numberEditor) {
                        var c = h.innerHTML;
                        h.innerHTML = "";
                        a = u.create("input", {
                            type: "text",
                            id: "NumberTextBox" +
                                d
                        }, h);
                        var q = new C({
                            value: p.format(m, {
                                places: g
                            }),
                            constraints: {
                                min: f,
                                max: l
                            }
                        }, a);
                        e._numberEditor = q;
                        t(q, "focus", function(a) {
                            q.set("value", c)
                        });
                        t(q, "keydown", b.hitch(this, function(a) {
                            13 === a.keyCode && q.focusNode.blur()
                        }));
                        t(q, "blur", function(a) {
                            h.innerHTML = p.format(this.value, {
                                places: g
                            });
                            this.destroy();
                            e._numberEditor = null
                        });
                        t(q, "change", b.hitch(this, function(a) {
                            "sizeInfoSlider" === this.type || "classedColorSlider" === this.type ? this.values[d] = a : this.values[d].value = c = a;
                            this._reset();
                            this._generateMoveables();
                            this.emit("handle-value-change", {
                                values: this.values
                            })
                        }));
                        q.focus()
                    }
                }));
                w && (c = 0 === d ? "handlerTick handlerTickBottom" : "handlerTick handlerTickTop", "heatmapSlider" === this.type && (c += " heatmapTick"), u.create("div", {
                    className: c
                }, e));
                n = new F.constrainedMoveable(e, {
                    handle: n,
                    within: !0,
                    constraints: function() {
                        return {
                            t: 0,
                            l: 0,
                            w: 0,
                            h: k
                        }
                    }
                });
                n.onMoveStart = b.hitch(this, function(a) {
                    this._currentTopValue[d] = a.node.style.top;
                    e._numberEditor && (e._numberEditor.destroy(), e._numberEditor = null)
                });
                n.onMoved = b.hitch(this, function(a) {
                    if (d ===
                        this._primaryHandleIdx) {
                        var c = Number(this._currentTopValue[d].replace("px", "")) - Number(a.node.style.top.replace("px", ""));
                        this._currentTopValue[d] = a.node.style.top;
                        y.forEach(B, b.hitch(this, function(a, e) {
                            if (a) {
                                var d = Number(a.style.top.replace("px", "")) - c,
                                    b = parseFloat((Math.round(((1 - Number(d / k)) * (l - f) + f) / s) * s).toFixed(g));
                                b < f || b > l || (A.set(a, "top", d + "px"), z(e, b, !1), a._label && (a._label.innerHTML = p.format(b, {
                                    places: g
                                })))
                            }
                        }))
                    }
                    a = 1 - Number(a.node.style.top.replace("px", "")) / k;
                    a = parseFloat((Math.round((a *
                        (l - f) + f) / s) * s).toFixed(g));
                    this._valueDifferenceByIndex[d] = this.values[d].value - a;
                    h && (h.innerHTML = p.format(a, {
                        places: g
                    }));
                    z(d, a, !1)
                });
                n.onMoveStop = b.hitch(this, function(a) {
                    a = 1 - Number(a.node.style.top.replace("px", "")) / k;
                    a = parseFloat((Math.round((a * (l - f) + f) / s) * s).toFixed(g));
                    h && (h.innerHTML = p.format(a, {
                        places: g
                    }));
                    z(d, a, !0)
                });
                return e
            }))
        },
        _reset: function() {
            y.forEach(this.moveables, b.hitch(this, function(b) {
                b && b.remove()
            }));
            this.moveables = []
        },
        setValue: function(b, k, f) {
            var l = this.get("values"),
                c = l.slice(0);
            "object" === typeof l[0] ? c[b].value = k : c[b] = k;
            (this.intermediateChanges || f) && this.set("values", c);
            f ? this.emit("stop", {
                values: this.get("values")
            }) : this.emit("slide", {
                values: c
            })
        },
        _valuesChange: function() {
            this.emit("change", {
                values: this.get("values")
            })
        }
    })
});