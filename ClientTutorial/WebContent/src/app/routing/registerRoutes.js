define(["dojo/_base/config",
    "dojo/_base/lang",
    "dojo/store/Observable", 
    "app/stores/UserStore",
   
    "app/ui/Login",
    "app/ui/PageNotFound",
    "app/ui/Home",
    "app/ui/Note",
    
    "common/pageViewTracker",
    "common/routing/router",
    "common/routing/routeHandler"],

function(config, lang, Observable, UserStore,  Login, PageNotFound, Home, Note, pageViewTracker, router, routeHandler) {

    var toolId = "app.";

    var baseRoute = "";

    function getUserStore() {
        if (!lang.getObject("user.stores.users", false, app)) {
            lang.setObject("user.stores.users", new Observable(new UserStore()), app);
            lang.setObject("user.stores.roles", new Observable(new RoleStore()), app);
        }
        return lang.getObject("user.stores.users", false, app);
    }

    router.registerBefore(/.*/, function(evt) {
        app.appbar.clearContextMenu();
        app.appbar.removeWidgets();
        app.appbar.hideSearchBox();
        app.set("loading", true);
        app.appbar.set("title", "Loading...");
        app.container.hideCurrentView();
    });

    router.registerSecured(baseRoute, function(evt) {
        console.info("route " + baseRoute);

        router.go("/home");
    });

    router.register404(function(evt) {
        var routeEvent = {
            targetView: toolId + "404",
            Widget: PageNotFound,
            title: "Page Not Found",
            evt: evt,
            model: evt.newPath
        };
        routeHandler.route(routeEvent);
    });

    router.registerSecured(baseRoute + "/home", function(evt) {
        console.info("route " + baseRoute + "/home");

        var routeEvent = {
            targetView: toolId + "Home",
            Widget: Home,
            title: "Home",
            evt: evt
        };

        routeHandler.route(routeEvent);
    });

    router.registerSecured(baseRoute + "/note", function(evt) {
        console.info("route " + baseRoute + "/note");

        var routeEvent = {
            targetView: toolId + "Note",
            Widget: Note,
            title: "Note",
            evt: evt
        };

        routeHandler.route(routeEvent);
    });

    var route = baseRoute + "/note/:id";
    pageViewTracker.registerPageView(route, function(match) {
        return match !== "create" ? "note" : match;
    });
    router.register(route, function(evt) {
        console.info("route " + route);

        var titleName;

        var item;
        if (evt.params.id == "create") {
            titleName = "Create";
            getUserStore();
            item = {};
        } else {
            var store = getUserStore();
            item = store.get(evt.params.id);
        }

        var userId = evt.params.id;
        if (userId == "create") {
            userId = "Create";
        }
        if (item) {

            if (!titleName) {
                titleName = item.userName;
            }
            var routeEvent = {
                targetView: toolId + "UserListDetail",
                Widget: UserListDetail,
                title: "Users > " + titleName,
                isDetail: true,
                model: {
                    detailItem: item
                },
                listRoute: baseRoute + "/user",
                evt: evt
            };

            routeHandler.route(routeEvent);
        } else {
            evt.preventDefault();
            router.go(baseRoute + "/note");
        }
    });

    router.register(baseRoute + "/note/create/success", function(evt) {
        console.info("route " + baseRoute + "/note/create/success");

        app.growler.growl({
            message: "Note created successfully.",
            level: "success",
            timeout: 5000
        });
        setTimeout(function() {
            router.go(baseRoute + "/note", true);
        }, 0);
    });

    router.register(baseRoute + "/login", function(evt) {
        console.info("route " + baseRoute + "/login");

        if (app.isAuthenticated()) {
            router.go("/");
            return;
        }

        var routeEvent = {
            targetView: toolId + "LoginView",
            Widget: Login,
            title: "Login",
            evt: evt,
            model: evt.segue
        };

        routeHandler.route(routeEvent);
    });

    function registerLayer(evt, layer, modules) {
        var layers = (typeof layer === "string") ? [layer] : layer;
        var layersAreLoaded = layers.every(function(layer) {
            return app.loadedLayers.indexOf(layer) !== -1;
        });

        if (layersAreLoaded || config.isDebug) {
            layers = [];
        }

        if (!layersAreLoaded) {
            //stops the route so we can load the layer
            evt.stopImmediatePropagation();
            evt.preventDefault();

            var registerModules = function() {
                errorHandler.remove();
                require(modules, function() {
                    app.loadedLayers = app.loadedLayers.concat(layer);
                    router.go(evt.newPath);
                });
            };

            var errorHandler = require.on("error", registerModules);
            require(layers, registerModules);
        }
    }
});