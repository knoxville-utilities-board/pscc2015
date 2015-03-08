require({cache:{
'url:esri/dijit/FeatureTable/templates/FeatureTable.html':"<div class=\"${baseClass}\" >\n  <div id= \"${bcNodeId}\" class=\"esriFeatureTable_bc\" data-dojo-attach-point= \"_bcNode\" data-dojo-type=\"dijit.layout.BorderContainer\" gutters=\"false\">\n    <div id= \"${gridMenuId}\" class=\"esriFeatureTable_cp esriFeatureTable_menu\" data-dojo-attach-point= \"_gridMenu\" data-dojo-type=\"dijit/layout/ContentPane\" data-dojo-props=\"region: 'top'\">\n      <div class=\"esriFeatureTable_menuItem gridLoadingIndicator\" data-dojo-attach-point= \"_gridLoadingIndicatorNode\" style=\"display:none;\"></div>\n      <div class=\"esriFeatureTable_menuItem gridTitle\" data-dojo-attach-point= \"_gridHeaderNode\"></div>\n      <div class=\"esriFeatureTable_menuItem gridCloser\"><a class= \"esriFeatureTable_closer toggleOpened\" data-dojo-attach-point=\"tableCloseButton\" href=\"JavaScript:void(0);\" title=\"Hide Table\"></a></div>   \n      <div data-dojo-attach-point= \"_optionNode\" class=\"esriFeatureTable_menuItem esriFeatureTable_menuOptions\">\n        <div id=\"${optionNodeId}\"></div>\n      </div>\n\n    </div>\n    <div id= \"${gridContainerId}\" class=\"esriFeatureTable_cp\" data-dojo-attach-point= \"_gridContainer\" data-dojo-type=\"dijit/layout/ContentPane\" data-dojo-props=\"region: 'center'\">\n         <div id=\"${gridId}\" class=\"esriFeatureTable_Table\" data-dojo-attach-point=\"_gridNode\"></div>\n    </div>\n  </div>\n</div>\n\n"}});
//>>built
define("esri/dijit/FeatureTable", ["dojo/aspect", "dojo/on", "dojo/Evented", "dojo/has", "dojo/number", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/text!../dijit/FeatureTable/templates/FeatureTable.html", "dojo/i18n!../nls/jsapi", "dojo/store/Cache", "dojo/store/Memory", "dojo/store/Observable", "dojo/string", "dojo/dom-construct", "dojo/dom-class", "dojo/fx/Toggler", "dijit/_WidgetBase", "dijit/_OnDijitClickMixin", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dijit/Dialog", "dijit/Menu", "dijit/MenuItem", "dijit/form/DropDownButton", "dijit/form/ValidationTextBox", "dijit/form/TimeTextBox", "dijit/form/DateTextBox", "dijit/form/Button", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dgrid/OnDemandGrid", "dgrid/Selection", "dgrid/Keyboard", "dgrid/editor", "dgrid/extensions/DijitRegistry", "dgrid/extensions/ColumnHider", "dgrid/extensions/ColumnResizer", "dgrid/extensions/ColumnReorder", "../graphic", "../kernel", "../lang", "../geometry/Extent", "../layers/FeatureLayer", "../tasks/query", "../tasks/StatisticDefinition", "../tasks/QueryTask", "../dijit/FeatureLayerQueryStore", "dojo/query!css2", "dojo/domReady!"], function(u, l, C, $, n, r, c, k, D, E, F, s, v, G, e, q, H, I, J, K, L, M, w, t, N, aa, O, x, P, ba, ca, Q, R, S, T, U, V, W, da, ea, fa, y, z, A, p, X, Y, Z) {
    return r([I, J, K, L, C], {
        baseClass: "esriFeatureTable",
        basePath: require.toUrl("esri/dijit/FeatureTable/"),
        loaded: !1,
        templateString: D,
        widgetsInTemplate: !0,
        i18n: E,
        map: null,
        idProperty: "id",
        columns: [],
        dataStore: null,
        grid: null,
        gridMenu: null,
        _featureSet: null,
        featureLayer: null,
        currentLayer: null,
        dateOptions: {
            timeEnabled: !1,
            timePattern: "HH:mm:ss",
            datePattern: null
        },
        hiddenFields: [],
        outFields: ["*"],
        readOnly: !1,
        gridOptions: {},
        noDataMessage: "No Data",
        allowSelectAll: !1,
        cellNavigation: !1,
        selectionMode: "extended",
        _layerInfo: {},
        _editorTrackingInfos: {},
        _gridHeaderText: "${gridTitle} (${featureCount} features, ${featureSelectedCount} selected)",
        _gridTitle: "Placeholder",
        _featureCount: 0,
        _featureSelectedCount: 0,
        _currentSelectedRows: [],
        _currentSelectedRowIds: [],
        _filteredRowIds: [],
        disableLayerClick: !0,
        syncSelection: !0,
        updateLayerSelection: !1,
        _batchCount: 0,
        _defaultBatchCount: 25,
        _defaultFeatureCount: 2E3,
        _toggler: null,
        constructor: function(a, b) {
            r.safeMixin(this, a);
            b && (this.gridId = b + "_grid", this.bcNodeId = b + "_bcNode", this.gridMenuId = b + "_gridMenu", this.gridContainerId = b + "_gridContainer", this.optionNodeId = b + "_optionNode", this.StandardGrid = r([U, Q, R, S, V, W]), this._listenerHandles = [], this.currentLayer = a.featureLayer || null, this.map = a.map || null, this.dateOptions = a.dateOptions || this.dateOptions, this.hiddenFields = a.hiddenFields || [], this.readOnly = a.readOnly || !1, a.gridOptions && (this.gridOptions = a.gridOptions || {}, this.noDataMessage =
                a.gridOptions.noDataMessage || this.noDataMessage, this.allowSelectAll = a.gridOptions.allowSelectAll || this.allowSelectAll, this.cellNavigation = a.gridOptions.cellNavigation || this.cellNavigation, this.selectionMode = a.gridOptions.selectionMode || this.selectionMode))
        },
        postCreate: function() {
            this.inherited(arguments);
            this.map && l(this.map, "load", c.hitch(this, function() {}))
        },
        startup: function() {
            this.currentLayer && this.currentLayer.loadError ? this._showLoadError(this.currentLayer.loadError.message) : (this.inherited(arguments),
                this.domNode && this.currentLayer.loaded ? this._init() : (l(this.currentLayer, "load", c.hitch(this, function(a) {
                    this._init()
                })), l(this.currentLayer, "error", c.hitch(this, function(a) {
                    this.currentLayer.loadError ? this._showLoadError(this.currentLayer.loadError.message) : this._showLoadError("")
                }))))
        },
        destroy: function() {
            k.forEach(this._listenerHandles, function(a) {
                a.remove()
            });
            this.map && (this.map.infoWindow.clearFeatures(), this.map.infoWindow.hide());
            this.map = null;
            this.grid && (this.grid._destroyColumns(), this.grid.destroy());
            this._bcNode.destroyRecursive();
            delete this.columns;
            delete this._layerInfo;
            this._featureSet = this.params = this.hiddenFields = this.idProperty = this.dateOptions = this.featureLayer = this.currentLayer = this.gridMenu = this.dataStore = this.columns = this.grid = null;
            this.inherited(arguments)
        },
        resize: function() {
            this._resize()
        },
        _init: function() {
            this._userIds = {};
            var a = this.currentLayer.id;
            this.currentLayer.credential && (this._userIds[a] = this.currentLayer.credential.userId);
            this._layerInfo.userId && (this._userIds[a] = this._layerInfo.userId);
            this._layerInfo.showAttachments = this._layerInfo.showAttachments = this.currentLayer.hasAttachments ? y.isDefined(this._layerInfo.showAttachments) ? this._layerInfo.showAttachments : !0 : !1;
            this._layerInfo.isEditable = this.currentLayer.isEditable() ? y.isDefined(this._layerInfo.isEditable) ? this._layerInfo.isEditable : !0 : !1;
            this._layerInfo.typeIdField = this.currentLayer.typeIdField;
            this._layerInfo.layerId = this.currentLayer.id;
            this._layerInfo.types = this.currentLayer.types;
            this._layerInfo.fields = this.currentLayer.fields;
            this._layerInfo._fieldInfo = [];
            this._layerInfo._features = [];
            this._getEditingInfo();
            this.idProperty = this.currentLayer.objectIdField;
            this.grid = this._initGrid();
            this.grid.startup();
            this.grid.resize();
            this._listenerHandles.push(this._gridSelectEvent());
            this._listenerHandles.push(this._gridDeselectEvent());
            this._listenerHandles.push(this._gridRefreshEvent());
            this._createTableMenu();
            this._toggler = this._createTableToggle();
            this._listenerHandles.push(this._tableToggleClickEvent());
            this._listenerHandles.push(this._columnClickEvent());
            this.loaded = !0;
            this.emit("load", this.loaded);
            this.grid.noDataMessage = "";
            this._gridHeaderNode.innerHTML = "Loading Feature Data...";
            this._resize();
            this._toggleLoadingIndicator(!0);
            this._getFeatureCount().then(c.hitch(this, this._queryFeatureLayer));
            this._listenerHandles.push(this._layerClickEvent())
        },
        selectRows: function(a) {
            var b = [],
                f = [],
                d;
            this.grid.clearSelection();
            a[0] && "esri.Graphic" === a[0].declaredClass && (k.forEach(a, c.hitch(this, function(a) {
                f.push(a.attributes[this.idProperty])
            })), a = f);
            if (1 === a.length) {
                d =
                    a[0];
                a = this.dataStore.get(a);
                var m = this.dataStore.data.indexOf(a);
                this.grid.select(d);
                this._updateGridSelection([a]);
                this._updateGridHeaderText();
                this.grid.scrollTo({
                    x: 0,
                    y: this.grid.rowHeight * m
                });
                this.grid.row(d).element && this.grid.row(d).element.scrollIntoView()
            } else k.forEach(a, c.hitch(this, function(a) {
                b.push(this.dataStore.get(a))
            })), this._updateGridSelection(b), this._updateGridHeaderText()
        },
        _layerClickEvent: function() {
            return l(this.currentLayer, "click", c.hitch(this, function(a) {
                if (!this.disableLayerClick &&
                    a.graphic && a.graphic.attributes && a.graphic.attributes[this.idProperty]) {
                    var b = a.graphic.attributes[this.idProperty];
                    a = new p;
                    a.returnGeometry = this.map ? !0 : !1;
                    a.objectIds = [b];
                    this.currentLayer.selectFeatures(a, A.SELECTION_NEW, c.hitch(this, function(a) {
                        if (a.length) {
                            if (this.map) {
                                var d = this._calcGraphicsExtent(a).getCenter();
                                this.map.centerAt(d).then(c.hitch(this, function() {
                                    this.map.infoWindow.setFeatures(a)
                                }))
                            }
                            var d = this.dataStore.get(b),
                                m = this.dataStore.data.indexOf(d);
                            this.grid.clearSelection();
                            this.grid.select(b);
                            this._updateGridSelection([d]);
                            this._updateGridHeaderText();
                            this.grid.scrollTo({
                                x: 0,
                                y: this.grid.rowHeight * m
                            });
                            this.grid.row(b).element && this.grid.row(b).element.scrollIntoView()
                        }
                    }))
                }
            }))
        },
        filterSelectedRecords: function(a) {
            a ? this._showSelectedRecords() : this.grid.set("query", {})
        },
        _selectFeatures: function() {},
        _updateGridSelection: function(a) {
            a ? (this._currentSelectedRowIds = [], this._currentSelectedRows = a, this._featureSelectedCount = a.length, k.forEach(a, c.hitch(this, function(a) {
                    this._currentSelectedRowIds.push(a[this.idProperty])
                }))) :
                (this._currentSelectedRowIds = [], this._currentSelectedRows = [], this._featureSelectedCount = 0)
        },
        _showInfoWindow: function() {},
        _hideInfoWindow: function() {},
        _getEditingInfo: function() {
            var a = [];
            this.currentLayer.editFieldsInfo && (this.currentLayer.editFieldsInfo.creatorField && a.push(this.currentLayer.editFieldsInfo.creatorField), this.currentLayer.editFieldsInfo.creationDateField && a.push(this.currentLayer.editFieldsInfo.creationDateField), this.currentLayer.editFieldsInfo.editorField && a.push(this.currentLayer.editFieldsInfo.editorField),
                this.currentLayer.editFieldsInfo.editDateField && a.push(this.currentLayer.editFieldsInfo.editDateField));
            this._editorTrackingInfos[this.currentLayer.id] = a
        },
        _gridRefreshEvent: function() {
            return l(this.grid, "dgrid-refresh-complete", c.hitch(this, function(a) {
                this.grid.columns[0] && this.emit("dgrid-refresh-complete", a)
            }))
        },
        _gridSelectEvent: function() {
            return l(this.grid, "dgrid-select", c.hitch(this, function(a) {
                this.emit("dgrid-select", a.rows);
                var b = [];
                k.forEach(a.rows, c.hitch(this, function(a) {
                    b.push(a.data)
                }));
                this._updateGridSelection(b);
                this._updateGridHeaderText();
                this.map && (this.map.infoWindow.clearFeatures(), this.map.infoWindow.hide(), a = new p, a.returnGeometry = this.map ? !0 : !1, a.objectIds = this._currentSelectedRowIds, this.updateLayerSelection && this.map.getLayer(this.currentLayer.id).selectFeatures(a, A.SELECTION_NEW, c.hitch(this, function(a) {
                    if (a.length) {
                        var b = this._calcGraphicsExtent(a).getCenter();
                        this.map.centerAt(b).then(c.hitch(this, function() {
                            this.map.infoWindow.setFeatures(a)
                        }))
                    }
                })))
            }))
        },
        _gridDeselectEvent: function() {
            return l(this.grid,
                "dgrid-deselect", c.hitch(this, function(a) {
                    this.emit("dgrid-deselect", a.rows);
                    this._updateGridSelection();
                    this._updateGridHeaderText()
                }))
        },
        _getFeatureCount: function() {
            var a = new p;
            a.returnGeometry = !1;
            a.returnIdsOnly = !1;
            a.where = "1\x3d1";
            esri.config.defaults.io.timeout = 1E4;
            return this.currentLayer.queryCount(a).then(c.hitch(this, function(a) {
                esri.config.defaults.io.timeout = 6E4;
                return this._featureCount = a
            }), function(a) {
                esri.config.defaults.io.timeout = 6E4;
                this._featureCount = this._defaultFeatureCount;
                console.log("Could not get feature count. Defaulting to 2000 features");
                return null
            })
        },
        _queryFeatureLayer: function() {
            var a = new p;
            a.where = "1\x3d1";
            a.outFields = this.outFields;
            a.returnGeometry = !1;
            this.currentLayer.queryFeatures(a, c.hitch(this, function(a) {
                var f = esri.isDefined(this.currentLayer.maxRecordCount) ? this.currentLayer.maxRecordCount : 1E3;
                this._batchCount = Math.min(f, this._defaultBatchCount);
                this._toggleLoadingIndicator(!1);
                this.grid.noDataMessage = this.noDataMessage;
                this._featureSet = a;
                this._generateColumnsFromFields(a.fields);
                this.grid.set("columns", this.columns);
                this._updateGridHeaderText();
                a.exceededTransferLimit ? this._generateCacheStore() : this._generateMemoryStore(a.features);
                this._layerInfo._features = a.features;
                this.grid.set("store", this.dataStore)
            }), c.hitch(this, function(a) {
                this._showLoadError(a.message)
            }))
        },
        _generateColumnsFromFields: function(a) {
            var b = [];
            k.forEach(a, c.hitch(this, function(a, d) {
                var m = this._layerInfo.typeIdField && a.name === this._layerInfo.typeIdField || !1,
                    e = this.currentLayer.fields[d].domain || !1,
                    g = -1 !== k.indexOf(this.hiddenFields, a.name) || "esriFieldTypeOID" === a.type ||
                    "esriFieldTypeGlobalID" === a.type || -1 !== k.indexOf(this._editorTrackingInfos[this.currentLayer.id], a.name),
                    l = this._layerInfo.isEditable && this._layerInfo.isEditable && a.name !== this.idProperty && !1 === this.readOnly,
                    B = "esriFieldTypeDate" === a.type;
                this._layerInfo._fieldInfo[d] = {
                    idx: d,
                    name: a.name,
                    type: a.type,
                    isDomainField: e,
                    isTypeIdField: m,
                    isHidden: g,
                    isEditable: l,
                    isNullable: this.currentLayer.fields[d].nullable || !1,
                    isDate: B
                };
                B ? l ? b.push(this._generateDateTimeEditorColumn(a, this._layerInfo._fieldInfo[d])) : b.push(this._generateDateTimeColumn(a,
                    this._layerInfo._fieldInfo[d])) : e ? b.push({
                    label: a.alias,
                    field: a.name,
                    type: a.type,
                    hidden: g,
                    get: c.hitch(this, function(b) {
                        b = this._findFirst(this.currentLayer.fields[d].domain.codedValues, "code", b[a.name]);
                        return null !== b ? b.name : null
                    })
                }) : m ? b.push({
                    label: a.alias,
                    field: a.name,
                    type: a.type,
                    hidden: g,
                    get: c.hitch(this, function(b) {
                        b = this._findFirst(this._layerInfo.types, "id", b[a.name]);
                        return null !== b ? b.name : null
                    })
                }) : b.push({
                    label: a.alias,
                    field: a.name,
                    type: a.type,
                    hidden: g,
                    get: c.hitch(this, function(b) {
                        var d, c =
                            this._findFirst(this._layerInfo.types, "id", b[this._layerInfo.typeIdField]);
                        c && (c.domains && c.domains[a.name] && c.domains[a.name].codedValues) && (d = this._findFirst(c.domains[a.name].codedValues, "code", b[a.name]));
                        return d ? d.name : b[a.name]
                    })
                })
            }));
            this.columns = b
        },
        _generateDateTimeColumn: function(a, b) {
            return {
                label: a.alias,
                field: a.name,
                type: a.type,
                hidden: b.isHidden,
                get: c.hitch(this, function(b) {
                    b = "" === b[a.name] ? null : new Date(b[a.name]);
                    this.dateOptions.timeEnabled || (b = b.toDateString());
                    return b
                })
            }
        },
        _generateDateTimeEditorColumn: function(a,
            b) {
            return this.dateOptions.timeEnabled ? {
                label: a.alias,
                field: a.name,
                type: a.type,
                hidden: b.isHidden,
                get: c.hitch(this, function(b) {
                    return "" === b[a.name] ? null : new Date(b[a.name])
                }),
                renderCell: c.hitch(this, function(a, b, c, e) {
                    (new x({
                        value: b
                    })).placeAt(c);
                    (new O({
                        value: b,
                        timePattern: this.dateOptions.timePattern
                    })).placeAt(c)
                })
            } : T({
                label: a.alias,
                field: a.name,
                type: a.type,
                hidden: b.isHidden,
                get: c.hitch(this, function(b) {
                    return "" === b[a.name] ? null : new Date(b[a.name])
                })
            }, x)
        },
        _generateCacheStore: function() {
            var a = new Z({
                    layer: this.currentLayer,
                    objectIds: null,
                    totalCount: this._featureCount,
                    batchCount: this._batchCount,
                    where: "1\x3d1",
                    orderByFields: ""
                }),
                b = new s;
            this.dataStore = new F(a, b, {})
        },
        _generateMemoryStore: function(a) {
            var b = [];
            k.forEach(a, c.hitch(this, function(a) {
                b.push(a.attributes)
            }));
            this.dataStore = new v(new s({
                data: b,
                idProperty: this.idProperty
            }))
        },
        _initGrid: function() {
            this.dataStore = new v(new s({
                data: null,
                idProperty: this.idProperty
            }));
            var a = new this.StandardGrid({
                store: this.dataStore,
                columns: this.columns,
                noDataMessage: this.noDataMessage,
                selectionMode: this.selectionMode,
                allowSelectAll: this.allowSelectAll,
                cellNavigation: this.cellNavigation
            }, this.gridId);
            u.before(a, "removeRow", c.hitch(this, function(b) {
                k.forEach(this.columns.length, c.hitch(this, function(c, d) {
                    var e = a.cell(b, d).element;
                    (e = (e.contents || e).widget) && e.destroyRecursive()
                }))
            }));
            u.after(a, "renderHeader", c.hitch(this, function() {
                a._sortListener.remove()
            }));
            return a
        },
        _resize: function() {
            this._bcNode.resize();
            this._gridMenu.resize();
            this._gridContainer.resize();
            this.grid && this.grid.resize()
        },
        _updateGridHeaderText: function() {
            this._gridHeaderNode.innerHTML = G.substitute(this._gridHeaderText, {
                gridTitle: this.currentLayer.name,
                featureCount: this._featureCount,
                featureSelectedCount: this._featureSelectedCount
            })
        },
        _columnClickEvent: function() {
            return l(this.grid, ".dgrid-header .dgrid-cell:click", c.hitch(this, this._showColumnMenu))
        },
        _showColumnMenu: function(a) {
            this.columnMenu && (this._oldColumnMenu = this.columnMenu, this.columnMenu = null);
            this.columnMenu = new w({});
            var b = this.grid.cell(a),
                f = b.column.id,
                d = this.columns[f].type,
                e = ["iconSortAscending", "iconSortDescending"],
                h = [this._sortAscending, this._sortDescending];
            k.forEach(["Sort Ascending", "Sort Descending"], c.hitch(this, function(a, b) {
                var d = new t({
                    label: a,
                    iconClass: e[b],
                    baseClass: "esriFeatureTable_menuItem",
                    onClick: c.hitch(this, h[b], f)
                });
                this.columnMenu.addChild(d)
            }));
            if (this.currentLayer.supportsStatistics && ("esriFieldTypeDouble" === d || "esriFieldTypeSingle" === d || "esriFieldTypeInteger" === d || "esriFieldTypeSmallInteger" === d)) d = new t({
                label: "Statistics",
                iconClass: "iconTableStatistics",
                baseClass: "esriFeatureTable_menuItem",
                onClick: c.hitch(this, this._getColumnStats, f)
            }), this.columnMenu.addChild(d);
            this.columnMenu.startup();
            this.columnMenu._openMyself({
                target: a.target,
                delegatedTarget: b,
                iframe: null,
                coords: {
                    x: a.pageX,
                    y: a.pageY
                }
            });
            l(this.columnMenu, "close", c.hitch(this, function() {
                this._oldColumnMenu && (this._oldColumnMenu.destroyRecursive(), this._oldColumnMenu = null)
            }))
        },
        _sortAscending: function(a, b) {
            this.grid.set("sort", [{
                attribute: this.columns[a].field,
                ascending: !0
            }])
        },
        _sortDescending: function(a, b) {
            this.grid.set("sort", [{
                attribute: this.columns[a].field,
                descending: !0
            }])
        },
        _getColumnStats: function(a, b) {
            var f = this.columns[a].field,
                d = new p;
            d.outFields = [f];
            d.outStatistics = [];
            d.where = "1\x3d1";
            var e = "countField sumField minField maxField avgField stddevField".split(" ");
            k.forEach("count sum min max avg stddev".split(" "), c.hitch(this, function(a, b) {
                var c = new X;
                c.statisticType = a;
                c.onStatisticField = f;
                c.outStatisticFieldName = e[b];
                c.displayFieldName = f;
                d.outStatistics.push(c)
            }));
            var h = [];
            0 < this._filteredRowIds.length && (h = this._filteredRowIds);
            d.where && 0 < h.length && (d.where = "(" + d.where + ") AND (" + this.idProperty + " IN (" + h.toString() + "))");
            (new Y(this.currentLayer.url)).execute(d).then(c.hitch(this, function(a) {
                a.features && a.features.length && this._showStatisticsDialog(a, f)
            }), function(a) {
                console.log("Could not get statistics.", a ? a.message : a)
            })
        },
        _showStatisticsDialog: function(a, b) {
            this.statisticsDialog && this.statisticsDialog.destroy();
            var f = a.features[0].attributes,
                d = {
                    pattern: "#,###,###,##0.########"
                },
                m = e.create("div", {
                    className: "esriAGOTableStatistics",
                    innerHTML: ""
                });
            e.create("div", {
                className: "header",
                innerHTML: "Field: " + b
            }, m);
            e.create("div", {
                className: "hzLine",
                innerHTML: ""
            }, m);
            var h = e.create("table", {
                    className: "attrTable",
                    innerHTML: "",
                    style: {
                        cellpadding: 0,
                        cellspacing: 0
                    }
                }, m),
                h = e.create("tbody", {}, h),
                g = e.create("tr", {
                    valign: "top"
                }, h);
            e.create("td", {
                "class": "attrName",
                innerHTML: "Number of Values"
            }, g);
            e.create("td", {
                "class": "attrValue",
                innerHTML: esri.isDefined(f.count) ? n.format(f.count, d) : ""
            }, g);
            g = e.create("tr", {
                valign: "top"
            }, h);
            e.create("td", {
                "class": "attrName",
                innerHTML: "Sum of Values"
            }, g);
            e.create("td", {
                "class": "attrValue",
                innerHTML: esri.isDefined(f.sum) ? n.format(f.sum, d) : ""
            }, g);
            g = e.create("tr", {
                valign: "top"
            }, h);
            e.create("td", {
                "class": "attrName",
                innerHTML: "Minimum"
            }, g);
            e.create("td", {
                "class": "attrValue",
                innerHTML: esri.isDefined(f.min) ? n.format(f.min, d) : ""
            }, g);
            g = e.create("tr", {
                valign: "top"
            }, h);
            e.create("td", {
                "class": "attrName",
                innerHTML: "Maximum"
            }, g);
            e.create("td", {
                "class": "attrValue",
                innerHTML: esri.isDefined(f.max) ? n.format(f.max, d) : ""
            }, g);
            g = e.create("tr", {
                valign: "top"
            }, h);
            e.create("td", {
                "class": "attrName",
                innerHTML: "Average"
            }, g);
            e.create("td", {
                "class": "attrValue",
                innerHTML: esri.isDefined(f.avg) ? n.format(n.round(f.avg, this._roundPos(f.avg)), d) : ""
            }, g);
            g = e.create("tr", {
                valign: "top"
            }, h);
            e.create("td", {
                "class": "attrName",
                innerHTML: "Standard Deviation"
            }, g);
            e.create("td", {
                    "class": "attrValue",
                    innerHTML: esri.isDefined(f.stddev) ? n.format(n.round(f.stddev, this._roundPos(f.stddev)), d) : ""
                },
                g);
            e.create("div", {
                className: "break",
                innerHTML: ""
            }, m);
            this.statisticsDialog = new M({
                title: "Statistics",
                content: m,
                baseClass: "esriFeatureTable_dialog"
            });
            f = e.create("button", {
                type: "button"
            }, this.statisticsDialog.containerNode);
            new P({
                label: "Close",
                baseClass: "primary dijitButton",
                onClick: c.hitch(this, function() {
                    this.statisticsDialog.hide()
                })
            }, f);
            this.statisticsDialog.show()
        },
        _defaultSortOrder: function() {
            this.grid.set("sort", [{
                attribute: this.idProperty,
                ascending: !0
            }])
        },
        _filterRows: function() {},
        _showSelectedRecords: function() {
            var a =
                this._filteredRowIds = this._currentSelectedRowIds;
            this._currentSelectedRows && this._currentSelectedRowIds && this.grid.set("query", c.hitch(this, function(b, c, d) {
                return ~a.indexOf(b[this.idProperty]) ? !0 : !1
            }))
        },
        _centerOnSelection: function() {
            var a = this._currentSelectedRowIds,
                b = new p;
            b.objectIds = a;
            b.outFields = ["*"];
            0 < this._currentSelectedRows.length && 0 < this._currentSelectedRowIds.length && this.currentLayer.queryFeatures(b, c.hitch(this, function(a) {
                this.map.setExtent(this._calcGraphicsExtent(a.features))
            }))
        },
        clearSelection: function() {
            this._clearSelection()
        },
        _clearSelection: function() {
            this._currentSelectedRowIds = [];
            this._currentSelectedRows = [];
            this._featureSelectedCount = 0;
            this._filteredRowIds = [];
            this.grid.set("query", {});
            this._updateGridHeaderText();
            this.map && (this.map.infoWindow.clearFeatures(), this.map.infoWindow.hide())
        },
        _deleteSelectedFeatures: function() {},
        _showAttachments: function() {},
        _showHideColumns: function() {
            this.grid._toggleColumnHiderMenu()
        },
        _exportToCSV: function() {},
        _createTableToggle: function() {
            var a =
                new H({
                    node: this.gridContainerId
                });
            this._toggleOpened = !0;
            return a
        },
        _tableToggleClickEvent: function() {
            return l(this.tableCloseButton, "click", c.hitch(this, function(a) {
                this._toggleOpened ? (q.remove(this.tableCloseButton, "toggleOpened"), q.add(this.tableCloseButton, "toggleClosed"), this._toggler.hide(), this._gridContainer.domNode.style.display = "none") : (q.remove(this.tableCloseButton, "toggleClosed"), q.add(this.tableCloseButton, "toggleOpened"), this._toggler.show(), this._gridContainer.domNode.style.display =
                    "block");
                this._resize();
                this._toggleOpened = !this._toggleOpened
            }))
        },
        _createTableMenu: function() {
            this.gridMenu = new w({});
            var a = ["Default Sort Order", "Show Selected Records", "Clear Selection", "Show/Hide Columns"],
                b = [this._defaultSortOrder, this._showSelectedRecords, this._clearSelection, this._showHideColumns];
            this.map && (a.push("Center on Selection"), b.push(this._centerOnSelection));
            k.forEach(a, c.hitch(this, function(a, d) {
                var e = new t({
                    label: a,
                    baseClass: "esriFeatureTable_menuItem",
                    onClick: c.hitch(this, b[d])
                });
                this.gridMenu.addChild(e)
            }));
            new N({
                label: "Table Options",
                dropDown: this.gridMenu
            }, this.optionNodeId);
            this.gridMenu.startup()
        },
        _roundPos: function(a) {
            return 1E3 <= a ? 0 : 10 <= a ? 2 : 0 <= a ? 4 : 6
        },
        _calcGraphicsExtent: function(a) {
            var b = a[0].geometry,
                c = b.getExtent(),
                d, e, h = a.length;
            null === c && (c = new z(b.x, b.y, b.x, b.y, b.spatialReference));
            for (e = 1; e < h; e++) b = a[e].geometry, d = b.getExtent(), null === d && (d = new z(b.x, b.y, b.x, b.y, b.spatialReference)), c = c.union(d);
            return c
        },
        _toggleLoadingIndicator: function(a) {
            this._gridLoadingIndicatorNode.style.display =
                a ? "block" : "none"
        },
        _findFirst: function(a, b, c) {
            return (a = k.filter(a, function(a) {
                return a.hasOwnProperty(b) && a[b] === c
            })) && a.length ? a[0] : null
        },
        _showLoadError: function(a) {
            this._toggleLoadingIndicator(!1);
            this._gridHeaderNode.innerHTML = "Error Loading Data."
        }
    })
});