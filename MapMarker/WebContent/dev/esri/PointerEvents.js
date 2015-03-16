//>>built
define("esri/PointerEvents", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/has", "./kernel", "./Evented", "./geometry/Point", "./geometry/ScreenPoint"], function(q, g, h, r, t, s, k, l) {
    return q([s], {
        declaredClass: "esri.PointerEvents",
        tapRadius: 8,
        clickRadius: 2,
        doubleTapRadius: 10,
        tapStartTolerance: 50,
        doubleTapDuration: 300,
        minWheelValue: 1,
        maxWheelValue: 1,
        mozWheelDivisor: -1 !== r("mac") ? 1 : 3,
        wheelDivisor: 120,
        preventPageScroll: !0,
        constructor: function(a, c) {
            this.node = a;
            g.mixin(this, c);
            void 0 !== a.style.msTouchAction ? a.style.msTouchAction =
                "none" : void 0 !== a.style.touchAction && (a.style.touchAction = "none");
            var b = navigator.msPointerEnabled,
                d = function(a) {
                    a.preventDefault()
                };
            a.addEventListener("selectstart", d, !1);
            a.addEventListener("dragstart", d, !1);
            this._pointerDown = g.hitch(this, this._pointerDown);
            this._pointerMove = g.hitch(this, this._pointerMove);
            this._pointerUp = g.hitch(this, this._pointerUp);
            this._pointerCancel = g.hitch(this, this._pointerCancel);
            a.addEventListener(b ? "MSPointerDown" : "pointerdown", this._pointerDown, !1);
            a.addEventListener(b ?
                "MSPointerMove" : "pointermove", this._pointerMove, !1);
            a.addEventListener(b ? "MSPointerUp" : "pointerup", this._pointerUp, !1);
            a.addEventListener(b ? "MSPointerCancel" : "pointercancel", this._pointerCancel, !1);
            this.map && (this._mouseOver = g.hitch(this, this._mouseOver), this._mouseOut = g.hitch(this, this._mouseOut), this._mouseLeave = g.hitch(this, this._mouseLeave), this._mouseDown = g.hitch(this, this._mouseDown), this._mouseUp = g.hitch(this, this._mouseUp), this._mouseClick = g.hitch(this, this._mouseClick), this._mouseWheel = g.hitch(this,
                this._mouseWheel), this._mouseMove = g.hitch(this, this._mouseMove), this._mouseEnter = g.hitch(this, this._mouseEnter), this._onKeyDown = g.hitch(this, this._onKeyDown), this._onKeyUp = g.hitch(this, this._onKeyUp), a.addEventListener("mouseover", this._mouseOver, !1), a.addEventListener("mouseout", this._mouseOut, !1), a.addEventListener("mouseleave", this._mouseLeave, !1), a.addEventListener("mousedown", this._mouseDown, !1), a.addEventListener("mouseup", this._mouseUp, !1), a.addEventListener("click", this._mouseClick, !1), a.addEventListener("mousewheel",
                this._mouseWheel, !1), a.addEventListener("mousemove", this._mouseMove, !1), a.addEventListener("mouseenter", this._mouseEnter, !1));
            this._numTouches = 0;
            this._touches = {};
            this._touchIds = [];
            this._taps = [];
            this._immediate = !1
        },
        _pointerDown: function(a) {
            if (-1 < h.indexOf(this._touchIds, a.pointerId)) this._pointerUp(a);
            else {
                var c = this._touches,
                    b = a.target,
                    d = a.pointerId,
                    e = this._touchIds,
                    f, g = (new Date).getTime();
                f = c[d] = {};
                f.pointerId = d;
                f.startX = f.pageX = a.pageX;
                f.startY = f.pageY = a.pageY;
                f.startTS = g;
                e.push(d);
                this._numTouches++;
                b.setPointerCapture ? b.setPointerCapture(d) : b.msSetPointerCapture && b.msSetPointerCapture(d);
                b = c[e[0]];
                c = c[e[1]];
                1 !== this._numTouches && (2 === this._numTouches ? this._swipeActive && (b && (b.startX = b.pageX, b.startY = b.pageY, b.moved = !1), this._swipeActive = !1, this._fire("onSwipeEnd", this._processTouchEvent(a, b))) : this._swipeActive ? (this._swipeActive = !1, this._fire("onSwipeEnd", this._processTouchEvent(a, b))) : this._pinchActive && (this._pinchActive = !1, this._fire("onPinchEnd", this._processTouchEvent(a, [b, c]))))
            }
        },
        _pointerMove: function(a) {
            var c =
                this._touches,
                b = this._touchIds,
                d, e, f;
            if ((d = c[a.pointerId]) && !(d.pageX === a.pageX && d.pageY === a.pageY)) {
                d.pageX = a.pageX;
                d.pageY = a.pageY;
                e = Math.abs(d.pageX - d.startX);
                f = Math.abs(d.pageY - d.startY);
                if (!d.moved && (e >= this.tapRadius || f >= this.tapRadius)) d.moved = d.absMoved = !0;
                if (1 === this._numTouches) this._swipeActive ? this._fire("onSwipeMove", this._processTouchEvent(a, a)) : d.moved && (this._swipeActive = !0, this._fire("onSwipeStart", this._processTouchEvent(a, a)));
                else if (2 === this._numTouches)
                    if (d = c[b[0]], c = c[b[1]],
                        this._pinchActive) this._fire("onPinchMove", this._processTouchEvent(a, [d, c]));
                    else if (d.moved || c.moved) b = Math.abs(d.startX - c.startX), e = Math.abs(d.startY - c.startY), b = Math.sqrt(b * b + e * e), e = Math.abs(d.pageX - c.pageX), f = Math.abs(d.pageY - c.pageY), e = Math.sqrt(e * e + f * f), Math.abs(e - b) >= 2 * this.tapRadius && (this._pinchActive = !0, this._fire("onPinchStart", this._processTouchEvent(a, [d, c])))
            }
        },
        _pointerUp: function(a) {
            var c = this._touches,
                b, d = this.node,
                e = a.target,
                f = a.pointerId,
                g = this._touchIds,
                n = g.slice(0),
                k = h.map(n, function(a) {
                    return c[a]
                }),
                m = (new Date).getTime();
            if (b = c[f])
                if (b.pageX = a.pageX, b.pageY = a.pageY, b.endTS = m, this._numTouches--, e.releasePointerCapture ? e.releasePointerCapture(f) : e.msReleasePointerCapture && e.msReleasePointerCapture(f), 0 === this._numTouches)
                    if (this._touches = {}, this._touchIds = [], this._swipeActive) this._swipeActive = !1, this._fire("onSwipeEnd", this._processTouchEvent(a, a));
                    else if (this._pinchActive) this._pinchActive = !1, this._fire("onPinchEnd", this._processTouchEvent(a, a));
            else {
                if (!b.absMoved) {
                    var e = Infinity,
                        f = -Infinity,
                        g = Infinity,
                        m = -Infinity,
                        l = this.tapStartTolerance,
                        p;
                    for (p = 0; p < n.length; p++) b = k[p], b.startTS < e && (e = b.startTS), b.startTS > f && (f = b.startTS), b.endTS < g && (g = b.endTS), b.endTS > m && (m = b.endTS);
                    Math.abs(f - e) <= l && Math.abs(m - g) <= l && this._basicTap(a, k)
                }
            } else 1 === this._numTouches && this._pinchActive && (g.splice(h.indexOf(g, a.pointerId), 1), delete c[a.pointerId], b = c[g[0]], b.startX = b.pageX, b.startY = b.pageY, b.moved = !1, document.msElementsFromPoint && (n = document.msElementsFromPoint(b.pageX, b.pageY), h.some(n, function(a) {
                return a ===
                    d
            }) || (this._touches = {}, this._touchIds = [], this._numTouches = 0)), this._pinchActive = !1, this._fire("onPinchEnd", this._processTouchEvent(a, [a, b])))
        },
        _pointerCancel: function(a) {
            this._numTouches && this._pointerUp(a)
        },
        _basicTap: function(a, c) {
            var b = (new Date).getTime(),
                d = this,
                e = this._immediate;
            a = this._processTouchEvent(a, c);
            this._taps.push({
                touchInfos: c,
                ts: b,
                event: a
            });
            2 < this._taps.length && this._taps.shift();
            this._fire("onBasicTap", a);
            clearTimeout(this._tapTimer);
            b = 2 === this._taps.length ? this.doubleTapDuration /
                2 : this.doubleTapDuration;
            this._tapTimer = setTimeout(function() {
                var a = d;
                d = null;
                clearTimeout(a._tapTimer);
                a._analyzeTap(e)
            }, e ? 0 : b)
        },
        _analyzeTap: function(a) {
            var c = this._taps,
                b = c[0],
                d = c[1],
                e = b.touchInfos,
                f = d && d.touchInfos;
            c.length && (a || (this._taps = []), b && d ? e.length === f.length ? d.ts - b.ts <= this.doubleTapDuration ? (1 === e.length ? (a = Math.abs(e[0].startX - f[0].startX), e = Math.abs(e[0].startY - f[0].startY), e = a <= this.doubleTapRadius && e <= this.doubleTapRadius) : e = !0, e ? this._processedDoubleTap(c) : this._processedTap(d)) :
                this._processedTap(d) : this._processedTap(d) : this._processedTap(b || d))
        },
        _processedTap: function(a) {
            var c = a.event;
            this._fire("onProcessedTap", c);
            1 === a.touchInfos.length ? this._fire("onTap", this._fixEvent(c)) : 2 === a.touchInfos.length && this._fire("onTwoFingerTap", c)
        },
        _processedDoubleTap: function(a) {
            var c = 1 === a[1].touchInfos.length,
                b;
            c && (b = [this._fixEvent(a[0].event), this._fixEvent(a[1].event)], b[1].relatedEvents = b);
            a = [a[0].event, a[1].event];
            a[1].relatedEvents = a;
            this._fire("onProcessedDoubleTap", a[1]);
            c &&
                (this._fire("onDoubleTap", b[1]), this._fire("onDblClick", b[1]))
        },
        _mouseOver: function(a) {
            this._fire("onMouseOver", this._processMouseEvent(a))
        },
        _mouseMove: function(a) {
            this._fire("onMouseMove", this._processMouseEvent(a))
        },
        _mouseOut: function(a) {
            this._fire("onMouseOut", this._processMouseEvent(a))
        },
        _mouseLeave: function(a) {
            document.removeEventListener("keydown", this._onKeyDown, !1);
            document.removeEventListener("keyup", this._onKeyUp, !1);
            this._fire("onMouseOut", this._processMouseEvent(event))
        },
        _mouseDown: function(a) {
            this._downX =
                a.pageX;
            this._downY = a.pageY;
            this._fire("onMouseDown", this._processMouseEvent(a))
        },
        _mouseUp: function(a) {
            this._fire("onMouseUp", this._processMouseEvent(a))
        },
        _mouseClick: function(a) {
            Math.abs(a.pageX - this._downX) <= this.clickRadius && Math.abs(a.pageY - this._downY) <= this.clickRadius && this._fire("onClick", this._processMouseEvent(a))
        },
        _mouseWheel: function(a) {
            var c = this.map;
            (c ? c.isScrollWheelZoom || c.isScrollWheelPan : this.preventPageScroll) && a.preventDefault();
            var c = a.wheelDelta ? a.wheelDelta / this.wheelDivisor :
                -a.detail / this.mozWheelDivisor,
                b = Math.abs(c),
                b = b <= this.minWheelValue ? this.minWheelValue : this.maxWheelValue;
            a.value = 0 > c ? -b : b;
            this._fire("onMouseWheel", this._processMouseEvent(a))
        },
        _mouseEnter: function(a) {
            document.removeEventListener("keydown", this._onKeyDown, !1);
            document.removeEventListener("keyup", this._onKeyUp, !1);
            document.addEventListener("keydown", this._onKeyDown, !1);
            document.addEventListener("keyup", this._onKeyUp, !1);
            this._fire("onMouseEnter", this._processMouseEvent(a))
        },
        _onKeyDown: function(a) {
            this._fire("onKeyDown",
                a)
        },
        _onKeyUp: function(a) {
            this._fire("onKeyUp", a)
        },
        _fire: function(a, c) {
            if (this[a]) this[a](c);
            if (this.map && this.map[a]) this.map[a](c)
        },
        _fixEvent: function(a) {
            var c = {},
                b;
            for (b in a) c[b] = a[b];
            this.map && (c.screenPoint = c.screenPoints[0], c.mapPoint = c.mapPoints[0]);
            return c
        },
        _processTouchEvent: function(a, c) {
            var b = this.map,
                d = b && b.position,
                e = 0;
            if (d && c)
                if (g.isArray(c)) {
                    var f, h;
                    a.screenPoints = [];
                    a.mapPoints = [];
                    for (f = 0; f < c.length; f++) c[f] ? (h = new l(c[f].pageX - d.x, c[f].pageY - d.y), a.screenPoints.push(h), a.mapPoints.push(b.extent ?
                        b.toMap(h) : new k)) : e++
                } else a.screenPoint = new l(c.pageX - d.x, c.pageY - d.y), a.mapPoint = b.extent ? b.toMap(a.screenPoint) : new k;
            a.numPoints = c ? g.isArray(c) ? c.length - e : 1 : 0;
            return a
        },
        _processMouseEvent: function(a) {
            var c = this.map,
                b = c && c.position;
            b && (a.screenPoint = new l(a.pageX - b.x, a.pageY - b.y), a.mapPoint = c.extent ? c.toMap(a.screenPoint) : new k);
            return a
        },
        setImmediateTap: function(a) {
            this._immediate = a
        },
        destroy: function() {
            var a = this.node;
            a.removeEventListener("MSPointerDown", this._pointerDown, !1);
            a.removeEventListener("MSPointerMove",
                this._pointerMove, !1);
            a.removeEventListener("MSPointerUp", this._pointerUp, !1);
            a.removeEventListener("MSPointerCancel", this._pointerCancel, !1);
            this.map && (a.removeEventListener("mouseover", this._mouseOver, !1), a.removeEventListener("mousemove", this._mouseMove, !1), a.removeEventListener("mouseout", this._mouseOut, !1), a.removeEventListener("mouseleave", this._mouseLeave, !1), a.removeEventListener("mousedown", this._mouseDown, !1), a.removeEventListener("mouseup", this._mouseUp, !1), a.removeEventListener("click",
                this._mouseClick, !1), a.removeEventListener("mouseenter", this._mouseEnter, !1));
            clearTimeout(this._tapTimer);
            this.node = this.map = this._numTouches = this._touches = this._touchIds = this._taps = null
        }
    })
});