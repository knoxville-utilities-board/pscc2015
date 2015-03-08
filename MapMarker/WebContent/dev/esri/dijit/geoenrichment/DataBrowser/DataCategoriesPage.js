require({cache:{
'url:esri/dijit/geoenrichment/DataBrowser/templates/DataCategoriesPage.html':"<div data-dojo-type=\"dijit/layout/ContentPane\" data-dojo-props=\"row: 0\">\n    <div data-dojo-attach-point=\"countryDiv\" class=\"DataCategoriesPage_Country\">\n        <select data-dojo-type=\"dijit/form/FilteringSelect\"\n            data-dojo-attach-point=\"countrySelect\"\n            data-dojo-props=\"maxHeight: 151\"\n            data-dojo-attach-event=\"onChange: _onCountryChanged\">\n        </select>\n    </div>\n    <input type=\"text\"\n        data-dojo-type=\"esri/dijit/geoenrichment/DataBrowser/SearchTextBox\"\n        data-dojo-attach-point=\"txbSearch\"\n        data-dojo-props=\"prompt:'${nls.search}'\"\n        data-dojo-attach-event=\"onSearch: _search\"\n        class=\"DataCategoriesPage_Search\" />\n</div>\n<div data-dojo-type=\"dijit/layout/ContentPane\" data-dojo-attach-point=\"itemsPane\" data-dojo-props=\"row: 1\" class=\"DataCategoriesPage_Pagination\">\n    <div data-dojo-type=\"esri/dijit/geoenrichment/Pagination\" data-dojo-attach-point=\"pagination\" data-dojo-attach-event=\"onSelect: _onItemClick\"></div>\n    <div data-dojo-attach-point=\"progressDiv\" class=\"Wizard_Progress\"></div>\n</div>\n<div data-dojo-type=\"dijit/layout/ContentPane\" data-dojo-props=\"row: 2\">\n</div>\n"}});
//>>built
define("esri/dijit/geoenrichment/DataBrowser/DataCategoriesPage", ["../../../declare", "dojo/string", "dojo/_base/lang", "dojo/aspect", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/on", "dojo/has", "dojo/i18n!../../../nls/jsapi", "dojo/text!./templates/DataCategoriesPage.html", "../../../tasks/geoenrichment/GeoenrichmentTask", "../config", "../_WizardPage", "../Pagination", "../AnimationHelper", "dojo/store/Memory", "dijit/layout/ContentPane", "dijit/form/FilteringSelect", "./SearchTextBox"], function(p, q, r, s, t, l, m, z, A, f, u, v, n, w, B, x, y) {
    f = f.geoenrichment.dijit.DataCategoriesPage;
    return p([w], {
        templateString: u,
        nls: f,
        baseClass: "DataCategoriesPage",
        items: null,
        countryID: null,
        countryBox: !0,
        dataCollections: {},
        rowsPerPage: 8,
        _task: null,
        _list: null,
        _pageCount: 0,
        _pageSize: 0,
        currentPage: 0,
        shoppingCart: null,
        selection: null,
        flyAnim: null,
        scrollAnim: null,
        constructor: function() {
            this._task = new v(n.server);
            this._task.token = n.token;
            this.scrollAnim = new x;
            this._ltr = m.isBodyLtr()
        },
        buildRendering: function() {
            this.inherited(arguments);
            this.pagination.createItemContainer = this._createItemContainer;
            this.pagination.updateItemContainer =
                this._updateItemContainer;
            s.after(this.layoutGrid, "resize", r.hitch(this.pagination, this.pagination.resize))
        },
        startup: function() {
            this.inherited(arguments);
            this.countryBox ? (this.countrySelect.set("labelAttr", "label"), this.countrySelect.set("searchAttr", "label"), this.countrySelect.store.idProperty = "value", this.countrySelect.set("item", {
                value: "_",
                label: f.loading
            }, null, f.loading), this.countrySelect.set("disabled", !0), this.showProgress(this._task.getAvailableCountries(), "_onCountriesResponse")) : (l.destroy(this.countryDiv),
                this._loadDataCollections())
        },
        _createItemContainer: function() {
            var a = l.create("div", {
                "class": "DataCategoriesPage_Item"
            });
            l.create("span", null, a);
            return a
        },
        _updateItemContainer: function(a, b) {
            a.childNodes[0].innerHTML = b.name;
            a.className = "DataCategoriesPage_Item DataBrowser_Clickable DataCategoriesPage_Item_" + b.id.replace(/ /g, "_");
            a.data = b
        },
        _onItemClick: function(a) {
            if (this.flyAnim) {
                if (!this._ltr) {
                    var b = m.position(a);
                    a.style.right = "" + (window.innerWidth - b.x - b.w) + "px"
                }
                b = this.flyAnim.fly(a, "Breadcrumb_SelectCategory");
                b.innerHTML = "";
                t.remove(b, "DataBrowser_Clickable");
                this._ltr || (a.style.right = "auto")
            }
            this.onSelect(a.data)
        },
        _coerceCurrentPage: function(a) {
            0 > a ? a = 0 : a >= this._pageCount && (a = this._pageCount - 1);
            return a
        },
        _back: function() {
            this.set("currentPage", this.currentPage - 1)
        },
        _forward: function() {
            this.set("currentPage", this.currentPage + 1)
        },
        _onCountriesResponse: function(a) {
            this.countrySelect.set("disabled", !1);
            for (var b = [{
                    value: "_",
                    label: f.global
                }], g = 0; g < a.length; g++) b.push({
                value: a[g].id,
                label: a[g].name
            });
            a = new y({
                data: b,
                idProperty: "value"
            });
            this.countrySelect.set("store", a);
            this.countrySelect.set("value", this.countryID || "_")
        },
        _onCountryChanged: function() {
            var a = this.countrySelect.get("value");
            "_" == a && (a = null);
            this._set("countryID", a);
            this._loadDataCollections()
        },
        _setCountryIDAttr: function(a) {
            this.countryID != a && (this._set("countryID", a), this._started && this._loadDataCollections())
        },
        _loadDataCollections: function() {
            this.cancelProgress("_onDataCollectionsResponse");
            this.showProgress(this._task.getDataCollections(this.countryID,
                null, "id alias type description popularity fieldCategory vintage filteringTags".split(" ")), "_onDataCollectionsResponse")
        },
        _onDataCollectionsResponse: function(a) {
            this.dataCollections || (this.dataCollections = {});
            this.dataCollections[this.countryID] = a ? a : {};
            for (var b = {}, g = [], h = this.selection, d, k = 0; k < a.length; k++) {
                var c = a[k];
                c.fieldCategories = {};
                if (c.metadata.filters)
                    for (d = 0; d < c.metadata.filters.length; d++) c.metadata.filters[d].id = c.metadata.filters[d].id.replace("Diposable", "Disposable");
                if (c.metadata.categories) {
                    if (c.variables)
                        for (var e =
                                0; e < c.variables.length; e++) {
                            c.variables[e].id2 = c.id + "." + c.variables[e].id;
                            c.variables[e].hidden = 0;
                            c.variables[e].idDesc = c.variables[e].id + "." + c.variables[e].description;
                            for (d = 0; d < c.variables[e].filteringTags; d++) c.variables[e].filteringTags[d].value = c.variables[e].filteringTags[d].value.replase("$", "");
                            if (h && h.length)
                                for (d = 0; d < h.length; d++)
                                    if (h[d] === c.variables[e].id2) {
                                        g.push(c.variables[e]);
                                        break
                                    }
                        }
                    for (d = 0; d < c.metadata.categories.length; d++) {
                        var f = c.metadata.categories[d],
                            e = f.id.toLowerCase();
                        b[e] ?
                            b[e].dataCollections.push(c) : b[e] = {
                                id: e,
                                name: f.alias,
                                dataCollections: [c],
                                displayOrder: f.displayOrder
                            }
                    }
                }
            }
            this.shoppingCart.setVariables(g);
            a = [];
            for (f in b) b.hasOwnProperty(f) && (b[f].dataCollections.sort(function(a, b) {
                return b.metadata.title < a.metadata.title ? 1 : -1
            }), a.push(b[f]));
            a.sort(function(a, b) {
                return b.displayOrder - a.displayOrder
            });
            this.set("items", a)
        },
        _setItemsAttr: function(a) {
            this._set("items", a);
            this.pagination.set("items", a);
            this._started && this.resize()
        },
        onSelect: function(a) {},
        _search: function() {
            if (this.txbSearch.get("value")) {
                for (var a =
                        this.txbSearch.get("value"), b = this.get("items"), g = [], h, d, k = 0; k < b.length; k++)
                    for (var c = 0; c < b[k].dataCollections.length; c++) {
                        d = b[k].dataCollections[c];
                        h = {
                            id: d.id,
                            metadata: d.metadata,
                            keywords: d.keywords,
                            variables: []
                        };
                        for (var e = 0; e < d.variables.length; e++) this._match(d.variables[e], a) && h.variables.push(d.variables[e]);
                        0 < h.variables.length && g.push(h)
                    }
                0 < g.length ? (this._set("selectedCollections", g), this.onSearch("'" + a + "'")) : this.txbSearch.showTooltip(q.substitute(f.noResults, {
                    seachKey: a
                }))
            }
        },
        _match: function(a,
            b) {
            return a.alias && -1 !== a.alias.toLowerCase().indexOf(b.toLowerCase()) || a.description && -1 !== a.description.toLowerCase().indexOf(b.toLowerCase()) || a.fieldCategory && -1 !== a.fieldCategory.toLowerCase().indexOf(b.toLowerCase())
        },
        onSearch: function() {}
    })
});