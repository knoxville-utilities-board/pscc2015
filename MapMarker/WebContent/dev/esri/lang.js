//>>built
define("esri/lang", ["dojo/_base/array", "dojo/_base/json", "dojo/_base/kernel", "dojo/_base/lang", "dojo/date", "dojo/has", "dojo/number", "dojo/date/locale", "./kernel"], function(l, q, r, g, s, w, t, u, x) {
    function h(a) {
        return void 0 !== a && null !== a
    }

    function m(a, c, b) {
        var d = b.match(/([^\(]+)(\([^\)]+\))?/i),
            e = g.trim(d[1]);
        b = c[a];
        var d = q.fromJson((d[2] ? g.trim(d[2]) : "()").replace(/^\(/, "({").replace(/\)$/, "})")),
            f = d.utcOffset;
        if (-1 === l.indexOf(v, e)) e = g.getObject(e), g.isFunction(e) && (b = e(b, a, c, d));
        else if ("number" === typeof b || "string" ===
            typeof b && b && !isNaN(Number(b))) switch (b = Number(b), e) {
            case "NumberFormat":
                return t.format(b, d);
            case "DateString":
                a = new Date(b);
                if (d.local || d.systemLocale) return d.systemLocale ? a.toLocaleDateString() + (d.hideTime ? "" : " " + a.toLocaleTimeString()) : a.toDateString() + (d.hideTime ? "" : " " + a.toTimeString());
                a = a.toUTCString();
                d.hideTime && (a = a.replace(/\s+\d\d\:\d\d\:\d\d\s+(utc|gmt)/i, ""));
                return a;
            case "DateFormat":
                return a = new Date(b), h(f) && (a = s.add(a, "minute", a.getTimezoneOffset() - f)), u.format(a, d)
        }
        return h(b) ?
            b : ""
    }

    function n(a, c) {
        var b;
        if (c)
            for (b in a) a.hasOwnProperty(b) && (void 0 === a[b] ? delete a[b] : a[b] instanceof Object && n(a[b], !0));
        else
            for (b in a) a.hasOwnProperty(b) && void 0 === a[b] && delete a[b];
        return a
    }
    var v = ["NumberFormat", "DateString", "DateFormat"],
        p = /<\/?[^>]+>/g;
    return {
        valueOf: function(a, c) {
            for (var b in a)
                if (a[b] == c) return b;
            return null
        },
        stripTags: function(a) {
            if (a) {
                var c = typeof a;
                if ("string" === c) a = a.replace(p, "");
                else if ("object" === c)
                    for (var b in a)(c = a[b]) && "string" === typeof c && c.replace(p, "")
            }
            return a
        },
        substitute: function(a, c, b) {
            var d, e, f;
            h(b) && (g.isObject(b) ? (d = b.first, e = b.dateFormat, f = b.numberFormat) : d = b);
            if (!c || "${*}" === c) {
                c = [];
                for (var k in a) {
                    b = a[k];
                    if (e && -1 !== l.indexOf(e.properties || "", k)) b = m(k, a, e.formatter || "DateString");
                    else if (f && -1 !== l.indexOf(f.properties || "", k)) b = m(k, a, f.formatter || "NumberFormat");
                    c.push(k + " \x3d " + (h(b) ? b : "") + "\x3cbr/\x3e");
                    if (d) break
                }
                return c.join("")
            }
            return g.replace(c, g.hitch({
                obj: a
            }, function(a, b) {
                var c = b.split(":");
                return 1 < c.length ? (b = c[0], c.shift(), m(b, this.obj,
                    c.join(":"))) : e && -1 !== l.indexOf(e.properties || "", b) ? m(b, this.obj, e.formatter || "DateString") : f && -1 !== l.indexOf(f.properties || "", b) ? m(b, this.obj, f.formatter || "NumberFormat") : h(this.obj[b]) ? this.obj[b] : ""
            }), /\$\{([^\}]+)\}/g)
        },
        filter: function(a, c, b) {
            c = [g.isString(a) ? a.split("") : a, b || r.global, g.isString(c) ? new Function("item", "index", "array", c) : c];
            b = {};
            var d;
            a = c[0];
            for (d in a) c[2].call(c[d], a[d], d, a) && (b[d] = a[d]);
            return b
        },
        isDefined: h,
        fixJson: n
    }
});