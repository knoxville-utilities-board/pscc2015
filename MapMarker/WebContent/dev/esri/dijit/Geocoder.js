require({cache:{
'url:esri/dijit/templates/Geocoder.html':"<div class=\"${theme}\" role=\"presentation\">\n    <div class=\"${_css.GeocoderContainerClass}\" role=\"presentation\">\n    \t<div class=\"${_css.GeocoderClass}\" data-dojo-attach-point=\"containerNode\" role=\"presentation\">\n    \t\t<div title=\"${_i18n.widgets.Geocoder.main.searchButtonTitle}\" tabindex=\"0\" class=\"${_css.searchButtonClass} ${_css.GeocoderIconClass}\" data-dojo-attach-point=\"submitNode\" role=\"button\"></div>\n    \t\t<div aria-haspopup=\"true\" id=\"${id}_menu_button\" title=\"${_i18n.widgets.Geocoder.main.geocoderMenuButtonTitle}\" tabindex=\"0\" class=\"${_css.geocoderMenuArrowClass} ${_css.GeocoderIconClass}\" data-dojo-attach-point=\"geocoderMenuArrowNode\" role=\"button\" aria-expanded=\"false\"></div>\n    \t\t<input aria-haspopup=\"true\" id=\"${id}_input\" tabindex=\"0\" placeholder=\"\" value=\"${value}\" autocomplete=\"off\" type=\"text\" data-dojo-attach-point=\"inputNode\" role=\"textbox\">\n    \t\t<div tabindex=\"0\" class=\"${_css.clearButtonClass} ${_css.GeocoderIconClass}\" data-dojo-attach-point=\"clearNode\" role=\"button\"></div>\n    \t\t<div class=\"${_css.GeocoderClearClass}\" role=\"presentation\"></div>\n    \t</div>\n    \t<div class=\"${_css.resultsContainerClass}\" data-dojo-attach-point=\"resultsNode\" aria-labelledby=\"${id}_input\" role=\"menu\" aria-hidden=\"true\"></div>\n    \t<div class=\"${_css.geocoderMenuClass}\" data-dojo-attach-point=\"geocoderMenuNode\" role=\"presentation\">\n    \t\t<div class=\"${_css.geocoderMenuHeaderClass}\">\n    \t\t\t${_i18n.widgets.Geocoder.main.geocoderMenuHeader}\n    \t\t\t<div role=\"button\" data-dojo-attach-point=\"geocoderMenuCloseNode\" title=\"${_i18n.widgets.Geocoder.main.geocoderMenuCloseTitle}\" tabindex=\"0\" class=\"${_css.geocoderMenuCloseClass}\"></div>\n    \t\t\t<div class=\"${_css.GeocoderClearClass}\" role=\"presentation\"></div>\n    \t\t</div>\n    \t\t<div data-dojo-attach-point=\"geocoderMenuInsertNode\" aria-labelledby=\"${id}_menu_button\" role=\"menu\" aria-hidden=\"true\"></div>\n    \t</div>\n    </div>\n</div>"}});
//>>built
define("esri/dijit/Geocoder", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/Deferred", "dojo/_base/event", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-style", "dojo/dom-construct", "dojo/keys", "dojo/on", "dojo/query", "dojo/i18n!../nls/jsapi", "dojo/text!./templates/Geocoder.html", "dojo/uacss", "dijit/a11yclick", "dijit/_TemplatedMixin", "dijit/focus", "../kernel", "../SpatialReference", "../graphic", "../symbols/PictureMarkerSymbol", "./_EventedWidget", "../geometry/Point", "../geometry/Extent", "../tasks/locator", "../tasks/query", "../tasks/QueryTask", "../geometry/scaleUtils"], function(y, z, e, q, n, f, g, m, A, d, l, r, s, B, J, p, C, t, K, u, v, D, E, w, x, F, G, H, I) {
    return z("esri.dijit.Geocoder", [E, C], {
        templateString: B,
        reHostedFS: /https?:\/\/services.*\.arcgis\.com/i,
        _eventMap: {
            select: ["result"],
            "find-results": ["results"],
            "auto-complete": ["results"],
            "geocoder-select": ["geocoder"],
            clear: !0,
            "enter-key-select": !0,
            load: !0
        },
        constructor: function(a, b) {
            this._css = {
                GeocoderContainerClass: "esriGeocoderContainer",
                GeocoderClass: "esriGeocoder",
                GeocoderMultipleClass: "esriGeocoderMultiple",
                GeocoderIconClass: "esriGeocoderIcon",
                GeocoderActiveClass: "esriGeocoderActive",
                GeocoderResultsOpenClass: "esriGeocoderResultsOpen",
                GeocoderMenuOpenClass: "esriGeocoderMenuOpen",
                loadingClass: "esriGeocoderLoading",
                resultsContainerClass: "esriGeocoderResults",
                resultsItemClass: "esriGeocoderResult",
                resultsItemEvenClass: "esriGeocoderResultEven",
                resultsItemOddClass: "esriGeocoderResultOdd",
                resultsItemFirstClass: "esriGeocoderResultFirst",
                resultsItemLastClass: "esriGeocoderResultLast",
                resultsPartialMatchClass: "esriGeocoderResultPartial",
                searchButtonClass: "esriGeocoderSearch",
                clearButtonClass: "esriGeocoderReset",
                hasValueClass: "esriGeocoderHasValue",
                geocoderMenuClass: "esriGeocoderMenu",
                geocoderMenuHeaderClass: "esriGeocoderMenuHeader",
                geocoderMenuCloseClass: "esriGeocoderMenuClose",
                activeMenuClass: "esriGeocoderMenuActive",
                geocoderMenuArrowClass: "esriGeocoderMenuArrow",
                geocoderSelectedClass: "esriGeocoderSelected",
                geocoderSelectedCheckClass: "esriGeocoderSelectedCheck",
                GeocoderClearClass: "esriGeocoderClearFloat"
            };
            this.options = {
                autoComplete: !1,
                arcgisGeocoder: !0,
                value: "",
                theme: "simpleGeocoder",
                activeGeocoderIndex: 0,
                maxLocations: 6,
                minCharacters: 3,
                searchDelay: 300,
                geocoderMenu: !0,
                autoNavigate: !0,
                showResults: !0,
                map: null,
                activeGeocoder: null,
                geocoders: null,
                zoomScale: 1E4,
                highlightLocation: !1,
                symbol: new D(y.toUrl(".") + "/images/sdk_gps_location.png", 28, 28),
                graphicsLayer: null
            };
            var c = e.mixin({}, this.options, a);
            this.set("autoComplete", c.autoComplete);
            this.set("arcgisGeocoder", c.arcgisGeocoder);
            this.set("value", c.value);
            this.set("theme", c.theme);
            this.set("activeGeocoderIndex", c.activeGeocoderIndex);
            this.set("maxLocations", c.maxLocations);
            this.set("minCharacters", c.minCharacters);
            this.set("searchDelay", c.searchDelay);
            this.set("geocoderMenu", c.geocoderMenu);
            this.set("autoNavigate", c.autoNavigate);
            this.set("showResults", c.showResults);
            this.set("map", c.map);
            this.set("activeGeocoder", c.activeGeocoder);
            this.set("geocoders", c.geocoders);
            this.set("zoomScale", c.zoomScale);
            this.set("highlightLocation", c.highlightLocation);
            this.set("symbol", c.symbol);
            this.set("graphicsLayer", c.graphicsLayer);
            this.set("results", []);
            this._i18n = s;
            this._deferreds = [];
            this._defaultSR = new u(4326);
            this.watch("value", this._updateValue);
            this.watch("theme", this._updateTheme);
            this.watch("activeGeocoder", this._setActiveGeocoder);
            this.watch("activeGeocoderIndex", this._setActiveGeocoderIndex);
            this.watch("geocoders", this._updateGeocoder);
            this.watch("arcgisGeocoder", this._updateGeocoder);
            this.watch("geocoderMenu", this._updateGeocoder);
            this.watch("map", this._setupEvents);
            this.domNode = b
        },
        startup: function() {
            if (this._geocoders.length)
                if (this.domNode)
                    if (this.get("map"))
                        if (this.get("map").loaded) this._init();
                        else l.once(this.get("map"), "load", e.hitch(this, function() {
                            this._init()
                        }));
            else this._init();
            else console.log("Geocoder:: domNode is undefined."), this.destroy();
            else console.log("Geocoder:: No geocoders defined."), this.destroy()
        },
        postCreate: function() {
            this.inherited(arguments);
            this.own(l(this.submitNode, p, e.hitch(this, this._findThenSelect)));
            this.own(l(this.geocoderMenuArrowNode, p, e.hitch(this, this._toggleGeolocatorMenu)));
            this.own(l(this.inputNode, p, e.hitch(this, this._inputClick)));
            this.own(l(this.clearNode,
                p, e.hitch(this, this.clear)));
            this.own(l(this.geocoderMenuCloseNode, p, e.hitch(this, this._hideGeolocatorMenu)));
            this._updateGeocoder();
            this._setupEvents();
            this.get("value") && this._checkStatus();
            this._hideMenus()
        },
        destroy: function() {
            this._removeEvents();
            A.empty(this.domNode);
            this.inherited(arguments)
        },
        clear: function() {
            this.onClear();
            var a = this.get("highlightGraphic"),
                b = this.get("graphicsLayer");
            a && (b ? b.remove(a) : this.get("map").graphics.remove(a), this.set("highlightGraphic", null));
            f.set(this.inputNode,
                "value", "");
            this.set("value", "");
            this.set("results", []);
            g.remove(this.containerNode, this._css.hasValueClass);
            f.set(this.clearNode, "title", "");
            this._hideMenus();
            this._hideLoading()
        },
        show: function() {
            m.set(this.domNode, "display", "block")
        },
        hide: function() {
            m.set(this.domNode, "display", "none")
        },
        find: function(a) {
            var b = new q;
            if (a)
                if ("string" === typeof a) this._findQuery(a).then(function(a) {
                    b.resolve(a)
                });
                else if ("object" === typeof a && a.hasOwnProperty("geometry")) {
                var c;
                switch (a.geometry.type) {
                    case "extent":
                        c =
                            a.geometry.getCenter();
                        break;
                    case "multipoint":
                        c = a.geometry.getExtent().getCenter();
                        break;
                    case "point":
                        c = a.geometry;
                        break;
                    case "polygon":
                        c = a.geometry.getExtent().getCenter();
                        break;
                    case "polyline":
                        c = a.geometry.getExtent().getCenter()
                }
                c && this._reverseGeocodePoint(c, a.geometry).then(function(c) {
                    c.results[0] && (a.hasOwnProperty("attributes") && c.results[0].feature.setAttributes(e.mixin(c.results[0].feature.attributes, a.attributes)), a.hasOwnProperty("infoTemplate") && c.results[0].feature.setInfoTemplate(a.infoTemplate),
                        a.hasOwnProperty("symbol") && c.results[0].feature.setSymbol(a.symbol));
                    b.resolve(c)
                }, function(a) {
                    b.reject(a)
                })
            } else "object" === typeof a && "point" === a.type ? this._reverseGeocodePoint(a).then(function(a) {
                b.resolve(a)
            }, function(a) {
                b.reject(a)
            }) : a instanceof Array && 2 === a.length ? (c = new w(a, new u({
                wkid: 4326
            })), this._reverseGeocodePoint(c).then(function(a) {
                b.resolve(a)
            }, function(a) {
                b.reject(a)
            })) : b.reject("Geocoder:: Invalid find type");
            else this._findQuery(this.get("value")).then(function(a) {
                b.resolve(a)
            });
            return b.promise
        },
        focus: function() {
            t.focus(this.inputNode)
        },
        blur: function() {
            t.curNode && t.curNode.blur();
            this.inputNode.blur();
            this._hideMenus();
            var a = this.get("map");
            a && a.enableKeyboardNavigation()
        },
        select: function(a) {
            this.onSelect(a);
            this._hideMenus();
            this._hideLoading();
            this.get("autoNavigate") && (a && a.hasOwnProperty("extent") && this.get("map")) && this.get("map").setExtent(a.extent);
            if (a.feature) {
                var b = this.get("highlightGraphic"),
                    c = this.get("graphicsLayer"),
                    k = this.get("symbol") || a.feature.symbol;
                b ? (b.setGeometry(a.feature.geometry), b.setAttributes(a.feature.attributes), b.setInfoTemplate(a.feature.infoTemplate), b.setSymbol(k)) : (b = a.feature, this.get("highlightLocation") && (b.setSymbol(k), c ? c.add(b) : this.get("map").graphics.add(b)));
                this.set("highlightGraphic", b)
            }
        },
        onSelect: function() {},
        onFindResults: function() {},
        onAutoComplete: function() {},
        onGeocoderSelect: function() {},
        onClear: function() {},
        onEnterKeySelect: function() {},
        onLoad: function() {},
        _autoComplete: function() {
            var a = this.get("activeGeocoder"),
                b = this.reHostedFS.test(a.url);
            ("query" !== a.type || b) && this._query({
                delay: this.get("searchDelay"),
                autoComplete: !0,
                search: this.get("value")
            }).then(e.hitch(this, function(a) {
                this.onAutoComplete(a);
                this.get("showResults") && this._showResults(a)
            }))
        },
        _init: function() {
            this.set("loaded", !0);
            this.onLoad()
        },
        _containsNonLatinCharacter: function(a) {
            for (var b = 0; b < a.length; b++)
                if (255 < a.charCodeAt(b)) return !0;
            return !1
        },
        _findQuery: function(a) {
            var b = new q;
            this._query({
                delay: 0,
                search: a
            }).then(e.hitch(this, function(a) {
                this.onFindResults(a);
                b.resolve(a)
            }), e.hitch(this, function(a) {
                this.onFindResults(a);
                b.reject(a)
            }));
            return b.promise
        },
        _reverseGeocodePoint: function(a, b) {
            var c = new q;
            if (a && this.get("activeGeocoder")) {
                var k = b || a,
                    d = this.get("activeGeocoder").distance || 1500;
                this._task.outSpatialReference = this._defaultSR;
                this.get("map") && (this._task.outSpatialReference = this.get("map").spatialReference);
                this._task.locationToAddress(a, d, e.hitch(this, function(a) {
                        a = {
                            results: [this._hydrateResult(a)],
                            geometry: k
                        };
                        this.onFindResults(a);
                        c.resolve(a)
                    }),
                    e.hitch(this, function(a) {
                        c.reject(a)
                    }))
            } else c.reject("Geocoder:: no point or active geocoder defined");
            return c.promise
        },
        _setEsriGeocoder: function() {
            this.get("arcgisGeocoder") ? ("object" === typeof this.get("arcgisGeocoder") ? this._arcgisGeocoder = this.get("arcgisGeocoder") : this._arcgisGeocoder = {}, this._arcgisGeocoder.hasOwnProperty("suggest") || (this._arcgisGeocoder.suggest = !0), this._arcgisGeocoder.hasOwnProperty("singleLineFieldName") || (this._arcgisGeocoder.singleLineFieldName = "SingleLine"), this._arcgisGeocoder.url ||
                (this._arcgisGeocoder.url = ("file:" === location.protocol ? "http:" : location.protocol) + "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"), this._arcgisGeocoder.name || (this._arcgisGeocoder.name = s.widgets.Geocoder.esriGeocoderName), this._arcgisGeocoder.hasOwnProperty("localSearchOptions") || (this._arcgisGeocoder.localSearchOptions = {
                    minScale: 3E5,
                    distance: 5E4
                }), this.set("arcgisGeocoder", this._arcgisGeocoder)) : this.set("arcgisGeocoder", !1)
        },
        _setActiveGeocoder: function() {
            this.set("activeGeocoder",
                this._geocoders[this.get("activeGeocoderIndex")]);
            this._task = "query" === this.activeGeocoder.type ? new H(this.get("activeGeocoder").url) : new F(this.get("activeGeocoder").url);
            this._updatePlaceholder()
        },
        _setGeocoderList: function() {
            var a = [];
            this.get("arcgisGeocoder") && (a = a.concat([this._arcgisGeocoder]));
            this.get("geocoders") && this.get("geocoders").length && (a = a.concat(this.get("geocoders")));
            this._geocoders = a
        },
        _updateGeocoder: function() {
            this.set("activeGeocoderIndex", 0);
            this._setEsriGeocoder();
            this._setGeocoderList();
            this._setActiveGeocoder();
            this._insertGeocoderMenuItems()
        },
        _updatePlaceholder: function() {
            this._placeholder = "";
            this.get("activeGeocoder") && this.get("activeGeocoder").placeholder && (this._placeholder = this.get("activeGeocoder").placeholder);
            f.set(this.inputNode, "placeholder", this._placeholder);
            f.set(this.submitNode, "title", this._placeholder)
        },
        _updateValue: function(a, b, c) {
            this._ignoreUpdateValue || (f.set(this.inputNode, "value", c), this._checkStatus())
        },
        _updateTheme: function(a, b, c) {
            g.remove(this.domNode,
                b);
            g.add(this.domNode, c)
        },
        _setActiveGeocoderIndex: function(a, b, c) {
            this.set("activeGeocoderIndex", c);
            this._setActiveGeocoder();
            this._hideMenus();
            this._insertGeocoderMenuItems();
            a = {
                attr: this.get("activeGeocoder"),
                oldVal: b,
                newVal: c
            };
            this.onGeocoderSelect(a)
        },
        _clearQueryTimeout: function() {
            this._queryTimer && clearTimeout(this._queryTimer)
        },
        _query: function(a) {
            a || (a = {
                delay: 0
            });
            a.search || (a.search = this.get("value"));
            var b = new q;
            this._deferreds.push(b);
            a.delay ? (this._clearQueryTimeout(), this._queryTimer = setTimeout(e.hitch(this,
                function() {
                    this._performTask(b, a)
                }), a.delay)) : this._performTask(b, a);
            return b.promise
        },
        _performTask: function(a, b) {
            if (b.search) {
                this._hideGeolocatorMenu();
                this._showLoading();
                var c = "";
                this.get("activeGeocoder").prefix && (c += this.get("activeGeocoder").prefix);
                c += b.search;
                this.get("activeGeocoder").suffix && (c += this.get("activeGeocoder").suffix);
                var k = this.get("activeGeocoder").outFields;
                k && (k instanceof Array || (k = [k]));
                var d = this.get("maxLocations") || 6,
                    f = this.get("activeGeocoder").searchExtent,
                    g = this._defaultSR;
                this.get("map") && (g = this.get("map").spatialReference);
                if ("query" === this.get("activeGeocoder").type) {
                    var h = new G;
                    h.outSpatialReference = g;
                    h.returnGeometry = !0;
                    h.num = d;
                    f && (h.geometry = f);
                    d = this.get("activeGeocoder").exactMatch;
                    f = this.get("activeGeocoder").field;
                    g = "";
                    this.reHostedFS.test(this.get("activeGeocoder").url) && this._containsNonLatinCharacter(c) && (g = "N");
                    h.where = d ? f + " \x3d " + g + "'" + c + "'" : "UPPER(" + f + ") LIKE " + g + "'%" + c.toUpperCase() + "%'";
                    k && (h.outFields = k);
                    this._task.execute(h, e.hitch(this, function(c) {
                        this._receivedResults(c.features,
                            a, b)
                    }), e.hitch(this, function(c) {
                        this._receivedResults([], a, b)
                    }))
                } else {
                    h = {};
                    this.get("activeGeocoder").categories && (h.categories = this.get("activeGeocoder").categories);
                    this._task.outSpatialReference = g;
                    if (this.get("map") && (this.get("activeGeocoder").localSearchOptions && this.get("activeGeocoder").localSearchOptions.hasOwnProperty("distance") && this.get("activeGeocoder").localSearchOptions.hasOwnProperty("minScale")) && (g = this.get("map").getScale(), !this.get("activeGeocoder").localSearchOptions.minScale ||
                            g && g <= parseFloat(this.get("activeGeocoder").localSearchOptions.minScale))) h.location = this.get("map").extent.getCenter(), h.distance = this.get("activeGeocoder").localSearchOptions.distance;
                    this.get("activeGeocoder").suggest && b.autoComplete ? (h.text = c, f && (h.searchExtent = f), this._task.suggestLocations(h).then(e.hitch(this, function(c) {
                        this._receivedResults(c, a, b)
                    }), e.hitch(this, function(c) {
                        this._receivedResults(c, a, b)
                    }))) : (h.address = {}, h.maxLocations = d, f && (h.searchExtent = f), this.get("activeGeocoder").sourceCountry &&
                        (h.countryCode = this.get("activeGeocoder").sourceCountry), b.magicKey && (h.magicKey = b.magicKey), this.get("activeGeocoder").singleLineFieldName ? h.address[this.get("activeGeocoder").singleLineFieldName] = c : h.address["Single Line Input"] = c, k && (h.outFields = k), this._task.addressToLocations(h, e.hitch(this, function(c) {
                            this._receivedResults(c, a, b)
                        }), e.hitch(this, function(c) {
                            this._receivedResults(c, a, b)
                        })))
                }
            } else this._hideLoading(), a.reject("Geocoder:: no search to perform");
            (c = this.get("map")) && c.enableKeyboardNavigation()
        },
        _showResults: function() {
            this._hideGeolocatorMenu();
            var a = "";
            if (this.get("results") && this.get("results").length && this.resultsNode) {
                for (var b = this.get("value"), c = RegExp("(" + b + ")", "gi"), a = a + '\x3cul role\x3d"presentation"\x3e', b = 0; b < this.get("results").length && 5 > b; ++b) {
                    var k = this.get("results")[b].text || this.get("results")[b].name,
                        d = this._css.resultsItemClass + " ",
                        d = 0 === b % 2 ? d + this._css.resultsItemOddClass : d + this._css.resultsItemEvenClass;
                    0 === b ? d += " " + this._css.resultsItemFirstClass : b === this.get("results").length -
                        1 && (d += " " + this._css.resultsItemLastClass);
                    a += '\x3cli title\x3d"' + k + '" data-text\x3d"' + k + '" data-item\x3d"true" data-index\x3d"' + b + '" role\x3d"menuitem" tabindex\x3d"0" class\x3d"' + d + '"\x3e' + k.replace(c, '\x3cstrong class\x3d"' + this._css.resultsPartialMatchClass + '"\x3e$1\x3c/strong\x3e') + "\x3c/li\x3e"
                }
                a += "\x3c/ul\x3e";
                this.resultsNode && (this.resultsNode.innerHTML = a);
                this._autoCompleteEvent();
                this._showResultsMenu()
            } else this.resultsNode && (this.resultsNode.innerHTML = a), this._hideResultsMenu()
        },
        _receivedResults: function(a,
            b) {
            this._hideLoading();
            var c = this._hydrateResults(a);
            this.set("results", c);
            c = {
                results: c,
                value: this.get("value")
            };
            b.resolve(c)
        },
        _showLoading: function() {
            g.add(this.containerNode, this._css.loadingClass)
        },
        _hideLoading: function() {
            g.remove(this.containerNode, this._css.loadingClass)
        },
        _showGeolocatorMenu: function() {
            g.add(this.containerNode, this._css.activeMenuClass);
            g.add(this.domNode, this._css.GeocoderMenuOpenClass);
            m.set(this.geocoderMenuNode, "display", "block");
            f.set(this.geocoderMenuInsertNode, "aria-hidden",
                "false");
            f.set(this.geocoderMenuArrowNode, "aria-expanded", "true")
        },
        _hideGeolocatorMenu: function() {
            g.remove(this.containerNode, this._css.activeMenuClass);
            g.remove(this.domNode, this._css.GeocoderMenuOpenClass);
            m.set(this.geocoderMenuNode, "display", "none");
            f.set(this.geocoderMenuInsertNode, "aria-hidden", "true");
            f.set(this.geocoderMenuArrowNode, "aria-expanded", "false")
        },
        _toggleGeolocatorMenu: function() {
            this._hideResultsMenu();
            "block" === m.get(this.geocoderMenuNode, "display") ? this._hideGeolocatorMenu() :
                this._showGeolocatorMenu()
        },
        _showResultsMenu: function() {
            g.add(this.containerNode, this._css.GeocoderActiveClass);
            g.add(this.domNode, this._css.GeocoderResultsOpenClass);
            m.set(this.resultsNode, "display", "block");
            f.set(this.resultsNode, "aria-hidden", "false")
        },
        _hideResultsMenu: function() {
            m.set(this.resultsNode, "display", "none");
            g.remove(this.containerNode, this._css.GeocoderActiveClass);
            g.remove(this.domNode, this._css.GeocoderResultsOpenClass);
            f.set(this.resultsNode, "aria-hidden", "true")
        },
        _hideMenus: function() {
            this._hideGeolocatorMenu();
            this._hideResultsMenu()
        },
        _insertGeocoderMenuItems: function() {
            if (this.get("geocoderMenu") && this._geocoders && 1 < this._geocoders.length) {
                var a, b = "",
                    c;
                a = '\x3cul role\x3d"presentation"\x3e';
                for (c = 0; c < this._geocoders.length; c++) {
                    b = this._css.resultsItemClass + " ";
                    b = 0 === c % 2 ? b + this._css.resultsItemOddClass : b + this._css.resultsItemEvenClass;
                    c === this.get("activeGeocoderIndex") && (b += " " + this._css.geocoderSelectedClass);
                    0 === c ? b += " " + this._css.resultsItemFirstClass : c === this._geocoders.length - 1 && (b += " " + this._css.resultsItemLastClass);
                    var d = this._geocoders[c].name || s.widgets.Geocoder.main.untitledGeocoder;
                    a += '\x3cli data-index\x3d"' + c + '" data-item\x3d"true" role\x3d"menuitem" tabindex\x3d"0" class\x3d"' + b + '"\x3e';
                    a += '\x3cdiv class\x3d"' + this._css.geocoderSelectedCheckClass + '"\x3e\x3c/div\x3e';
                    a += d;
                    a += '\x3cdiv class\x3d"' + this._css.GeocoderClearClass + '"\x3e\x3c/div\x3e';
                    a += "\x3c/li\x3e"
                }
                this.geocoderMenuInsertNode.innerHTML = a + "\x3c/ul\x3e";
                this._geocoderMenuEvent();
                m.set(this.geocoderMenuNode, "display", "none");
                m.set(this.geocoderMenuArrowNode,
                    "display", "block");
                g.add(this.containerNode, this._css.GeocoderMultipleClass)
            } else this.geocoderMenuInsertNode.innerHTML = "", m.set(this.geocoderMenuNode, "display", "none"), m.set(this.geocoderMenuArrowNode, "display", "none"), g.remove(this.containerNode, this._css.GeocoderMultipleClass)
        },
        _checkStatus: function() {
            this.get("value") ? (g.add(this.containerNode, this._css.hasValueClass), f.set(this.clearNode, "title", s.widgets.Geocoder.main.clearButtonTitle)) : this.clear()
        },
        _autoCompleteEvent: function() {
            var a = r('[data-item\x3d"true"]',
                this.resultsNode);
            this._acEvent && this._acEvent.remove();
            this._acEvent = l(a, "click, keydown", e.hitch(this, function(b) {
                this._clearQueryTimeout();
                var c = parseInt(f.get(b.currentTarget, "data-index"), 10),
                    k = f.get(b.currentTarget, "data-text");
                "click" === b.type || "keydown" === b.type && b.keyCode === d.ENTER ? (f.set(this.inputNode, "value", k), this.set("value", k), this.get("results") && this.get("results")[c] && (b = this.get("results")[c], b.name ? this.select(b) : this._query({
                    delay: 0,
                    search: b.text,
                    magicKey: b.magicKey || null
                }).then(e.hitch(this,
                    function(a) {
                        this.select(a.results[0])
                    })))) : "keydown" === b.type && (b.keyCode === d.BACKSPACE || b.keyCode === d.DELETE) ? (n.stop(b), this.inputNode.focus(), b = this.inputNode.value.slice(0, -1), f.set(this.inputNode, "value", b), this.set("value", b)) : "keydown" === b.type && b.keyCode === d.UP_ARROW ? (n.stop(b), b = c - 1, 0 > b ? this.inputNode.focus() : a[b].focus()) : "keydown" === b.type && b.keyCode === d.DOWN_ARROW ? (n.stop(b), b = c + 1, b >= a.length ? this.inputNode.focus() : a[b].focus()) : b.keyCode === d.ESCAPE && this._hideMenus()
            }))
        },
        _geocoderMenuEvent: function() {
            var a =
                r('[data-item\x3d"true"]', this.geocoderMenuInsertNode);
            this._gmEvent && this._gmEvent.remove();
            this._gmEvent = l(a, "click, keydown", e.hitch(this, function(b) {
                var c = parseInt(f.get(b.currentTarget, "data-index"), 10);
                "click" === b.type || "keydown" === b.type && b.keyCode === d.ENTER ? (this._setActiveGeocoderIndex(null, null, c), this._hideGeolocatorMenu()) : "keydown" === b.type && b.keyCode === d.UP_ARROW ? (n.stop(b), b = c - 1, 0 > b ? this.geocoderMenuArrowNode.focus() : a[b].focus()) : "keydown" === b.type && b.keyCode === d.DOWN_ARROW ? (n.stop(b),
                    b = c + 1, b >= a.length ? this.geocoderMenuArrowNode.focus() : a[b].focus()) : b.keyCode === d.ESCAPE && this._hideGeolocatorMenu()
            }))
        },
        _removeEvents: function() {
            var a;
            if (this._events && this._events.length)
                for (a = 0; a < this._events.length; a++) this._events[a].remove();
            this._acEvent && this._acEvent.remove();
            this._gmEvent && this._gmEvent.remove();
            this._events = []
        },
        _setupEvents: function() {
            this._removeEvents();
            var a = l(document, "click", e.hitch(this, function(a) {
                this._hideResultsMenu(a)
            }));
            this._events.push(a);
            a = l(this.inputNode,
                "keyup", e.hitch(this, function(a) {
                    this._inputKeyUp(a)
                }));
            this._events.push(a);
            a = l(this.inputNode, "keydown", e.hitch(this, function(a) {
                this._inputKeyDown(a)
            }));
            this._events.push(a);
            a = l(this.geocoderMenuArrowNode, "keydown", this._geocoderMenuButtonKeyDown());
            this._events.push(a);
            this.get("map") && (a = l(this.get("map"), "click", e.hitch(this, function() {
                this.blur()
            })), this._events.push(a));
            this._geocoderMenuEvent();
            this._autoCompleteEvent()
        },
        _findThenSelect: function() {
            this.find().then(e.hitch(this, function(a) {
                a.results &&
                    a.results.length && (this.select(a.results[0]), this.onEnterKeySelect())
            }))
        },
        _inputKeyUp: function(a) {
            if (a) {
                this._clearQueryTimeout();
                var b = this.inputNode.value;
                this._ignoreUpdateValue = !0;
                this.set("value", b);
                this._ignoreUpdateValue = !1;
                var c = 0;
                b && (c = b.length);
                if (a.ctrlKey || a.shiftKey || a.metaKey || a.altKey || a.keyCode === d.copyKey || a.keyCode === d.ALT || a.keyCode === d.CTRL || a.keyCode === d.META || a.keyCode === d.SHIFT || a.keyCode === d.UP_ARROW || a.keyCode === d.DOWN_ARROW || a.keyCode === d.LEFT_ARROW || a.keyCode === d.RIGHT_ARROW) return a;
                a && a.keyCode === d.ENTER ? (this._cancelDeferreds(), this._findThenSelect()) : a && a.keyCode === d.ESCAPE ? (this._cancelDeferreds(), this._hideMenus()) : a && a.keyCode === d.TAB ? (this._cancelDeferreds(), this._hideMenus()) : this.get("autoComplete") && c >= this.get("minCharacters") ? this._autoComplete() : this._hideMenus();
                this._checkStatus()
            }
        },
        _cancelDeferreds: function() {
            if (this._deferreds.length) {
                for (var a = 0; a < this._deferreds.length; a++) this._deferreds[a].cancel("Geocoder:: stop query");
                this._deferreds = []
            }
        },
        _inputKeyDown: function(a) {
            var b =
                r('[data-item\x3d"true"]', this.resultsNode);
            a && a.keyCode === d.TAB ? (this._cancelDeferreds(), this._hideMenus()) : a && a.keyCode === d.UP_ARROW ? (n.stop(a), (a = b.length) && b[a - 1].focus()) : a && a.keyCode === d.DOWN_ARROW && (n.stop(a), b[0] && b[0].focus())
        },
        _geocoderMenuButtonKeyDown: function(a) {
            var b = r('[data-item\x3d"true"]', this.geocoderMenuInsertNode);
            a && a.keyCode === d.UP_ARROW ? (n.stop(a), this._showGeolocatorMenu(), (a = b.length) && b[a - 1].focus()) : a && a.keyCode === d.DOWN_ARROW && (n.stop(a), this._showGeolocatorMenu(), b[0] &&
                b[0].focus())
        },
        _inputClick: function() {
            this._hideGeolocatorMenu();
            this.get("value") || (this.clear(), this._hideMenus());
            this._checkStatus();
            var a = this.get("map");
            a && a.disableKeyboardNavigation()
        },
        _hydrateResult: function(a) {
            var b = {},
                c = this._defaultSR,
                d;
            this.get("map") && (c = this.get("map").spatialReference);
            if (a.hasOwnProperty("text") && a.hasOwnProperty("magicKey")) return a;
            if (a.hasOwnProperty("feature")) b.feature = new v(a.feature), (d = b.feature.geometry) && d.setSpatialReference(c);
            else if (a.hasOwnProperty("geometry")) {
                var e =
                    a.symbol || null;
                d = a.attributes || {};
                b.feature = new v(a.geometry, e, d, a.infoTemplate || null);
                (d = b.feature.geometry) && d.setSpatialReference(c)
            } else a.hasOwnProperty("location") ? (e = new w(a.location.x, a.location.y, c), d = {}, a.hasOwnProperty("attributes") && (d = a.attributes), a.hasOwnProperty("score") && (d.score = a.score), b.feature = new v(e, null, d, null)) : b.feature = null;
            if (a.hasOwnProperty("extent")) b.extent = new x(a.extent), b.extent.setSpatialReference(new u(c));
            else if (b.feature && b.feature.geometry) switch (b.feature.geometry.type) {
                case "extent":
                    b.extent =
                        b.feature.geometry;
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
                    this.get("map") ? this.get("map").getScale() > this.get("zoomScale") ? b.extent = I.getExtentForScale(this.get("map"), this.get("zoomScale")).centerAt(b.feature.geometry) : b.extent = this.get("map").extent.centerAt(b.feature.geometry) : b.extent = new x({
                        xmin: b.feature.geometry.x - 0.25,
                        ymin: b.feature.geometry.y -
                            0.25,
                        xmax: b.feature.geometry.x + 0.25,
                        ymax: b.feature.geometry.y + 0.25,
                        spatialReference: {
                            wkid: 4326
                        }
                    })
            } else b.extent = null;
            a.hasOwnProperty("name") ? b.name = a.name : "query" === this.activeGeocoder.type && this.activeGeocoder.field && a.hasOwnProperty("attributes") && a.attributes.hasOwnProperty(this.activeGeocoder.field) ? b.name = a.attributes[this.activeGeocoder.field] : a.hasOwnProperty("Match_addr") && "string" === typeof a.Match_addr ? b.name = a.Match_addr : a.hasOwnProperty("address") && "object" === typeof a.address && a.address.hasOwnProperty("Match_addr") ?
                b.name = a.address.Match_addr : a.hasOwnProperty("address") && "string" === typeof a.address ? b.name = a.address : a.hasOwnProperty("address") && "object" === typeof a.address && a.address.hasOwnProperty("Address") ? b.name = a.address.Address : b.name = b.feature && b.feature.geometry ? b.feature.geometry.x + "," + b.feature.geometry.y : "";
            return b
        },
        _hydrateResults: function(a) {
            var b = [],
                c = 0;
            if (a && a.length)
                for (c; c < a.length; c++) {
                    var d = this._hydrateResult(a[c]);
                    b.push(d)
                }
            return b
        }
    })
});