//>>built
define("esri/dijit/geoenrichment/DataBrowser", ["../../declare", "dojo/_base/lang", "dojo/dom-class", "dojo/dom-construct", "dojo/when", "dojox/mvc/sync", "./_Wizard", "./DataBrowser/DataCategoriesPage", "./DataBrowser/DataCollectionsPage", "./DataBrowser/DataVariablesPage", "./DataBrowser/ShoppingCart", "./DataBrowser/VariableInfo", "./DataBrowser/Breadcrumb", "./DataBrowser/autoTooltip", "./AnimationHelper", "dojo/i18n!../../nls/jsapi"], function(f, b, g, e, u, h, k, l, m, n, p, q, r, s, t, c) {
    c = c.geoenrichment.dijit;
    return f("esri.dijit.geoenrichment.DataBrowser", [k], {
        title: c.DataBrowser.title,
        okButton: c.WizardButtons.apply,
        backButton: c.WizardButtons.back,
        cancelButton: c.WizardButtons.cancel,
        countryID: null,
        countryBox: !0,
        selection: null,
        shoppingCart: null,
        variableInfo: null,
        breadcrumb: null,
        dataCollections: null,
        previousPage: null,
        _titleNode: null,
        _flyAnim: null,
        _varTitle: null,
        constructor: function() {
            this.shoppingCart = new p;
            this.variableInfo = new q;
            this.breadcrumb = new r({
                onCategoriesClick: b.hitch(this, this.loadPage, "cat"),
                onDCsClick: b.hitch(this, this.loadPage, "col")
            })
        },
        buildRendering: function() {
            this.inherited(arguments);
            this._flyAnim = new t(this.domNode);
            this.breadcrumb.flyAnim = this._flyAnim;
            g.add(this.domNode, "DataBrowser");
            this.shoppingCart.placeAt(this.domNode);
            this.breadcrumb.placeAt(this.domNode);
            var a = e.create("div", {
                style: "position: absolute;"
            }, this.domNode);
            this._titleNode = e.create("div", {
                "class": "DataBrowser_Title"
            }, a);
            s(this.domNode)
        },
        startup: function() {
            this.inherited(arguments);
            this.shoppingCart.multiSelect = !0;
            this.shoppingCart.onSelect = b.hitch(this, this._onSelect);
            this.shoppingCart.startup();
            this.dataCollections ||
                (this.dataCollections = {});
            this.pages.cat = new l({
                countryBox: this.countryBox,
                shoppingCart: this.shoppingCart,
                selection: this.selection,
                dataCollections: this.dataCollections,
                flyAnim: this._flyAnim,
                onSelect: b.hitch(this, function(a) {
                    this.previousPage = "cat";
                    this._loadCollectionsPage(a)
                }),
                onSearch: b.hitch(this, function(a) {
                    this._varTitle = a;
                    this.previousPage = "cat";
                    this._loadVarsPage()
                })
            });
            h(this, "countryID", this.pages.cat, "countryID");
            var a = [];
            this.backButton && a.push({
                label: this.backButton,
                onClick: b.hitch(this,
                    this._onBack)
            });
            this.cancelButton && a.push({
                label: this.cancelButton,
                onClick: b.hitch(this, this._onCancel)
            });
            this.addButtons("cat", a);
            this.loadPage("cat")
        },
        loadPage: function(a) {
            switch (a) {
                case "cat":
                    this.pages.col && (this.pages.col.set("selectedCategory", null), this.pages.col.set("selectedCollections", null));
                    this.pages["var"] && (this.pages["var"].set("selectedCategory", null), this.pages["var"].set("selectedCollections", null));
                    break;
                case "col":
                    this.pages.col && this.pages.col.set("selectedCollections", null),
                        this.pages["var"] && this.pages["var"].set("selectedCollections", null)
            }
            this.inherited(arguments);
            this._currentPage.syncWithShoppingCart && this._currentPage.syncWithShoppingCart();
            this._updateBreadcrumb(a)
        },
        _updateBreadcrumb: function(a) {
            switch (a) {
                case "cat":
                    this.breadcrumb.domNode.style.display = "none";
                    break;
                case "col":
                    this.breadcrumb.domNode.style.display = "";
                    this.breadcrumb.selectCategory(this.pages.col.get("selectedCategory"));
                    break;
                case "var":
                    this.breadcrumb.domNode.style.display = "";
                    a = this.pages["var"].get("selectedCollections");
                    var b = !this.pages.col ? null : this.pages.col.get("selectedCategory");
                    1 === a.length ? this.breadcrumb.selectDataCollection(a[0].metadata.title, b) : this.breadcrumb.selectDataCollection("All Variables", b)
            }
        },
        _loadCollectionsPage: function(a) {
            if (!this.pages.col) {
                this.pages.col = new m({
                    onSelect: b.hitch(this, function(a, b) {
                        this._varTitle = b;
                        this.previousPage = "col";
                        this._loadVarsPage(a)
                    }),
                    shoppingCart: this.shoppingCart,
                    variableInfo: this.variableInfo,
                    multiSelect: !0,
                    flyAnim: this._flyAnim
                });
                var d = [{
                    label: c.WizardButtons.back,
                    onClick: b.hitch(this, this.loadPage, "cat")
                }];
                this.okButton && d.push({
                    label: this.okButton,
                    onClick: b.hitch(this, this._onOK)
                });
                this.cancelButton && d.push({
                    label: this.cancelButton,
                    onClick: b.hitch(this, this._onCancel)
                });
                this.addButtons("col", d)
            }
            a && (this.pages.col.set("selectedCategory", a), this.loadPage("col"), this.pages.col.syncWithShoppingCart(), this.shoppingCart.onRemoveElement = b.hitch(this.pages.col, this.pages.col.onRemoveElementFromShoppingCart))
        },
        _loadVarsPage: function(a) {
            if (!this.pages["var"]) {
                this.pages["var"] =
                    new n({
                        shoppingCart: this.shoppingCart,
                        variableInfo: this.variableInfo,
                        multiSelect: !0,
                        flyAnim: this._flyAnim
                    });
                var d = [{
                    label: c.WizardButtons.back,
                    onClick: b.hitch(this, function() {
                        this.loadPage(this.previousPage)
                    })
                }];
                this.okButton && d.push({
                    label: this.okButton,
                    onClick: b.hitch(this, this._onOK)
                });
                this.cancelButton && d.push({
                    label: this.cancelButton,
                    onClick: b.hitch(this, this._onCancel)
                });
                this.addButtons("var", d)
            }
            this.pages["var"].varTitle = this._varTitle;
            this.pages["var"].set("selectedCategory", a);
            if (a = this.pages[this.previousPage].get("selectedCollections")) this.pages["var"].set("selectedCollections",
                a), this.loadPage("var"), this.pages["var"].syncWithShoppingCart(), this.shoppingCart.onRemoveElement = b.hitch(this.pages["var"], this.pages["var"].onRemoveElementFromShoppingCart)
        },
        _setTitleAttr: function(a) {
            this._set("title", a);
            this._titleNode.innerHTML = a
        },
        _onSelect: function() {
            this.selection = this.shoppingCart.collectSelection();
            this.emit("select");
            this.onSelect()
        },
        onSelect: function() {},
        _onBack: function() {
            this.emit("back");
            this.onBack()
        },
        onBack: function() {},
        _onOK: function() {
            this.selection = this.shoppingCart.collectSelection();
            this.emit("ok");
            this.onOK()
        },
        onOK: function() {},
        _onCancel: function() {
            this.emit("cancel");
            this.onCancel()
        },
        onCancel: function() {}
    })
});