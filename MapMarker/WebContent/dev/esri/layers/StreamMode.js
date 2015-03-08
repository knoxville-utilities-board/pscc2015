//>>built
define("esri/layers/StreamMode", ["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/has", "../kernel", "../SpatialReference", "../tasks/query", "../tasks/QueryTask", "../geometry/jsonUtils", "./RenderMode"], function(n, m, k, u, v, p, q, r, s, t) {
    return n([t], {
        declaredClass: "esri.layers._StreamMode",
        constructor: function(a, b) {
            this.featureLayer = a;
            this._featureMap = {};
            this._setRefreshRate();
            this._drawBuffer = {
                adds: [],
                updates: []
            };
            this._timeoutId = null;
            this._flushDrawBuffer = m.hitch(this, this._flushDrawBuffer);
            this._featuresByTime = {};
            this._lastEndTimeCheck =
                null;
            this._drawFeatures = m.hitch(this, this._drawFeatures);
            this._queryErrorHandler = m.hitch(this, this._queryErrorHandler)
        },
        startup: function() {},
        propertyChangeHandler: function(a) {
            this._init && (0 === a ? this._applyTimeFilter() : 3 === a ? this._redrawAllTracks() : console.debug("StreamLayer: Stream Layer only supports changing map time or maximumTrackPoints. Layer id \x3d " + this.featureLayer.id))
        },
        drawFeature: function(a) {
            var b = this.featureLayer,
                c = b.objectIdField;
            this._timeoutId || (this._timeoutId = setTimeout(this._flushDrawBuffer,
                this._refreshRate));
            b._joinField && this._getFeature(a.attributes[c]) ? this._drawBuffer.updates.push({
                oid: a.attributes[c],
                updates: a
            }) : this._drawBuffer.adds.push(a)
        },
        resume: function() {
            this.propertyChangeHandler(0)
        },
        refresh: function() {
            var a = this.featureLayer;
            a && (a._fireUpdateStart(), this._flushDrawBuffer())
        },
        _drawFeatures: function(a) {
            this._purgeRequests();
            var b = this.featureLayer;
            b._create(a.features || []);
            b._fireUpdateEnd(null, null)
        },
        _applyTimeFilter: function(a) {
            this.inherited(arguments);
            this._redrawAllTracks()
        },
        _removeFeatures: function(a) {
            var b = this.featureLayer,
                c = b.objectIdField;
            a && k.forEach(a, function(a) {
                a = a.attributes[c];
                b._unSelectFeatureIIf(a, this);
                this._decRefCount(a);
                this._removeFeatureIIf(a)
            }, this)
        },
        _addFeatures: function(a) {
            var b = this.featureLayer,
                c = b._endTimeField,
                f, d, e, g = [],
                h = [],
                l = [];
            f = b._trackManager;
            d = b.objectIdField;
            if (f)
                for (e in a = f.addFeatures(a), a) a.hasOwnProperty(e) && (g.push(e), a[e].adds && (h = h.concat(a[e].adds)), a[e].deletes && (l = l.concat(a[e].deletes)));
            else h = a;
            k.forEach(h, function(a) {
                var b =
                    a.attributes[d],
                    e;
                if (e = c && a.attributes[c]) e = 1E3 * Math.ceil(e / 1E3), this._featuresByTime[e] ? this._featuresByTime[e].push(b) : this._featuresByTime[e] = [b];
                this._addFeatureIIf(b, a);
                this._incRefCount(b)
            }, this);
            l.length && this._removeFeatures(l);
            f && f.refreshTracks(g)
        },
        _updateFeatures: function(a) {
            var b = this.featureLayer,
                c, f, d = [];
            c = b._trackManager;
            f = b._trackIdField;
            k.forEach(a, function(a) {
                var g = a.updates;
                a = this._getFeature(a.oid);
                var h;
                if (a) {
                    g.geometry && a.setGeometry(g.geometry);
                    g = g.attributes || {};
                    for (h in g) g.hasOwnProperty(h) &&
                        (a.attributes[h] = g[h]);
                    a.visible = this._checkFeatureTimeIntersects(a);
                    c && a.attributes[f] ? d.push(a.attributes[f]) : b._repaint(a, null, !0)
                }
            }, this);
            d.length && c.refreshTracks(d)
        },
        _redrawAllTracks: function() {
            var a = this.featureLayer._trackManager,
                b;
            if (a && (b = a.trimTracks()) && 0 < b.length) this._removeFeatures(b), a.refreshTracks()
        },
        _flushDrawBuffer: function() {
            clearTimeout(this._timeoutId);
            var a = this._drawBuffer,
                b = a.adds.splice(0, a.adds.length),
                c = a.updates.splice(0, a.updates.length),
                a = this.featureLayer;
            if (!a) return !1;
            a.updating || a._fireUpdateStart();
            this._addFeatures(b);
            this._updateFeatures(c);
            if ((b = this._getExpiredFeatures()) && b.length) this._removeFeatures(b), a._trackManager && a._trackManager.removeFeatures(b);
            a._purge();
            a._fireUpdateEnd();
            this._timeoutId = null
        },
        _clearDrawBuffer: function() {
            var a = this._timeoutId,
                b = this._drawBuffer,
                c = b.adds,
                b = b.updates;
            a && clearTimeout(a);
            c.splice(0, c.length);
            b.splice(0, b.length);
            this._timeoutId = null
        },
        _setRefreshRate: function(a) {
            a = a || 0 === a ? a : 200;
            0 > a && (a = 200);
            this._refreshRate = a
        },
        _checkFeatureTimeIntersects: function(a) {
            var b = this.featureLayer,
                c = b.getMap().timeExtent;
            return !c || !b.timeInfo || !b.timeInfo.startTimeField && !b.timeInfo.endTimeField ? !0 : 0 < b._filterByTime([a], c.startTime, c.endTime).match.length
        },
        _getRequestId: function(a) {
            return ("_" + a.name + a.layerId + a._ulid).replace(/[^a-zA-Z0-9\_]+/g, "_")
        },
        _fetchArchive: function(a) {
            var b = this.featureLayer,
                c, f, d, e, g, h;
            b._fireUpdateStart();
            if (a) a = new r(a), c = new q, f = this.map, d = b.getFilter() || {}, e = d.where || "1\x3d1", g = d.geometry ? s.fromJson(d.geometry) :
                null, d = d.outFields ? d.outFields.split(",") : ["*"], c.geometry = g, c.where = e, c.outFields = d, c.returnGeometry = !0, c.outSpatialReference = new p(f.spatialReference.toJson()), b._usePatch && (h = this._getRequestId(b), this._cancelPendingRequest(null, h)), a.execute(c, this._drawFeatures, this._queryErrorHandler, h);
            else return this._fireUpdateEnd({
                error: "No url provided"
            }), !1
        },
        _queryErrorHandler: function(a) {
            this._purgeRequests();
            var b = this.featureLayer;
            b._errorHandler(a);
            b._fireUpdateEnd(a)
        },
        _getExpiredFeatures: function() {
            var a,
                b, c, f = [],
                d = [];
            if (!this.featureLayer._endTimeField) return d;
            a = 1E3 * Math.floor(this._lastEndTimeCheck / 1E3);
            this._lastEndTimeCheck = b = 1E3 * Math.ceil(Date.now() / 1E3);
            if (a && a !== b)
                for (c = this._featuresByTime; a <= b; a += 1E3) c[a] && (f = f.concat(c[a]), delete c[a]);
            k.forEach(f, function(a) {
                (a = this._getFeature(a)) && d.push(a)
            }, this);
            return d
        }
    })
});