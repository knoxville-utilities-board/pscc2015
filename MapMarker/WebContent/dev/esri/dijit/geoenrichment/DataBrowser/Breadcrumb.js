require({cache:{
'url:esri/dijit/geoenrichment/DataBrowser/templates/Breadcrumb.html':"<div class=\"Breadcrumb BreadcrumbHeight\">\n    <div data-dojo-attach-point=\"connect1\" class=\"Breadcrumb_Line Breadcrumb_Connect1\" style=\"display: none;\"></div>\n    <div data-dojo-attach-point=\"angConnect1\" class=\"Breadcrumb_Line Breadcrumb_AngularConnect1\" style=\"display: none;\"></div>\n    <div data-dojo-attach-point=\"connect1andHalf\" class=\"Breadcrumb_Line Breadcrumb_1andHalf\" style=\"display: none;\"></div>\n    <div data-dojo-attach-point=\"connect2\" class=\"Breadcrumb_Line Breadcrumb_Connect2\" style=\"display: none;\"></div>\n    <div data-dojo-attach-point=\"angConnect2\" class=\"Breadcrumb_Line Breadcrumb_AngularConnect2\" style=\"display: none;\"></div>\n    <div class=\"Breadcrumb_Categories\">\n        <div class=\"Breadcrumb_CategoriesIcon\" data-dojo-attach-event=\"click: _onCategoriesClick\"></div>\n    </div>\n    <div data-dojo-attach-point=\"dcIcon\" data-dojo-attach-event=\"click: _onDCsClick\" style=\"display: none;\"></div>\n    <div data-dojo-attach-point=\"varsNode\" class=\"Breadcrumb_Variales DataCollectionButton TrimWithEllipses\" style=\"display: none;\">\n        <span data-dojo-attach-point=\"varsLabel\"></span>\n    </div>\n</div>"}});
//>>built
define("esri/dijit/geoenrichment/DataBrowser/Breadcrumb", ["../../../declare", "dojo/_base/lang", "dojo/dom-class", "dojo/when", "dojox/mvc/Templated", "dojo/text!./templates/Breadcrumb.html"], function(e, c, f, d, g, h) {
    return e([g], {
        templateString: h,
        flyAnim: null,
        selectCategory: function(a) {
            this._hideCategory();
            a && d(this.flyAnim.progress, c.hitch(this, this._showCategory, a));
            this._hideDataCollection()
        },
        _hideCategory: function() {
            this.dcIcon.className = "";
            this.dcIcon.style.display = "none";
            this.connect1.style.display = "none";
            this.angConnect1.style.display = "none";
            this.connect1andHalf.style.display =
                "none"
        },
        _showCategory: function(a) {
            this.dcIcon.className = "Breadcrumb_DataCollections DataCategoriesPage_Item_" + a.id.replace(/ /g, "_");
            this.dcIcon.style.display = "";
            this.connect1.style.display = "";
            this.angConnect1.style.display = "";
            this.connect1andHalf.style.display = "none"
        },
        selectDataCollection: function(a, b) {
            this.angConnect1.style.display = "none";
            this._hideDataCollection();
            a && d(this.flyAnim.progress, c.hitch(this, this._showDataCollection, a, b))
        },
        _hideDataCollection: function() {
            this.varsNode.style.display =
                "none";
            this.connect2.style.display = "none";
            this.angConnect2.style.display = "none";
            this.connect1andHalf.style.display = "none"
        },
        _showDataCollection: function(a, b) {
            b || (this.dcIcon.style.display = "none", this.connect1.style.display = "", this.connect1andHalf.style.display = "");
            this.varsNode.style.display = "";
            this.varsLabel.innerHTML = a;
            this.connect2.style.display = "";
            this.angConnect2.style.display = "";
            f.add(this.dcIcon, "DataBrowser_Clickable")
        },
        _onCategoriesClick: function() {
            this.onCategoriesClick()
        },
        onCategoriesClick: function() {},
        _onDCsClick: function() {
            this.onDCsClick()
        },
        onDCsClick: function() {}
    })
});