//>>built
define("esri/dijit/analysis/AnalysisBase", ["require", "dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/json", "dojo/has", "dojo/json", "dojo/Deferred", "dojo/promise/all", "dojo/when", "dojo/data/ItemFileWriteStore", "dojo/string", "dojo/Evented", "dojo/_base/kernel", "dojo/Stateful", "../../kernel", "../../lang", "../../request", "../../tasks/Geoprocessor", "dojo/i18n!../../nls/jsapi", "./utils", "../../IdentityManager"], function(s, v, e, g, h, B, C, n, q, w, x, p, y, z, A, k, l, m, t, r, u) {
    return v([A, y], {
        declaredClass: "esri.dijit.analysis.AnalysisBase",
        isOutputLayerItemUpdated: !1,
        analysisGpServer: null,
        toolName: null,
        portalUrl: null,
        jobParams: null,
        itemParams: null,
        gp: null,
        resultParameter: null,
        signInPromise: null,
        getResultLyrInfos: !1,
        _jobInfo: null,
        _popupInfo: null,
        _toolServiceUrl: null,
        _counter: null,
        constructor: function(a) {
            this.isOutputLayerItemUpdated = !1;
            this._rids = [];
            this._counter = 0;
            this._popupInfo = [];
            a.analysisGpServer ? this._signIn(a.analysisGpServer) : a.portalUrl && (this.portalUrl = a.portalUrl, this._signIn(a.portalUrl, !0));
            this.i18n = {};
            e.mixin(this.i18n, r.common);
            e.mixin(this.i18n,
                r.analysisTools);
            e.mixin(this.i18n, r.analysisMsgCodes)
        },
        execute: function(a) {
            this.jobParams = a.jobParams;
            this.itemParams = this.jobParams.OutputName ? a.itemParams : null;
            this.signInPromise.then(e.hitch(this, this._checkUser))
        },
        _checkUser: function() {
            var a;
            if (a = k.id.findCredential(this.portalUrl).userId) a = this.portalUrl + "/sharing/community/users/" + a, m({
                url: a,
                content: {
                    f: "json"
                }
            }).then(e.hitch(this, this._handleUserProfileResponse), e.hitch(this, function(a) {
                this.emit("job-fail", {
                    message: a.message + (a.details ? a.details.toString() :
                        ""),
                    jobParams: this.jobParams
                })
            }))
        },
        _handleUserProfileResponse: function(a) {
            a.accountId ? "account_admin" === a.role || "account_publisher" === a.role || "org_admin" === a.role || "org_publisher" === a.role ? this.itemParams ? this._checkServiceName(a.accountId) : (this._submitGpJob(), this.emit("start", this.jobParams)) : this.emit("job-fail", {
                message: this.i18n.pubRoleMsg,
                messageCode: "AB_0001",
                jobParams: this.jobParams
            }) : this.emit("job-fail", {
                message: this.i18n.orgUsrMsg,
                jobParams: this.jobParams
            })
        },
        _checkServiceName: function(a) {
            var b;
            k.id.findCredential(this.portalUrl);
            a = this.portalUrl + "/sharing/portals/" + a + "/isServiceNameAvailable";
            b = {
                name: h.fromJson(this.jobParams.OutputName).serviceProperties.name,
                type: "Feature Service",
                f: "json"
            };
            m({
                url: a,
                content: b
            }).then(e.hitch(this, function(a) {
                a.available ? (this._createService(), this.emit("start", this.jobParams)) : this.emit("job-fail", {
                    message: this.i18n.servNameExists,
                    type: "warning",
                    messageCode: "AB_0002",
                    jobParams: this.jobParams
                })
            }), e.hitch(this, function(a) {
                this.emit("job-fail", {
                    message: a.message +
                        (a.details ? a.details.toString() : ""),
                    jobParams: this.jobParams
                })
            }))
        },
        _createService: function() {
            var a, b, d;
            a = k.id.findCredential(this.portalUrl).userId;
            b = h.fromJson(this.jobParams.OutputName);
            a && (d = this.itemParams.folder, a = this.portalUrl + "/sharing/content/users/" + a + (d && "/" !== d ? "/" + d : "") + "/createService", b = {
                createParameters: h.toJson({
                    currentVersion: 10.2,
                    serviceDescription: "",
                    hasVersionedData: !1,
                    supportsDisconnectedEditing: !1,
                    hasStaticData: !0,
                    maxRecordCount: 2E3,
                    supportedQueryFormats: "JSON",
                    capabilities: "Query",
                    description: "",
                    copyrightText: "",
                    allowGeometryUpdates: !1,
                    syncEnabled: !1,
                    editorTrackingInfo: {
                        enableEditorTracking: !1,
                        enableOwnershipAccessControl: !1,
                        allowOthersToUpdate: !0,
                        allowOthersToDelete: !0
                    },
                    xssPreventionInfo: {
                        xssPreventionEnabled: !0,
                        xssPreventionRule: "InputOnly",
                        xssInputRule: "rejectInvalid"
                    },
                    tables: [],
                    name: b.serviceProperties.name
                }),
                outputType: "featureService",
                f: "json"
            }, m({
                url: a,
                content: b
            }, {
                usePost: !0
            }).then(e.hitch(this, this._submitGpJob), e.hitch(this, this._handleCreateServiceError)))
        },
        _handleCreateServiceError: function(a) {
            this.emit("job-fail", {
                message: a.message + (a.details ? a.details.toString() : ""),
                jobParams: this.jobParams
            })
        },
        _getSelf: function(a) {
            return m({
                url: a + "/sharing/rest/portals/self",
                content: {
                    culture: z.locale,
                    f: "json"
                },
                callbackParamName: "callback",
                timeout: 0
            }, {})
        },
        _submitGpJob: function(a) {
            var b;
            this.itemParams && (this.currentGpItemId = a.itemId, b = h.fromJson(this.jobParams.OutputName), b.serviceProperties && (b.serviceProperties.serviceUrl = a.serviceurl), b.itemProperties = {
                itemId: a.itemId
            }, this.jobParams.OutputName = h.toJson(b));
            this.analysisGpServer ?
                ((!this._toolServiceUrl || !this.gp) && this.set("toolServiceUrl", this.analysisGpServer + "/" + this.toolName), this.gp.setUpdateDelay(3E3), this.gp.submitJob(this.jobParams, e.hitch(this, this._gpJobComplete), e.hitch(this, this._gpJobStatus), e.hitch(this, this._gpJobFailed)), this.emit("job-submit", this.jobParams)) : this._getSelf(this.portalUrl).then(e.hitch(this, function(a) {
                    this.analysisGpServer = a.helperServices.analysis && a.helperServices.analysis.url ? a.helperServices.analysis.url : null;
                    this.set("toolServiceUrl",
                        this.analysisGpServer + "/" + this.toolName);
                    this.gp.setUpdateDelay(3E3);
                    this.gp.submitJob(this.jobParams, e.hitch(this, this._gpJobComplete), e.hitch(this, this._gpJobStatus), e.hitch(this, this._gpJobFailed));
                    this.emit("job-submit", this.jobParams)
                }))
        },
        _updateItem: function(a) {
            var b, d, c;
            if (b = k.id.findCredential(this.portalUrl).userId) return d = this.itemParams.folder, b = this.portalUrl + "/sharing/content/users/" + b + (d && "/" !== d ? "/" + d : "") + "/items/" + this.currentGpItemId + "/update", a && (c = a.item.typeKeywords), (a = g.some(c,
                function(a, b) {
                    return a && -1 !== a.indexOf("jobUrl:")
                }, this)) || c.push("jobUrl:" + this._toolServiceUrl + "/jobs/" + this._jobInfo.jobId), this.itemParams.typeKeywords = c.join(","), c = e.mixin({
                f: "json"
            }, this.itemParams), a = {}, this._popupInfo && 0 < this._popupInfo.length ? a.layers = g.map(this._popupInfo, function(a, b) {
                a.description = null;
                var c = {
                    id: b,
                    popupInfo: a
                };
                this._showLabels && this._showLabels[b] && (c.showLabels = this._showLabels[b]);
                return c
            }, this) : this._showLabels && 0 < this._showLabels.length && (a.layers = g.map(this._showLabels,
                function(a, b) {
                    var c = {
                        id: b
                    };
                    this._showLabels && this._showLabels[b] && (c.showLabels = this._showLabels[b]);
                    return c
                }, this)), c.text = h.toJson(a), b = m({
                url: b,
                content: c
            }, {
                usePost: !0
            }), b.then(e.hitch(this, this._handleItemUpdate), e.hitch(this, this._handleUpdateItemError)), b
        },
        _handleItemUpdate: function(a) {
            this.isOutputLayerItemUpdated = !0
        },
        _handleItemDataUpdate: function(a) {},
        _handleUpdateItemError: function(a) {
            this.isOutputLayerItemUpdated = !0;
            this.emit("job-fail", {
                message: a.message + (a.details ? a.details.toString() :
                    ""),
                jobParams: this.jobParams
            })
        },
        _handleErrorResponse: function(a) {
            this.emit("job-fail", a)
        },
        _refreshItem: function() {
            var a, b;
            if (a = k.id.findCredential(this.portalUrl).userId) return b = this.itemParams.folder, a = this.portalUrl + "/sharing/content/users/" + a + (b && "/" !== b ? "/" + b : "") + "/items/" + this.currentGpItemId + "/refresh", m({
                url: a,
                content: {
                    f: "json"
                }
            }, {
                usePost: !0
            })
        },
        _handleItemRefresh: function(a) {},
        _readItem: function() {
            var a, b;
            if (a = k.id.findCredential(this.portalUrl).userId) return b = this.itemParams.folder, a = this.portalUrl +
                "/sharing/content/users/" + a + (b && "/" !== b ? "/" + b : "") + "/items/" + this.currentGpItemId, a = m({
                    url: a,
                    content: {
                        f: "json"
                    }
                }), a.then(e.hitch(this, this._updateItem))
        },
        _gpJobStatus: function(a) {
            var b = "",
                d = [],
                c, f;
            a.jobParams = this.jobParams;
            a.resultParameter = this.resultParameter;
            a.returnProcessInfo = this.jobParams.returnProcessInfo;
            a.getResultLyrInfos = this.getResultLyrInfos;
            a.currentGpItemId = this.currentGpItemId;
            a.itemParams = this.itemParams;
            if ("esriJobFailed" === a.jobStatus || "esriJobSucceeded" === a.jobStatus) a.message ?
                b = a.message : a.messages && (d = g.filter(a.messages, function(a) {
                    if (("esriJobMessageTypeError" === a.type || "esriJobMessageTypeWarning" === a.type) && a.description && -1 !== a.description.indexOf("messageCode")) return a.description
                }), 0 < d.length && g.forEach(d, function(d) {
                    c = h.fromJson(d.description);
                    f = "";
                    "esriJobMessageTypeWarning" === d.type && (a.type = "warning");
                    c.messageCode ? (f = l.isDefined(this.i18n[c.messageCode]) ? this.i18n[c.messageCode] : c.message, f = l.isDefined(c.params) ? p.substitute(f, c.params) : f, b += f + "\x26nbsp;") :
                        c.error && c.error.messageCode && (f = l.isDefined(this.i18n[c.error.messageCode]) ? this.i18n[c.error.messageCode] : c.message, f = l.isDefined(c.error.params) ? p.substitute(f, c.error.params) : f, b += f + "\x26nbsp;")
                }, this)), a.message = b, this._checkTimer && (clearInterval(this._checkTimer), this._checkTimer = null, this._gpJobComplete(a)), "esriJobFailed" === a.jobStatus && this._deleteItem(!1);
            this.emit("job-status", a);
            this._jobInfo = a;
            this.itemParams && !this.isOutputLayerItemUpdated && this._readItem()
        },
        _updateRefreshItem: function(a) {
            var b = [],
                d = a[0],
                c = [];
            this.getResultLyrInfos ? (this._lyrInfos = [], this._showLabels = [], g.forEach(a, function(a, b) {
                var d, e;
                if ((e = a.value.url) && -1 !== e.indexOf("/FeatureServer/")) d = e.match(/[0-9]+$/g)[0], c[d] = m({
                    url: e,
                    content: {
                        f: "json"
                    },
                    callbackParamName: "callback"
                })
            }, this), a = q(c)) : (b.push(this._refreshItem()), b.push(this._readItem()), a = "sync");
            w(a, e.hitch(this, function(a) {
                a && (a instanceof Array && 0 < a.length) && (g.forEach(a, function(a, b) {
                    this._lyrInfos[b] = a;
                    a.drawingInfo && a.drawingInfo.labelingInfo && (this._showLabels[b] = !0)
                }, this), b.push(this._refreshItem()), b.push(this._readItem()));
                q(b).then(e.hitch(this, function(a) {
                    d.outputLayerName = h.fromJson(this.jobParams.OutputName).serviceProperties.name;
                    d.value.itemId = this.currentGpItemId;
                    d.analysisInfo = {
                        toolName: this.toolName,
                        jobParams: this.jobParams
                    };
                    this.emit("job-result", d)
                }), e.hitch(this, this._handleDeleteItemError))
            }), e.hitch(this, this._handleDeleteItemError))
        },
        _gpJobComplete: function(a) {
            var b;
            "esriJobSucceeded" === a.jobStatus && (a.jobParams = this.jobParams, this.emit("job-success",
                a), q(this._getGpResultData(a)).then(e.hitch(this, function(d) {
                d = g.filter(d, function(a) {
                    if (a.value && !a.value.empty) return a
                });
                0 === d.length ? (this.currentGpItemId && this._deleteItem(!1), this.emit("job-fail", {
                    message: this.i18n.emptyResultInfoMsg,
                    type: "warning",
                    jobParams: this.jobParams
                })) : (g.forEach(d, function(a) {
                        if (a.value.featureSet && !a.value.url) a.value.featureSet.spatialReference = a.value.layerDefinition.spatialReference;
                        else if (a.value.url && -1 !== a.value.url.indexOf("/FeatureServer/") && a.value.layerInfo &&
                            a.value.layerInfo.popupInfo) {
                            var b = a.value.url.match(/[0-9]+$/g)[0];
                            this._popupInfo[b] = a.value.layerInfo.popupInfo
                        }
                    }, this), b = d[0], this.jobParams.returnProcessInfo ? this.gp.getResultData(a.jobId, "ProcessInfo").then(e.hitch(this, function(a) {
                        var e = [];
                        g.forEach(a.value, function(a) {
                            e.push(h.fromJson(a))
                        }, this);
                        this.currentGpItemId ? (this.itemParams.description = u.buildReport(e), this._updateRefreshItem(d)) : (b.analysisReport = u.buildReport(e), this.emit("job-result", b))
                    })) : this.currentGpItemId ? this._updateRefreshItem(d) :
                    this.emit("job-result", b))
            })))
        },
        _gpJobFailed: function(a) {
            var b = "",
                d = [],
                c, f;
            e.clone(a).jobParams = this.jobParams;
            this._checkTimer && (clearInterval(this._checkTimer), this._checkTimer = null);
            a.message ? b = a.message : a.messages && (d = g.filter(a.messages, function(a) {
                if (("esriJobMessageTypeError" === a.type || "esriJobMessageTypeWarning" === a.type) && a.description && -1 !== a.description.indexOf("messageCode")) return a.description
            }), 0 < d.length && g.forEach(d, function(a) {
                c = h.fromJson(a.description);
                f = "";
                c.messageCode ? (f = l.isDefined(this.i18n[c.messageCode]) ?
                    this.i18n[c.messageCode] : c.message, f = l.isDefined(c.params) ? p.substitute(f, c.params) : f, b += f + "\x26nbsp;") : c.error && c.error.messageCode && (f = l.isDefined(this.i18n[c.error.messageCode]) ? this.i18n[c.error.messageCode] : c.message, f = l.isDefined(c.params) ? p.substitute(f, c.error.params) : f, b += f + "\x26nbsp;")
            }, this));
            a.message = b;
            this.emit("job-fail", a)
        },
        _getGpResultData: function(a) {
            var b = [],
                d = [];
            "string" === typeof this.resultParameter ? d.push(this.resultParameter) : this.resultParameter instanceof Array && (d = this.resultParameter);
            g.forEach(d, function(c, d) {
                b.push(this.gp.getResultData(a.jobId, c))
            }, this);
            return b
        },
        cancel: function(a) {
            this.gp.cancelJob(a.jobId).then(e.hitch(this, function(a) {
                "esriJobCancelled" === a.jobStatus && (this.itemParams ? this._deleteItem(!0) : this.emit("job-cancel", a))
            }), function(a) {})
        },
        checkJobStatus: function(a) {
            this.signInPromise.then(e.hitch(this, function() {
                this.gp.setUpdateDelay(3E3);
                this._checkTimer = setInterval(e.hitch(this, this._checkStatus, a, e.hitch(this, this._gpJobStatus), e.hitch(this, this._gpJobFailed)),
                    3E3)
            }))
        },
        _checkStatus: function(a, b, d) {
            this.gp.checkJobStatus(a, b, d)
        },
        _deleteItem: function(a) {
            var b, d;
            if ((b = k.id.findCredential(this.portalUrl).userId) && this.itemParams) d = l.isDefined(this.itemParams.folder) ? this.itemParams.folder : "", b = this.portalUrl + "/sharing/content/users/" + b + (d && "/" !== d ? "/" + d : "") + "/items/" + this.currentGpItemId + "/delete", m({
                url: b,
                content: {
                    f: "json"
                }
            }, {
                usePost: !0
            }).then(e.hitch(this, this._handleItemDelete, a), e.hitch(this, this._handleDeleteItemError))
        },
        _handleItemDelete: function(a, b) {
            a &&
                this.emit("job-cancel", b)
        },
        _handleDeleteItemError: function(a) {
            this.emit("job-fail", {
                message: a.message + (a.details ? a.details.toString() : ""),
                jobParams: this.jobParams
            })
        },
        _initFolderStore: function(a, b) {
            this._fportal = new a.Portal(this.portalUrl);
            this._fportal.signIn().then(e.hitch(this, function(a) {
                this.portalUser = a;
                this.portalUser.getFolders().then(e.hitch(this, function(a) {
                    var d = new x({
                        data: {
                            identifier: "id",
                            label: "name",
                            items: []
                        }
                    });
                    d.newItem({
                        name: this.portalUser.username,
                        id: ""
                    });
                    g.forEach(a, function(a) {
                        d.newItem({
                            name: a.title,
                            id: a.id
                        })
                    });
                    b.resolve(d)
                }))
            }))
        },
        getFolderStore: function() {
            var a = new n,
                b, d, c, f;
            this.signInPromise.then(e.hitch(this, function(e) {
                k.id.findCredential(this.portalUrl);
                b = ["../../arcgis/Portal"];
                d = this._counter++;
                c = this;
                this._rids && this._rids.push(d);
                s(b, function(b) {
                    f = c._rids ? g.indexOf(c._rids, d) : -1; - 1 !== f && (c._rids.splice(f, 1), c._initFolderStore(b, a))
                })
            }));
            return a
        },
        _checkToolUrl: function() {
            var a = new n;
            this.analysisGpServer ? ((!this._toolServiceUrl || !this.gp) && this.set("toolServiceUrl", this.analysisGpServer +
                "/" + this.toolName), a.resolve({
                success: !0
            })) : this._getSelf(this.portalUrl).then(e.hitch(this, function(b) {
                (this.analysisGpServer = b.helperServices.analysis && b.helperServices.analysis.url ? b.helperServices.analysis.url : null) && this.set("toolServiceUrl", this.analysisGpServer + "/" + this.toolName);
                a.resolve({
                    success: !0
                })
            }));
            return a
        },
        getCreditsEstimate: function(a, b) {
            var d, c, f, g, k;
            c = new n;
            this._checkToolUrl().then(e.hitch(this, function(h) {
                this._toolServiceUrl ? k = this._toolServiceUrl : (g = this.portalUrl && -1 !== this.portalUrl.indexOf("dev") ?
                    "dev" : this.portalUrl && -1 !== this.portalUrl.indexOf("qa") ? "qa" : "", k = "http://analysis" + g + ".arcgis.com/arcgis/rest/services/tasks/GPServer/" + this.toolName);
                d = k.replace("/" + a, "/exts/Estimate/" + a);
                f = e.mixin({
                    f: "json"
                }, b);
                m({
                    url: d,
                    content: f
                }, {
                    usePost: !0
                }).then(function(a) {
                    c.resolve(a)
                }, function(a) {
                    c.resolve(a)
                })
            }));
            return c
        },
        _signIn: function(a, b) {
            var d, c, f, h, l;
            this.signInPromise = new n;
            b ? (d = ["../../arcgis/Portal"], c = this._counter++, f = this, this._rids && this._rids.push(c), s(d, e.hitch(this, function(b) {
                h = f._rids ?
                    g.indexOf(f._rids, c) : -1; - 1 !== h && (f._rids.splice(h, 1), this._portal = new b.Portal(a), this._portal.signIn().then(e.hitch(this, function(a) {
                    this._portal.helperServices && this._portal.helperServices.analysis && this._portal.helperServices.analysis.url ? (this.analysisGpServer = this._portal.helperServices.analysis.url, m({
                        url: this.analysisGpServer,
                        content: {
                            f: "json"
                        },
                        callbackParamName: "callback"
                    }).then(e.hitch(this, function(a) {
                        l = k.id.findCredential(this.analysisGpServer);
                        this.signInPromise.resolve(l)
                    }), e.hitch(this,
                        function(a) {
                            this.signInPromise.reject(a)
                        }))) : this.signInPromise.resolve(a)
                }), e.hitch(this, function(a) {
                    this.signInPromise.reject(a)
                })))
            }))) : m({
                url: a,
                content: {
                    f: "json"
                },
                callbackParamName: "callback"
            }).then(e.hitch(this, function(b) {
                b = k.id.findCredential(a);
                this.portalUrl = k.id.findServerInfo(this._toolServiceUrl).owningSystemUrl;
                this.signInPromise.resolve(b)
            }), e.hitch(this, function(a) {
                this.signInPromise.reject(a)
            }));
            return this.signInPromise
        },
        _toolServiceUrlSetter: function(a) {
            this._toolServiceUrl = a;
            this.gp =
                new t(a)
        },
        _setToolServiceUrlAttr: function(a) {
            this._toolServiceUrl = a;
            this.gp = new t(a)
        }
    })
});