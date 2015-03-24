define(["dojo/_base/config",
    "dojo/_base/lang",
    "dojo/store/Observable",
    "app/stores/MarkerStore",
    "app/stores/CategoryStore",

    "app/ui/Login",
    "app/ui/PageNotFound",
    "app/ui/Home",
    "app/ui/Marker",
    "app/ui/MarkerListDetail",

    "common/pageViewTracker",
    "common/routing/router",
    "common/routing/routeHandler"],

function(config, lang, Observable, MarkerStore, CategoryStore, Login, PageNotFound, Home, Marker, MarkerListDetail, pageViewTracker, router, routeHandler) {

    var toolId = "app.";

    var baseRoute = "";

    function getMarkerStore() {
    	console.log("getMarkerStore");
        if (!lang.getObject("marker.stores.markers", false, app)) {
            lang.setObject("marker.stores.markers", new Observable(new MarkerStore()), app);
        }
        return lang.getObject("marker.stores.markers", false, app);
    }
    
    function getCategoryStore() {
    	console.log("getCategoryStore");
    	if (!lang.getObject("marker.stores.categories", false, app)) {
    		lang.setObject("marker.stores.categories", new Observable(new CategoryStore()), app);
    	}
    	return lang.getObject("marker.stores.categories", false, app);
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

    router.registerSecured(baseRoute + "/marker", function(evt) {
        console.info("route " + baseRoute + "/marker");
        getMarkerStore();
        getCategoryStore();
        
        var routeEvent = {
            targetView: toolId + "MarkerListDetail",
            Widget: MarkerListDetail,
            title: "Markers",
            isList: true,
            model: {
                detailItem: false
            },
            evt: evt
        };

        routeHandler.route(routeEvent);
    });

    var route = baseRoute + "/marker/:id";
    
//    pageViewTracker.registerPageView(route, function(match) {
//        return match !== "create" ? "marker" : match;
//    });
    
    router.register(route, function(evt) {
        console.info("route " + route);

        var titleName;

        var item;
        var categoryItem;
        if (evt.params.id == "create") {
            titleName = "Create";
            getMarkerStore();
            getCategoryStore();
            item = {};
            categoryItem = {};
        } else {
            var store = getMarkerStore();
            item = store.get(evt.params.id);
            var categoryStore = getCategoryStore();
            categoryItem = categoryStore.query();
        }

        var id = evt.params.id;
        if (id == "create") {
        	id = "Create";
        }
        if (item) {
      
            var routeEvent = {
                targetView: toolId + "MarkerListDetail",
                Widget:MarkerListDetail,
                title: "Loading...",
                isDetail: true,
                model: {
                    detailItem: item
                },
                listRoute: baseRoute + "/marker",
                evt: evt
            };

            routeHandler.route(routeEvent);
        } else {
            evt.preventDefault();
            router.go(baseRoute + "/marker");
        }
    });

    router.register(baseRoute + "/marker/create/success", function(evt) {
        console.info("route " + baseRoute + "/marker/create/success");

        app.growler.growl({
            message: "Marker created successfully.",
            level: "success",
            timeout: 5000
        });
        setTimeout(function() {
            router.go(baseRoute + "/marker", true);
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