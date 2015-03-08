//>>built
define("esri/dijit/analysis/tree", ["dojo/_base/declare", "dojo/_base/array", "dojo/_base/Deferred", "dojo/_base/lang", "dojo/query", "dojo/on", "dojo/has", "dojo/aspect", "dgrid/util/has-css3", "dgrid/Grid", "dojo/has!touch?dgrid/util/touch", "put-selector/put", "../../kernel"], function(E, x, y, z, p, A, B, f, t, C, u, m, D) {
    function v(c, f, g, d) {
        d = this.grid.isRTL ? "right" : "left";
        var b = ".dgrid-expando-icon";
        f && (b += ".ui-icon.ui-icon-triangle-1-" + (g ? "se" : "e"));
        c = m("div" + b + "[style\x3dmargin-" + d + ": " + c * (this.indentWidth || 9) + "px; float: " + d + "]");
        c.innerHTML = "\x26nbsp;";
        return c
    }

    function w(c) {
        var f = this,
            g = this.style.height;
        g && (this.style.display = "0px" == g ? "none" : "block");
        c && (m(this, ".dgrid-tree-resetting"), setTimeout(function() {
            m(f, "!dgrid-tree-resetting")
        }));
        this.style.height = ""
    }

    function h(c) {
        var h = c.renderCell || C.defaultRenderCell,
            g, d;
        c || (c = {});
        c.shouldExpand = c.shouldExpand || function(b, c, e) {
            return e
        };
        f.after(c, "init", function() {
            var b = c.grid,
                h = ".dgrid-content .dgrid-column-" + c.id,
                e = [];
            b.cleanEmptyObservers = !1;
            if (!b.store) throw Error("dgrid tree column plugin requires a store to operate.");
            c.renderExpando || (c.renderExpando = v);
            e.push(b.on(c.expandOn || ".dgrid-expando-icon:click," + h + ":dblclick," + h + ":keydown", function(a) {
                var c = b.row(a);
                (!b.store.mayHaveChildren || b.store.mayHaveChildren(c.data)) && (("keydown" != a.type || 32 == a.keyCode) && !("dblclick" == a.type && d && 1 < d.count && c.id == d.id && -1 < a.target.className.indexOf("dgrid-expando-icon"))) && b.expand(c); - 1 < a.target.className.indexOf("dgrid-expando-icon") && (d && d.id == b.row(a).id ? d.count++ : d = {
                    id: b.row(a).id,
                    count: 1
                })
            }));
            t("touch") && e.push(b.on(u.selector(h,
                u.dbltap), function() {
                b.expand(this)
            }));
            b._expanded || (b._expanded = {});
            e.push(f.after(b, "insertRow", function(a) {
                var b = this.row(a);
                c.shouldExpand(b, g, this._expanded[b.id]) && this.expand(a, !0, !0);
                return a
            }));
            e.push(f.before(b, "removeRow", function(a, c) {
                var k = a.connected;
                k && (p("\x3e.dgrid-row", k).forEach(function(a) {
                    b.removeRow(a, !0)
                }), c || m(k, "!"))
            }));
            c.collapseOnRefresh && e.push(f.after(b, "cleanup", function() {
                this._expanded = {}
            }));
            b._calcRowHeight = function(a) {
                var b = a.connected;
                return a.offsetHeight + (b ? b.offsetHeight :
                    0)
            };
            b.expand = function(a, n, k) {
                var e = a.element ? a : b.row(a),
                    d = t("transitionend");
                a = e.element;
                if ((a = -1 < a.className.indexOf("dgrid-expando-icon") ? a : p(".dgrid-expando-icon", a)[0]) && a.mayHaveChildren && (k || n !== !!this._expanded[e.id])) {
                    var f = void 0 === n ? !this._expanded[e.id] : n;
                    m(a, ".ui-icon-triangle-1-" + (f ? "se" : "e") + "!ui-icon-triangle-1-" + (f ? "e" : "se"));
                    var h = a.preloadNode;
                    n = e.element;
                    var l, g, r, s = {
                        originalQuery: this.query
                    };
                    if (!h) {
                        l = n.connected = m("div.dgrid-tree-container");
                        var h = a.preloadNode = m(n, "+", l, "div.dgrid-preload"),
                            q = function(a) {
                                return b.store.getChildren(e.data, a)
                            };
                        c.allowDuplicates && (s.parentId = e.id);
                        "level" in a && (q.level = a.level);
                        y.when(b.renderQuery ? b._trackError(function() {
                            return b.renderQuery(q, h, s)
                        }) : b.renderArray(q(s), h, "level" in q ? {
                            queryLevel: q.level
                        } : {}), function() {
                            if (b._expanded[e.id] && d) {
                                var a = l.scrollHeight;
                                l.style.height = a ? a + "px" : "auto"
                            }
                        });
                        d ? A(l, d, w) : w.call(l)
                    }
                    l = n.connected;
                    l.hidden = !f;
                    g = l.style;
                    !d || k ? (g.display = f ? "block" : "none", g.height = "") : (f ? (g.display = "block", r = l.scrollHeight, g.height = "0px") :
                        (m(l, ".dgrid-tree-resetting"), g.height = l.scrollHeight + "px"), setTimeout(function() {
                            m(l, "!dgrid-tree-resetting");
                            g.height = f ? r ? r + "px" : "auto" : "0px"
                        }));
                    f ? this._expanded[e.id] = !0 : delete this._expanded[e.id]
                }
            };
            f.after(c, "destroy", function() {
                x.forEach(e, function(a) {
                    a.remove()
                });
                delete b.expand;
                delete b._calcRowHeight
            })
        });
        c.renderCell = function(b, f, e, a) {
            var d = c.grid,
                k = Number(a && a.queryLevel) + 1,
                m = !d.store.mayHaveChildren || d.store.mayHaveChildren(b),
                p = a.parentId,
                k = g = isNaN(k) ? 0 : k,
                d = c.renderExpando(k, m, d._expanded[(p ?
                    p + "-" : "") + d.store.getIdentity(b)], b);
            d.level = k;
            d.mayHaveChildren = m;
            a.level = k;
            h.call(c, b, f, e, a);
            e.insertBefore(d, e.firstChild)
        };
        return c
    }
    h.defaultRenderExpando = v;
    B("extend-esri") && z.setObject("dijit.analysis.tree", h, D);
    return h
});