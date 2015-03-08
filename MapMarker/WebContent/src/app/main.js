define(["dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/json",
    "dojo/request/notify",
    "dojo/topic",
    "common/pageViewTracker",
    "common/routing/router",
    "common/services/environmentService",
    "common/services/loggerService",
    "app/ui/Scaffold",
    "common/UserManager",
    "dojo/text!./menu.json",
    "dojo/domReady!"],

function(lang, domConstruct, JSON, notify, topic, pageViewTracker, router, environmentService, loggerService, Scaffold, UserManager, menuJson) {
    var mockUser = {
        "data": {
            "node": "n999",
            "googleAnalyticsKey": "bogus-999",
            "localEnvironment": "Mock",
            "user": {
                "username": "mock1234",
                "employeeNumber": "001234",
                "fullname": "Mock User",
                "email": "mock.user@kub.org"
            },
            "roles": ["KUBUsers"]
        }
    }

    var loggerRegex = /dojorest\/logger/;
    notify("error", function(error) {
        if (error.message != "Request canceled") {
            if (error.response.status == 401) {
                app.handle401();
            } else {
                if (!loggerRegex.test(error.message)) {
                    console.log("logger error to console " , error.message);
                    // loggerService.log("xhr error - Status: " + error.response.status, error.message);
                }
            }
        }
    });

    window.onerror = function(msg, url, linenumber, column, errorObj) {
        var position = "Line: " + linenumber;
        if (column) {
            position += " Column: " + column;
        }
        loggerService.log("window.onerror", msg, position, url);
        return false;
    };

    //    // get server side environment values
    //    environmentService.getPropertyBag().then(function(response) {
    //        appInit(response.data);
    //    }, function(err) {
    //        console.log("error", err);
    //        appInit();
    //    });

    appInit(mockUser.data)

    function appInit(data) {
        console.info("appInit()");

        var appMixin = {
            releaseNumber: "MapMarker/Alpha",
            returnToRoute: "",
            loadedLayers: [],
            localEnvironment: "dev",
            requiresAuthentication: true
        };

        app = new Scaffold({}, domConstruct.create("div", null, window.document.body));
        lang.mixin(app, appMixin, UserManager, data);
        app.startup();

        app.handle401 = handle401;

        var environment = app.localEnvironment;
        app.sideNav.set("environment", environment);
        if (environment && environment !== "prod") {
            document.title = document.title + " - " + environment.toUpperCase();
        }


        if (app.isAuthenticated()) {
            afterLogin();
        }

        require(["app/routing/registerRoutes"], function() {
            router.startup("/home", "/login", app.isAuthenticated);
        });


        topic.subscribe("app.login", lang.hitch(this, function() {
            afterLogin();
        }));
    }

    function afterLogin() {
        var menuObject = JSON.parse(menuJson);
        app.sideNav.makeMenu(menuObject);
    }

    function handle401() {
        this.setUser(null);
        app.timedOut = true;
        app.loginModal.show();
    }
});
