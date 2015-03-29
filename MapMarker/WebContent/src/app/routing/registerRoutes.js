define(["dojo/_base/config",
    "dojo/_base/lang",
    "dojo/store/Observable",
    "app/stores/MarkerStore",
    "app/stores/CategoryStore",
    "app/stores/DirectionStore",
    "app/stores/SeverityStore",
    "app/stores/SubtypeStore",
    "app/stores/TypeStore",
    "app/stores/UtilityStore",

    "app/ui/Login",
    "app/ui/PageNotFound",
    "app/ui/Home",
    "app/ui/Marker",
    "app/ui/MarkerListDetail",
    "app/ui/Category",
    "app/ui/CategoryListDetail",

    "common/pageViewTracker",
    "common/routing/router",
    "common/routing/routeHandler"],

function(config, lang, Observable, MarkerStore, CategoryStore, DirectionStore, SeverityStore, SubtypeStore, TypeStore, UtilityStore, Login, PageNotFound, Home, Marker, MarkerListDetail, Category, CategoryListDetail, pageViewTracker, router, routeHandler) {

    var toolId = "app.";

    var baseRoute = "";

    function getMarkerStore() {
    	console.log("getMarkerStore");
    	var store = lang.getObject("marker.stores.markers", false, app);
        if (!store) {
            store = lang.setObject("marker.stores.markers", new Observable(new MarkerStore()), app);
            store.query();            
        }
        return store;
    }
    
    function getCategoryStore() {
    	console.log("getCategoryStore");
    	var store = lang.getObject("marker.stores.categories", false, app);
    	if (!store) {
    		store = lang.setObject("marker.stores.categories", new Observable(new CategoryStore()), app);
    		store.query();
    	}
    	return store;
    }
    
    function getDirectionStore() {
    	console.log("getDirectionStore");
    	var store = lang.getObject("marker.stores.directions", false, app);
    	if (!store) {
    		store = lang.setObject("marker.stores.directions", new Observable(new DirectionStore()), app);
    		store.query();
    	}
    	return store;
    }
    
    function getSeverityStore() {
    	console.log("getSeverityStore");
    	var store = lang.getObject("marker.stores.severities", false, app)
    	if (!store) {
    		store = lang.setObject("marker.stores.severities", new Observable(new SeverityStore()), app);
    		store.query();
    	}
    	return store;
    }
    
    function getSubtypeStore() {
    	console.log("getSubtypeStore");
    	var store = lang.getObject("marker.stores.subtypes", false, app)
    	if (!store) {
    		store = lang.setObject("marker.stores.subtypes", new Observable(new SubtypeStore()), app);
    		store.query();
    	}
    	return store;
    }
    
    function getTypeStore() {
    	console.log("getTypeStore");
    	var store = lang.getObject("marker.stores.types", false, app)
    	if (!store) {
    		store = lang.setObject("marker.stores.types", new Observable(new TypeStore()), app);
    		store.query();
    	}
    	return store;
    }
    
    function getUtilityStore() {
    	console.log("getUtilityStore");
    	var store = lang.getObject("marker.stores.utilities", false, app)
    	if (!store) {
    		store = lang.setObject("marker.stores.utilities", new Observable(new UtilityStore()), app);
    	}
    	return store;
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
        getDirectionStore();
        getSeverityStore();
        getSubtypeStore();
        getTypeStore();
        getUtilityStore();
        
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
        var directionItem;
        var severityItem;
        var subtypeItem;
        var typeItem;
        var utilityItem;
        if (evt.params.id == "create") {
            titleName = "Create";
            getMarkerStore();
            getCategoryStore();
            getDirectionStore();
            getSeverityStore();
            getSubtypeStore();
            getTypeStore();
            getUtilityStore();
            item = {};
            categoryItem = {};
            directionItem = {};
            severityItem = {};
            subtypeItem = {};
            typeItem = {};
            utilityItem = {};
        } else {
            var store = getMarkerStore();
            item = store.get(evt.params.id);
            var categoryStore = getCategoryStore();
            categoryItem = categoryStore.query();
            var directionStore = getDirectionStore();
            directionItem = directionStore.query();
            var severityStore = getSeverityStore();
            severityItem = severityStore.query();
            var subtypeStore = getSubtypeStore();
            subtypeItem = subtypeStore.query();
            var typeStore = getTypeStore();
            typeItem = typeStore.query();
            var utilityStore = getUtilityStore();
            utilityItem = utilityStore.query();
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
    
    router.registerSecured(baseRoute + "/category", function(evt) {
        console.info("route " + baseRoute + "/category");
        getCategoryStore();
        
        var routeEvent = {
            targetView: toolId + "CategoryListDetail",
            Widget: CategoryListDetail,
            title: "Categories",
            isList: true,
            model: {
                detailItem: false
            },
            evt: evt
        };

        routeHandler.route(routeEvent);
    });

    var route = baseRoute + "/category/:id";
    
//    pageViewTracker.registerPageView(route, function(match) {
//        return match !== "create" ? "category" : match;
//    });
    
    router.register(route, function(evt) {
        console.info("route " + route);

        var titleName;

        var item;
        var categoryItem;
        if (evt.params.id == "create") {
            titleName = "Create";
            getCategoryStore();
            item = {};
        } else {
            var store = getCategoryStore();
            item = store.get(evt.params.id);
        }

        var id = evt.params.id;
        if (id == "create") {
        	id = "Create";
        }
        if (item) {
      
            var routeEvent = {
                targetView: toolId + "CategoryListDetail",
                Widget:CategoryListDetail,
                title: "Loading...",
                isDetail: true,
                model: {
                    detailItem: item
                },
                listRoute: baseRoute + "/category",
                evt: evt
            };

            routeHandler.route(routeEvent);
        } else {
            evt.preventDefault();
            router.go(baseRoute + "/category");
        }
    });

    router.register(baseRoute + "/category/create/success", function(evt) {
        console.info("route " + baseRoute + "/category/create/success");

        app.growler.growl({
            message: "Category created successfully.",
            level: "success",
            timeout: 5000
        });
        setTimeout(function() {
            router.go(baseRoute + "/category", true);
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