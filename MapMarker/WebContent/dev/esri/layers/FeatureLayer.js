//>>built
define("esri/layers/FeatureLayer", ["require", "module", "dojo/_base/declare", "dojo/_base/connect", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/json", "dojo/_base/Deferred", "dojo/date/locale", "dojo/sniff", "dojo/io-query", "dojo/dom-construct", "dojo/i18n", "dojo/when", "dojo/promise/all", "../kernel", "../lang", "../request", "../config", "../deferredUtils", "../SpatialReference", "../symbols/SimpleMarkerSymbol", "../symbols/SimpleLineSymbol", "../symbols/SimpleFillSymbol", "../symbols/jsonUtils", "../renderers/SimpleRenderer", "../renderers/UniqueValueRenderer", "../renderers/jsonUtils", "../tasks/QueryTask", "../tasks/query", "../tasks/FeatureSet", "../tasks/StatisticDefinition", "../geometry/Extent", "../geometry/jsonUtils", "../geometry/normalizeUtils", "../geometry/scaleUtils", "./GraphicsLayer", "./Field", "./TimeInfo", "./FeatureType", "./FeatureTemplate", "./FeatureEditResult", "./LabelClass", "./SnapshotMode", "./OnDemandMode", "./SelectionMode", "./StreamMode", "./TrackManager", "./HeatmapManager", "dojo/i18n!../nls/jsapi", "require"], function(M, S, T, C, q, k, F, u, U, H, V, W, ua, N, X, G, r, D, Y, A, I, Z, $, O, aa, P, ba, ca, da, J, K, ea, Q, fa, ga, ha, ia, ja, ka, la, ma, E, na, L, oa, pa, qa, ra, R, sa) {
    var ta = Y.defaults,
        t = T(ia, {
            declaredClass: "esri.layers.FeatureLayer",
            invalidParams: "query contains one or more unsupported parameters",
            reHostedFS: /https?:\/\/services.*\.arcgis\.com/i,
            maxPointCountForAuto: 4E3,
            maxRecordCountForAuto: 2E3,
            maxVertexCountForAuto: 25E4,
            generalizeForScale: 4E3,
            _eventMap: {
                "add-attachment-complete": ["result"],
                "before-apply-edits": ["adds", "updates", "deletes"],
                "delete-attachments-complete": ["results"],
                "edits-complete": ["adds", "updates", "deletes"],
                "query-attachment-infos-complete": ["results"],
                "query-count-complete": ["count"],
                "query-features-complete": ["featureSet"],
                "query-ids-complete": ["objectIds"],
                "query-related-features-complete": ["featureSets"],
                "selection-complete": ["features", "method"],
                "update-end": ["error", "info"]
            },
            constructor: function(a, b) {
                this._preventInit || this._initFeatureLayer(a, b)
            },
            _initFeatureLayer: function(a, b) {
                this.i18n = sa;
                b = b || {};
                this.showLabels =
                    null != b.showLabels ? b.showLabels : !0;
                this._outFields = b.outFields;
                this._defnExpr = b.definitionExpression;
                this._loadCallback = b.loadCallback;
                var c = b._usePatch;
                this._usePatch = null === c || void 0 === c ? !0 : c;
                this._trackIdField = b.trackIdField;
                this.objectIdField = b.objectIdField;
                this._maxOffset = null != b.maxAllowableOffset ? b.maxAllowableOffset : this.maxAllowableOffset;
                this.quantize = null != b.quantize ? b.quantize : !0;
                this._optEditable = b.editable;
                this._optAutoGen = b.autoGeneralize;
                this.editSummaryCallback = b.editSummaryCallback;
                this.userId = b.userId;
                this.userIsAdmin = b.userIsAdmin;
                this.useMapTime = b.hasOwnProperty("useMapTime") ? !!b.useMapTime : !0;
                this.source = b.source;
                this.gdbVersion = b.gdbVersion;
                this.orderByFields = b.orderByFields;
                this.maxPointCountForAuto = null != b.maxPointCountForAuto ? b.maxPointCountForAuto : this.maxPointCountForAuto;
                this.maxRecordCountForAuto = null != b.maxRecordCountForAuto ? b.maxRecordCountForAuto : this.maxRecordCountForAuto;
                this.maxVertexCountForAuto = null != b.maxVertexCountForAuto ? b.maxVertexCountForAuto : this.maxVertexCountForAuto;
                this.generalizeForScale = null != b.generalizeForScale ? b.generalizeForScale : this.generalizeForScale;
                this.queryPagination = null != b.queryPagination ? b.queryPagination : this.url ? this.reHostedFS.test(this.url) : !1;
                this.multipatchOption = b.multipatchOption;
                this._selectedFeatures = {};
                this._selectedFeaturesArr = [];
                this._newFeatures = [];
                this._deletedFeatures = {};
                this._ulid = this._getUniqueId();
                var d = t,
                    c = this.mode = r.isDefined(b.mode) ? b.mode : d.MODE_ONDEMAND;
                this._isStream && (this.mode = c = d.MODE_STREAM);
                switch (c) {
                    case d.MODE_SNAPSHOT:
                        this.currentMode =
                            d.MODE_SNAPSHOT;
                        this._mode = new L(this);
                        this._isSnapshot = !0;
                        break;
                    case d.MODE_ONDEMAND:
                    case d.MODE_AUTO:
                        this.currentMode = d.MODE_ONDEMAND;
                        this._tileWidth = b.tileWidth || 512;
                        this._tileHeight = b.tileHeight || 512;
                        this._mode = new oa(this);
                        this.latticeTiling = b.latticeTiling;
                        break;
                    case d.MODE_SELECTION:
                        this.currentMode = d.MODE_SELECTION;
                        this._mode = new pa(this);
                        this._isSelOnly = !0;
                        break;
                    case d.MODE_STREAM:
                        this.currentMode = d.MODE_STREAM, this._mode = new qa(this), this._isStream = !0
                }
                this._initLayer = q.hitch(this, this._initLayer);
                this._selectHandler = q.hitch(this, this._selectHandler);
                this._editable = !1;
                if (q.isObject(a) && a.layerDefinition) return this._collection = !0, this.mode = this._isStream ? d.MODE_STREAM : d.MODE_SNAPSHOT, this._initLayer(a), this;
                this._task = new da(this.url, {
                    source: this.source,
                    gdbVersion: this.gdbVersion
                });
                c = this._url.path;
                this._fserver = !1; - 1 !== c.search(/\/FeatureServer\//i) && (this._fserver = !0);
                this.mode === d.MODE_AUTO && this.reHostedFS.test(this.url) && this._queryLimit();
                (d = b.resourceInfo) ? this._initLayer(d): (this.source &&
                    (d = {
                        source: this.source.toJson()
                    }, this._url.query = q.mixin(this._url.query, {
                        layer: F.toJson(d)
                    })), this.gdbVersion && (this._url.query = q.mixin(this._url.query, {
                        gdbVersion: this.gdbVersion
                    })), D({
                        url: c,
                        content: q.mixin({
                            f: "json"
                        }, this._url.query),
                        callbackParamName: "callback",
                        load: this._initLayer,
                        error: this._errorHandler
                    }));
                this.registerConnectEvents()
            },
            _initLayer: function(a, b) {
                if (a || b) {
                    this._json = a;
                    this._findCredential();
                    if (this.credential && this.credential.ssl || a && a._ssl) this._useSSL(), this._task._useSSL();
                    this._collection && (this._isStream || (this.currentMode = t.MODE_SNAPSHOT, this._mode = new L(this)), this._isSnapshot = !0, this._featureSet = a.featureSet, this._nextId = a.nextObjectId, a = a.layerDefinition);
                    this.geometryType = a.geometryType;
                    "string" !== typeof this.multipatchOption && "esriGeometryMultiPatch" === this.geometryType && (this.multipatchOption = "xyFootprint");
                    if (a.hasOwnProperty("capabilities")) {
                        var c = this.capabilities = a.capabilities;
                        c && -1 !== c.toLowerCase().indexOf("editing") ? this._editable = !0 : this._editable = !1
                    } else this._collection || (this._editable = this._fserver);
                    r.isDefined(this._optEditable) ? (this._editable = this._optEditable, delete this._optEditable) : "esriGeometryMultiPatch" === this.geometryType && (this._editable = !1);
                    this._json = F.toJson(this._json);
                    if (this.isEditable()) this._setMaxOffset(null);
                    else if (this.currentMode !== t.MODE_SNAPSHOT && ("esriGeometryPolyline" === this.geometryType || "esriGeometryPolygon" === this.geometryType || this.hasXYFootprint())) this._autoGeneralize = r.isDefined(this._optAutoGen) ? this._optAutoGen :
                        this.currentMode === t.MODE_ONDEMAND, delete this._optAutoGen;
                    var c = a.effectiveMinScale || a.minScale,
                        d = a.effectiveMaxScale || a.maxScale;
                    !this._hasMin && c && this.setMinScale(c);
                    !this._hasMax && d && this.setMaxScale(d);
                    this.layerId = a.id;
                    this.name = a.name;
                    this.description = a.description;
                    this.copyright = a.copyrightText;
                    this.type = a.type;
                    this.displayField = a.displayField;
                    this.defaultDefinitionExpression = a.definitionExpression;
                    this.fullExtent = new Q(a.extent);
                    this.initialExtent = new Q(this.fullExtent.toJson());
                    this.fullExtent.spatialReference &&
                        (this.spatialReference = new I(this.fullExtent.spatialReference.toJson()));
                    this.defaultVisibility = a.defaultVisibility;
                    if ("esriGeometryPoint" === this.geometryType || "esriGeometryMultipoint" === this.geometryType) this.latticeTiling = !1;
                    this.indexedFields = a.indexedFields;
                    this.maxRecordCount = a.maxRecordCount;
                    this.canModifyLayer = a.canModifyLayer;
                    this.supportsStatistics = a.supportsStatistics;
                    this.supportsAdvancedQueries = this._collection ? !1 : a.supportsAdvancedQueries;
                    this.supportsCalculate = a.supportsCalculate;
                    this.supportsAttachmentsByUploadId =
                        a.supportsAttachmentsByUploadId;
                    this.supportsCoordinatesQuantization = a.supportsCoordinatesQuantization;
                    this.quantize = this.quantize && this.supportsCoordinatesQuantization;
                    this.hasLabels = a.hasLabels;
                    this.canScaleSymbols = a.canScaleSymbols;
                    this.supportsRollbackOnFailureParameter = this.supportsRollbackOnFailure = a.supportsRollbackOnFailure;
                    this.syncCanReturnChanges = a.syncCanReturnChanges;
                    this.isDataVersioned = a.isDataVersioned;
                    this.editFieldsInfo = a.editFieldsInfo;
                    this.ownershipBasedAccessControlForFeatures =
                        a.ownershipBasedAccessControlForFeatures;
                    this.editFieldsInfo && this.ownershipBasedAccessControlForFeatures && (this.creatorField = this.editFieldsInfo.creatorField);
                    this.relationships = a.relationships;
                    this.allowGeometryUpdates = r.isDefined(a.allowGeometryUpdates) ? a.allowGeometryUpdates : !0;
                    this.advancedQueryCapabilities = a.advancedQueryCapabilities || {
                        supportsStatistics: this.supportsStatistics,
                        supportsOrderBy: this.supportsAdvancedQueries,
                        supportsDistinct: this.supportsAdvancedQueries
                    };
                    this._setMaxOffset(this._maxOffset, !0);
                    this._isTable = "Table" === this.type;
                    for (var e = this.fields = [], d = a.fields, c = 0; c < d.length; c++) e.push(new ja(d[c]));
                    if (!this.objectIdField) {
                        this.objectIdField = a.objectIdField;
                        if (!this.objectIdField) {
                            d = a.fields;
                            for (c = 0; c < d.length; c++)
                                if (e = d[c], "esriFieldTypeOID" === e.type) {
                                    this.objectIdField = e.name;
                                    break
                                }
                        }!this.objectIdField && !this._isStream && console.debug("esri.layers.FeatureLayer: " + r.substitute({
                            url: this.url
                        }, "objectIdField is not set [url: ${url}]"))
                    }
                    if (!r.isDefined(this._nextId)) {
                        d = this.objectIdField;
                        e = -1;
                        if (this._collection && d)
                            for (var f = (c = this._featureSet) && c.features, l = f ? f.length : 0, g, c = 0; c < l; c++) g = (g = f[c].attributes) && g[d], g > e && (e = g);
                        this._nextId = e + 1
                    }
                    this.globalIdField = a.globalIdField;
                    if (c = this.typeIdField = a.typeIdField)
                        if (c = !this._getField(c) && this._getField(c, !0)) this.typeIdField = c.name;
                    this.visibilityField = a.visibilityField;
                    if (d = a.defaultSymbol) this.defaultSymbol = aa.fromJson(d);
                    var h = this.types = [],
                        n = a.types,
                        m, w, e = (c = this.editFieldsInfo) && c.creatorField,
                        f = c && c.editorField;
                    g = e || f;
                    l = [];
                    if (n)
                        for (c =
                            0; c < n.length; c++) m = new la(n[c]), w = m.templates, g && (w && w.length) && (l = l.concat(w)), h.push(m);
                    n = a.templates;
                    m = this.templates = [];
                    if (n)
                        for (c = 0; c < n.length; c++) h = new ma(n[c]), g && l.push(h), m.push(h);
                    for (c = 0; c < l.length; c++)
                        if (g = q.getObject("prototype.attributes", !1, l[c])) e && delete g[e], f && delete g[f];
                    if (c = a.timeInfo) this.timeInfo = new ka(c), this._startTimeField = c.startTimeField, this._endTimeField = c.endTimeField, this._startTimeField && this._endTimeField && (this._twoTimeFields = !0), this._trackIdField ? c.trackIdField =
                        this._trackIdField : this._trackIdField = c.trackIdField;
                    this.hasAttachments = !this._collection && a.hasAttachments ? !0 : !1;
                    this.htmlPopupType = a.htmlPopupType;
                    var c = a.drawingInfo,
                        p;
                    if ((e = c && c.labelingInfo) && !this.labelingInfo) this.labelingInfo = k.map(e, function(a) {
                        return new na(a)
                    }), this._fixLabelExpr();
                    if (!this.renderer)
                        if (c && c.renderer) {
                            if (p = c.renderer, this.setRenderer(ca.fromJson(p)), "classBreaks" === p.type && this.renderer.setMaxInclusive(!0), !this._collection) {
                                var s = p.type,
                                    d = [];
                                p = this.renderer;
                                switch (s) {
                                    case "simple":
                                        d.push(p.symbol);
                                        break;
                                    case "uniqueValue":
                                    case "classBreaks":
                                        d.push(p.defaultSymbol), d = d.concat(k.map(p.infos, function(a) {
                                            return a.symbol
                                        }))
                                }
                                var d = k.filter(d, r.isDefined),
                                    B = this._url.path + "/images/",
                                    x = this._getToken();
                                k.forEach(d, function(a) {
                                    var b = a.url;
                                    b && (-1 === b.search(/https?\:/) && -1 === b.indexOf("data:") && (a.url = B + b), x && -1 !== a.url.search(/https?\:/) && (a.url += "?token\x3d" + x))
                                })
                            }
                        } else if (d) n = this.types, 0 < n.length ? (p = new ba(this.defaultSymbol, this.typeIdField), k.forEach(n, function(a) {
                            p.addValue(a.id, a.symbol)
                        })) :
                        p = new P(this.defaultSymbol), this.setRenderer(p);
                    else if (!this._isTable) {
                        switch (this.geometryType) {
                            case "esriGeometryPoint":
                            case "esriGeometryMultipoint":
                                s = new Z;
                                break;
                            case "esriGeometryPolyline":
                                s = new $;
                                break;
                            case "esriGeometryPolygon":
                                s = new O;
                                break;
                            default:
                                this.hasXYFootprint() && (s = new O)
                        }
                        this.setRenderer(s ? new P(s) : null)
                    }
                    s = c && c.transparency || 0;
                    !this.hasOwnProperty("opacity") && 0 < s && (this.opacity = 1 - s / 100);
                    this.version = a.currentVersion;
                    this.version || (this.version = "capabilities" in a || "drawingInfo" in
                        a || "hasAttachments" in a || "htmlPopupType" in a || "relationships" in a || "timeInfo" in a || "typeIdField" in a || "types" in a ? 10 : 9.3);
                    if ((H("ie") || 7 <= H("trident") || H("safari")) && this.isEditable() && 10.02 > this.version) this._ts = !0;
                    this.statistics = a.statistics;
                    this._fixRendererFields();
                    this._checkFields();
                    this._updateCaps();
                    var v = function() {
                        this.currentMode !== t.MODE_SNAPSHOT && (this.queryPagination = !1);
                        this.loaded = !0;
                        this.onLoad(this);
                        var a = this._loadCallback;
                        a && (delete this._loadCallback, a(this))
                    };
                    this._collection ?
                        (s = this._featureSet, this._featureSet = null, this._mode._drawFeatures(new K(s)), this._fcAdded = !0, v.call(this)) : this._forceIdentity(this._limitPromise ? function() {
                            var a = this;
                            this._limitPromise.then(function(b) {
                                a._checkMode(b)
                            });
                            this._limitPromise.always(function() {
                                a._limitPromise = null;
                                v.call(a)
                            })
                        } : v)
                }
            },
            setShowLabels: function(a) {
                this.showLabels = a;
                this.onShowLabelsChange()
            },
            onShowLabelsChange: function() {},
            onRendererChange: function(a) {
                this.inherited(arguments);
                var b = this._map;
                this._ager = !(!a || !a.observationAger ||
                    !a.observationRenderer);
                a && "colors" in a && "blurRadius" in a && "maxPixelIntensity" in a ? "esriGeometryPoint" == this.geometryType && (!this._heatmapManager && b) && (this._heatmapManager = new R(this), this._heatmapManager.initialize(b)) : this.renderer && this.renderer.getRendererInfo ? k.some(this.renderer.rendererInfos, function(a) {
                    return a.renderer && "colors" in a.renderer && "blurRadius" in a.renderer
                }) || (this._heatmapManager = null) : this._heatmapManager = null;
                if (a) {
                    var c = [],
                        b = k.filter([a, a.observationRenderer, a.latestObservationRenderer,
                            a.trackRenderer
                        ], r.isDefined),
                        d = function(a) {
                            return null != a && "function" != typeof a && a
                        };
                    k.forEach(b, function(a) {
                        var b = d(a.attributeField),
                            l = d(a.attributeField2);
                        a = d(a.attributeField3);
                        !1 !== b && c.push(b);
                        !1 !== l && c.push(l);
                        !1 !== a && c.push(a)
                    });
                    this._rendererFields = c
                } else this._rendererFields = [];
                this.loaded && (this._fixRendererFields(), this._checkFields(this._rendererFields), this._collection && (this._typesDirty = !0))
            },
            redraw: function() {
                this.inherited(arguments);
                this._trackManager && this._trackManager.container &&
                    this._trackManager.container.redraw()
            },
            _evalSDRenderer: function() {
                this.inherited(arguments);
                var a = this._getRenderer();
                this._ager = !(!a || !a.observationAger || !a.observationRenderer);
                this._trackManager && this._trackManager.container && this._trackManager.container.setRenderer(a && a.trackRenderer)
            },
            _setMap: function(a) {
                var b = this.inherited(arguments),
                    c = this._mode,
                    d = this;
                c && c.initialize(a);
                this.geometryType && this.attr("data-geometry-type", this.geometryType.replace(/esriGeometry/i, "").toLowerCase());
                this._addHandle =
                    this.on("graphic-node-add", function(a) {
                        a = a.graphic.attributes;
                        (a = d._selectedFeatures[a && a[d.objectIdField]]) && a.attr("data-selected", "")
                    });
                return b
            },
            _unsetMap: function(a) {
                var b = this._mode;
                b && b.suspend();
                this._trackManager && (this._trackManager.destroy(), this._trackManager = null);
                C.disconnect(this._zoomConnect);
                C.disconnect(this._addHandle);
                this._zoomConnect = this._addHandle = null;
                this._toggleTime(!1);
                this.inherited("_unsetMap", arguments)
            },
            refresh: function() {
                var a = this._mode;
                a && a.refresh()
            },
            hasXYFootprint: function() {
                return "esriGeometryMultiPatch" ===
                    this.geometryType && "xyFootprint" === this.multipatchOption
            },
            getOutFields: function() {
                return k.filter(this._getOutFields(), function(a) {
                    return "*" === a || !!this._getField(a)
                }, this)
            },
            getField: function(a) {
                return this._getField(a, !0)
            },
            getDomain: function(a, b) {
                var c, d, e = b && b.feature,
                    f = e && this.typeIdField && e.attributes && e.attributes[this.typeIdField];
                null != f && k.some(this.types, function(b) {
                    if (b.id == f) {
                        if ((c = b.domains && b.domains[a]) && "inherited" === c.type) c = this._getLayerDomain(a), d = !0;
                        return !0
                    }
                    return !1
                }, this);
                !d &&
                    !c && (c = this._getLayerDomain(a));
                return c
            },
            _getLayerDomain: function(a) {
                var b;
                k.some(this.fields, function(c) {
                    c.name === a && (b = c.domain);
                    return !!b
                });
                return b
            },
            getType: function(a) {
                var b, c = a && this.typeIdField && a.attributes && a.attributes[this.typeIdField];
                k.some(this.types, function(a) {
                    a.id == c && (b = a);
                    return !!b
                });
                return b
            },
            setEditable: function(a) {
                if (!this._collection) return console.log("FeatureLayer:setEditable - this functionality is not yet supported for layer in a feature service"), this;
                if (!this.loaded) return this._optEditable =
                    a, this;
                var b = this._editable;
                this._editable = a;
                this._updateCaps();
                if (b !== a) this.onCapabilitiesChange();
                return this
            },
            getEditCapabilities: function(a) {
                var b = {
                    canCreate: !1,
                    canUpdate: !1,
                    canDelete: !1
                };
                if (!this.loaded || !this.isEditable()) return b;
                var c = a && a.feature;
                a = a && a.userId;
                var d = k.map(this.capabilities ? this.capabilities.toLowerCase().split(",") : [], q.trim),
                    e = -1 < k.indexOf(d, "editing"),
                    f = e && -1 < k.indexOf(d, "create"),
                    b = e && -1 < k.indexOf(d, "update"),
                    d = e && -1 < k.indexOf(d, "delete"),
                    l = this.ownershipBasedAccessControlForFeatures,
                    g = this.editFieldsInfo,
                    h = g && g.creatorField,
                    g = g && g.realm,
                    c = (c = c && c.attributes) && h ? c[h] : void 0,
                    n = !!this.userIsAdmin,
                    h = !l || n || !(!l.allowOthersToUpdate && !l.allowUpdateToOthers),
                    l = !l || n || !(!l.allowOthersToDelete && !l.allowDeleteToOthers);
                if (n || e && !f && !b && !d) f = b = d = !0;
                e = {
                    canCreate: f,
                    canUpdate: b,
                    canDelete: d
                };
                null === c ? (e.canUpdate = b && h, e.canDelete = d && l) : "" !== c && c && ((a = a || this.getUserId()) && g && (a = a + "@" + g), a.toLowerCase() !== c.toLowerCase() && (e.canUpdate = b && h, e.canDelete = d && l));
                return e
            },
            getUserId: function() {
                var a;
                this.loaded && (a = this.credential && this.credential.userId || this.userId || "");
                return a
            },
            setUserIsAdmin: function(a) {
                this.userIsAdmin = a
            },
            setEditSummaryCallback: function(a) {
                this.editSummaryCallback = a
            },
            getEditSummary: function(a, b, c) {
                c = r.isDefined(c) ? c : (new Date).getTime();
                var d = "";
                c = this.getEditInfo(a, b, c);
                (b = b && b.callback || this.editSummaryCallback) && (c = b(a, c) || "");
                if (q.isString(c)) d = c;
                else {
                    if (c) {
                        a = c.action;
                        b = c.userId;
                        var e = c.timeValue,
                            f = 0;
                        a && f++;
                        b && f++;
                        r.isDefined(e) && f++;
                        1 < f && (d = ("edit" === a ? "edit" : "create") +
                            (b ? "User" : "") + (r.isDefined(e) ? c.displayPattern : ""))
                    }
                    d = d && r.substitute(c, this.i18n.layers.FeatureLayer[d])
                }
                return d
            },
            getEditInfo: function(a, b, c) {
                if (this.loaded) {
                    c = r.isDefined(c) ? c : (new Date).getTime();
                    b = b && b.action || "last";
                    var d = this.editFieldsInfo,
                        e = d && d.creatorField,
                        f = d && d.creationDateField,
                        l = d && d.editorField,
                        d = d && d.editDateField,
                        l = (a = a && a.attributes) && l ? a[l] : void 0,
                        d = a && d ? a[d] : null,
                        e = this._getEditData(a && e ? a[e] : void 0, a && f ? a[f] : null, c);
                    c = this._getEditData(l, d, c);
                    var g;
                    switch (b) {
                        case "creation":
                            g =
                                e;
                            break;
                        case "edit":
                            g = c;
                            break;
                        case "last":
                            g = c || e
                    }
                    g && (g.action = g === c ? "edit" : "creation");
                    return g
                }
            },
            _getEditData: function(a, b, c) {
                var d, e, f;
                r.isDefined(b) && (e = c - b, f = 0 > e ? "Full" : 6E4 > e ? "Seconds" : 12E4 > e ? "Minute" : 36E5 > e ? "Minutes" : 72E5 > e ? "Hour" : 864E5 > e ? "Hours" : 6048E5 > e ? "WeekDay" : "Full");
                if (void 0 !== a || f) d = d || {}, d.userId = a, f && (a = U.format, c = new Date(b), d.minutes = Math.floor(e / 6E4), d.hours = Math.floor(e / 36E5), d.weekDay = a(c, {
                        datePattern: "EEEE",
                        selector: "date"
                    }), d.formattedDate = a(c, {
                        selector: "date"
                    }), d.formattedTime =
                    a(c, {
                        selector: "time"
                    }), d.displayPattern = f, d.timeValue = b);
                return d
            },
            isEditable: function() {
                return !(!this._editable && !this.userIsAdmin)
            },
            setMaxAllowableOffset: function(a) {
                this.isEditable() || this._setMaxOffset(a, !0);
                return this
            },
            getMaxAllowableOffset: function() {
                var a = this._quantizationParameters ? this._quantizationParameters.tolerance : void 0;
                return null != this._maxOffset ? this._maxOffset : a
            },
            _setMaxOffset: function(a, b) {
                if (null == a) return delete this._maxOffset, delete this._quantizationParameters, this;
                this.quantize &&
                    this.supportsCoordinatesQuantization ? ("esriGeometryPolyline" === this.geometryType ? this._maxOffset = a : delete this._maxOffset, this._quantizationParameters = {
                        mode: "view",
                        originPosition: "upperLeft",
                        tolerance: a,
                        extent: this.fullExtent
                    }) : (b || (a = Math.floor(a)), this._maxOffset = a, delete this._quantizationParameters);
                return this
            },
            setAutoGeneralize: function(a) {
                if (this.loaded) {
                    if (!this.isEditable() && this.currentMode !== t.MODE_SNAPSHOT && ("esriGeometryPolyline" === this.geometryType || "esriGeometryPolygon" === this.geometryType ||
                            this.hasXYFootprint()))(this._autoGeneralize = a) ? (a = this._map) && a.loaded && this._setMaxOffset(a.extent.getWidth() / a.width) : this._setMaxOffset(null)
                } else this._optAutoGen = a;
                return this
            },
            setGDBVersion: function(a) {
                if (!this._collection && a !== this.gdbVersion && (a || this.gdbVersion)) this.gdbVersion = a, this._task.gdbVersion = a, this._url.query = q.mixin(this._url.query, {
                    gdbVersion: a
                }), this.loaded && (this.clearSelection(), this._map && this.refresh()), this.onGDBVersionChange();
                return this
            },
            setDefinitionExpression: function(a) {
                this._defnExpr =
                    a;
                (a = this._mode) && a.propertyChangeHandler(1);
                return this
            },
            getDefinitionExpression: function() {
                return this._defnExpr
            },
            setTimeDefinition: function(a) {
                this._isSnapshot ? (this._timeDefn = a, (a = this._mode) && a.propertyChangeHandler(2)) : console.log("FeatureLayer.setTimeDefinition: layer in on-demand or selection mode does not support time definitions. Layer id \x3d " + this.id + ", Layer URL \x3d " + this.url);
                return this
            },
            getTimeDefinition: function() {
                return this._timeDefn
            },
            setTimeOffset: function(a, b) {
                this._timeOffset =
                    a;
                this._timeOffsetUnits = b;
                var c = this._mode;
                c && c.propertyChangeHandler(0);
                return this
            },
            setUseMapTime: function(a) {
                this.useMapTime = a;
                this._toggleTime(!this.suspended);
                (a = this._mode) && a.propertyChangeHandler(0)
            },
            selectFeatures: function(a, b, c, d) {
                b = b || t.SELECTION_NEW;
                a = this._getShallowClone(a);
                var e = this._map,
                    f, l = this,
                    g = A._fixDfd(new u(A._dfdCanceller));
                a.outFields = this.getOutFields();
                a.returnGeometry = !0;
                a.multipatchOption = this.multipatchOption;
                e && (a.outSpatialReference = new I(e.spatialReference.toJson()));
                if (!this._applyQueryFilters(a, !0)) return f = {
                    features: []
                }, this._selectHandler(f, b, c, d, g), g;
                if (e = this._canDoClientSideQuery(a)) g._pendingDfd = N(this._doQuery(a, e)), g._pendingDfd.then(function(a) {
                    f = {
                        features: a
                    };
                    l._selectHandler(f, b, c, d, g)
                });
                else {
                    if (this._collection) return this._resolve([Error("FeatureLayer::selectFeatures - " + this.invalidParams)], null, d, g, !0), g;
                    var h = this;
                    this._ts && (a._ts = (new Date).getTime());
                    (g._pendingDfd = this._task.execute(a)).addCallbacks(function(a) {
                            h._selectHandler(a, b, c, d, g)
                        },
                        function(a) {
                            h._resolve([a], null, d, g, !0)
                        })
                }
                return g
            },
            getSelectedFeatures: function() {
                var a = this._selectedFeatures,
                    b = [],
                    c;
                for (c in a) a.hasOwnProperty(c) && b.push(a[c]);
                return b
            },
            clearSelection: function(a) {
                var b = this._selectedFeatures,
                    c = this._mode,
                    d;
                for (d in b) b.hasOwnProperty(d) && (this._unSelectFeatureIIf(d, c), c._removeFeatureIIf(d));
                this._selectedFeatures = {};
                this._isSelOnly && c._applyTimeFilter(!0);
                if (!a) this.onSelectionClear();
                return this
            },
            setSelectionSymbol: function(a) {
                if (this._selectionSymbol = a) {
                    var b =
                        this._selectedFeatures,
                        c;
                    for (c in b) b.hasOwnProperty(c) && b[c].setSymbol(a)
                }
                return this
            },
            getSelectionSymbol: function() {
                return this._selectionSymbol
            },
            setLabelingInfo: function(a) {
                a ? (this.labelingInfo = a, this._fixLabelExpr()) : delete this.labelingInfo;
                this._collection && (this._typesDirty = !0);
                this.onLabelingInfoChange()
            },
            _fixLabelExpr: function() {
                var a = /\[([^\[\]]+)\]/ig,
                    b, c = this,
                    d = function(a, b) {
                        var d = c._getField(b, !0);
                        return "[" + (d && d.name || b) + "]"
                    };
                k.forEach(this.labelingInfo, function(c) {
                    if (b = c.labelExpression) c.labelExpression =
                        b.replace(a, d)
                })
            },
            __msigns: [{
                n: "applyEdits",
                c: 5,
                a: [{
                    i: 0
                }, {
                    i: 1
                }],
                e: 4,
                f: 1
            }],
            applyEdits: function(a, b, c, d, e, f) {
                var l = f.assembly,
                    g = f.dfd;
                this._applyNormalized(a, l && l[0]);
                this._applyNormalized(b, l && l[1]);
                this.onBeforeApplyEdits(a, b, c);
                var h = {},
                    n = this.objectIdField,
                    l = {
                        f: "json"
                    },
                    m = !1;
                if (this._collection) f = {}, f.addResults = a ? k.map(a, function() {
                        m = !0;
                        return {
                            objectId: this._nextId++,
                            success: !0
                        }
                    }, this) : null, f.updateResults = b ? k.map(b, function(a) {
                        m = !0;
                        var b = a.attributes[n];
                        h[b] = a;
                        return {
                            objectId: b,
                            success: !0
                        }
                    }, this) :
                    null, f.deleteResults = c ? k.map(c, function(a) {
                        m = !0;
                        return {
                            objectId: a.attributes[n],
                            success: !0
                        }
                    }, this) : null, m ? this._editHandler(f, a, h, d, e, g) : this._resolve([f.addResults, f.updateResults, f.deleteResults], null, d, g);
                else {
                    a && 0 < a.length && (l.adds = this._convertFeaturesToJson(a, 0, 1), m = !0);
                    if (b && 0 < b.length) {
                        for (f = 0; f < b.length; f++) {
                            var w = b[f];
                            h[w.attributes[n]] = w
                        }
                        l.updates = this._convertFeaturesToJson(b, 0, 0, 1);
                        m = !0
                    }
                    if (c && 0 < c.length) {
                        b = [];
                        for (f = 0; f < c.length; f++) b.push(c[f].attributes[n]);
                        l.deletes = b.join(",");
                        m = !0
                    }
                    if (m) {
                        var p =
                            this;
                        return D({
                            url: this._url.path + "/applyEdits",
                            content: q.mixin(l, this._url.query),
                            callbackParamName: "callback",
                            load: function(b) {
                                p._editHandler(b, a, h, d, e, g)
                            },
                            error: function(a) {
                                p._resolve([a], null, e, g, !0)
                            }
                        }, {
                            usePost: !0
                        })
                    }
                    this._resolve([], null, d, g)
                }
            },
            queryFeatures: function(a, b, c) {
                return this._query("execute", "onQueryFeaturesComplete", a, b, c)
            },
            queryRelatedFeatures: function(a, b, c) {
                return this._query("executeRelationshipQuery", "onQueryRelatedFeaturesComplete", a, b, c)
            },
            queryIds: function(a, b, c) {
                return this._query("executeForIds",
                    "onQueryIdsComplete", a, b, c)
            },
            queryCount: function(a, b, c) {
                return this._query("executeForCount", "onQueryCountComplete", a, b, c)
            },
            queryExtent: function(a, b, c) {
                return this._query("executeForExtent", "onQueryExtentComplete", a, b, c)
            },
            queryAttachmentInfos: function(a, b, c) {
                var d = this._url.path + "/" + a + "/attachments",
                    e = new u(A._dfdCanceller),
                    f = this;
                e._pendingDfd = D({
                    url: d,
                    content: q.mixin({
                        f: "json"
                    }, this._url.query),
                    callbackParamName: "callback",
                    load: function(c) {
                        c = c.attachmentInfos;
                        var g;
                        k.forEach(c, function(b) {
                            g = V.objectToQuery({
                                gdbVersion: f._url.query &&
                                    f._url.query.gdbVersion,
                                layer: f._url.query && f._url.query.layer,
                                token: f._getToken()
                            });
                            b.url = d + "/" + b.id + (g ? "?" + g : "");
                            b.objectId = a
                        });
                        f._resolve([c], "onQueryAttachmentInfosComplete", b, e)
                    },
                    error: function(a) {
                        f._resolve([a], null, c, e, !0)
                    }
                });
                return e
            },
            addAttachment: function(a, b, c, d) {
                return this._sendAttachment("add", a, b, c, d)
            },
            updateAttachment: function(a, b, c, d, e) {
                c.appendChild(W.create("input", {
                    type: "hidden",
                    name: "attachmentId",
                    value: b
                }));
                return this._sendAttachment("update", a, c, d, e)
            },
            deleteAttachments: function(a,
                b, c, d) {
                var e = this._url.path + "/" + a + "/deleteAttachments",
                    f = new u(A._dfdCanceller),
                    l = this;
                b = {
                    f: "json",
                    attachmentIds: b.join(",")
                };
                f._pendingDfd = D({
                    url: e,
                    content: q.mixin(b, this._url.query),
                    callbackParamName: "callback",
                    load: q.hitch(this, function(b) {
                        b = b.deleteAttachmentResults;
                        b = k.map(b, function(b) {
                            b = new E(b);
                            b.attachmentId = b.objectId;
                            b.objectId = a;
                            return b
                        });
                        l._resolve([b], "onDeleteAttachmentsComplete", c, f)
                    }),
                    error: function(a) {
                        l._resolve([a], null, d, f, !0)
                    }
                }, {
                    usePost: !0
                });
                return f
            },
            addType: function(a) {
                var b =
                    this.types;
                if (b) {
                    if (k.some(b, function(b) {
                            return b.id == a.id ? !0 : !1
                        })) return !1;
                    b.push(a)
                } else this.types = [a];
                return this._typesDirty = !0
            },
            deleteType: function(a) {
                if (this._collection) {
                    var b = this.types;
                    if (b) {
                        var c = -1;
                        k.some(b, function(b, e) {
                            return b.id == a ? (c = e, !0) : !1
                        });
                        if (-1 < c) return this._typesDirty = !0, b.splice(c, 1)[0]
                    }
                }
            },
            toJson: function() {
                var a = this._json;
                if (a = q.isString(a) ? F.fromJson(a) : q.clone(a)) {
                    var a = a.layerDefinition ? a : {
                            layerDefinition: a
                        },
                        b = a.layerDefinition,
                        c = this._collection;
                    if (c && this._typesDirty) {
                        b.types =
                            k.map(this.types || [], function(a) {
                                return a.toJson()
                            });
                        var d = this.renderer,
                            e = this.labelingInfo,
                            f = b.drawingInfo;
                        if ((d || e) && !f) f = b.drawingInfo = {};
                        f && (d && -1 === d.declaredClass.indexOf("TemporalRenderer")) && (f.renderer = d.toJson());
                        e && (f.labelingInfo = k.map(e, function(a) {
                            return a.toJson()
                        }))
                    }
                    d = null;
                    if (!c || this._fcAdded) d = {
                        geometryType: b.geometryType,
                        features: this._convertFeaturesToJson(this.graphics, !0)
                    };
                    a.featureSet = q.mixin({}, a.featureSet || {}, d);
                    c && (a.nextObjectId = this._nextId, b.capabilities = this.capabilities);
                    return a
                }
            },
            onSelectionComplete: function() {},
            onSelectionClear: function() {},
            onBeforeApplyEdits: function() {},
            onEditsComplete: function() {},
            onQueryFeaturesComplete: function() {},
            onQueryRelatedFeaturesComplete: function() {},
            onQueryIdsComplete: function() {},
            onQueryCountComplete: function() {},
            onQueryExtentComplete: function() {},
            onQueryAttachmentInfosComplete: function() {},
            onAddAttachmentComplete: function() {},
            onUpdateAttachmentComplete: function() {},
            onDeleteAttachmentsComplete: function() {},
            onCapabilitiesChange: function() {},
            onGDBVersionChange: function() {},
            onQueryLimitExceeded: function() {},
            onLabelingInfoChange: function() {},
            _forceIdentity: function(a) {
                var b = this,
                    c = this._url && this._url.path;
                (this.ownershipBasedAccessControlForFeatures || this.userIsAdmin) && !this._getToken() && c && G.id && G.id._hasPortalSession() && G.id._doPortalSignIn(c) ? G.id.getCredential(c).then(function() {
                    b._findCredential();
                    a.call(b)
                }, function() {
                    a.call(b)
                }) : a.call(this)
            },
            _checkMode: function(a) {
                var b = this.geometryType,
                    c = this.maxRecordCount;
                a = (a = a && a.features &&
                    a.features[0]) && a.attributes && a.attributes.exceedslimit;
                if (this.mode === t.MODE_AUTO && !this.isEditable() && 0 === a && (this.queryPagination || ("esriGeometryPolyline" === b || "esriGeometryPolygon" === b || "esriGeometryMultipoint" === b || this.hasXYFootprint()) && c >= this.maxRecordCountForAuto || "esriGeometryPoint" === b && c >= this.maxPointCountForAuto)) this.currentMode = t.MODE_SNAPSHOT, this._mode = new L(this), this._isSnapshot = !0, this._autoGeneralize = !1
            },
            _queryLimit: function() {
                var a = this,
                    b = new u;
                this._limitPromise = b.promise;
                setTimeout(function() {
                    var c = new J,
                        d = new ea;
                    d.statisticType = "exceedslimit";
                    d.maxPointCount = a.maxPointCountForAuto;
                    d.maxRecordCount = a.maxRecordCountForAuto;
                    d.maxVertexCount = a.maxVertexCountForAuto;
                    d.outStatisticFieldName = "exceedslimit";
                    c.outStatistics = [d];
                    a.queryFeatures(c).promise.then(function(a) {
                        b.resolve(a)
                    }, function(a) {
                        b.reject(a)
                    })
                }, 0)
            },
            _updateCaps: function() {
                var a = this._editable,
                    b = q.trim(this.capabilities || ""),
                    c = k.map(b ? b.split(",") : [], q.trim),
                    d = k.map(b ? b.toLowerCase().split(",") : [], q.trim),
                    b = k.indexOf(d, "editing"),
                    e, d = {
                        Create: k.indexOf(d, "create"),
                        Update: k.indexOf(d, "update"),
                        Delete: k.indexOf(d, "delete")
                    };
                if (a && -1 === b) c.push("Editing");
                else if (!a && -1 < b) {
                    a = [b];
                    for (e in d) - 1 < d[e] && a.push(d[e]);
                    a.sort();
                    for (e = a.length - 1; 0 <= e; e--) c.splice(a[e], 1)
                }
                this.capabilities = c.join(",")
            },
            _counter: {
                value: 0
            },
            _getUniqueId: function() {
                return this._counter.value++
            },
            onSuspend: function() {
                this.inherited(arguments);
                this._toggleTime(!1);
                var a = this._mode;
                a && a.suspend()
            },
            onResume: function(a) {
                this.inherited(arguments);
                this._toggleTime(!0);
                this._updateMaxOffset();
                var b = this._mode,
                    c = this._map,
                    d = this._getRenderer();
                if (a.firstOccurrence) {
                    this._fixRendererFields();
                    this._checkFields();
                    this.clearSelection();
                    if (this.timeInfo && !this._trackManager && (this._trackIdField || d && (d.latestObservationRenderer || d.trackRenderer))) this._trackManager = new ra(this), this._trackManager.initialize(c);
                    d && ("colors" in d && "blurRadius" in d && "maxPixelIntensity" in d) && ("esriGeometryPoint" == this.geometryType && !this._heatmapManager) && (this._heatmapManager =
                        new R(this), this._heatmapManager.initialize(c));
                    if (this.mode === t.MODE_AUTO && this.currentMode === t.MODE_SNAPSHOT && ("esriGeometryPolyline" === this.geometryType || "esriGeometryPolygon" === this.geometryType || this.hasXYFootprint()) && !this.getMaxAllowableOffset()) d = this.generalizeForScale, d = this.maxScale ? this.maxScale : this.minScale ? Math.min(d, this.minScale) : Math.min(d, ha.getScale(c, this.initialExtent)), this.isEditable() || this._setMaxOffset(c.extent.getWidth() / c.width / c.getScale() * d, !0);
                    this._zoomConnect = C.connect(c,
                        "onZoomEnd", this, this._updateMaxOffset)
                }
                b && (a.firstOccurrence ? b.startup() : b.resume())
            },
            _updateMaxOffset: function() {
                var a = this._map;
                a && a.loaded && this._autoGeneralize && this._setMaxOffset(a.extent.getWidth() / a.width)
            },
            _toggleTime: function(a) {
                var b = this._map;
                a && this.timeInfo && this.useMapTime && b ? (this._mapTimeExtent = b.timeExtent, this._timeConnect || (this._timeConnect = C.connect(b, "onTimeExtentChange", this, this._timeChangeHandler))) : (this._mapTimeExtent = null, C.disconnect(this._timeConnect), this._timeConnect =
                    null)
            },
            _timeChangeHandler: function(a) {
                this._mapTimeExtent = a;
                (a = this._mode) && a.propertyChangeHandler(0)
            },
            _getOffsettedTE: function(a) {
                var b = this._timeOffset,
                    c = this._timeOffsetUnits;
                return a && b && c ? a.offset(-1 * b, c) : a
            },
            _getTimeOverlap: function(a, b) {
                return a && b ? a.intersection(b) : a || b
            },
            _getTimeFilter: function(a) {
                var b = this.getTimeDefinition(),
                    c;
                if (b && (c = this._getTimeOverlap(b, null), !c)) return [!1];
                if (a) {
                    if (a = c ? this._getTimeOverlap(a, c) : a, !a) return [!1]
                } else a = c;
                return [!0, a]
            },
            _getAttributeFilter: function(a) {
                var b =
                    this.getDefinitionExpression();
                return a ? b ? "(" + b + ") AND (" + a + ")" : a : b
            },
            _applyQueryFilters: function(a, b) {
                a.where = this._getAttributeFilter(a.where);
                a.maxAllowableOffset = this._maxOffset;
                a.quantizationParameters = this._quantizationParameters;
                b && this.supportsAdvancedQueries && (a.orderByFields = a.orderByFields || this.getOrderByFields());
                if (this.timeInfo) {
                    var c = this._getTimeFilter(a.timeExtent);
                    if (c[0]) a.timeExtent = c[1];
                    else return !1
                }
                return !0
            },
            _add: function(a) {
                var b = this._selectionSymbol,
                    c = a.attributes,
                    d = this.visibilityField;
                b && this._isSelOnly && a.setSymbol(b);
                if (d && c && c.hasOwnProperty(d)) a[c[d] ? "show" : "hide"]();
                return this.add.apply(this, arguments)
            },
            _remove: function() {
                return this.remove.apply(this, arguments)
            },
            _canDoClientSideQuery: function(a) {
                var b = [],
                    c = this._map;
                if (!(this._isTable || !c && !this._collection))
                    if (!a.text && !(a.where && a.where !== this.getDefinitionExpression() || a.orderByFields && a.orderByFields.length || a.outStatistics || a.returnDistinctValues)) {
                        var d = this._isSnapshot,
                            e = this._isSelOnly,
                            f = a.geometry;
                        if (f)
                            if (!e && a.spatialRelationship ===
                                J.SPATIAL_REL_INTERSECTS && "extent" === f.type && (d || c.extent.contains(f))) b.push(1);
                            else return;
                        if (c = a.objectIds)
                            if (d) b.push(2);
                            else {
                                var f = c.length,
                                    l = this._mode,
                                    g = 0,
                                    h;
                                for (h = 0; h < f; h++) l._getFeature(c[h]) && g++;
                                if (g === f) b.push(2);
                                else return
                            }
                        if (this.timeInfo)
                            if (a = a.timeExtent, c = this._mapTimeExtent, d) a && b.push(3);
                            else if (e) {
                            if (a) return
                        } else if (c)
                            if (-1 !== k.indexOf(b, 2)) a && b.push(3);
                            else if (-1 !== k.indexOf(b, 1)) a == c && b.push(3);
                        else return;
                        else if (0 < b.length) a && b.push(3);
                        else if (a) return;
                        return 0 < b.length ? b :
                            null
                    }
            },
            _getAbsMid: function(a) {
                return M.toAbsMid ? M.toAbsMid(a) : S.id.replace(/\/[^\/]*$/ig, "/") + a
            },
            _doQuery: function(a, b, c) {
                var d = [],
                    e = this._mode,
                    f = this.objectIdField,
                    l = this,
                    g, h, n = new u,
                    m = new u,
                    w = function(a, b) {
                        if (!a.length || !b.length) return a.length ? a : b;
                        var c, d, e = {};
                        a.length > b.length ? (d = a, c = b) : (d = b, c = a);
                        for (var g = d.length, l = c.length, h; g--;) h = d[g], e[h.attributes[f]] = !0;
                        for (; l--;) h = c[l], e[h.attributes[f]] || d.push(h);
                        return d
                    };
                if (-1 !== k.indexOf(b, 1)) {
                    h = this.graphics;
                    g = h.length;
                    var p = this.spatialIndex ||
                        this._map && this._map.spatialIndex,
                        s, B = a.geometry._normalize(null, !0);
                    null == p && ta.autoSpatialIndexing ? s = (this._map || this).addPlugin(this._getAbsMid("../plugins/spatialIndex")).then(q.hitch(this, q.partial(this._getFromIndex, B, p)), function(a) {
                        m.resolve(q.hitch(this, q.partial(this._filterByExtent, h, B)))
                    }) : p && (s = this._getFromIndex(B, p));
                    s ? s.then(function(a) {
                        for (var b = 0; b < a.length; b++) a[b].results && (d = d.concat(a[b].results));
                        m.resolve(d)
                    }).otherwise(function(a) {
                        m.reject(a)
                    }) : m.resolve(this._filterByExtent(h,
                        B))
                } else m.resolve([]);
                m.then(function(d) {
                    var h = [];
                    if (-1 !== k.indexOf(b, 2)) {
                        var m = a.objectIds;
                        for (g = m.length; g--;) {
                            var p = e._getFeature(m[g]);
                            p && h.push(p)
                        }
                        h = w(d, h)
                    } else h = d; - 1 !== k.indexOf(b, 3) && l.timeInfo && (d = a.timeExtent, h = l._filterByTime(0 < h.length ? h : l.graphics, d.startTime, d.endTime).match);
                    c && (h = k.map(h, function(a) {
                        return a.attributes[f]
                    }, this));
                    n.resolve(h)
                });
                return n
            },
            _getFromIndex: function(a, b) {
                b = b || this.spatialIndex || this._map.spatialIndex;
                a instanceof Array || (a = [a]);
                var c = this.id;
                return X(k.map(a,
                    function(a) {
                        return b.intersects(a, c)
                    }))
            },
            _filterByExtent: function(a, b) {
                for (var c = [], d = 0, e = a.length; d < e; d++) {
                    var f = a[d],
                        l = f.geometry;
                    l && (this.normalization && b.length ? (b[0].intersects(l) || b[1].intersects(l)) && c.push(f) : b.intersects(l) && c.push(f))
                }
                return c
            },
            _filterByTime: function(a, b, c) {
                var d = this._startTimeField,
                    e = this._endTimeField,
                    f;
                this._twoTimeFields || (f = d || e);
                var l = r.isDefined,
                    g = [],
                    h = [],
                    n, m = a.length,
                    k, p;
                b = b ? b.getTime() : -Infinity;
                c = c ? c.getTime() : Infinity;
                if (f)
                    for (n = 0; n < m; n++) k = a[n], p = k.attributes,
                        d = p[f], d >= b && d <= c ? g.push(k) : h.push(k);
                else
                    for (n = 0; n < m; n++) k = a[n], p = k.attributes, f = p[d], p = p[e], f = l(f) ? f : -Infinity, p = l(p) ? p : Infinity, f >= b && f <= c || p >= b && p <= c || b >= f && c <= p ? g.push(k) : h.push(k);
                return {
                    match: g,
                    noMatch: h
                }
            },
            _resolve: function(a, b, c, d, e) {
                b && this[b].apply(this, a);
                c && c.apply(null, a);
                d && A._resDfd(d, a, e)
            },
            _getShallowClone: function(a) {
                var b = new J,
                    c;
                for (c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
                return b
            },
            _query: function(a, b, c, d, e) {
                var f = this,
                    l = this._map,
                    g = new u(A._dfdCanceller),
                    h = c,
                    k = function(c, e) {
                        if (!e &&
                            ("execute" === a || "executeRelationshipQuery" === a)) {
                            var h, l;
                            if ("execute" === a) {
                                h = c.features;
                                l = h.length;
                                for (l -= 1; 0 <= l; l--)
                                    if (h[l]._layer = f, !f._isTable) {
                                        var k = f._mode._getFeature(h[l].attributes[f.objectIdField]);
                                        k && h.splice(l, 1, k)
                                    }
                            } else
                                for (k in c)
                                    if (c.hasOwnProperty(k)) {
                                        h = c[k].features;
                                        l = h.length;
                                        for (l -= 1; 0 <= l; l--) h[l]._layer = f
                                    }
                        }
                        f._resolve([c], b, d, g)
                    };
                if ("executeRelationshipQuery" !== a) {
                    h = this._getShallowClone(c);
                    h.outFields = this.getOutFields();
                    h.returnGeometry = c.hasOwnProperty("returnGeometry") ? c.returnGeometry :
                        !c.outStatistics;
                    h.returnGeometry && (h.multipatchOption = this.multipatchOption);
                    var m;
                    l && (h.outSpatialReference = new I(l.spatialReference.toJson()));
                    if (!this._applyQueryFilters(h, "execute" === a && !h.outStatistics)) {
                        switch (a) {
                            case "execute":
                                m = new K({
                                    features: []
                                });
                                break;
                            case "executeForIds":
                                m = [];
                                break;
                            case "executeForCount":
                                m = 0;
                                break;
                            case "executeForExtent":
                                m = {}
                        }
                        k(m, !0);
                        return g
                    }
                    if (c = "executeForExtent" !== a && this._canDoClientSideQuery(h)) return g._pendingDfd = N(this._doQuery(h, c, "executeForIds" === a || "executeForCount" ===
                        a)), g._pendingDfd.then(function(b) {
                        switch (a) {
                            case "execute":
                                m = new K;
                                m.features = b;
                                break;
                            case "executeForIds":
                                m = b;
                                break;
                            case "executeForCount":
                                m = b.length
                        }
                        k(m, !0)
                    }), g
                }
                if (this._collection) return this._resolve([Error("FeatureLayer::_query - " + this.invalidParams)], null, e, g, !0), g;
                this._ts && (h._ts = (new Date).getTime());
                (g._pendingDfd = this._task[a](h)).addCallbacks(function(a) {
                    k(a, !!h.outStatistics)
                }, function(a) {
                    f._resolve([a], null, e, g, !0)
                });
                return g
            },
            _convertFeaturesToJson: function(a, b, c, d) {
                var e = [],
                    f = this._selectionSymbol,
                    l = this.visibilityField,
                    g, h = this.objectIdField;
                if (this.loaded && (c || d)) g = k.filter(this.fields, function(a) {
                    return !1 === a.editable && (!d || a.name !== h)
                });
                for (c = 0; c < a.length; c++) {
                    var n = a[c],
                        m = {},
                        r = n.geometry,
                        p = n.attributes,
                        s = n.symbol;
                    if (r && (!d || !this.loaded || this.allowGeometryUpdates)) m.geometry = r.toJson();
                    l ? (m.attributes = p = q.mixin({}, p), p[l] = n.visible ? 1 : 0) : p && (m.attributes = q.mixin({}, p));
                    m.attributes && (g && g.length) && k.forEach(g, function(a) {
                        delete m.attributes[a.name]
                    });
                    s && s !== f && (m.symbol = s.toJson());
                    e.push(m)
                }
                return b ?
                    e : F.toJson(e)
            },
            _selectHandler: function(a, b, c, d, e) {
                var f;
                d = t;
                switch (b) {
                    case d.SELECTION_NEW:
                        this.clearSelection(!0);
                        f = !0;
                        break;
                    case d.SELECTION_ADD:
                        f = !0;
                        break;
                    case d.SELECTION_SUBTRACT:
                        f = !1
                }
                d = a.features;
                var l = this._mode,
                    g = [],
                    h = this.objectIdField,
                    k, m;
                if (f)
                    for (f = 0; f < d.length; f++) k = d[f], m = k.attributes[h], k = l._addFeatureIIf(m, k), g.push(k), this._selectFeatureIIf(m, k, l);
                else
                    for (f = 0; f < d.length; f++) k = d[f], m = k.attributes[h], this._unSelectFeatureIIf(m, l), m = l._removeFeatureIIf(m), g.push(m || k);
                this._isSelOnly &&
                    l._applyTimeFilter(!0);
                this._resolve([g, b, a.exceededTransferLimit ? {
                    queryLimitExceeded: !0
                } : null], "onSelectionComplete", c, e);
                if (a.exceededTransferLimit) this.onQueryLimitExceeded()
            },
            _selectFeatureIIf: function(a, b, c) {
                var d = this._selectedFeatures,
                    e = d[a];
                e || (c._incRefCount(a), d[a] = b, this._isTable || (this._setSelectSymbol(b), b.attr("data-selected", "")));
                return e || b
            },
            _unSelectFeatureIIf: function(a, b) {
                var c = this._selectedFeatures[a];
                c && (b._decRefCount(a), delete this._selectedFeatures[a], this._isTable || (this._setUnSelectSymbol(c),
                    c.attr("data-selected")));
                return c
            },
            _isSelected: function(a) {},
            _setSelectSymbol: function(a) {
                var b = this._selectionSymbol;
                b && !this._isSelOnly && a.setSymbol(b)
            },
            _setUnSelectSymbol: function(a) {
                var b = this._selectionSymbol;
                b && !this._isSelOnly && b === a.symbol && a.setSymbol(null, !0)
            },
            _getOutFields: function() {
                var a = [this.objectIdField, this.typeIdField, this.creatorField, this._startTimeField, this._endTimeField, this._trackIdField].concat(this._rendererFields).concat(this.dataAttributes),
                    a = k.filter(a, function(a, b,
                        e) {
                        return !!a && k.indexOf(e, a) === b
                    }),
                    b = q.clone(this._outFields);
                if (b) {
                    if (-1 !== k.indexOf(b, "*")) return b;
                    k.forEach(a, function(a) {
                        -1 === k.indexOf(b, a) && b.push(a)
                    });
                    return b
                }
                return a
            },
            _checkFields: function(a) {
                var b = a || this._getOutFields();
                k.forEach(b, function(a) {
                    "*" !== a && (this._getField(a) || console.debug("esri.layers.FeatureLayer: " + r.substitute({
                        url: this.url,
                        field: a
                    }, "unable to find '${field}' field in the layer 'fields' information [url: ${url}]")))
                }, this);
                !a && (!this._isTable && !this._fserver && !this._collection &&
                    !this._isStream) && (k.some(this.fields, function(a) {
                    return a && "esriFieldTypeGeometry" === a.type ? !0 : !1
                }) || console.debug("esri.layers.FeatureLayer: " + r.substitute({
                    url: this.url
                }, "unable to find a field of type 'esriFieldTypeGeometry' in the layer 'fields' information. If you are using a map service layer, features will not have geometry [url: ${url}]")))
            },
            _fixFieldCase: function(a, b, c) {
                var d = a && a[b],
                    e;
                if (d && !q.isFunction(d)) {
                    if (e = !this._getField(d) && this._getField(d, !0)) d = a[b] = e.name;
                    c && c.push(d)
                }
                return d
            },
            _fixRendererFields: function() {
                var a = this.renderer;
                this._orderBy = null;
                if (a && 0 < this.fields.length) {
                    var b = [],
                        c, a = k.filter([a, a.observationRenderer, a.latestObservationRenderer, a.trackRenderer], r.isDefined),
                        d = [].concat(a);
                    k.forEach(a, function(a) {
                        k.forEach(a.rendererInfos, function(a) {
                            a.renderer && d.push(a.renderer)
                        })
                    });
                    k.forEach(d, function(a) {
                        this._fixFieldCase(a, "attributeField", b);
                        this._fixFieldCase(a, "attributeField2", b);
                        this._fixFieldCase(a, "attributeField3", b);
                        this._fixFieldCase(a.rotationInfo, "field",
                            b);
                        if ((c = this._fixFieldCase(a.sizeInfo, "field", b)) && !this._orderBy) this._orderBy = [c + " DESC"];
                        this._fixFieldCase(a.sizeInfo, "normalizationField", b);
                        this._fixFieldCase(a.colorInfo, "field", b);
                        this._fixFieldCase(a.colorInfo, "normalizationField", b);
                        this._fixFieldCase(a.field, "field", b);
                        this._fixFieldCase(a.opacityInfo, "field", b);
                        this._fixFieldCase(a.opacityInfo, "normalizationField", b);
                        k.forEach(a.visualVariables, function(a) {
                            c = this._fixFieldCase(a, "field", b);
                            "sizeInfo" === a.type && (c && !this._orderBy) && (this._orderBy = [c + " DESC"]);
                            this._fixFieldCase(a, "normalizationField", b)
                        }, this);
                        if (!this._orderBy && a.addBreak && !q.isFunction(a.attributeField) && (a.backgroundFillSymbol || this._hasSizeDiff(a))) this._orderBy = [a.attributeField + " DESC"]
                    }, this);
                    this._rendererFields = k.filter(b, r.isDefined)
                }
            },
            _hasSizeDiff: function(a) {
                var b = Number.MAX_VALUE,
                    c = -Number.MAX_VALUE,
                    d, e;
                k.forEach(a.infos, function(a) {
                    if (e = a.symbol) {
                        d = 0;
                        switch (e.type) {
                            case "simplemarkersymbol":
                                d = e.size;
                                break;
                            case "picturemarkersymbol":
                                d = (e.width + e.height) / 2;
                                break;
                            case "simplelinesymbol":
                            case "cartographiclinesymbol":
                                d = e.width;
                                break;
                            case "simplefillsymbol":
                            case "picturefillsymbol":
                                d = e.outline && e.outline.width
                        }
                        d && (b = Math.min(b, d), c = Math.max(c, d))
                    }
                });
                return b !== Number.MAX_VALUE && c !== -Number.MAX_VALUE && 1 < Math.abs(c - b)
            },
            getOrderByFields: function() {
                var a = this.orderByFields || this._orderBy;
                return this.supportsAdvancedQueries && a ? k.filter(a, function(a) {
                    a = a.split(" ")[0];
                    return !!this._getField(a, !0)
                }, this) : null
            },
            _getField: function(a, b) {
                var c = this.fields;
                if (!c || 0 === c.length) return null;
                var d;
                b && (a = a.toLowerCase());
                k.some(c, function(c) {
                    var f = !1;
                    (f = b ? c && c.name.toLowerCase() === a ? !0 : !1 : c && c.name === a ? !0 : !1) && (d = c);
                    return f
                });
                return d
            },
            _getDateOpts: function() {
                this._dtOpts || (this._dtOpts = {
                    properties: k.map(k.filter(this.fields, function(a) {
                        return !!(a && "esriFieldTypeDate" === a.type)
                    }), function(a) {
                        return a.name
                    })
                });
                return this._dtOpts
            },
            _applyNormalized: function(a, b) {
                a && b && k.forEach(a, function(a, d) {
                    a && b[d] && a.setGeometry(b[d])
                })
            },
            _editHandler: function(a, b, c, d, e, f) {
                e = a.addResults;
                var l = a.updateResults;
                a = a.deleteResults;
                var g, h, n, m, q = this.objectIdField,
                    p = this._mode,
                    s = this._isTable;
                g = this.editFieldsInfo;
                var r = this.getOutFields() || [],
                    x = g && g.creatorField,
                    v = g && g.creationDateField,
                    y = g && g.editorField,
                    z = g && g.editDateField;
                g = g && g.realm; - 1 === k.indexOf(r, "*") && (x && -1 === k.indexOf(r, x) && (x = null), v && -1 === k.indexOf(r, v) && (v = null), y && -1 === k.indexOf(r, y) && (y = null), z && -1 === k.indexOf(r, z) && (z = null));
                var r = v || z ? (new Date).getTime() : null,
                    u = x || y ? this.getUserId() : void 0;
                u && g && (u = u + "@" + g);
                if (e)
                    for (g = 0; g < e.length; g++) e[g] =
                        new E(e[g]), s || (h = e[g], h.success && (h = h.objectId, n = b[g], (m = n._graphicsLayer) && m !== this && m.remove(n), m = n.attributes || {}, m[q] = h, x && (m[x] = u), y && (m[y] = u), v && (m[v] = r), z && (m[z] = r), n.setAttributes(m), p._init && p.drawFeature(n)));
                if (l)
                    for (g = 0; g < l.length; g++)
                        if (l[g] = new E(l[g]), !s && (h = l[g], h.success)) {
                            h = h.objectId;
                            n = c[h];
                            if (b = p._getFeature(h)) b.geometry !== n.geometry && b.setGeometry(fa.fromJson(n.geometry.toJson())), this._repaint(b, h);
                            n = b || n;
                            m = n.attributes || {};
                            y && (m[y] = u);
                            z && (m[z] = r);
                            n.setAttributes(m)
                        }
                if (a) {
                    c = [];
                    for (g = 0; g < a.length; g++)
                        if (a[g] = new E(a[g]), !s && (h = a[g], h.success && (h = h.objectId, n = p._getFeature(h)))) this._unSelectFeatureIIf(h, p) && c.push(n), n._count = 0, p._removeFeatureIIf(h);
                    if (0 < c.length) this.onSelectionComplete(c, t.SELECTION_SUBTRACT)
                }
                this._resolve([e, l, a], "onEditsComplete", d, f)
            },
            _sendAttachment: function(a, b, c, d, e) {
                var f = this;
                return D({
                    url: this._url.path + "/" + b + "/" + ("add" === a ? "addAttachment" : "updateAttachment"),
                    form: c,
                    content: q.mixin(this._url.query, {
                        f: "json",
                        token: this._getToken() || void 0
                    }),
                    callbackParamName: "callback.html",
                    handleAs: "json"
                }).addCallback(function(c) {
                    var e = "add" === a ? "onAddAttachmentComplete" : "onUpdateAttachmentComplete";
                    c = new E(c["add" === a ? "addAttachmentResult" : "updateAttachmentResult"]);
                    c.attachmentId = c.objectId;
                    c.objectId = b;
                    f._resolve([c], e, d);
                    return c
                }).addErrback(function(a) {
                    f._resolve([a], null, e, null, !0)
                })
            },
            _repaint: function(a, b, c) {
                b = r.isDefined(b) ? b : a.attributes[this.objectIdField];
                (!(b in this._selectedFeatures) || !this._selectionSymbol) && a.setSymbol(a.symbol, c)
            },
            _getKind: function(a) {
                var b = this._trackManager;
                return b ? b.isLatestObservation(a) ? 1 : 0 : 0
            }
        });
    q.mixin(t, {
        MODE_SNAPSHOT: 0,
        MODE_ONDEMAND: 1,
        MODE_SELECTION: 2,
        SELECTION_NEW: 3,
        SELECTION_ADD: 4,
        SELECTION_SUBTRACT: 5,
        MODE_AUTO: 6,
        MODE_STREAM: 7,
        POPUP_NONE: "esriServerHTMLPopupTypeNone",
        POPUP_HTML_TEXT: "esriServerHTMLPopupTypeAsHTMLText",
        POPUP_URL: "esriServerHTMLPopupTypeAsURL"
    });
    ga._createWrappers(t);
    return t
});