require({cache:{
'url:esri/dijit/templates/Search.html':"<div role=\"presentation\" class=\"${theme}\">\n    <div role=\"presentation\" class=\"${css.searchGroup}\" data-dojo-attach-point=\"containerNode\">\n        <div role=\"button\" title=\"${_i18n.widgets.Search.main.searchIn}\" id=\"${id}_menu_button\" class=\"${css.searchBtn} ${css.searchToggle}\" tabindex=\"0\" data-dojo-attach-point=\"sourcesBtnNode\">\n            <span role=\"presentation\" class=\"${css.searchToggleIcon}\"></span><span class=\"${css.searchSourceName}\" data-dojo-attach-point=\"sourceNameNode\"></span>\n        </div>\n        <div class=\"${css.searchInputGroup}\">\n            <input autocomplete=\"off\" type=\"text\" tabindex=\"0\" class=\"${css.searchInput}\" value=\"${value}\" aria-haspopup=\"true\" id=\"${id}_input\" data-dojo-attach-point=\"inputNode\" role=\"textbox\">\n            <div role=\"button\" class=\"${css.searchClear}\" tabindex=\"0\" data-dojo-attach-point=\"clearNode\"><span class=\"${css.searchClearIcon}\"></span>\n            </div>\n            <div aria-labelledby=\"${id}_input\" data-dojo-attach-point=\"suggestionsNode\" class=\"${css.searchMenu} ${css.suggestionsMenu}\" role=\"menu\"></div>\n        </div>\n        <div role=\"button\" title=\"${_i18n.widgets.Search.main.searchButtonTitle}\" class=\"${css.searchBtn} ${css.searchSubmit}\" tabindex=\"0\" data-dojo-attach-point=\"submitNode\">\n            <span role=\"presentation\" class=\"${css.searchIcon}\"></span>\n        </div>\n        <div aria-labelledby=\"${id}_menu_button\" data-dojo-attach-point=\"sourcesNode\" class=\"${css.searchMenu} ${css.sourcesMenu}\" role=\"menu\"></div>\n        <div data-dojo-attach-point=\"noResultsMenuNode\" class=\"${css.searchMenu} ${css.searchNoResultsMenu}\"></div>\n        <div class=\"${css.searchClearFloat}\"></div>\n    </div>\n</div>"}});
//>>built
define("esri/dijit/Search", ["require", "dojo/Evented", "dijit/_WidgetBase", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/Deferred", "dojo/_base/event", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-style", "dojo/dom-construct", "dojo/keys", "dojo/on", "dojo/promise/all", "dojo/query", "dojo/string", "dojo/i18n!../nls/jsapi", "dojo/text!./templates/Search.html", "dojo/uacss", "dijit/a11yclick", "dijit/_TemplatedMixin", "dijit/focus", "../InfoTemplate", "../kernel", "../SpatialReference", "../graphic", "../symbols/PictureMarkerSymbol", "../geometry/Point", "../geometry/Extent", "../tasks/locator", "../tasks/query", "../geometry/scaleUtils"], function(F, G, H, I, h, B, s, t, J, r, l, C, K, k, q, z, u, L, n, M, T, v, N, O, P, U, w, x, Q, A, D, R, E, S) {
    return I("esri.dijit.Search", [H, N, G], {
        templateString: M,
        reHostedFS: /https?:\/\/services.*\.arcgis\.com/i,
        basePath: F.toUrl("."),
        constructor: function(a, c) {
            this.css = {
                searchGroup: "search-group",
                searchInput: "search-input",
                searchInputGroup: "search-input-group",
                searchBtn: "search-btn",
                searchSubmit: "search-submit",
                searchIcon: "search-icon icon-search",
                searchToggle: "search-toggle",
                searchToggleIcon: "search-toggle-icon icon-down-dir",
                searchMenu: "search-menu",
                searchMenuHeader: "menu-header",
                searchClear: "search-clear",
                searchClearIcon: "search-clear-icon icon-cancel",
                searchSourceName: "source-name",
                suggestionsMenu: "suggestions-menu",
                sourcesMenu: "sources-menu",
                activeSource: "active",
                hasValue: "has-value",
                hasMultipleSources: "has-multiple-sources",
                showSuggestions: "show-suggestions",
                showSources: "show-sources",
                showNoResults: "show-no-results",
                searchLoading: "search-loading",
                searchAlternativeResults: "alternative-results",
                searchAlternativeResultsList: "results-list",
                searchAlternativeResultsHeader: "alternative-header",
                searchAlternativeResultsItem: "alternative-item",
                searchAlternativeResultsListHeader: "popup-header",
                searchShowAlternativeResults: "show-alternative-results",
                searchNoResultsMenu: "no-results-menu",
                searchNoResultsBody: "no-results-body",
                searchNoResultsHeader: "no-results-header",
                searchClearFloat: "search-clear-float"
            };
            this._allIndex = "all";
            this._objectIdIdentifier = "_objectId";
            this._dijitName = "Search Dijit::";
            this._deferreds = [];
            this.options = {
                map: null,
                theme: "arcgis-search",
                visible: !0,
                value: "",
                sources: [{
                    locator: new R("//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"),
                    singleLineFieldName: "SingleLine",
                    outFields: ["Addr_type"],
                    name: n.widgets.Search.esriLocatorName,
                    localSearchOptions: {
                        minScale: 3E5,
                        distance: 5E4
                    },
                    placeholder: n.widgets.Search.main.placeholder,
                    maxResults: 6,
                    maxSuggestions: 6,
                    suggest: !0,
                    minCharacters: 0
                }],
                activeSourceIndex: 0,
                suggestDelay: 150,
                enableSourcesMenu: !0,
                enableSuggestionsMenu: !0,
                enableInfoWindow: !0,
                enableSuggest: !0,
                enableGraphic: !0,
                autoNavigate: !0,
                autoSelect: !0,
                addLayersFromMap: !1,
                zoomScale: 1E3,
                graphicsLayer: null,
                symbol: (new Q(this.basePath + "/images/search-pointer.png", 36, 36)).setOffset(9, 18),
                searchResults: null,
                suggestResults: null,
                minCharacters: 0
            };
            var b = h.mixin({}, this.options, a);
            this.set("map", b.map);
            this.set("theme", b.theme);
            this.set("visible", b.visible);
            this.set("value", b.value);
            this.set("sources", b.sources);
            this.set("activeSourceIndex", b.activeSourceIndex);
            this.set("suggestDelay", b.suggestDelay);
            this.set("enableSourcesMenu", b.enableSourcesMenu);
            this.set("enableSuggestionsMenu", b.enableSuggestionsMenu);
            this.set("enableInfoWindow", b.enableInfoWindow);
            this.set("enableSuggest", b.enableSuggest);
            this.set("autoNavigate", b.autoNavigate);
            this.set("autoSelect", b.autoSelect);
            this.set("addLayersFromMap", b.addLayersFromMap);
            this.set("zoomScale", b.zoomScale);
            this.set("graphicsLayer", b.graphicsLayer);
            this.set("enableGraphic", b.enableGraphic);
            this.set("symbol", b.symbol);
            this.set("searchResults", b.searchResults);
            this.set("suggestResults", b.suggestResults);
            this.set("minCharacters", b.minCharacters);
            b.sources && 1 < b.sources.length && this.set("activeSourceIndex", this._allIndex);
            b.sources && b.sources[b.activeSourceIndex] ? this.set("activeSource", b.sources[b.activeSourceIndex]) : this.set("activeSource", null);
            this._i18n = n;
            this._defaultSR = new w(4326);
            this._maxSuggestions = this._maxResults = 6;
            this._distance = 1500;
            this.watch("value", this._updateValue);
            this.watch("theme", this._updateTheme);
            this.watch("visible", this._updateVisible);
            this.domNode = c
        },
        startup: function() {
            if (!this.sources ||
                !this.sources.length) this.sources = [], console.log(this._dijitName + " No sources defined on startup.");
            if (this.domNode)
                if (this.map)
                    if (this.map.loaded) this._init();
                    else q.once(this.map, "load", h.hitch(this, function() {
                        this._init()
                    }));
            else this._init();
            else console.log(this._dijitName + " domNode is undefined."), this.destroy()
        },
        postCreate: function() {
            this.inherited(arguments);
            this._alternativeResultsId = this.id + "_alternative_results";
            this.own(q(this.submitNode, v, h.hitch(this, this.search)));
            this.own(q(this.sourcesBtnNode,
                v, h.hitch(this, this._toggleSourcesMenu)));
            this.own(q(this.inputNode, v, h.hitch(this, this._inputClick)));
            this.own(q(this.clearNode, v, h.hitch(this, this.clear)));
            this.own(q(this.inputNode, "keyup", h.hitch(this, function(a) {
                this._inputKeyUp(a)
            })));
            this.own(q(this.inputNode, "keydown", h.hitch(this, function(a) {
                this._inputKeyDown(a)
            })));
            this.own(q(this.sourcesBtnNode, "keydown", h.hitch(this, function(a) {
                this._sourceBtnKeydown(a)
            })));
            this.own(q(this.suggestionsNode, "li:click, li:keydown", h.hitch(this, function(a) {
                this._suggestionsClick(a)
            })));
            this.own(q(this.sourcesNode, "li:click, li:keydown", h.hitch(this, function(a) {
                this._sourcesClick(a)
            })));
            this.map && (this.own(q(this.map, "click", h.hitch(this, function() {
                this.blur()
            }))), this.map.infoWindow && (this.map.infoWindow.domNode && this.enableInfoWindow) && (this.own(q(this.map.infoWindow.domNode, "#" + this._alternativeResultsId + "_show:click", h.hitch(this, function() {
                this._showAlternativeResultsClick()
            }))), this.own(q(this.map.infoWindow.domNode, "#" + this._alternativeResultsId + "_list li a:click", h.hitch(this,
                function(a) {
                    this._alternativeResultsClick(a)
                })))));
            this.value && this._checkStatus();
            this._hideMenus();
            this._updateVisible();
            this._insertSources(this.sources);
            this._setPlaceholder(this.activeSourceIndex)
        },
        destroy: function() {
            K.empty(this.domNode);
            this.inherited(arguments)
        },
        clear: function() {
            this._clearGraphic();
            r.set(this.inputNode, "value", "");
            this.set("value", "");
            this.set("searchResults", null);
            this.set("suggestResults", null);
            l.remove(this.containerNode, this.css.hasValue);
            r.set(this.clearNode, "title",
                "");
            this._hideMenus();
            this._closePopup();
            this._hideLoading();
            this.emit("clear", {})
        },
        show: function() {
            C.set(this.domNode, "display", "block")
        },
        hide: function() {
            C.set(this.domNode, "display", "none")
        },
        search: function(a) {
            var c, b = new s,
                d = this.value,
                e = this.activeSourceIndex;
            a && a.hasOwnProperty("index") && (e = a.index);
            this._showLoading();
            this._hideMenus();
            this._closePopup();
            this._clearGraphic();
            (a = a ? "string" === typeof a ? this._searchSource({
                    text: a
                }) : "object" === typeof a && a.hasOwnProperty("magicKey") ? this._searchSource(a) :
                "object" === typeof a && a.hasOwnProperty("geometry") ? this._searchSource({
                    geometry: a
                }) : "object" === typeof a && a.hasOwnProperty(this._objectIdIdentifier) ? this._searchSource(a) : "object" === typeof a && "point" === a.type ? this._searchSource({
                    point: a
                }) : a instanceof Array && 2 === a.length ? this._searchSource({
                    latlon: a
                }) : this._searchSource({
                    text: d
                }) : this._searchSource({
                    text: d
                })) ? a.then(h.hitch(this, function(a) {
                if (a = this._formatResults(a, e)) {
                    var g = a.results;
                    this.set("searchResults", g);
                    c = {
                        activeSourceIndex: e,
                        results: g,
                        numResults: a.numResults,
                        value: d
                    };
                    this._selectFirstResult(g, e);
                    0 === a.numResults && (this._noResultsHTML(d), this._showNoResultsMenu());
                    this._hideLoading();
                    this.emit("search-results", c);
                    b.resolve(c)
                }
            }), h.hitch(this, function(a) {
                this.set("searchResults", null);
                c = {
                    activeSourceIndex: e,
                    results: null,
                    numResults: 0,
                    value: d,
                    error: a
                };
                this.emit("search-results", c);
                this._hideLoading();
                b.resolve(c)
            })): (this._hideLoading(), b.reject(Error(this._dijitName + " Error processing search query")));
            return b.promise
        },
        suggest: function(a) {
            var c, b, d = new s;
            a || (a = this.value);
            var e = this.activeSourceIndex;
            (c = this._suggestSource({
                text: a
            })) ? c.then(h.hitch(this, function(c) {
                if (c = this._formatResults(c, e)) {
                    var g = c.results;
                    this.set("suggestResults", g);
                    this._insertSuggestions(g);
                    b = {
                        activeSourceIndex: e,
                        results: g,
                        numResults: c.numResults,
                        value: a
                    };
                    this.emit("suggest-results", b);
                    d.resolve(b)
                }
            }), h.hitch(this, function(c) {
                this.set("suggestResults", null);
                this._insertSuggestions();
                b = {
                    activeSourceIndex: e,
                    results: null,
                    numResults: 0,
                    value: a,
                    error: c
                };
                this.emit("suggest-results",
                    b);
                d.resolve(b)
            })): d.reject(Error(this._dijitName + " Error processing suggest query"));
            return d.promise
        },
        select: function(a) {
            var c, b = this.sources,
                d = this.activeSourceIndex;
            d !== this._allIndex && (c = b[d].symbol);
            this._hideMenus();
            this._hideLoading();
            if (a.feature) {
                b = this.highlightGraphic;
                d = this.graphicsLayer;
                c = c || this.symbol || a.feature.symbol;
                var e = this._alternativeResultsHTML(a),
                    f = null;
                this.enableInfoWindow && (f = new P(n.widgets.Search.main.location, e));
                b ? (b.setGeometry(a.feature.geometry), b.setAttributes(a.feature.attributes),
                    b.setInfoTemplate(f), b.setSymbol(c)) : (b = new x(a.feature.geometry, c, a.feature.attributes, f), this.enableGraphic && (b.setSymbol(c), d ? d.add(b) : this.map && this.map.graphics.add(b)));
                this.map && (this.map.infoWindow && this.enableInfoWindow) && (this.map.infoWindow.setFeatures([b]), this.map.infoWindow.show(b.geometry));
                this.map && (this.autoNavigate && a && a.hasOwnProperty("extent")) && this.map.setExtent(a.extent);
                this.set("highlightGraphic", b)
            }
            this.emit("select-result", a)
        },
        focus: function() {
            O.focus(this.inputNode);
            this.emit("focus", {})
        },
        blur: function() {
            this.inputNode.blur();
            this._hideMenus();
            this.map && this.map.enableKeyboardNavigation();
            this.emit("blur", {})
        },
        _init: function() {
            this._getMapLayers().then(h.hitch(this, function() {
                this.set("loaded", !0);
                this.emit("load", {})
            }))
        },
        _selectFirstResult: function(a, c) {
            if (this.autoSelect && a) {
                var b;
                c === this._allIndex ? b = this._getFirstResult(a) : a[c] && a[c][0] && (b = a[c][0]);
                b && this.select(b)
            }
        },
        _getFirstResult: function(a) {
            if (a)
                for (var c in a)
                    if (a[c] && a[c][0]) return a[c][0];
            return !1
        },
        _getMapLayers: function() {
            var a =
                new s;
            if (this.addLayersFromMap) {
                var c = [],
                    b = [],
                    d = this.map.graphicsLayerIds;
                if (d && d.length) {
                    for (var e = 0; e < d.length; e++) {
                        var f = this.map.getLayer(d[e]);
                        f && (c.push(f), b.push(this._featureLayerLoaded(f)))
                    }
                    b.length ? z(b).then(h.hitch(this, function() {
                        for (var b = this.sources, d = 0; d < c.length; d++) "Feature Layer" === c[d].type && b.push({
                            featureLayer: c[d],
                            suggest: !0
                        });
                        this.set("sources", b);
                        a.resolve(b)
                    }), h.hitch(this, function(b) {
                        b || (b = Error(this._dijitName + " Error loading a layer"));
                        a.reject(b)
                    })) : a.resolve()
                } else a.resolve()
            }
            return a.promise
        },
        _alternativeResultsClick: function(a) {
            var c = a.target;
            a = parseInt(r.get(c, "data-source-index"), 10);
            var b = parseInt(r.get(c, "data-index"), 10),
                d = this.searchResults;
            (c = r.get(c, "data-latlon")) ? this.search(c): d[a] && (a = d[a][b]) && this.select(a)
        },
        _showAlternativeResultsClick: function() {
            var a = J.byId(this._alternativeResultsId);
            l.toggle(a, this.css.searchShowAlternativeResults)
        },
        _clearGraphic: function() {
            var a = this.highlightGraphic,
                c = this.graphicsLayer;
            a && (c ? c.remove(a) : this.map && this.map.graphics.remove(a), this.set("highlightGraphic",
                null))
        },
        _featureLayerLoaded: function(a) {
            var c = new s;
            if (a.loaded) c.resolve();
            else if (a.loadError) c.reject(Error(this._dijitName + " Layer failed to load."));
            else {
                var b, d;
                b = q.once(a, "load", h.hitch(this, function() {
                    d.remove();
                    c.resolve()
                }));
                d = q.once(a, "error", h.hitch(this, function() {
                    b.remove();
                    c.reject(Error(this._dijitName + " Layer could not be loaded."))
                }))
            }
            return c.promise
        },
        _getObjectSize: function(a) {
            var c = 0,
                b;
            for (b in a) a.hasOwnProperty(b) && c++;
            return c
        },
        _sourcesClick: function(a) {
            var c = a.target,
                b = r.get(c,
                    "data-index"),
                d = u("li", this.sourcesNode),
                c = B.indexOf(d, c);
            b !== this._allIndex && (b = parseInt(b, 10));
            "click" === a.type || "keydown" === a.type && a.keyCode === k.ENTER ? (this.set("activeSourceIndex", b), this._hideSourcesMenu()) : "keydown" === a.type && a.keyCode === k.UP_ARROW ? (t.stop(a), a = c - 1, 0 > a ? this.sourcesBtnNode.focus() : d[a].focus()) : "keydown" === a.type && a.keyCode === k.DOWN_ARROW ? (t.stop(a), a = c + 1, a >= d.length ? this.sourcesBtnNode.focus() : d[a].focus()) : a.keyCode === k.ESCAPE && this._hideSourcesMenu()
        },
        _suggestionsClick: function(a) {
            var c =
                a.target,
                b = r.get(c, "data-source-index"),
                d = parseInt(r.get(c, "data-index"), 10),
                e = u("li", this.suggestionsNode),
                f = this.sources,
                c = B.indexOf(e, c);
            b !== this._allIndex && (b = parseInt(b, 10));
            var g;
            this._clearQueryTimeout();
            "click" === a.type || "keydown" === a.type && a.keyCode === k.ENTER ? ((e = this.suggestResults) && (e[b] && e[b][d]) && (g = e[b][d]), g && (g.index = b, f[b].featureLayer ? (g[this._objectIdIdentifier] = g.feature.attributes[f[b].featureLayer.objectIdField], b = g.feature.attributes[f[b].displayField || f[b].featureLayer.displayField]) :
                    b = g.text, b || (b = ""), r.set(this.inputNode, "value", b), this.set("value", b), this.search(g))) : "keydown" === a.type && (a.keyCode === k.BACKSPACE || a.keyCode === k.DELETE) ? (t.stop(a), this.inputNode.focus(), g = this.inputNode.value.slice(0, -1), r.set(this.inputNode, "value", g), this.set("value", g)) : "keydown" === a.type && a.keyCode === k.UP_ARROW ? (t.stop(a), g = c - 1, 0 > g ? this.inputNode.focus() : e[g].focus()) : "keydown" === a.type && a.keyCode === k.DOWN_ARROW ? (t.stop(a), g = c + 1, g >= e.length ? this.inputNode.focus() : e[g].focus()) : a.keyCode ===
                k.ESCAPE && this._hideMenus()
        },
        _getResultName: function(a) {
            return a.name || "Untitled"
        },
        _getSuggestionName: function(a) {
            return a.text || a.name || "Untitled"
        },
        _alternativeResultsHTML: function(a) {
            var c, b = "",
                d = this.searchResults,
                e = this.sources,
                f = 0;
            c = "" + ('\x3cdiv class\x3d"' + this.theme + '"\x3e');
            c += '\x3cdiv id\x3d"' + this._alternativeResultsId + '" class\x3d"' + this.css.searchAlternativeResults + '"\x3e';
            c += '\x3cdiv class\x3d"' + this.css.searchAlternativeResultsHeader + '"\x3e';
            c += n.widgets.Search.main.currentLocation;
            c = c + "\x3c/div\x3e" + ('\x3cdiv class\x3d"' + this.css.searchAlternativeResultsItem + '"\x3e');
            c += this._getResultName(a);
            c += "\x3c/div\x3e";
            if (d) {
                var b = b + ('\x3cdiv class\x3d"' + this.css.searchAlternativeResultsItem + '"\x3e'),
                    b = b + ('\x3ca href\x3d"javascript:;" id\x3d"' + this._alternativeResultsId + '_show"\x3e' + n.widgets.Search.main.nwyw + "\x3c/a\x3e"),
                    b = b + "\x3c/div\x3e" + ('\x3cdiv class\x3d"' + this.css.searchAlternativeResultsList + '"\x3e'),
                    b = b + ('\x3cdiv class\x3d"' + this.css.searchAlternativeResultsHeader + '"\x3e'),
                    b = b + n.widgets.Search.main.selectAnother,
                    b = b + "\x3c/div\x3e",
                    b = b + ('\x3cdiv id\x3d"' + this._alternativeResultsId + '_list"\x3e'),
                    g;
                for (g in d)
                    if (d[g] && d[g].length) {
                        if (1 < this._getObjectSize(d) && !(1 === d[g].length && d[g][0] === a)) var h = this._getSourceName(g),
                            b = b + ('\x3cdiv class\x3d"' + this.css.searchAlternativeResultsListHeader + '"\x3e' + h + "\x3c/div\x3e");
                        for (var b = b + "\x3cul\x3e", m = e[g].maxResults || this._maxResults, h = 0; h < d[g].length && h < m; ++h)
                            if (d[g][h] !== a) {
                                var k = this._getResultName(d[g][h]),
                                    b = b + ('\x3cli\x3e\x3ca tabindex\x3d"0" title\x3d"' +
                                        k + '" data-index\x3d"' + h + '" data-source-index\x3d"' + g + '" href\x3d"javascript:;"\x3e' + k + "\x3c/a\x3e\x3c/li\x3e");
                                f++
                            }
                        a.feature.attributes && (a.feature.attributes.Addr_type && "LatLong" === a.feature.attributes.Addr_type) && (h = a.name.split(" ").reverse().toString(), b += '\x3cli\x3e\x3ca data-latlon\x3d"' + h + '" tabindex\x3d"0" title\x3d"' + h + '" href\x3d"javascript:;"\x3e' + h + "\x3c/a\x3e\x3c/li\x3e", f++);
                        b += "\x3c/ul\x3e"
                    }
                b += "\x3c/div\x3e";
                b += "\x3c/div\x3e"
            }
            f && (c += b);
            c += "\x3c/div\x3e";
            return c += "\x3c/div\x3e"
        },
        _validField: function(a,
            c) {
            return a.getField(c)
        },
        _validFields: function(a, c) {
            if (a && c && c.length) {
                for (var b = 0; b < c.length; b++)
                    if (!this._validField(a, c[b])) return !1;
                return !0
            }
            return !1
        },
        _suggest: function(a) {
            a || (a = {
                index: this.activeSourceIndex,
                text: this.value
            });
            var c = new s;
            this._deferreds.push(c);
            var b = a.index,
                d = this.sources[b],
                e = 0,
                f;
            a.hasOwnProperty("text") && (f = h.trim(a.text), e = a.text.length);
            a = d.minCharacters || this.minCharacters;
            if (this.enableSuggest && d.suggest && f && e >= a && this._supportsPagination(d)) {
                var g = "";
                d.prefix && (g += d.prefix);
                g += f;
                d.suffix && (g += d.suffix);
                var k = this._defaultSR;
                this.map && (k = this.map.spatialReference);
                e = {};
                if (d.locator) {
                    d.categories && (e.categories = d.categories);
                    d.locator.outSpatialReference = k;
                    if (this.map && (d.localSearchOptions && d.localSearchOptions.hasOwnProperty("distance") && d.localSearchOptions.hasOwnProperty("minScale")) && (f = this.map.getScale(), !d.localSearchOptions.minScale || f && f <= parseFloat(d.localSearchOptions.minScale))) e.location = this.map.extent.getCenter(), e.distance = d.localSearchOptions.distance;
                    e.text = g;
                    d.searchExtent && (e.searchExtent = d.searchExtent);
                    d.locator.suggestLocations(e).then(h.hitch(this, function(a) {
                        c.isFulfilled() || c.resolve(a)
                    }), h.hitch(this, function(a) {
                        a || (a = Error(this._dijitName + " Suggest location error"));
                        c.reject(a)
                    }))
                } else d.featureLayer && this._featureLayerLoaded(d.featureLayer).then(h.hitch(this, function() {
                    var a = d.displayField || d.featureLayer.displayField,
                        e = d.searchFields || [a],
                        f = this._validField(d.featureLayer, a),
                        y = this._validFields(d.featureLayer, e);
                    if (!f || !y) c.reject(Error(this._dijitName +
                        " Invalid featureLayer field"));
                    else {
                        f = new E;
                        f.outSpatialReference = k;
                        f.returnGeometry = !1;
                        f.num = d.maxSuggestions || this._maxSuggestions;
                        d.searchExtent && (f.geometry = d.searchExtent);
                        y = "";
                        this.reHostedFS.test(d.url) && this._containsNonLatinCharacter(g) && (y = "N");
                        d.outFields && (f.outFields = [d.featureLayer.objectIdField, a]);
                        if (e && e.length)
                            for (a = 0; a < e.length; a++) f.where = 0 === a ? "" : f.where + " or ", f.where += "UPPER(" + e[a] + ") LIKE " + y + "'%" + g.toUpperCase() + "%'";
                        d.featureLayer.queryFeatures(f, h.hitch(this, function(a) {
                            var d;
                            (a = a.features) && (d = this._hydrateResults(a, b));
                            c.isFulfilled() || c.resolve(d)
                        }), h.hitch(this, function(a) {
                            a || (a = Error(this._dijitName + " suggest queryFeatures error"));
                            c.reject(a)
                        }))
                    }
                }))
            } else c.resolve();
            return c.promise
        },
        _supportsPagination: function(a) {
            var c;
            a.locator ? c = !0 : a.featureLayer && a.featureLayer.advancedQueryCapabilities && a.featureLayer.advancedQueryCapabilities.supportsPagination && (c = !0);
            return c
        },
        _suggestSource: function(a) {
            var c;
            c = this.sources;
            var b = this.activeSourceIndex;
            if (b === this._allIndex) {
                for (var b = [], d = 0; d < c.length; d++) {
                    var e = a;
                    e.index = d;
                    e = this._suggest(e);
                    b.push(e)
                }
                if (b.length) return z(b)
            } else if (a.index = b, c = c[b]) return this._suggest(a);
            a = new s;
            a.reject(Error(this._dijitName + " No suggestions to perform"));
            return a.promise
        },
        _searchSource: function(a) {
            a.hasOwnProperty("index") || (a.index = this.activeSourceIndex);
            if (a.index === this._allIndex) {
                for (var c = [], b = this.sources, d = 0; d < b.length; d++) {
                    var e = a;
                    e.index = d;
                    (e = this._search(e)) && c.push(e)
                }
                if (c.length) return z(c)
            } else if (a = this._search(a)) return a;
            a = new s;
            a.reject(Error(this._dijitName + " No searches to perform"));
            return a.promise
        },
        _search: function(a) {
            a || (a = {
                text: this.value,
                magicKey: null,
                geometry: null,
                point: null,
                index: this.activeSourceIndex,
                latlon: null
            });
            var c, b = new s;
            this._deferreds.push(b);
            var d = a.index,
                e = this.sources[d],
                f;
            a.hasOwnProperty("text") && (f = h.trim(a.text));
            if (e) {
                var g = "";
                e.prefix && (g += e.prefix);
                g += f;
                e.suffix && (g += e.suffix);
                var k = this._defaultSR;
                this.map && (k = this.map.spatialReference);
                if (e.locator)
                    if (a.hasOwnProperty("text") && f) {
                        var m = {};
                        e.categories && (m.categories = e.categories);
                        k && (e.locator.outSpatialReference = k);
                        if (this.map && e.localSearchOptions && e.localSearchOptions.hasOwnProperty("distance") && e.localSearchOptions.hasOwnProperty("minScale")) {
                            var l = this.map.getScale();
                            if (!e.localSearchOptions.minScale || l && l <= parseFloat(e.localSearchOptions.minScale)) m.location = this.map.extent.getCenter(), m.distance = e.localSearchOptions.distance
                        }
                        m.address = {};
                        m.maxLocations = e.maxResults || this._maxResults;
                        e.searchExtent && (m.searchExtent = e.searchExtent);
                        e.sourceCountry && (m.countryCode = e.sourceCountry);
                        a.magicKey && (m.magicKey = a.magicKey);
                        e.singleLineFieldName ? m.address[e.singleLineFieldName] = g : m.address["Single Line Input"] = g;
                        e.outFields && (m.outFields = e.outFields);
                        e.locator.addressToLocations(m).then(h.hitch(this, function(a) {
                            a = this._hydrateResults(a, d);
                            b.isFulfilled() || b.resolve(a)
                        }), h.hitch(this, function(a) {
                            a || (a = Error(this._dijitName + " addressToLocations error"));
                            b.reject(a)
                        }))
                    } else if (a.geometry) {
                    switch (a.geometry.geometry.type) {
                        case "extent":
                            c =
                                a.geometry.geometry.getCenter();
                            break;
                        case "multipoint":
                            c = a.geometry.geometry.getExtent().getCenter();
                            break;
                        case "point":
                            c = a.geometry.geometry;
                            break;
                        case "polygon":
                            c = a.geometry.geometry.getExtent().getCenter();
                            break;
                        case "polyline":
                            c = a.geometry.geometry.getExtent().getCenter()
                    }
                    c ? this._reverseGeocodePoint(d, c).then(function(c) {
                        c[0] && (a.geometry.hasOwnProperty("attributes") && c[0].feature.setAttributes(h.mixin(c[0].feature.attributes, a.geometry.attributes)), a.geometry.hasOwnProperty("infoTemplate") &&
                            c[0].feature.setInfoTemplate(a.geometry.infoTemplate), a.geometry.hasOwnProperty("symbol") && c[0].feature.setSymbol(a.geometry.symbol));
                        b.isFulfilled() || b.resolve(c)
                    }, function(a) {
                        b.reject(a)
                    }) : b.reject(Error(this._dijitName + " Invalid point to reverse geocode"))
                } else a.point ? this._reverseGeocodePoint(d, a.point).then(function(a) {
                    b.isFulfilled() || b.resolve(a)
                }, function(a) {
                    b.reject(a)
                }) : a.latlon ? (m = new A(a.latlon, new w({
                    wkid: 4326
                })), this._reverseGeocodePoint(d, m).then(function(a) {
                        b.isFulfilled() || b.resolve(a)
                    },
                    function(a) {
                        b.reject(a)
                    })) : a.hasOwnProperty("text") && !f ? b.isFulfilled() || b.resolve([]) : b.reject(Error(this._dijitName + " Invalid query type for Locator"));
                else e.featureLayer && this._featureLayerLoaded(e.featureLayer).then(h.hitch(this, function() {
                    var p = e.displayField || e.featureLayer.displayField,
                        l = e.searchFields || [p],
                        p = this._validField(e.featureLayer, p),
                        m = this._validFields(e.featureLayer, l);
                    if (!p || !m) b.reject(Error(this._dijitName + " Invalid featureLayer field"));
                    else {
                        p = new E;
                        k && (p.outSpatialReference =
                            k);
                        p.returnGeometry = !0;
                        e.outFields && (p.outFields = e.outFields);
                        var q, n;
                        a.hasOwnProperty(this._objectIdIdentifier) || (p.num = e.maxResults || this._maxResults, e.searchExtent && (p.geometry = e.searchExtent), q = e.exactMatch, n = "", this.reHostedFS.test(e.url) && this._containsNonLatinCharacter(g) && (n = "N"));
                        if (a.hasOwnProperty("text") && f) {
                            if (l && l.length)
                                for (m = 0; m < l.length; m++) p.where = 0 === m ? "" : p.where + " or ", p.where = q ? p.where + (l[m] + " \x3d " + n + "'" + g + "'") : p.where + ("UPPER(" + l[m] + ") LIKE " + n + "'%" + g.toUpperCase() + "%'");
                            l = !0
                        } else a.hasOwnProperty(this._objectIdIdentifier) ? (p.objectIds = [a[this._objectIdIdentifier]], l = !0) : a.geometry ? (p.geometry = a.geometry, l = !0) : a.point ? (p.geometry = a.point, l = !0) : a.latlon ? (c = new A(a.latlon, new w({
                            wkid: 4326
                        })), p.geometry = c, l = !0) : (a.hasOwnProperty("text") && !f ? b.isFulfilled() || b.resolve([]) : b.reject(Error(this._dijitName + " Invalid query type for FeatureLayer")), l = !1);
                        l && e.featureLayer.queryFeatures(p, h.hitch(this, function(a) {
                            a = a.features;
                            var c;
                            a && (c = this._hydrateResults(a, d));
                            b.isFulfilled() ||
                                b.resolve(c)
                        }), h.hitch(this, function(a) {
                            a || (a = Error(this._dijitName + " Search queryFeatures error"));
                            b.reject(a)
                        }))
                    }
                }))
            } else b.reject(Error(this._dijitName + " Source is undefined"));
            return b.promise
        },
        _clearQueryTimeout: function() {
            this._queryTimer && clearTimeout(this._queryTimer)
        },
        _formatResults: function(a, c) {
            var b = {},
                d = 0,
                e;
            if (a) {
                if (c === this._allIndex)
                    for (var f = 0; f < a.length; f++) a[f] && (b[f] = a[f], d += a[f].length, e = !0);
                else b[c] = a, d += a.length, e = !0;
                if (e) return {
                    numResults: d,
                    results: b
                }
            }
        },
        _reverseGeocodePoint: function(a,
            c) {
            var b = new s,
                d = this.sources[a];
            if (c && d) {
                var e = d.distance || this._distance;
                d.locator.outSpatialReference = this._defaultSR;
                this.map && (d.locator.outSpatialReference = this.map.spatialReference);
                d.locator.locationToAddress(c, e, h.hitch(this, function(a) {
                    b.resolve([a])
                }), h.hitch(this, function(a) {
                    a || (a = Error(this._dijitName + " locationToAddress error"));
                    b.reject(a)
                }))
            } else b.reject(Error(this._dijitName + " no point or active geocoder defined"));
            return b.promise
        },
        _inputKeyUp: function(a) {
            if (a) {
                this._clearQueryTimeout();
                var c = this.inputNode.value;
                this._ignoreUpdateValue = !0;
                this.set("value", c);
                this._ignoreUpdateValue = !1;
                if (a.ctrlKey || a.shiftKey || a.metaKey || a.altKey || a.keyCode === k.copyKey || a.keyCode === k.ALT || a.keyCode === k.CTRL || a.keyCode === k.META || a.keyCode === k.SHIFT || a.keyCode === k.UP_ARROW || a.keyCode === k.DOWN_ARROW || a.keyCode === k.LEFT_ARROW || a.keyCode === k.RIGHT_ARROW) return a;
                a && a.keyCode === k.ENTER ? this.search() : a && (a.keyCode === k.TAB || a.keyCode === k.ESCAPE) ? this._hideMenus() : this._queryTimer = setTimeout(h.hitch(this,
                    function() {
                        this.suggest()
                    }), this.suggestDelay);
                this._checkStatus()
            }
        },
        _cancelDeferreds: function() {
            if (this._deferreds && this._deferreds.length)
                for (var a = 0; a < this._deferreds.length; a++) this._deferreds[a].isFulfilled() || this._deferreds[a].cancel(this._dijitName + " cancelling request");
            this._deferreds = []
        },
        _sourceBtnKeydown: function(a) {
            var c = u("li", this.sourcesNode);
            a && a.keyCode === k.UP_ARROW ? (t.stop(a), this._showSourcesMenu(), (a = c.length) && c[a - 1].focus()) : a && a.keyCode === k.DOWN_ARROW && (t.stop(a), this._showSourcesMenu(),
                c[0] && c[0].focus())
        },
        _inputKeyDown: function(a) {
            var c = u("li", this.suggestionsNode),
                b = this.suggestResults;
            this._cancelDeferreds();
            a && (a.keyCode === k.TAB || a.keyCode === k.ESCAPE) ? this._hideMenus() : a && a.keyCode === k.UP_ARROW ? (b && this._showSuggestionsMenu(), t.stop(a), (a = c.length) && c[a - 1].focus()) : a && a.keyCode === k.DOWN_ARROW && (b && this._showSuggestionsMenu(), t.stop(a), c[0] && c[0].focus())
        },
        _inputClick: function() {
            this._hideSourcesMenu();
            this._hideNoResultsMenu();
            this.value || (this.clear(), this._hideMenus());
            this._checkStatus();
            this.map && this.map.disableKeyboardNavigation()
        },
        _getSourceName: function(a) {
            var c = this.sources,
                b = c[a].name;
            !b && c[a].featureLayer && (b = c[a].featureLayer.name);
            b || (b = n.widgets.Search.main.untitledSource);
            return b
        },
        _insertSuggestions: function(a) {
            if (this.enableSuggestionsMenu && this.suggestionsNode) {
                this._hideSourcesMenu();
                this._hideNoResultsMenu();
                var c = "",
                    b = this.sources,
                    d = this.value;
                if (a)
                    for (var e in a)
                        if (a[e] && a[e].length) {
                            var f = this._getSourceName(e);
                            1 < b.length && this.activeSourceIndex === this._allIndex &&
                                (c += '\x3cdiv title\x3d"' + f + '" class\x3d"' + this.css.searchMenuHeader + '"\x3e' + f + "\x3c/div\x3e");
                            for (var c = c + "\x3cul\x3e", g = RegExp("(" + d + ")", "gi"), h = b[e].maxSuggestions || this._maxSuggestions, f = 0; f < a[e].length && f < h; ++f) var k = this._getSuggestionName(a[e][f]),
                                c = c + ('\x3cli title\x3d"' + k + '" data-index\x3d"' + f + '" data-source-index\x3d"' + e + '" role\x3d"menuitem" tabindex\x3d"0"\x3e' + k.replace(g, "\x3cstrong \x3e$1\x3c/strong\x3e") + "\x3c/li\x3e");
                            c += "\x3c/ul\x3e"
                        }(this.suggestionsNode.innerHTML = c) ? this._showSuggestionsMenu():
                    this._hideSuggestionsMenu()
            }
        },
        _insertSources: function(a) {
            var c = "";
            if (this.enableSourcesMenu && a && 1 < a.length) {
                var b, d, e = this.activeSourceIndex;
                b = "";
                e === this._allIndex && (b = "active");
                c = c + "\x3cul\x3e" + ('\x3cli title\x3d"' + n.widgets.Search.main.all + '" data-index\x3d"' + this._allIndex + '" role\x3d"menuitem" class\x3d"' + b + '" tabindex\x3d"0" class\x3d""\x3e' + n.widgets.Search.main.all + "\x3c/li\x3e");
                for (d = 0; d < a.length; d++) {
                    b = "";
                    d === e && (b = this.css.activeSource);
                    var f = this._getSourceName(d),
                        c = c + ('\x3cli title\x3d"' +
                            f + '" data-index\x3d"' + d + '" role\x3d"menuitem" tabindex\x3d"0" class\x3d"' + b + '"\x3e' + f + "\x3c/li\x3e")
                }
                c += "\x3c/ul\x3e";
                l.add(this.containerNode, this.css.hasMultipleSources)
            } else l.remove(this.containerNode, this.css.hasMultipleSources);
            this.sourcesNode.innerHTML = c
        },
        _showLoading: function() {
            l.add(this.containerNode, this.css.searchLoading)
        },
        _hideLoading: function() {
            l.remove(this.containerNode, this.css.searchLoading)
        },
        _checkStatus: function() {
            this.value ? (l.add(this.containerNode, this.css.hasValue), r.set(this.clearNode,
                "title", n.widgets.Search.main.clearButtonTitle)) : this.clear()
        },
        _closePopup: function() {
            this.enableInfoWindow && (this.map && this.map.infoWindow) && this.map.infoWindow.hide()
        },
        _noResultsHTML: function(a) {
            var c = "",
                b = h.trim(a),
                c = c + ('\x3cdiv class\x3d"' + this.css.searchNoResultsBody + '"\x3e');
            a && b ? (c += '\x3cdiv class\x3d"' + this.css.searchNoResultsHeader + '"\x3e', c += n.widgets.Search.main.noResults, c += "\x3c/div\x3e\x3cdiv\x3e", c += L.substitute(n.widgets.Search.main.noResultsFound, {
                value: '"' + a + '"'
            })) : (c += "\x3cdiv\x3e",
                c += "Please enter a search term.");
            c += "\x3c/div\x3e";
            c += "\x3c/div\x3e";
            this.noResultsMenuNode.innerHTML = c
        },
        _hideMenus: function() {
            this._hideSourcesMenu();
            this._hideSuggestionsMenu();
            this._hideNoResultsMenu()
        },
        _hideNoResultsMenu: function() {
            l.remove(this.containerNode, this.css.showNoResults)
        },
        _showNoResultsMenu: function() {
            this._hideSourcesMenu();
            this._hideSuggestionsMenu();
            l.add(this.containerNode, this.css.showNoResults)
        },
        _hideSourcesMenu: function() {
            l.remove(this.containerNode, this.css.showSources)
        },
        _hideSuggestionsMenu: function() {
            l.remove(this.containerNode, this.css.showSuggestions)
        },
        _showSourcesMenu: function() {
            this._hideSuggestionsMenu();
            this._hideNoResultsMenu();
            l.add(this.containerNode, this.css.showSources)
        },
        _showSuggestionsMenu: function() {
            this._hideSourcesMenu();
            this._hideNoResultsMenu();
            l.add(this.containerNode, this.css.showSuggestions)
        },
        _toggleSourcesMenu: function() {
            this._hideSuggestionsMenu();
            this._hideNoResultsMenu();
            l.toggle(this.containerNode, this.css.showSources)
        },
        _hydrateResult: function(a,
            c) {
            var b = {},
                d = this._defaultSR,
                e;
            e = this.sources[c];
            var f;
            e.featureLayer && (f = e.displayField || e.featureLayer.displayField);
            this.map && (d = this.map.spatialReference);
            if (a.hasOwnProperty("text") && a.hasOwnProperty("magicKey")) return a;
            if (a.hasOwnProperty("feature")) b.feature = new x(a.feature), (e = b.feature.geometry) && e.setSpatialReference(d);
            else if (a.hasOwnProperty("geometry")) {
                var g = a.symbol || null;
                e = a.attributes || {};
                b.feature = new x(a.geometry, g, e, a.infoTemplate || null);
                (e = b.feature.geometry) && e.setSpatialReference(d)
            } else a.hasOwnProperty("location") ?
                (g = new A(a.location.x, a.location.y, d), e = {}, a.hasOwnProperty("attributes") && (e = a.attributes), a.hasOwnProperty("score") && (e.score = a.score), b.feature = new x(g, null, e, null)) : b.feature = null;
            if (a.hasOwnProperty("extent")) b.extent = new D(a.extent), b.extent.setSpatialReference(new w(d));
            else if (b.feature && b.feature.geometry) switch (b.feature.geometry.type) {
                case "extent":
                    b.extent = b.feature.geometry;
                    break;
                case "multipoint":
                    b.extent = b.feature.geometry.getExtent();
                    break;
                case "polygon":
                    b.extent = b.feature.geometry.getExtent();
                    break;
                case "polyline":
                    b.extent = b.feature.geometry.getExtent();
                    break;
                case "point":
                    this.map ? this.map.getScale() > this.zoomScale ? b.extent = S.getExtentForScale(this.map, this.zoomScale).centerAt(b.feature.geometry) : b.extent = this.map.extent.centerAt(b.feature.geometry) : b.extent = new D({
                        xmin: b.feature.geometry.x - 0.25,
                        ymin: b.feature.geometry.y - 0.25,
                        xmax: b.feature.geometry.x + 0.25,
                        ymax: b.feature.geometry.y + 0.25,
                        spatialReference: {
                            wkid: 4326
                        }
                    })
            } else b.extent = null;
            a.hasOwnProperty("name") ? b.name = a.name : f && a.hasOwnProperty("attributes") &&
                a.attributes.hasOwnProperty(f) ? b.name = a.attributes[f] : a.hasOwnProperty("Match_addr") && "string" === typeof a.Match_addr ? b.name = a.Match_addr : a.hasOwnProperty("address") && "object" === typeof a.address && a.address.hasOwnProperty("Match_addr") ? b.name = a.address.Match_addr : a.hasOwnProperty("address") && "string" === typeof a.address ? b.name = a.address : a.hasOwnProperty("address") && "object" === typeof a.address && a.address.hasOwnProperty("Address") ? b.name = a.address.Address : b.name = b.feature && b.feature.geometry ? b.feature.geometry.x +
                "," + b.feature.geometry.y : "";
            return b
        },
        _hydrateResults: function(a, c) {
            var b = [],
                d = 0;
            if (a && a.length)
                for (d; d < a.length; d++) {
                    var e = this._hydrateResult(a[d], c);
                    b.push(e)
                }
            return b
        },
        _containsNonLatinCharacter: function(a) {
            for (var c = 0; c < a.length; c++)
                if (255 < a.charCodeAt(c)) return !0;
            return !1
        },
        _setPlaceholder: function(a) {
            var c = "",
                b = this.sources[a];
            a === this._allIndex ? c = n.widgets.Search.main.placeholderAll : b && b.placeholder && (c = b.placeholder);
            var d = n.widgets.Search.main.all;
            b && (d = this._getSourceName(a));
            this.sourceNameNode.innerHTML =
                d;
            r.set(this.inputNode, "placeholder", c);
            r.set(this.inputNode, "title", c)
        },
        _setSourcesAttr: function(a) {
            this.sources = a;
            1 < a.length ? (this.set("activeSourceIndex", this._allIndex), this.set("activeSource", null)) : (this.set("activeSourceIndex", 0), this.set("activeSource", a[0]));
            this._created && (this._hideMenus(), this._insertSources(a))
        },
        _setActiveSourceIndexAttr: function(a) {
            this.activeSourceIndex = a;
            var c = this.sources,
                b;
            c[a] && (b = c[a]);
            b ? this.set("activeSource", b) : this.set("activeSource", null);
            this._created && (this._setPlaceholder(a),
                this._hideMenus(), this._insertSources(c))
        },
        _updateValue: function(a, c, b) {
            this._ignoreUpdateValue || (r.set(this.inputNode, "value", b), this._checkStatus())
        },
        _updateVisible: function() {
            this.visible ? this.show() : this.hide()
        },
        _updateTheme: function(a, c, b) {
            l.remove(this.domNode, c);
            l.add(this.domNode, b)
        }
    })
});