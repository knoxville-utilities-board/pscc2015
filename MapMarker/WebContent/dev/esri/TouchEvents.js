//>>built
define("esri/TouchEvents", ["dojo/_base/declare", "dojo/_base/html", "dojo/_base/lang", "dojo/_base/sniff", "dojo/dom", "./kernel", "./Evented", "./geometry/Point", "./geometry/ScreenPoint"], function(r, q, k, l, s, u, t, m, n) {
    return r([t], {
        declaredClass: "esri.TouchEvents",
        tapRadius: 8,
        doubleTapRadius: 10,
        tapStartTolerance: 50,
        doubleTapDuration: 300,
        map: null,
        constructor: function(a, b) {
            this.node = a;
            k.mixin(this, b);
            q.setSelectable(a, !1);
            this._touchStart = k.hitch(this, this._touchStart);
            this._touchMove = k.hitch(this, this._touchMove);
            this._touchEnd = k.hitch(this,
                this._touchEnd);
            this._touchCancel = k.hitch(this, this._touchCancel);
            a.addEventListener("touchstart", this._touchStart, !1);
            a.addEventListener("touchmove", this._touchMove, !1);
            a.addEventListener("touchend", this._touchEnd, !1);
            a.addEventListener("touchcancel", this._touchCancel, !1);
            this.map && l("ios") && (this._mouseOver = k.hitch(this, this._mouseOver), this._mouseOut = k.hitch(this, this._mouseOut), this._mouseDown = k.hitch(this, this._mouseDown), this._mouseUp = k.hitch(this, this._mouseUp), this._mouseClick = k.hitch(this,
                this._mouseClick), a.addEventListener("mouseover", this._mouseOver, !1), a.addEventListener("mouseout", this._mouseOut, !1), a.addEventListener("mousedown", this._mouseDown, !1), a.addEventListener("mouseup", this._mouseUp, !1), a.addEventListener("click", this._mouseClick, !1));
            this._numTouches = 0;
            this._nodeTouches = [];
            this._touches = {};
            this._touchIds = [];
            this._taps = [];
            this._immediate = !1
        },
        _touchStart: function(a) {
            var b = this._touches,
                c, d = a.changedTouches.length,
                f, e, g, h, k = (new Date).getTime();
            if (!l("android") || !l("safari") ||
                !(1 === a.targetTouches.length && a.touches.length === a.targetTouches.length && a.targetTouches.length === a.changedTouches.length && 0 === a.changedTouches[0].identifier && b[a.changedTouches[0].identifier])) {
                this._addTouch(a);
                for (c = 0; c < d; c++) f = a.changedTouches[c], e = b[f.identifier] = {}, e.startX = f.pageX, e.startY = f.pageY, e.startTS = k, -1 === this._touchIds.indexOf(f.identifier) && this._touchIds.push(f.identifier);
                this._swipeActive && (g = this._nodeTouches[0]);
                this._pinchActive && (h = this._nodeTouches[1]);
                1 === this._numTouches ?
                    this._swipeActive ? (this._swipeActive = !1, this._fire("onSwipeEnd", this._processTouchEvent(a, g))) : this._pinchActive && (this._pinchActive = !1, this._fire("onPinchEnd", this._processTouchEvent(a, [g, h]))) : 2 === this._numTouches ? this._swipeActive && (g && (e = b[this._touchIds[0]], e.startX = g.pageX, e.startY = g.pageY, e.moved = !1), this._swipeActive = !1, this._fire("onSwipeEnd", this._processTouchEvent(a, g))) : this._swipeActive ? (this._swipeActive = !1, this._fire("onSwipeEnd", this._processTouchEvent(a, g))) : this._pinchActive && (this._pinchActive = !1, this._fire("onPinchEnd", this._processTouchEvent(a, [g, h])))
            }
        },
        _touchMove: function(a) {
            a.preventDefault();
            this._updateTouch(a);
            var b = this._touches,
                c, d = a.changedTouches.length,
                f, e, g, h;
            if (!l("android") || !l("safari") || !(1 === a.targetTouches.length && a.touches.length === a.targetTouches.length && a.targetTouches.length === a.changedTouches.length && 0 === a.changedTouches[0].identifier && b[a.changedTouches[0].identifier] && 1 < this._touchIds.length)) {
                for (c = 0; c < d; c++)
                    if (f = a.changedTouches[c], e = b[f.identifier]) {
                        g = Math.abs(f.pageX -
                            e.startX);
                        f = Math.abs(f.pageY - e.startY);
                        if (!e.moved && (g >= this.tapRadius || f >= this.tapRadius)) e.moved = e.absMoved = !0;
                        h = h ? h : e.moved
                    }
                1 === this._numTouches ? (c = a.changedTouches[0], this._swipeActive ? this._fire("onSwipeMove", this._processTouchEvent(a, c)) : h && (this._swipeActive = !0, this._fire("onSwipeStart", this._processTouchEvent(a, c)))) : 2 === this._numTouches && (c = this._nodeTouches[0], d = this._nodeTouches[1], this._pinchActive ? this._fire("onPinchMove", this._processTouchEvent(a, [c, d])) : h && (h = b[c.identifier], e = b[d.identifier],
                    b = Math.abs(h.startX - e.startX), h = Math.abs(h.startY - e.startY), b = Math.sqrt(b * b + h * h), h = Math.abs(c.pageX - d.pageX), e = Math.abs(c.pageY - d.pageY), h = Math.sqrt(h * h + e * e), Math.abs(h - b) >= 2 * this.tapRadius && (this._pinchActive = !0, this._fire("onPinchStart", this._processTouchEvent(a, [c, d])))))
            }
        },
        _touchEnd: function(a) {
            this._removeTouch(a);
            var b = this._touches,
                c = a.changedTouches,
                d, f = c.length,
                e, g, h = (new Date).getTime(),
                k = this._touchIds;
            for (d = 0; d < f; d++)
                if (g = b[c[d].identifier]) g.absMoved && (e = !0), g.pageX = c[d].pageX, g.pageY =
                    c[d].pageY, g.endTS = h;
            if (0 === this._numTouches)
                if (this._touches = {}, this._touchIds = [], this._swipeActive) this._swipeActive = !1, this._fire("onSwipeEnd", this._processTouchEvent(a, c[0]));
                else if (this._pinchActive) this._pinchActive = !1, this._fire("onPinchEnd", this._processTouchEvent(a, c));
            else {
                if (!e) {
                    f = Infinity;
                    e = -Infinity;
                    var h = Infinity,
                        l = -Infinity,
                        m = this.tapStartTolerance,
                        p = [],
                        n = !0;
                    for (d = 0; d < k.length; d++) g = b[k[d]], p.push(g), g.startTS < f && (f = g.startTS), g.startTS > e && (e = g.startTS), g.endTS < h && (h = g.endTS), g.endTS >
                        l && (l = g.endTS), delete b[k[d]];
                    if (1 === p.length && c[0] && (b = Math.abs(c[0].pageX - p[0].startX), c = Math.abs(c[0].pageY - p[0].startY), b >= this.tapRadius || c >= this.tapRadius)) n = !1;
                    n && (Math.abs(e - f) <= m && Math.abs(l - h) <= m) && this._basicTap(a, p)
                }
            } else 1 === this._numTouches && this._pinchActive && (d = this._nodeTouches[0], g = b[d.identifier], g.startX = d.pageX, g.startY = d.pageY, this._pinchActive = g.moved = !1, this._fire("onPinchEnd", this._processTouchEvent(a, [c[0], d])))
        },
        _touchCancel: function(a) {
            this._numTouches && this._touchEnd(a)
        },
        _basicTap: function(a, b) {
            var c = (new Date).getTime(),
                d = this;
            a = this._processTouchEvent(a, b);
            this._taps.push({
                touchInfos: b,
                ts: c,
                event: a
            });
            2 < this._taps.length && this._taps.shift();
            this._fire("onBasicTap", a);
            clearTimeout(this._tapTimer);
            this._immediate ? this._analyzeTap(!0) : this._tapTimer = setTimeout(function() {
                var a = d;
                d = null;
                clearTimeout(a._tapTimer);
                a._analyzeTap()
            }, 2 === this._taps.length ? this.doubleTapDuration / 2 : this.doubleTapDuration)
        },
        _analyzeTap: function(a) {
            var b = this._taps,
                c = b[0],
                d = b[1],
                f = c.touchInfos,
                e = d && d.touchInfos;
            b.length && (a || (this._taps = []), c && d ? f.length === e.length ? d.ts - c.ts <= this.doubleTapDuration ? (1 === f.length ? (a = Math.abs(f[0].startX - e[0].startX), f = Math.abs(f[0].startY - e[0].startY), f = a <= this.doubleTapRadius && f <= this.doubleTapRadius) : f = !0, f ? this._processedDoubleTap(b) : this._processedTap(d)) : this._processedTap(d) : this._processedTap(d) : this._processedTap(c || d))
        },
        _processedTap: function(a) {
            var b = a.event;
            this._fire("onProcessedTap", b);
            1 === a.touchInfos.length ? this._fire("onTap", this._fixEvent(b)) :
                2 === a.touchInfos.length && this._fire("onTwoFingerTap", b)
        },
        _processedDoubleTap: function(a) {
            var b = 1 === a[1].touchInfos.length,
                c;
            b && (c = [this._fixEvent(a[0].event), this._fixEvent(a[1].event)], c[1].relatedEvents = c);
            a = [a[0].event, a[1].event];
            a[1].relatedEvents = a;
            this._fire("onProcessedDoubleTap", a[1]);
            b && (this._fire("onDoubleTap", c[1]), this._fire("onDblClick", c[1]))
        },
        _addTouch: function(a) {
            var b = a.changedTouches,
                c = this._nodeTouches,
                d, f, e;
            this._numTouches += b.length;
            for (a = 0; a < b.length; a++) {
                f = c.length;
                e = !1;
                for (d =
                    0; d < f && !(e = c[d].identifier === b[a].identifier); d++);
                e ? this._numTouches-- : c.push(b[a])
            }
            for (a = c.length - 1; 0 <= a; a--) s.isDescendant(c[a].target, document.body) || (c.splice(a, 1), this._numTouches--);
            0 > this._numTouches && (this._numTouches = 0)
        },
        _removeTouch: function(a) {
            var b = [],
                c = [],
                d = a.changedTouches,
                f = this._nodeTouches;
            this._numTouches -= d.length;
            0 > this._numTouches && (this._numTouches = 0);
            for (a = 0; a < d.length; a++) b.push(d[a].identifier);
            for (a = f.length - 1; 0 <= a; a--) - 1 !== b.indexOf(f[a].identifier) && c.push(f.splice(a,
                1)[0]);
            return c
        },
        _updateTouch: function(a) {
            var b = [],
                c, d = a.changedTouches,
                f = this._nodeTouches;
            for (a = 0; a < d.length; a++) b.push(d[a].identifier);
            for (a = 0; a < f.length; a++) c = b.indexOf(f[a].identifier), -1 !== c && f.splice(a, 1, d[c])
        },
        _mouseOver: function(a) {
            this._fire("onMouseOver", this._processMouseEvent(a))
        },
        _mouseOut: function(a) {
            this._fire("onMouseOut", this._processMouseEvent(a))
        },
        _mouseDown: function(a) {
            this._fire("onMouseDown", this._processMouseEvent(a))
        },
        _mouseUp: function(a) {
            this._fire("onMouseUp", this._processMouseEvent(a))
        },
        _mouseClick: function(a) {
            this._fire("onClick", this._processMouseEvent(a))
        },
        _fire: function(a, b) {
            if ("onDblClick" === a && this.mouseEvents) {
                this.mouseEvents.preventClickEvents(!0);
                var c = this;
                setTimeout(function() {
                    c.mouseEvents.preventClickEvents(!1)
                }, 350)
            }
            if (this[a]) this[a](b);
            if (this.map && this.map[a]) this.map[a](b)
        },
        _fixEvent: function(a) {
            var b = {},
                c;
            for (c in a) b[c] = a[c];
            this.map && (b.screenPoint = b.screenPoints[0], b.mapPoint = b.mapPoints[0]);
            return b
        },
        _processTouchEvent: function(a, b) {
            var c = this.map,
                d = c && c.position,
                f = 0;
            if (d && b)
                if (k.isArray(b)) {
                    var e, g;
                    a.screenPoints = [];
                    a.mapPoints = [];
                    for (e = 0; e < b.length; e++) b[e] ? (g = new n(b[e].pageX - d.x, b[e].pageY - d.y), a.screenPoints.push(g), a.mapPoints.push(c.extent ? c.toMap(g) : new m)) : f++
                } else a.screenPoint = new n(b.pageX - d.x, b.pageY - d.y), a.mapPoint = c.extent ? c.toMap(a.screenPoint) : new m;
            a.numPoints = b ? k.isArray(b) ? b.length - f : 1 : 0;
            return a
        },
        _processMouseEvent: function(a) {
            var b = this.map,
                c = b && b.position;
            c && (a.screenPoint = new n(a.pageX - c.x, a.pageY - c.y), a.mapPoint = b.extent ? b.toMap(a.screenPoint) :
                new m);
            return a
        },
        setImmediateTap: function(a) {
            this._immediate = a
        },
        destroy: function() {
            var a = this.node;
            a.removeEventListener("touchstart", this._touchStart, !1);
            a.removeEventListener("touchmove", this._touchMove, !1);
            a.removeEventListener("touchend", this._touchEnd, !1);
            a.removeEventListener("touchcancel", this._touchCancel, !1);
            this.map && (a.removeEventListener("mouseover", this._mouseOver, !1), a.removeEventListener("mouseout", this._mouseOut, !1), a.removeEventListener("mousedown", this._mouseDown, !1), a.removeEventListener("mouseup",
                this._mouseUp, !1), a.removeEventListener("click", this._mouseClick, !1));
            q.setSelectable(a, !0);
            clearTimeout(this._tapTimer);
            this.node = this.map = this._numTouches = this._nodeTouches = this._touches = this._touchIds = this._taps = null
        }
    })
});