//>>built
/*
 MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
(function() {
    function r(b, f, g) {
        this.obj = b;
        this.right = this.left = null;
        this.parent = g;
        this.dimension = f
    }

    function t(b, f, g) {
        function m(a, h, d) {
            var b = h % g.length,
                e;
            if (0 === a.length) return null;
            if (1 === a.length) return new r(a[0], b, d);
            a.sort(function(a, d) {
                return a[g[b]] - d[g[b]]
            });
            e = Math.floor(a.length / 2);
            d = new r(a[e], b, d);
            d.left = m(a.slice(0, e), h + 1, d);
            d.right = m(a.slice(e + 1), h + 1, d);
            return d
        }

        function q(a) {
            function h(a) {
                a.left && (a.left.parent = a, h(a.left));
                a.right && (a.right.parent = a, h(a.right))
            }
            k.root = a;
            h(k.root)
        }
        var k =
            this;
        Array.isArray(b) ? this.root = m(b, 0, null) : q(b, f, g);
        this.toJSON = function(a) {
            a || (a = this.root);
            var h = new r(a.obj, a.dimension, null);
            a.left && (h.left = k.toJSON(a.left));
            a.right && (h.right = k.toJSON(a.right));
            return h
        };
        this.insert = function(a) {
            function h(e, b) {
                if (null === e) return b;
                var c = g[e.dimension];
                return a[c] < e.obj[c] ? h(e.left, e) : h(e.right, e)
            }
            var d = h(this.root, null),
                b, e;
            null === d ? this.root = new r(a, 0, null) : (b = new r(a, (d.dimension + 1) % g.length, d), e = g[d.dimension], a[e] < d.obj[e] ? d.left = b : d.right = b)
        };
        this.remove =
            function(a) {
                function b(e) {
                    if (null === e) return null;
                    if (e.obj === a) return e;
                    var d = g[e.dimension];
                    return a[d] < e.obj[d] ? b(e.left, e) : b(e.right, e)
                }

                function d(a) {
                    function b(a, d) {
                        var c, h, e, f, l;
                        if (null === a) return null;
                        c = g[d];
                        if (a.dimension === d) return null !== a.right ? b(a.right, d) : a;
                        h = a.obj[c];
                        e = b(a.left, d);
                        f = b(a.right, d);
                        l = a;
                        null !== e && e.obj[c] > h && (l = e);
                        null !== f && f.obj[c] > l.obj[c] && (l = f);
                        return l
                    }

                    function h(a, b) {
                        var d, c, e, f, k;
                        if (null === a) return null;
                        d = g[b];
                        if (a.dimension === b) return null !== a.left ? h(a.left, b) : a;
                        c = a.obj[d];
                        e = h(a.left, b);
                        f = h(a.right, b);
                        k = a;
                        null !== e && e.obj[d] < c && (k = e);
                        null !== f && f.obj[d] < k.obj[d] && (k = f);
                        return k
                    }
                    var c, f;
                    null === a.left && null === a.right ? null === a.parent ? k.root = null : (c = g[a.parent.dimension], a.obj[c] < a.parent.obj[c] ? a.parent.left = null : a.parent.right = null) : (c = null !== a.left ? b(a.left, a.dimension) : h(a.right, a.dimension), f = c.obj, d(c), a.obj = f)
                }
                var f;
                f = b(k.root);
                null !== f && d(f)
            };
        this.nearest = function(a, b, d, m) {
            function e(c) {
                var k;
                k = g[c.dimension];
                var m = f(a, c.obj),
                    n = {},
                    p;
                for (p = 0; p < g.length; p +=
                    1) n[g[p]] = p === c.dimension ? a[g[p]] : c.obj[g[p]];
                n = f(n, c.obj);
                if (null === c.right && null === c.left) {
                    if (l.size() < b || m < l.peek()[1])
                        if (!d || d(c.obj)) l.push([c, m]), l.size() > b && l.pop()
                } else {
                    k = null === c.right ? c.left : null === c.left ? c.right : a[k] < c.obj[k] ? c.left : c.right;
                    e(k);
                    if (l.size() < b || m < l.peek()[1])
                        if (!d || d(c.obj)) l.push([c, m]), l.size() > b && l.pop();
                    if (l.size() < b || Math.abs(n) < l.peek()[1]) c = k === c.left ? c.right : c.left, null !== c && e(c)
                }
            }
            var n, l;
            l = new s(function(a) {
                return -a[1]
            });
            if (m)
                for (n = 0; n < b; n += 1) l.push([null, m]);
            e(k.root);
            m = [];
            for (n = 0; n < b && n < l.content.length; n += 1) l.content[n][0] && m.push([l.content[n][0].obj, l.content[n][1]]);
            return m
        };
        this.balanceFactor = function() {
            function a(b) {
                return null === b ? 0 : Math.max(a(b.left), a(b.right)) + 1
            }

            function b(a) {
                return null === a ? 0 : b(a.left) + b(a.right) + 1
            }
            return a(k.root) / (Math.log(b(k.root)) / Math.log(2))
        }
    }

    function s(b) {
        this.content = [];
        this.scoreFunction = b
    }
    s.prototype = {
        push: function(b) {
            this.content.push(b);
            this.bubbleUp(this.content.length - 1)
        },
        pop: function() {
            var b = this.content[0],
                f = this.content.pop();
            0 < this.content.length && (this.content[0] = f, this.sinkDown(0));
            return b
        },
        peek: function() {
            return this.content[0]
        },
        remove: function(b) {
            for (var f = this.content.length, g = 0; g < f; g++)
                if (this.content[g] == b) {
                    var m = this.content.pop();
                    g != f - 1 && (this.content[g] = m, this.scoreFunction(m) < this.scoreFunction(b) ? this.bubbleUp(g) : this.sinkDown(g));
                    return
                }
            throw Error("Node not found.");
        },
        size: function() {
            return this.content.length
        },
        bubbleUp: function(b) {
            for (var f = this.content[b]; 0 < b;) {
                var g = Math.floor((b + 1) / 2) - 1,
                    m = this.content[g];
                if (this.scoreFunction(f) < this.scoreFunction(m)) this.content[g] = f, this.content[b] = m, b = g;
                else break
            }
        },
        sinkDown: function(b) {
            for (var f = this.content.length, g = this.content[b], m = this.scoreFunction(g);;) {
                var q = 2 * (b + 1),
                    k = q - 1,
                    a = null;
                if (k < f) {
                    var h = this.scoreFunction(this.content[k]);
                    h < m && (a = k)
                }
                if (q < f && this.scoreFunction(this.content[q]) < (null == a ? m : h)) a = q;
                if (null != a) this.content[b] = this.content[a], this.content[a] = g, b = a;
                else break
            }
        }
    };
    this.kdTree = t;
    "undefined" !== typeof exports && (exports.kdTree = t, exports.BinaryHeap =
        s)
})();