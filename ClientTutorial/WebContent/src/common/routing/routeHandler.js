define(["dijit/registry",
    "common/routing/router"],

function(registry, router) {

    var routeHandler = {};

    routeHandler.route = function(routeObject) {
        console.info("route()", routeObject);

        var view = registry.byId(routeObject.targetView);

        if (!view) {
            view = new routeObject.Widget({
                id: routeObject.targetView,
                "class": "container"
            });
            app.container.addChild(view);
        }

        app.set("loading", false);
        app.container.showView(view);

        app.appbar.set("title", routeObject.title || "");

        if (routeObject.model) {
            view.set("model", routeObject.model);
        }

        if (routeObject.isList) {
            view.showList();
        }
        if (routeObject.isDetail || routeObject.returnToRoute) {
            app.appbar.showBackButton(true, routeObject.returnToRoute);
            app.returnToRoute = routeObject.listRoute || routeObject.returnToRoute;
            if (routeObject.isDetail) {
                view.showDetail();
            }
        } else {
            app.appbar.showBackButton(false);
        }

        router.loading = false;
    };

    return routeHandler;
});