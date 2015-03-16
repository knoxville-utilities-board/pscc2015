//>>built
define("esri/layers/StreamLayer", ["dojo/_base/declare", "dojo/_base/connect", "dojo/_base/array", "dojo/_base/Color", "dojo/_base/lang", "dojo/has", "dojo/on", "../kernel", "../request", "../graphic", "./FeatureLayer", "./StreamMode", "./StreamTrackManager", "../geometry/jsonUtils", "../symbols/SimpleFillSymbol", "../symbols/SimpleLineSymbol", "../symbols/SimpleMarkerSymbol", "../renderers/SimpleRenderer", "./PurgeOptions"], function(u, v, f, m, p, C, w, D, x, y, q, z, A, n, r, g, s, B, t) {
    return u([q], {
        declaredClass: "esri.layers.StreamLayer",
        _preventInit: !0,
        constructor: function(a, c) {
            c =
                c || {};
            if (!c.mode || c.mode === q.MODE_STREAM) this._isStream = !0, this.currentMode = this.mode = q.MODE_STREAM, this._mode = new z(this);
            this.purgeOptions = new t(this, c.purgeOptions || {});
            this._reconnectAttempts = 0;
            this.maxReconnectAttempts = 10;
            this.socket = this._reconnectTimeoutId = null;
            this._keepLatestQueried = !1;
            this._keepLatestUrl = null;
            this._relatedQueried = !1;
            this._joinField = this._relatedUrl = null;
            this._attemptReconnect = p.hitch(this, this._attemptReconnect);
            this._purge = p.hitch(this, this._purge);
            this._initFeatureLayer(a,
                c)
        },
        _initLayer: function(a, c) {
            this.inherited(arguments);
            if (a) {
                var b;
                if (a.layerDefinition) this.purgeOptions = new t(this, this._params.purgeOptions || {}), this.socketUrl = this._params.socketUrl || a.layerDefinition.socketUrl || void 0;
                else {
                    if (this._params.socketUrl) this.socketUrl = this._params.socketUrl;
                    else {
                        var d = this._getWebsocketConnectionInfo(a),
                            e = d.urls;
                        e && e.length ? (this._socketUrls = e, this.socketUrl = e[0], this.socketDirection = "broadcast" === this._params.socketDirection ? "broadcast" : "subscribe", this.socketUrl +=
                            "/" + this.socketDirection, this._websocketToken = d.token, e.length > this.maxReconnectAttempts && (this.maxReconnectAttempts = e.length)) : (this.socketUrl = void 0, d = "No web socket urls were retrieved from the Stream Service. Layer will not attempt to connect.", "https:" === location.protocol && (d += " An insecure web socket connection cannot be made from a secure web page."), this.onError(Error(d)))
                    }
                    if (this._params.filter) try {
                        this._filter = b = this._makeFilter(this._params.filter)
                    } catch (h) {
                        this.onError(Error("Error trying to create filter object: " +
                            h + ". Layer will not have filter applied")), this._filter = null
                    }
                    if (this._params.geometryDefinition || this._outFields || this._defnExpr) {
                        b = b || {};
                        b.geometry = this._params.geometryDefinition;
                        b.outFields = this._outFields;
                        b.where = this._defnExpr;
                        try {
                            this._filter = b = this._makeFilter(b)
                        } catch (k) {
                            this.onError(Error("Error trying to create filter object: " + k + ". Layer will not have filter applied")), this._filter = null
                        }
                    }
                }
                this.maximumTrackPoints = this._params.maximumTrackPoints && 0 < this._params.maximumTrackPoints ? this._params.maximumTrackPoints :
                    0;
                (this._params.refreshRate || 0 === this._params.refreshRate) && this._mode && this._mode._setRefreshRate && this._mode._setRefreshRate(this._params.refreshRate);
                this._keepLatestUrl = a.keepLatestArchive ? a.keepLatestArchive.featuresUrl : null;
                a.relatedFeatures && (a.relatedFeatures.featuresUrl && a.relatedFeatures.joinField) && (this._relatedUrl = a.relatedFeatures.featuresUrl, this.objectIdField = this._joinField = a.relatedFeatures.joinField);
                this.objectIdField || this._makeObjectIdField();
                this._map && (this.socketUrl && !this._connected) &&
                    this.connect()
            }
        },
        _setMap: function(a) {
            var c = this.inherited(arguments),
                b = this._getRenderer();
            if (this.timeInfo && (this._trackIdField || b && (b.latestObservationRenderer || b.trackRenderer))) this._trackManager = new A(this), this._trackManager.initialize(a);
            this.socketUrl && (!this._connected && this._map) && this.connect();
            return c
        },
        _unsetMap: function(a, c) {
            f.forEach(this._connects, v.disconnect);
            (this._connected || this._reconnecting || this.socket) && this.disconnect();
            this.inherited(arguments);
            this._map = null
        },
        add: function(a) {
            this.inherited(arguments)
        },
        clear: function() {
            try {
                this._mode && this._mode._clearDrawBuffer && this._mode._clearDrawBuffer(), this._trackManager && this._trackManager.clearTracks()
            } catch (a) {}
            this.inherited(arguments)
        },
        setDefinitionExpression: function(a) {
            this.setFilter({
                where: a
            })
        },
        getDefinitionExpression: function() {
            var a;
            this._filter && (a = this._filter.where);
            return a
        },
        destroy: function() {
            this.disconnect();
            this.inherited(arguments)
        },
        onResume: function(a) {
            this.inherited(arguments)
        },
        setGeometryDefinition: function(a) {
            this.setFilter({
                geometry: a
            })
        },
        getGeometryDefinition: function() {
            var a;
            this._filter && (a = this._filter.geometry);
            return a
        },
        connect: function(a) {
            var c = this,
                b, d = [],
                e = this._filter,
                h, k, f = this.socketUrl,
                l;
            try {
                if (!this._connected) {
                    if (this._relatedUrl && !this._relatedQueried && this._mode._fetchArchive) return b = this.on("update-end", function() {
                        c._relatedQueried = !0;
                        b.remove();
                        b = null;
                        c.connect()
                    }), this._mode._fetchArchive(this._relatedUrl), !1;
                    if (this._keepLatestUrl && !this._keepLatestQueried && this._mode._fetchArchive) return b = this.on("update-end",
                        function() {
                            c._keepLatestQueried = !0;
                            b.remove();
                            b = null;
                            c.connect()
                        }), this._mode._fetchArchive(this._keepLatestUrl), !1;
                    this._websocketToken && d.push("token\x3d" + this._websocketToken);
                    this._map && this._map.spatialReference && this.spatialReference && this._map.spatialReference.wkid !== this.spatialReference.wkid && d.push("outSR\x3d" + this._map.spatialReference.wkid);
                    if (e)
                        for (k in e) null !== e[k] && (h = "geometry" === k ? JSON.stringify(e[k]) : e[k], d.push(k + "\x3d" + h));
                    0 < d.length && (f += "?" + d.join("\x26"));
                    return l = this._createConnection(f,
                        a)
                }
            } catch (g) {
                console.log("Error connecting to data stream: ", g), a && a(g, !1), this.onConnectionError({
                    error: g
                })
            }
        },
        disconnect: function(a) {
            this._reconnectTimeoutId && clearTimeout(this._reconnectTimeoutId);
            this._reconnecting = this._connected = !1;
            this.socket && this.socket.close();
            this.onDisconnect({
                willReconnect: !1,
                message: "Connection closed from client"
            });
            a && a(null, !0)
        },
        setFilter: function(a) {
            var c, b;
            if (this._collection) return this.onError("Filter can only be set when the source of the layer is a Stream Service"), !1;
            try {
                if (void 0 !== a.outFields) return b = Error("Outfields property cannot be changed after layer is created"), this.onFilterChange({
                    filter: this.getFilter(),
                    error: b
                }), !1;
                c = this._makeFilter(a)
            } catch (d) {
                return b = Error(d), this.onFilterChange({
                    filter: this.getFilter(),
                    error: b
                }), !1
            }
            if (this.socket) a = {
                filter: c
            }, this.socket.send(JSON.stringify(a));
            else w.once(this, "connect", function(a) {
                this.setFilter(c)
            });
            return !0
        },
        getFilter: function() {
            var a = this._filter,
                c = {},
                b = ["geometry", "outFields", "where"];
            a && f.forEach(b,
                function(b) {
                    var e = a[b];
                    e && ("geometry" === b ? e = n.fromJson(e) : "outFields" === b && (e = e.split(",")), c[b] = e)
                });
            return c
        },
        setMaximumTrackPoints: function(a) {
            if (!a && 0 !== a) return !1;
            this.maximumTrackPoints = a;
            this._mode.propertyChangeHandler(3)
        },
        getUniqueValues: function(a) {
            var c, b = {},
                d = [];
            c = this._getField(a, !0);
            if (!c) return d;
            a = c.name;
            f.forEach(this.graphics || [], function(c) {
                c = (c.attributes || {})[a];
                void 0 !== c && !b[c] && (b[c] = 1, d.push(c))
            });
            d.sort(function(a, b) {
                return a < b ? -1 : a > b ? 1 : 0
            });
            return d
        },
        onMessage: function() {},
        onConnect: function() {},
        onDisconnect: function() {},
        onFilterChange: function() {},
        onAttemptReconnect: function() {},
        onConnectionError: function() {},
        _createConnection: function(a, c) {
            var b = this,
                d = new WebSocket(a);
            d.onopen = function() {
                b.socket = d;
                b._connected = !0;
                b._reconnecting = !1;
                b._reconnectAttempts = 0;
                b._bind();
                b.onConnect();
                c && c(null, !0)
            };
            d.onclose = function(a) {
                var c, d = !0,
                    f = b._connected,
                    l = null;
                if (b._connected || b._reconnecting) {
                    if (a.code)
                        if (c = "Connection failed: ", 4400 === a.code) c += a.reason || "Invalid url parameters. Check filter properties.",
                            d = !1;
                        else if (4404 === a.code) c += "Service not found", d = !1;
                    else if (4401 === a.code || 4403 === a.code) c += "Not authorized", d = !1;
                    d && (b._reconnectAttempts += 1, b._reconnectAttempts > b.maxReconnectAttempts && (c = "Maximum reconnect attempts exceeded", d = !1, f = !0));
                    b._connected = !1;
                    f && (c && (l = Error(c)), b.onDisconnect({
                        error: l,
                        willReconnect: d
                    }));
                    d ? b._attemptReconnect() : b.socket = null
                } else b.socket || (l = Error("Could not make connection to service"), b.onConnectionError({
                    error: l
                })), b.socket = null, b._connected = !1
            };
            d.onerror = function(a) {
                console.log("Socket error")
            };
            return d
        },
        _purge: function() {
            var a, c = [],
                b;
            if (this.purgeOptions.displayCount && this.graphics.length > this.purgeOptions.displayCount)
                for (a = 0; a < this.graphics.length - this.purgeOptions.displayCount; a++) b = this.graphics[a], c.push(b);
            0 < c.length && (this._mode._removeFeatures(c), this._trackManager && this._trackManager.removeFeatures(c))
        },
        _bind: function() {
            var a = this;
            this.socket.onmessage = function(c) {
                a._onMessage(JSON.parse(c.data))
            }
        },
        _onMessage: function(a) {
            var c = this;
            this.onMessage(a);
            var b = {
                create: function(a) {
                    c._create(a)
                },
                update: function(a) {
                    c._update(a)
                },
                "delete": function(a) {
                    c._delete(a)
                }
            };
            if (a.type) b[a.type](a.feature);
            else a.hasOwnProperty("filter") ? c._handleFilterMessage(a) : this._create(a)
        },
        _create: function(a) {
            function c(a) {
                if (!b._featureHasOID(a, d)) {
                    if (!a.geometry) return !1;
                    a.attributes = a.attributes || {};
                    a.attributes[d] = b._nextId++
                }
                a = a.declaredClass ? a : new y(a);
                b._mode.drawFeature(a)
            }
            var b = this,
                d = b.objectIdField;
            a.length ? a.forEach(function(a) {
                a && c(a)
            }) : a && c(a)
        },
        _delete: function(a) {
            var c = this,
                b = a[c.objectIdField] ||
                a.attributes[c.objectIdField],
                d = !1;
            this.graphics.forEach(function(a) {
                a.attributes[c.objectIdField] == b && (d = a)
            });
            d && this.remove(d)
        },
        _update: function(a) {
            var c = this,
                b = !1;
            this.graphics.forEach(function(d) {
                d.attributes[c.objectIdField] == a.attributes[c.objectIdField] && (b = d)
            });
            b && (a.attributes && b.setAttributes(a.attributes), a.geometry && b.setGeometry(n.fromJson(a.geometry)))
        },
        _makeFilter: function(a) {
            var c, b = null;
            a = a || {};
            if (void 0 !== a.geometry)
                if (b = b || {}, null === a.geometry) b.geometry = null;
                else {
                    c = "string" ===
                        typeof a.geometry ? n.fromJson(JSON.parse(a.geometry)) : a.geometry.declaredClass ? a.geometry : n.fromJson(a.geometry);
                    if (!c || "point" === c.type) throw "Query object contains invalid geometry";
                    "extent" !== c.type && (c = c.getExtent());
                    if (!c || 0 === c.getHeight() && 0 === c.getWidth()) throw "Invalid filter geometry: Extent cannot have a height and width of 0";
                    b.spatialRel = "esriSpatialRelIntersects";
                    b.geometryType = "esriGeometryEnvelope";
                    b.geometry = c.toJson()
                }
            void 0 !== a.where && (b = b || {}, b.where = a.where);
            if (void 0 !== a.outFields &&
                (b = b || {}, a = "string" === typeof a.outFields ? "*" === a.outFields ? null : a.outFields.replace(/,\s+/g, ",").split(",") : null === a.outFields ? null : a.outFields, a = this._makeOutFields(a))) {
                if (a.errors && 0 < a.errors.length) throw "Invalid filter outFields. " + a.errors.join(",");
                b.outFields = a.fields ? a.fields.join(",") : null
            }
            return b
        },
        _makeOutFields: function(a) {
            var c = this,
                b = [],
                d = [],
                e = {
                    fields: null
                };
            if (!a || 0 === a.length) return e;
            f.forEach(a, function(a) {
                if ("*" === a) return e;
                var f = c._getField(a, !0);
                f ? b.push(f.name) : d.push("Field named " +
                    a + " not found in schema.")
            });
            a = c._getOutFields();
            f.forEach(a, function(a) {
                c._getField(a) && -1 === f.indexOf(b, a) && b.push(a)
            });
            e.fields = b;
            e.errors = d;
            return e
        },
        _handleFilterMessage: function(a) {
            a.error ? (a = Error(a.error.join(",")), this.onFilterChange({
                filter: this.getFilter(),
                error: a
            })) : (a = a.filter, a.geometry && "string" === typeof a.geometry && (a.geometry = JSON.parse(a.geometry)), this._filter = a, this.onFilterChange({
                filter: this.getFilter()
            }))
        },
        _getWebsocketConnectionInfo: function(a) {
            var c = {
                    urls: []
                },
                b, d = [],
                e = [],
                h, k, g;
            a.streamUrls && f.forEach(a.streamUrls, function(a) {
                "ws" === a.transport && (b = a.urls, c.token = a.token)
            });
            if (!b) return c;
            f.forEach(b, function(a) {
                0 === a.lastIndexOf("wss", 0) ? e.push(a) : d.push(a)
            });
            a = "https:" === location.protocol || 0 === this.url.lastIndexOf("https:", 0) ? e : 0 === d.length ? e : d;
            if (1 < a.length)
                for (h = 0; h < a.length - 1; h++) k = h + Math.floor(Math.random() * (a.length - h)), g = a[k], a[k] = a[h], a[h] = g;
            c.urls = a;
            return c
        },
        _attemptReconnect: function() {
            var a = this,
                c;
            this._reconnectTimeoutId = null;
            a._connected = !1;
            if (!a._socketUrls) return !1;
            if (!a._collection && !a._reconnecting && a.socket && a.credential) return a._reconnecting = !0, a._getServiceConnectionMetadata(a._attemptReconnect), !1;
            a._reconnecting = !0;
            a.socket = null;
            if (a._reconnectAttempts > a.maxReconnectAttempts) return a._reconnecting = !1;
            a.socketUrl = a._socketUrls[a._reconnectAttempts > a._socketUrls.length - 1 ? a._reconnectAttempts % a._socketUrls.length : a._reconnectAttempts];
            a.socketUrl += "/" + a.socketDirection;
            c = a._randomIntFromInterval(0, 1E3);
            this._reconnectTimeoutId = setTimeout(function() {
                a.onAttemptReconnect({
                    count: a._reconnectAttempts,
                    url: a.socketUrl
                });
                a.connect()
            }, 1E3 * a._reconnectAttempts + c)
        },
        _getServiceConnectionMetadata: function(a) {
            var c = this,
                b = c._url.path;
            a = "function" === typeof a ? a : null;
            x({
                url: b,
                content: p.mixin({
                    f: "json"
                }, this._url.query),
                callbackParamName: "callback"
            }).then(function(b) {
                b = c._getWebsocketConnectionInfo(b);
                c._websocketToken = b.token;
                a && a()
            }, function(a) {
                c.onError(Error(a))
            })
        },
        _setDefaultRenderer: function() {
            var a = this.geometryType,
                c = new m([5, 112, 176, 0.8]),
                b = new m([255, 255, 255]),
                b = new g(g.STYLE_SOLID, b, 1),
                d;
            if ("esriGeometryPoint" ===
                a || "esriGeometryMultipoint" === a) d = new s(s.STYLE_CIRCLE, 10, b, c);
            else if ("esriGeometryPolyline" === a) d = new g(g.STYLE_SOLID, c, 2);
            else if ("esriGeometryPolygon" === a || "esriGeometryEnvelope" === a) c = new m([5, 112, 176, 0.2]), b = new m([5, 112, 176, 0.8]), b = new g(g.STYLE_SOLID, b, 1), d = new r(r.STYLE_SOLID, b, c);
            d && this.setRenderer(new B(d))
        },
        _makeObjectIdField: function() {
            var a = 1,
                c, b, d = [];
            if (!this.objectIdField) {
                c = this.fields.length;
                for (b = 0; b < c; b++) d.push(this.fields[b].name.toLowerCase());
                for (; - 1 !== f.indexOf(d, "objectid_" +
                        a);) a += 1;
                this.objectIdField = "objectid_" + a
            }
        },
        _featureHasOID: function(a, c) {
            return a.attributes && (a.attributes[c] || 0 === a.attributes[c])
        },
        _randomIntFromInterval: function(a, c) {
            return Math.floor(Math.random() * (c - a + 1) + a)
        }
    })
});