//>>built
define("esri/Evented", ["dojo/_base/declare", "dojo/_base/lang", "dojo/aspect", "dojo/Evented", "dojo/has", "./kernel"], function(m, h, l, n, p, q) {
    return m([n], {
        declaredClass: "esri.Evented",
        registerConnectEvents: function() {
            var d = this.constructor,
                c = this.constructor._meta.parents,
                a = [{}],
                e = {},
                b, f, g = function(a, b) {
                    h.isArray(a) || (a = [a]);
                    for (var c = 0; c < a.length; c++) {
                        var d = a[c];
                        d._meta && d._meta.parents && g(d._meta.parents, b);
                        d.prototype._eventMap && b.push(h.mixin({}, d.prototype._eventMap))
                    }
                    return b
                };
            if (!d._onMap) {
                g(c, a);
                a.push(this._eventMap);
                c = h.mixin.apply(this, a);
                for (b in this) /^on\w/.test(b) && h.isFunction(this[b]) && (a = this._hyphenLower(b).toLowerCase(), c[a] || (e[a] = {
                    method: b
                }));
                for (f in c) b = this._onCamelCase(f), e[f] = {
                    method: b,
                    argKeys: c[f]
                };
                d._onMap = e;
                return d._onMap
            }
        },
        on: function(d, c) {
            if (-1 < d.indexOf(",")) {
                for (var a = d.split(/\s*,\s*/), e = a.length, b = []; e--;) b.push(this.on(a[e], c));
                b.remove = function() {
                    for (var a = 0; a < b.length; a++) b[a].remove()
                };
                return b
            }
            var a = this.constructor._onMap || this.registerConnectEvents(),
                e = "string" == typeof d && d.toLowerCase(),
                f = this._onCamelCase(e),
                g = a && a[e];
            return (f = g && g.method || this[f] && h.isFunction(this[f]) && f) ? g && h.isArray(g.argKeys) ? (a = this._onArr2Obj(c, a[e].argKeys), l.after(this, f, a, !0)) : l.after(this, f, function(a) {
                a = a || {};
                a.target || (a.target = this);
                c.call(this, a)
            }, !0) : this.inherited(arguments)
        },
        emit: function(d, c) {
            var a, e, b, f, g = d.toLowerCase();
            f = this._onCamelCase(d);
            var k = this.constructor._onMap || this.registerConnectEvents();
            f = (b = k && k[g] && k[g].method || h.isFunction(this[f]) && f) && this[b];
            b && (k && k[g]) && this._onObj2Arr(function() {
                e =
                    Array.prototype.slice.call(arguments)
            }, k[g].argKeys)(c);
            c = c || {};
            c.target || (c.target = this);
            f && (a = e && e.length ? e : [c], a = f.apply(this, a));
            this.inherited(arguments, [d, c]);
            return a
        },
        _onObj2Arr: function(d, c) {
            if (c) {
                var a = this;
                return function(e) {
                    var b, f = [],
                        g = c.length;
                    for (b = 0; b < g; b++) f[b] = e[c[b]];
                    d.apply(a, f)
                }
            }
            return d
        },
        _onArr2Obj: function(d, c) {
            if (c) {
                var a = this;
                return function() {
                    var e, b = {},
                        f = arguments.length;
                    for (e = 0; e < f; e++) b[c[e]] = arguments[e];
                    b.target || (b.target = a);
                    d.call(a, b)
                }
            }
            return d
        },
        _hyphenLower: function(d) {
            return d.replace(/^on/,
                "").replace(/[A-Z](?=[a-z])/g, function(c, a) {
                return (a ? "-" : "") + c.toLowerCase()
            })
        },
        _onCamelCase: function(d) {
            return "on" + d.substr(0, 1).toUpperCase() + d.substr(1).replace(/\-([a-z])/g, function(c, a) {
                return a.toUpperCase()
            })
        }
    })
});