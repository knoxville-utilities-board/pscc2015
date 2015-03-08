//>>built
define("esri/IdentityManagerBase", ["dojo/_base/declare", "dojo/_base/config", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/Deferred", "dojo/_base/json", "dojo/_base/url", "dojo/sniff", "dojo/cookie", "dojo/io-query", "dojo/regexp", "./kernel", "./config", "./lang", "./ServerInfo", "./urlUtils", "./deferredUtils", "./request", "./Evented", "./OAuthCredential", "./arcgis/OAuthInfo"], function(G, w, r, g, H, z, s, I, J, P, Q, h, A, u, B, p, K, C, L, M, R) {
    var y = {},
        D = function(a) {
            var b = (new s(a.owningSystemUrl)).host;
            a = (new s(a.server)).host;
            var c = /.+\.arcgis\.com$/i;
            return c.test(b) && c.test(a)
        },
        E = function(a, b) {
            return !(!D(a) || !b || !g.some(b, function(b) {
                return b.test(a.server)
            }))
        },
        v, O = G(L, {
            declaredClass: "esri.IdentityManagerBase",
            constructor: function() {
                this._portalConfig = r.getObject("esriGeowConfig");
                this.serverInfos = [];
                this.oAuthInfos = [];
                this.credentials = [];
                this._soReqs = [];
                this._xoReqs = [];
                this._portals = [];
                this._getOAuthHash()
            },
            defaultTokenValidity: 60,
            tokenValidity: null,
            signInPage: null,
            useSignInPage: !0,
            normalizeWebTierAuth: !1,
            _busy: null,
            _oAuthHash: null,
            _gwTokenUrl: "/sharing/generateToken",
            _agsRest: "/rest/services",
            _agsPortal: /\/sharing(\/|$)/i,
            _agsAdmin: /https?:\/\/[^\/]+\/[^\/]+\/admin\/?(\/.*)?$/i,
            _adminSvcs: /\/admin\/services(\/|$)/i,
            _agolSuffix: ".arcgis.com",
            _gwDomains: [{
                regex: /https?:\/\/www\.arcgis\.com/i,
                tokenServiceUrl: "https://www.arcgis.com/sharing/generateToken"
            }, {
                regex: /https?:\/\/dev\.arcgis\.com/i,
                tokenServiceUrl: "https://dev.arcgis.com/sharing/generateToken"
            }, {
                regex: /https?:\/\/.*dev[^.]*\.arcgis\.com/i,
                tokenServiceUrl: "https://devext.arcgis.com/sharing/generateToken"
            }, {
                regex: /https?:\/\/.*qa[^.]*\.arcgis\.com/i,
                tokenServiceUrl: "https://qaext.arcgis.com/sharing/generateToken"
            }, {
                regex: /https?:\/\/.*.arcgis\.com/i,
                tokenServiceUrl: "https://www.arcgis.com/sharing/generateToken"
            }],
            _legacyFed: [],
            _regexSDirUrl: /http.+\/rest\/services\/?/ig,
            _regexServerType: /(\/(MapServer|GeocodeServer|GPServer|GeometryServer|ImageServer|NAServer|FeatureServer|GeoDataServer|GlobeServer|MobileServer|GeoenrichmentServer)).*/ig,
            _gwUser: /http.+\/users\/([^\/]+)\/?.*/i,
            _gwItem: /http.+\/items\/([^\/]+)\/?.*/i,
            _gwGroup: /http.+\/groups\/([^\/]+)\/?.*/i,
            _errorCodes: [499, 498, 403, 401],
            _rePortalTokenSvc: /\/sharing(\/rest)?\/generatetoken/i,
            _publicUrls: [/\/arcgis\/tokens/i, /\/sharing(\/rest)?\/generatetoken/i, /\/rest\/info/i],
            registerServers: function(a) {
                var b = this.serverInfos;
                b ? (a = g.filter(a, function(a) {
                    return !this.findServerInfo(a.server)
                }, this), this.serverInfos = b.concat(a)) : this.serverInfos = a;
                g.forEach(a, function(a) {
                    a.owningSystemUrl && this._portals.push(a.owningSystemUrl);
                    if (a.hasPortal) {
                        this._portals.push(a.server);
                        var b = A.defaults.io.corsEnabledServers,
                            e = this._getOrigin(a.tokenServiceUrl);
                        p.canUseXhr(a.server) || b.push(a.server.replace(/^https?:\/\//i, ""));
                        p.canUseXhr(e) || b.push(e.replace(/^https?:\/\//i, ""))
                    }
                }, this)
            },
            registerOAuthInfos: function(a) {
                var b = this.oAuthInfos;
                b ? (a = g.filter(a, function(a) {
                    return !this.findOAuthInfo(a.portalUrl)
                }, this), this.oAuthInfos = b.concat(a)) : this.oAuthInfos = a
            },
            registerToken: function(a) {
                var b = this._sanitizeUrl(a.server),
                    c = this.findServerInfo(b),
                    d = !0,
                    e;
                c || (c = new B, c.server = this._getOrigin(b),
                    c.tokenServiceUrl = this._getTokenSvcUrl(b), c.hasPortal = !0, this.registerServers([c]));
                (e = this.findCredential(b, a.userId)) ? (r.mixin(e, a), d = !1) : (e = new v({
                    userId: a.userId,
                    server: c.server,
                    token: a.token,
                    expires: a.expires,
                    ssl: a.ssl,
                    scope: this._isServerRsrc(b) ? "server" : "portal"
                }), e.resources = [b], this.credentials.push(e));
                e.onTokenChange(!1);
                d || e.refreshServerTokens()
            },
            toJson: function() {
                return u.fixJson({
                    serverInfos: g.map(this.serverInfos, function(a) {
                        return a.toJson()
                    }),
                    oAuthInfos: g.map(this.oAuthInfos, function(a) {
                        return a.toJson()
                    }),
                    credentials: g.map(this.credentials, function(a) {
                        return a.toJson()
                    })
                })
            },
            initialize: function(a) {
                if (a) {
                    r.isString(a) && (a = z.fromJson(a));
                    var b = a.serverInfos,
                        c = a.oAuthInfos;
                    a = a.credentials;
                    if (b) {
                        var d = [];
                        g.forEach(b, function(a) {
                            a.server && a.tokenServiceUrl && d.push(a.declaredClass ? a : new B(a))
                        });
                        d.length && this.registerServers(d)
                    }
                    if (c) {
                        var e = [];
                        g.forEach(c, function(a) {
                            a.appId && e.push(a.declaredClass ? a : new R(a))
                        });
                        e.length && this.registerOAuthInfos(e)
                    }
                    a && g.forEach(a, function(a) {
                        a.userId && (a.server && a.token &&
                            a.expires && a.expires > (new Date).getTime()) && (a = a.declaredClass ? a : new v(a), a.onTokenChange(), this.credentials.push(a))
                    }, this)
                }
            },
            findServerInfo: function(a) {
                var b;
                a = this._sanitizeUrl(a);
                g.some(this.serverInfos, function(c) {
                    p.hasSameOrigin(c.server, a, !0) && (b = c);
                    return !!b
                });
                return b
            },
            findOAuthInfo: function(a) {
                var b;
                a = this._sanitizeUrl(a);
                g.some(this.oAuthInfos, function(c) {
                    p.hasSameOrigin(c.portalUrl, a, !0) && (b = c);
                    return !!b
                });
                return b
            },
            findCredential: function(a, b) {
                var c, d;
                a = this._sanitizeUrl(a);
                d = this._isServerRsrc(a) ?
                    "server" : "portal";
                b ? g.some(this.credentials, function(e) {
                    p.hasSameOrigin(a, e.server, !0) && (b === e.userId && e.scope === d) && (c = e);
                    return !!c
                }, this) : g.some(this.credentials, function(b) {
                    p.hasSameOrigin(a, b.server, !0) && (-1 !== this._getIdenticalSvcIdx(a, b) && b.scope === d) && (c = b);
                    return !!c
                }, this);
                return c
            },
            getCredential: function(a, b) {
                var c, d, e = !0;
                u.isDefined(b) && (r.isObject(b) ? (c = !!b.token, d = b.error, e = !1 !== b.prompt) : c = b);
                a = this._sanitizeUrl(a);
                var g = new H(K._dfdCanceller),
                    f = this._isAdminResource(a),
                    n = c && this._doPortalSignIn(a) ?
                    this._getEsriAuthCookie() : null;
                c = c ? this.findCredential(a) : null;
                if (n || c) return e = Error("You are currently signed in as: '" + (n && n.email || c && c.userId) + "'. You do not have access to this resource: " + a), e.code = "IdentityManagerBase.1", e.httpCode = d && d.httpCode, e.messageCode = d ? d.messageCode : null, e.subcode = d ? d.subcode : null, e.details = d ? d.details : null, e.log = w.isDebug, g.errback(e), g;
                if (d = this._findCredential(a, b)) return g.callback(d), g;
                if (d = this.findServerInfo(a)) !d.hasServer && this._isServerRsrc(a) && (d._restInfoDfd =
                    this._getTokenSvcUrl(a, !0), d.hasServer = !0);
                else {
                    n = this._getTokenSvcUrl(a);
                    if (!n) return e = Error("Unknown resource - could not find token service endpoint."), e.code = "IdentityManagerBase.2", e.log = w.isDebug, g.errback(e), g;
                    d = new B;
                    d.server = this._getOrigin(a);
                    r.isString(n) ? (d.tokenServiceUrl = n, e && !this._findOAuthInfo(a) && (d._selfDfd = this._getPortalSelf(n.replace(this._rePortalTokenSvc, "/sharing/rest/portals/self"), a)), d.hasPortal = !0) : (d._restInfoDfd = n, d.hasServer = !0);
                    this.registerServers([d])
                }
                return this._enqueue(a,
                    d, b, g, f)
            },
            getResourceName: function(a) {
                return this._isRESTService(a) ? a.replace(this._regexSDirUrl, "").replace(this._regexServerType, "") || "" : this._gwUser.test(a) && a.replace(this._gwUser, "$1") || this._gwItem.test(a) && a.replace(this._gwItem, "$1") || this._gwGroup.test(a) && a.replace(this._gwGroup, "$1") || ""
            },
            generateToken: function(a, b, c) {
                var d, e, g, f, n, N, q = new s(window.location.href.toLowerCase()),
                    t = this._getEsriAuthCookie(),
                    m, F = !b;
                f = a.shortLivedTokenValidity;
                var x;
                b && (x = h.id.tokenValidity || f || h.id.defaultTokenValidity,
                    x > f && (x = f));
                c && (d = c.isAdmin, e = c.serverUrl, g = c.token, N = c.ssl, a.customParameters = c.customParameters);
                if (d) f = a.adminTokenServiceUrl;
                else {
                    f = a.tokenServiceUrl;
                    n = new s(f.toLowerCase());
                    t && (m = (m = t.auth_tier) && m.toLowerCase());
                    if (("web" === m || a.webTierAuth) && c && c.serverUrl && !N && "http" === q.scheme && (p.hasSameOrigin(q.uri, f, !0) || "https" === n.scheme && q.host === n.host && "7080" === q.port && "7443" === n.port)) f = f.replace(/^https:/i, "http:").replace(/:7443/i, ":7080");
                    F && this._rePortalTokenSvc.test(a.tokenServiceUrl) && (f =
                        f.replace(/\/rest/i, ""))
                }
                c = C(r.mixin({
                    url: f,
                    content: r.mixin({
                        request: "getToken",
                        username: b && b.username,
                        password: b && b.password,
                        serverUrl: e,
                        token: g,
                        expiration: x,
                        referer: d || this._rePortalTokenSvc.test(a.tokenServiceUrl) ? window.location.host : null,
                        client: d ? "referer" : null,
                        f: "json"
                    }, a.customParameters),
                    handleAs: "json",
                    callbackParamName: F ? "callback" : void 0
                }, c && c.ioArgs), {
                    usePost: !F,
                    disableIdentityLookup: !0,
                    useProxy: this._useProxy(a, c)
                });
                c.addCallback(function(c) {
                    if (!c || !c.token) return c = Error("Unable to generate token"),
                        c.code = "IdentityManagerBase.3", c.log = w.isDebug, c;
                    var d = a.server;
                    y[d] || (y[d] = {});
                    b && (y[d][b.username] = b.password);
                    c.validity = x;
                    return c
                });
                c.addErrback(function(a) {});
                return c
            },
            isBusy: function() {
                return !!this._busy
            },
            checkSignInStatus: function(a) {
                return this.getCredential(a, {
                    prompt: !1
                })
            },
            setRedirectionHandler: function(a) {
                this._redirectFunc = a
            },
            setProtocolErrorHandler: function(a) {
                this._protocolFunc = a
            },
            signIn: function() {},
            oAuthSignIn: function() {},
            onCredentialCreate: function() {},
            onCredentialsDestroy: function() {},
            destroyCredentials: function() {
                if (this.credentials) {
                    var a = this.credentials.slice();
                    g.forEach(a, function(a) {
                        a.destroy()
                    })
                }
                this.onCredentialsDestroy()
            },
            _getOAuthHash: function() {
                var a = window.location.hash;
                if (a) {
                    "#" === a.charAt(0) && (a = a.substring(1));
                    var a = P.queryToObject(a),
                        b = !1;
                    a.access_token && a.expires_in && a.state && a.hasOwnProperty("username") ? (a.state = z.fromJson(a.state), this._oAuthHash = a, b = !0) : a.error && a.error_description && (console.log("IdentityManager OAuth Error: ", a.error, " - ", a.error_description),
                        "access_denied" === a.error && (b = !0));
                    if (b && (!I("ie") || 8 < I("ie"))) window.location.hash = ""
                }
            },
            _findCredential: function(a, b) {
                var c = -1,
                    d, e, h, f, n = b && b.token;
                d = b && b.resource;
                var r = this._isServerRsrc(a) ? "server" : "portal",
                    q = g.filter(this.credentials, function(b) {
                        return p.hasSameOrigin(b.server, a, !0) && b.scope === r
                    });
                a = d || a;
                if (q.length)
                    if (1 === q.length)
                        if (d = q[0], h = (e = (f = this.findServerInfo(d.server)) && f.owningSystemUrl) && this.findCredential(e, d.userId), c = this._getIdenticalSvcIdx(a, d), n) - 1 !== c && (d.resources.splice(c,
                            1), this._removeResource(a, h));
                        else return -1 === c && d.resources.push(a), this._addResource(a, h), d;
                else {
                    var t, m;
                    g.some(q, function(b) {
                        m = this._getIdenticalSvcIdx(a, b);
                        return -1 !== m ? (t = b, h = (e = (f = this.findServerInfo(t.server)) && f.owningSystemUrl) && this.findCredential(e, t.userId), c = m, !0) : !1
                    }, this);
                    if (n) t && (t.resources.splice(c, 1), this._removeResource(a, h));
                    else if (t) return this._addResource(a, h), t
                }
            },
            _findOAuthInfo: function(a) {
                var b = this.findOAuthInfo(a);
                b || g.some(this.oAuthInfos, function(c) {
                    this._isIdProvider(c.portalUrl,
                        a) && (b = c);
                    return !!b
                }, this);
                return b
            },
            _addResource: function(a, b) {
                b && -1 === this._getIdenticalSvcIdx(a, b) && b.resources.push(a)
            },
            _removeResource: function(a, b) {
                var c = -1;
                b && (c = this._getIdenticalSvcIdx(a, b), -1 < c && b.resources.splice(c, 1))
            },
            _useProxy: function(a, b) {
                return b && b.isAdmin && !p.hasSameOrigin(a.adminTokenServiceUrl, window.location.href) || !this._isPortalDomain(a.tokenServiceUrl) && 10.1 == a.currentVersion && !p.hasSameOrigin(a.tokenServiceUrl, window.location.href)
            },
            _getOrigin: function(a) {
                a = new s(a);
                return a.scheme +
                    "://" + a.host + (u.isDefined(a.port) ? ":" + a.port : "")
            },
            _sanitizeUrl: function(a) {
                a = p.fixUrl(r.trim(a));
                var b = (A.defaults.io.proxyUrl || "").toLowerCase(),
                    c = b ? a.toLowerCase().indexOf(b + "?") : -1; - 1 !== c && (a = a.substring(c + b.length + 1));
                return p.urlToObject(a).path
            },
            _isRESTService: function(a) {
                return -1 < a.indexOf(this._agsRest)
            },
            _isAdminResource: function(a) {
                return this._agsAdmin.test(a) || this._adminSvcs.test(a)
            },
            _isServerRsrc: function(a) {
                return this._isRESTService(a) || this._isAdminResource(a)
            },
            _isIdenticalService: function(a,
                b) {
                var c;
                if (this._isRESTService(a) && this._isRESTService(b)) {
                    var d = this._getSuffix(a).toLowerCase(),
                        e = this._getSuffix(b).toLowerCase();
                    c = d === e;
                    c || (c = /(.*)\/(MapServer|FeatureServer).*/ig, c = d.replace(c, "$1") === e.replace(c, "$1"))
                } else this._isAdminResource(a) && this._isAdminResource(b) ? c = !0 : !this._isServerRsrc(a) && (!this._isServerRsrc(b) && this._isPortalDomain(a)) && (c = !0);
                return c
            },
            _isPortalDomain: function(a) {
                a = a.toLowerCase();
                var b = (new s(a)).authority,
                    c = this._portalConfig,
                    d = -1 !== b.indexOf(this._agolSuffix);
                !d && c && (d = p.hasSameOrigin(c.restBaseUrl, a, !0));
                if (!d) {
                    if (!this._arcgisUrl && (c = r.getObject("esri.arcgis.utils.arcgisUrl"))) this._arcgisUrl = (new s(c)).authority;
                    this._arcgisUrl && (d = this._arcgisUrl.toLowerCase() === b)
                }
                d || (d = g.some(this._portals, function(b) {
                    return p.hasSameOrigin(b, a, !0)
                }));
                return d = d || this._agsPortal.test(a)
            },
            _isIdProvider: function(a, b) {
                var c = -1,
                    d = -1;
                g.forEach(this._gwDomains, function(e, g) {
                    -1 === c && e.regex.test(a) && (c = g); - 1 === d && e.regex.test(b) && (d = g)
                });
                var e = !1;
                if (-1 < c && -1 < d)
                    if (0 === c ||
                        4 === c) {
                        if (0 === d || 4 === d) e = !0
                    } else if (1 === c) {
                    if (1 === d || 2 === d) e = !0
                } else 2 === c ? 2 === d && (e = !0) : 3 === c && 3 === d && (e = !0);
                if (!e) {
                    var h = this.findServerInfo(b),
                        f = h && h.owningSystemUrl;
                    f && (D(h) && this._isPortalDomain(f) && this._isIdProvider(a, f)) && (e = !0)
                }
                return e
            },
            _isPublic: function(a) {
                a = this._sanitizeUrl(a);
                return g.some(this._publicUrls, function(b) {
                    return b.test(a)
                })
            },
            _getIdenticalSvcIdx: function(a, b) {
                var c = -1;
                g.some(b.resources, function(b, e) {
                    return this._isIdenticalService(a, b) ? (c = e, !0) : !1
                }, this);
                return c
            },
            _getSuffix: function(a) {
                return a.replace(this._regexSDirUrl,
                    "").replace(this._regexServerType, "$1")
            },
            _getTokenSvcUrl: function(a) {
                var b, c;
                if ((b = this._isRESTService(a)) || this._isAdminResource(a)) return c = a.toLowerCase().indexOf(b ? this._agsRest : "/admin/"), b = a.substring(0, c) + "/admin/generateToken", a = a.substring(0, c) + "/rest/info", c = C({
                    url: a,
                    content: {
                        f: "json"
                    },
                    handleAs: "json",
                    callbackParamName: "callback"
                }), c.adminUrl_ = b, c;
                if (this._isPortalDomain(a)) {
                    var d = "";
                    g.some(this._gwDomains, function(b) {
                        b.regex.test(a) && (d = b.tokenServiceUrl);
                        return !!d
                    });
                    d || g.some(this._portals,
                        function(b) {
                            p.hasSameOrigin(b, a, !0) && (d = b + this._gwTokenUrl);
                            return !!d
                        }, this);
                    d || (c = a.toLowerCase().indexOf("/sharing"), -1 !== c && (d = a.substring(0, c) + this._gwTokenUrl));
                    d || (d = this._getOrigin(a) + this._gwTokenUrl);
                    d && (b = (new s(a)).port, /^http:\/\//i.test(a) && "7080" === b && (d = d.replace(/:7080/i, ":7443")), d = d.replace(/http:/i, "https:"));
                    return d
                }
                if (-1 !== a.toLowerCase().indexOf("premium.arcgisonline.com")) return "https://premium.arcgisonline.com/server/tokens"
            },
            _getPortalSelf: function(a, b) {
                "https:" === window.location.protocol ?
                    a = a.replace(/^http:/i, "https:").replace(/:7080/i, ":7443") : /^http:/i.test(b) && (a = a.replace(/^https:/i, "http:").replace(/:7443/i, ":7080"));
                return C({
                    url: a,
                    content: {
                        f: "json"
                    },
                    handleAs: "json",
                    callbackParamName: "callback"
                }, {
                    crossOrigin: !1,
                    disableIdentityLookup: !0
                })
            },
            _hasPortalSession: function() {
                return !!this._getEsriAuthCookie()
            },
            _getEsriAuthCookie: function() {
                var a;
                if (J.isSupported()) {
                    var b = this._getAllCookies("esri_auth"),
                        c;
                    for (c = 0; c < b.length; c++) {
                        var d = z.fromJson(b[c]);
                        if (d.portalApp) {
                            a = d;
                            break
                        }
                    }
                }
                return a
            },
            _getAllCookies: function(a) {
                var b = [],
                    c = document.cookie.match(RegExp("(?:^|; )" + Q.escapeString(a) + "\x3d([^;]*)", "g"));
                if (c)
                    for (a = 0; a < c.length; a++) {
                        var d = c[a],
                            e = d.indexOf("\x3d"); - 1 < e && (d = d.substring(e + 1), b.push(decodeURIComponent(d)))
                    }
                return b
            },
            _doPortalSignIn: function(a) {
                if (J.isSupported()) {
                    var b = this._getEsriAuthCookie(),
                        c = this._portalConfig,
                        d = window.location.href,
                        e = this.findServerInfo(a);
                    if (this.useSignInPage && (c || this._isPortalDomain(d) || b) && (e ? e.hasPortal || e.owningSystemUrl && this._isPortalDomain(e.owningSystemUrl) :
                            this._isPortalDomain(a)) && (this._isIdProvider(d, a) || c && (p.hasSameOrigin(c.restBaseUrl, a, !0) || this._isIdProvider(c.restBaseUrl, a)) || p.hasSameOrigin(d, a, !0))) return !0
                }
                return !1
            },
            _checkProtocol: function(a, b, c, d) {
                var e = !0;
                d = d ? b.adminTokenServiceUrl : b.tokenServiceUrl;
                if (0 === r.trim(d).toLowerCase().indexOf("https:") && 0 !== window.location.href.toLowerCase().indexOf("https:") && (!A.defaults.io.useCors || !p.canUseXhr(d) && !p.canUseXhr(p.getProxyUrl(!0).path))) e = this._protocolFunc ? !!this._protocolFunc({
                    resourceUrl: a,
                    serverInfo: b
                }) : !1, e || (a = Error("Aborted the Sign-In process to avoid sending password over insecure connection."), a.code = "IdentityManagerBase.4", a.log = w.isDebug, console.log(a.message), c(a));
                return e
            },
            _enqueue: function(a, b, c, d, e, g) {
                d || (d = new H(K._dfdCanceller));
                d.resUrl_ = a;
                d.sinfo_ = b;
                d.options_ = c;
                d.admin_ = e;
                d.refresh_ = g;
                this._busy ? p.hasSameOrigin(a, this._busy.resUrl_, !0) ? this._soReqs.push(d) : this._xoReqs.push(d) : this._doSignIn(d);
                return d
            },
            _doSignIn: function(a) {
                this._busy = a;
                var b = this,
                    c = function(c) {
                        var d =
                            a.options_ && a.options_.resource,
                            e = a.resUrl_,
                            f = a.refresh_,
                            l = !1; - 1 === g.indexOf(b.credentials, c) && (f && -1 !== g.indexOf(b.credentials, f) ? (f.userId = c.userId, f.token = c.token, f.expires = c.expires, f.validity = c.validity, f.ssl = c.ssl, f.creationTime = c.creationTime, l = !0, c = f) : b.credentials.push(c));
                        c.resources || (c.resources = []);
                        c.resources.push(d || e);
                        c.scope = b._isServerRsrc(e) ? "server" : "portal";
                        c.onTokenChange();
                        var d = b._soReqs,
                            k = {};
                        b._soReqs = [];
                        g.forEach(d, function(a) {
                            if (!this._isIdenticalService(e, a.resUrl_)) {
                                var b =
                                    this._getSuffix(a.resUrl_);
                                k[b] || (k[b] = !0, c.resources.push(a.resUrl_))
                            }
                        }, b);
                        a.callback(c);
                        g.forEach(d, function(a) {
                            a.callback(c)
                        });
                        b._busy = a.resUrl_ = a.sinfo_ = a.refresh_ = null;
                        if (!l) b.onCredentialCreate({
                            credential: c
                        });
                        b._soReqs.length && b._doSignIn(b._soReqs.shift());
                        b._xoReqs.length && b._doSignIn(b._xoReqs.shift())
                    },
                    d = function(c) {
                        a.errback(c);
                        b._busy = a.resUrl_ = a.sinfo_ = a.refresh_ = null;
                        b._soReqs.length && b._doSignIn(b._soReqs.shift());
                        b._xoReqs.length && b._doSignIn(b._xoReqs.shift())
                    },
                    e = function(e, m, g,
                        f) {
                        var l = a.sinfo_,
                            k = !a.options_ || !1 !== a.options_.prompt;
                        b._doPortalSignIn(a.resUrl_) ? (m = b._getEsriAuthCookie(), e = b._portalConfig, m ? c(new v({
                            userId: m.email,
                            server: l.server,
                            token: m.token,
                            expires: null
                        })) : k ? (k = "", m = window.location.href, k = b.signInPage ? b.signInPage : e ? e.baseUrl + e.signin : b._isIdProvider(m, a.resUrl_) ? b._getOrigin(m) + "/home/signin.html" : l.tokenServiceUrl.replace(b._rePortalTokenSvc, "") + "/home/signin.html", k = k.replace(/http:/i, "https:"), e && !1 === e.useSSL && (k = k.replace(/https:/i, "http:")), 0 ===
                            m.toLowerCase().replace("https", "http").indexOf(k.toLowerCase().replace("https", "http")) ? (l = Error("Cannot redirect to Sign-In page from within Sign-In page. URL of the resource that triggered this workflow: " + a.resUrl_), l.code = "IdentityManagerBase.5", l.log = w.isDebug, d(l)) : b._redirectFunc ? b._redirectFunc({
                                signInPage: k,
                                returnUrlParamName: "returnUrl",
                                returnUrl: m,
                                resourceUrl: a.resUrl_,
                                serverInfo: l
                            }) : window.location = k + "?returnUrl\x3d" + window.escape(m)) : (l = Error("User is not signed in."), l.code = "IdentityManagerBase.6",
                            l.log = w.isDebug, d(l))) : e ? c(new v({
                            userId: e,
                            server: l.server,
                            token: g,
                            expires: u.isDefined(f) ? Number(f) : null,
                            ssl: !!m
                        })) : q ? (e = q._oAuthCred, e || (m = new M(q, window.localStorage), g = new M(q, window.sessionStorage), m.isValid() && g.isValid() ? m.expires > g.expires ? (e = m, g.destroy()) : (e = g, m.destroy()) : e = m.isValid() ? m : g, q._oAuthCred = e), e.isValid() ? c(new v({
                            userId: e.userId,
                            server: l.server,
                            token: e.token,
                            expires: e.expires,
                            ssl: e.ssl,
                            _oAuthCred: e
                        })) : b._oAuthHash && b._oAuthHash.state.portalUrl === q.portalUrl ? (k = b._oAuthHash,
                            l = new v({
                                userId: k.username,
                                server: l.server,
                                token: k.access_token,
                                expires: (new Date).getTime() + 1E3 * Number(k.expires_in),
                                ssl: "true" === k.ssl,
                                oAuthState: k.state,
                                _oAuthCred: e
                            }), e.storage = k.persist ? window.localStorage : window.sessionStorage, e.token = l.token, e.expires = l.expires, e.userId = l.userId, e.ssl = l.ssl, e.save(), b._oAuthHash = null, c(l)) : k ? a._pendingDfd = b.oAuthSignIn(a.resUrl_, l, q, a.options_).addCallbacks(c, d) : (l = Error("User is not signed in."), l.code = "IdentityManagerBase.6", l.log = w.isDebug, d(l))) : k ? b._checkProtocol(a.resUrl_,
                            l, d, a.admin_) && (k = a.options_, a.admin_ && (k = k || {}, k.isAdmin = !0), a._pendingDfd = b.signIn(a.resUrl_, l, k).addCallbacks(c, d)) : (l = Error("User is not signed in."), l.code = "IdentityManagerBase.6", l.log = w.isDebug, d(l))
                    },
                    h = function() {
                        var e = a.sinfo_,
                            m = e.owningSystemUrl,
                            f = a.options_,
                            h, l, k;
                        f && (h = f.token, l = f.error);
                        k = b._findCredential(m, {
                            token: h,
                            resource: a.resUrl_
                        });
                        !k && D(e) && g.some(b.credentials, function(a) {
                            this._isIdProvider(m, a.server) && (k = a);
                            return !!k
                        }, b);
                        k ? (f = b.findCredential(a.resUrl_, k.userId)) ? c(f) : E(e, b._legacyFed) ?
                            (f = k.toJson(), f.server = e.server, f.resources = null, c(new v(f))) : (a._pendingDfd = b.generateToken(b.findServerInfo(k.server), null, {
                                serverUrl: a.resUrl_,
                                token: k.token,
                                ssl: k.ssl
                            })).addCallbacks(function(b) {
                                c(new v({
                                    userId: k.userId,
                                    server: e.server,
                                    token: b.token,
                                    expires: u.isDefined(b.expires) ? Number(b.expires) : null,
                                    ssl: !!b.ssl,
                                    isAdmin: a.admin_,
                                    validity: b.validity
                                }))
                            }, d) : (b._busy = null, h && (a.options_.token = null), (a._pendingDfd = b.getCredential(m.replace(/\/?$/, "/sharing"), {
                                resource: a.resUrl_,
                                token: h,
                                error: l
                            })).addCallbacks(function(c) {
                                b._enqueue(a.resUrl_,
                                    a.sinfo_, a.options_, a, a.admin_)
                            }, function(a) {
                                d(a)
                            }))
                    },
                    f = a.sinfo_.owningSystemUrl,
                    n = this._isServerRsrc(a.resUrl_),
                    s = a.sinfo_._restInfoDfd,
                    q = this._findOAuthInfo(a.resUrl_);
                s ? s.addCallbacks(function(c) {
                    var d = a.sinfo_;
                    d.adminTokenServiceUrl = d._restInfoDfd.adminUrl_;
                    d._restInfoDfd = null;
                    d.tokenServiceUrl = r.getObject("authInfo.tokenServicesUrl", !1, c) || r.getObject("authInfo.tokenServiceUrl", !1, c) || r.getObject("tokenServiceUrl", !1, c);
                    d.shortLivedTokenValidity = r.getObject("authInfo.shortLivedTokenValidity", !1, c);
                    d.currentVersion = c.currentVersion;
                    d.owningTenant = c.owningTenant;
                    if (c = d.owningSystemUrl = c.owningSystemUrl) b._portals.push(c), !d.hasPortal && p.hasSameOrigin(c, a.resUrl_, !0) && (q || (d._selfDfd = b._getPortalSelf(c.replace(/\/?$/, "/sharing/rest/portals/self"), a.resUrl_)), d.hasPortal = !0);
                    n && c ? h() : e()
                }, function() {
                    a.sinfo_._restInfoDfd = null;
                    var b = Error("Unknown resource - could not find token service endpoint.");
                    b.code = "IdentityManagerBase.2";
                    b.log = w.isDebug;
                    d(b)
                }) : n && f ? h() : a.sinfo_._selfDfd ? (f = function(c) {
                    a.sinfo_._selfDfd =
                        null;
                    var d = c && c.user && c.user.username,
                        f = c && c.allSSL;
                    a.sinfo_.webTierAuth = !!d;
                    d && b.normalizeWebTierAuth ? (a.sinfo_._tokenDfd = b.generateToken(a.sinfo_, null, {
                        ssl: f
                    }), c = function(b) {
                        a.sinfo_._tokenDfd = null;
                        e(d, f, b && b.token, b && b.expires)
                    }, a.sinfo_._tokenDfd.then(c, c)) : e(d, f)
                }, a.sinfo_._selfDfd.then(f, f)) : e()
            }
        });
    v = G(L, {
        declaredClass: "esri.Credential",
        tokenRefreshBuffer: 2,
        constructor: function(a) {
            r.mixin(this, a);
            this.resources = this.resources || [];
            u.isDefined(this.creationTime) || (this.creationTime = (new Date).getTime())
        },
        _oAuthCred: null,
        refreshToken: function() {
            var a = this,
                b = this.resources && this.resources[0],
                c = h.id.findServerInfo(this.server),
                d = c && c.owningSystemUrl,
                e = !!d && "server" === this.scope,
                p = e && E(c, h.id._legacyFed),
                f = e && h.id.findServerInfo(d),
                n, r = (n = c.webTierAuth) && h.id.normalizeWebTierAuth,
                q = y[this.server],
                q = q && q[this.userId],
                t = {
                    username: this.userId,
                    password: q
                },
                m;
            if (!n || r)
                if (e && !f && g.some(h.id.serverInfos, function(a) {
                        h.id._isIdProvider(d, a.server) && (f = a);
                        return !!f
                    }), n = f && h.id.findCredential(f.server, this.userId), !e || n)
                    if (p) n.refreshToken();
                    else {
                        if (e) m = {
                            serverUrl: b,
                            token: n && n.token,
                            ssl: n && n.ssl
                        };
                        else if (r) t = null, m = {
                            ssl: this.ssl
                        };
                        else if (q) this.isAdmin && (m = {
                            isAdmin: !0
                        });
                        else {
                            var s;
                            b && (b = h.id._sanitizeUrl(b), this._enqueued = 1, s = h.id._enqueue(b, c, null, null, this.isAdmin, this), s.addCallback(function() {
                                a._enqueued = 0;
                                a.refreshServerTokens()
                            }).addErrback(function() {
                                a._enqueued = 0
                            }));
                            return s
                        }
                        return h.id.generateToken(e ? f : c, e ? null : t, m).addCallback(function(b) {
                            a.token = b.token;
                            a.expires = u.isDefined(b.expires) ? Number(b.expires) :
                                null;
                            a.creationTime = (new Date).getTime();
                            a.validity = b.validity;
                            a.onTokenChange();
                            a.refreshServerTokens()
                        }).addErrback(function() {})
                    }
        },
        refreshServerTokens: function() {
            "portal" === this.scope && g.forEach(h.id.credentials, function(a) {
                var b = h.id.findServerInfo(a.server),
                    c = b && b.owningSystemUrl;
                if (a !== this && a.userId === this.userId && c && "server" === a.scope && (p.hasSameOrigin(this.server, c, !0) || h.id._isIdProvider(c, this.server))) E(b, h.id._legacyFed) ? (a.token = this.token, a.expires = this.expires, a.creationTime = this.creationTime,
                    a.validity = this.validity, a.onTokenChange()) : a.refreshToken()
            }, this)
        },
        onTokenChange: function(a) {
            clearTimeout(this._refreshTimer);
            var b = this.server && h.id.findServerInfo(this.server),
                c = (b = b && b.owningSystemUrl) && h.id.findServerInfo(b);
            !1 !== a && ((!b || "portal" === this.scope || c && c.webTierAuth && !h.id.normalizeWebTierAuth) && (u.isDefined(this.expires) || u.isDefined(this.validity))) && this._startRefreshTimer()
        },
        onDestroy: function() {},
        destroy: function() {
            this.userId = this.server = this.token = this.expires = this.validity =
                this.resources = this.creationTime = null;
            this._oAuthCred && (this._oAuthCred.destroy(), this._oAuthCred = null);
            var a = g.indexOf(h.id.credentials, this); - 1 < a && h.id.credentials.splice(a, 1);
            this.onTokenChange();
            this.onDestroy()
        },
        toJson: function() {
            return this._toJson()
        },
        _toJson: function() {
            var a = u.fixJson({
                    userId: this.userId,
                    server: this.server,
                    token: this.token,
                    expires: this.expires,
                    validity: this.validity,
                    ssl: this.ssl,
                    isAdmin: this.isAdmin,
                    creationTime: this.creationTime,
                    scope: this.scope
                }),
                b = this.resources;
            b && 0 < b.length &&
                (a.resources = b);
            return a
        },
        _startRefreshTimer: function() {
            clearTimeout(this._refreshTimer);
            var a = 6E4 * this.tokenRefreshBuffer,
                b = (this.validity ? this.creationTime + 6E4 * this.validity : this.expires) - (new Date).getTime();
            0 > b && (b = 0);
            this._refreshTimer = setTimeout(r.hitch(this, this.refreshToken), b > a ? b - a : b)
        }
    });
    O.Credential = v;
    return O
});