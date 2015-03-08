require({cache:{
'url:esri/dijit/geoenrichment/templates/Pagination.html':"<div class=\"Pagination\">\n    <div class=\"Pagination_PageAndArrows\">\n        <div data-dojo-attach-point=\"backNode\"\n            class=\"Pagination_Triangle Pagination_TriangleBack\"\n            style=\"display: none;\"\n            data-dojo-attach-event=\"click: _back\">\n        </div>\n\n        <div class=\"Pagination_Items\">\n            <div data-dojo-attach-point=\"itemsNode\"></div>\n        </div>\n\n        <div data-dojo-attach-point=\"forwardNode\"\n            class=\"Pagination_Triangle Pagination_TriangleForward\"\n            style=\"display: none;\"\n            data-dojo-attach-event=\"click: _forward\">\n        </div>\n    </div>\n    <div data-dojo-attach-point=\"bulletsNode\" class=\"Pagination_Bullets\"></div>\n\n</div>"}});
//>>built
define("esri/dijit/geoenrichment/Pagination", ["../../declare", "dojo/_base/lang", "dojox/mvc/Templated", "dojo/aspect", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-construct", "dojo/on", "dgrid/List", "dijit/_WidgetBase", "./AnimationHelper", "dojo/text!./templates/Pagination.html", "dijit/layout/ContentPane"], function(t, n, u, y, r, s, k, p, z, v, w, x) {
    return t("esri.dijit.geoenrichment.Pagination", [v, u], {
        templateString: x,
        items: null,
        paneNode: null,
        _pageCount: 0,
        _pageSize: 0,
        currentPage: 0,
        minRows: 1,
        minColumns: 1,
        scrollAnim: null,
        constructor: function() {
            this.inherited(arguments);
            this.scrollAnim = new w
        },
        buildRendering: function() {
            this.inherited(arguments)
        },
        resize: function() {
            function a() {
                return b.scrollHeight - 2 > b.clientHeight && b.clientHeight > g.h * h.minRows || b.scrollWidth - 2 > b.clientWidth && b.clientWidth > g.w * h.minColumns
            }
            this.scrollAnim.finish();
            var c = this.items || [],
                b = this.itemsNode.parentNode,
                d = this.itemsNode.firstChild;
            d || (d = k.create("div", null, this.itemsNode));
            for (var h = this, e = d.childNodes, g = 1 <= e.length ? s.getMarginBox(d.firstChild) : {
                    h: 0,
                    w: 0,
                    fake: !0
                }; !a() && e.length < c.length;) {
                var f =
                    this.createItemContainer();
                p(f, "click", n.hitch(this, this.onItemClick, f));
                d.appendChild(f);
                g.fake && (g = s.getMarginBox(d.firstChild))
            }
            for (; a() && 1 < e.length || e.length > c.length;) k.destroy(d.lastChild);
            var l = this._pageSize = e.length,
                f = this._pageCount = 0 === l ? 0 : Math.ceil(c.length / l);
            this.currentPage = this._coerceCurrentPage(this.currentPage);
            for (var m = 0, q = l * this.currentPage; m < l && q < c.length;) this.updateItemContainer(e[m], c[q]), m++, q++;
            for (; m < l;) k.destroy(d.lastChild), m++;
            c = this.bulletsNode;
            c.innerHTML = "";
            if (1 <
                f)
                for (d = 0; d < f; d++) e = k.create("span", {
                    "class": "Pagination_Bullet",
                    innerHTML: "\x26bull;"
                }, c), p(e, "click", n.hitch(this, this.set, "currentPage", d));
            this._updateNavigationControls()
        },
        createItemContainer: function() {},
        updateItemContainer: function(a, c) {},
        onItemClick: function(a) {
            this.onSelect(a)
        },
        _coerceCurrentPage: function(a) {
            0 > a ? a = 0 : a >= this._pageCount && (a = this._pageCount - 1);
            return a
        },
        _updateNavigationControls: function() {
            var a = this.currentPage;
            this.backNode && (this.backNode.style.display = 0 < a ? "" : "none");
            this.forwardNode &&
                (this.forwardNode.style.display = a < this._pageCount - 1 ? "" : "none");
            for (var c = this.bulletsNode.childNodes, b = 0; b < c.length; b++) b == a ? r.add(c[b], "Pagination_BulletCurrent") : r.remove(c[b], "Pagination_BulletCurrent")
        },
        _setCurrentPageAttr: function(a) {
            a = this._coerceCurrentPage(a);
            if (this.currentPage !== a) {
                this.scrollAnim.finish();
                for (var c = this.items || [], b = this.itemsNode, d = 0, h = this._pageSize * a, e = this.itemsNode.firstChild, g = k.create("div"); d < this._pageSize && h < c.length;) {
                    var f = this.createItemContainer();
                    p(f, "click",
                        n.hitch(this, this.onItemClick, f));
                    this.updateItemContainer(f, c[h]);
                    g.appendChild(f);
                    d++;
                    h++
                }
                a === this.currentPage + 1 ? (b.appendChild(g), this._slideAnim(b, e, ["Pagination_SlideAnim", "Anim_SlideLeft"])) : a === this.currentPage - 1 ? (b.insertBefore(g, b.firstChild), this._slideAnim(b, e, ["Pagination_SlideAnim", "Anim_SlideRight"])) : (b.appendChild(g), this.scrollAnim.start([{
                    node: e,
                    classes: ["Pagination_FadeAnim", "Anim_FadeOut"]
                }, {
                    node: g,
                    classes: ["Pagination_FadeAnim", "Anim_FadeIn"]
                }], e));
                this.currentPage = a;
                this._updateNavigationControls()
            }
        },
        _slideAnim: function(a, c, b) {
            a.parentNode.style.overflow = "hidden";
            this.scrollAnim.start([{
                node: a,
                classes: b
            }], c).then(function() {
                a.parentNode.style.overflow = ""
            })
        },
        _back: function() {
            this.set("currentPage", this.currentPage - 1)
        },
        _forward: function() {
            this.set("currentPage", this.currentPage + 1)
        },
        _onSelect: function(a) {
            this.set("selectedItems", [a]);
            this.onSelect()
        },
        onSelect: function() {}
    })
});