/* global _gaq */
define(["dojo/_base/array",
    "dojo/_base/lang",
    "dojo/topic"],

function(array, lang, topic) {

    var tracker = {};
    var pageViews = [ /* pageView */ ];

    /* 
     *  pageViewTracker.setAccount(googleAnalyticsKey);
     *  pageViewTracker.registerPageView(route, substitutions);
     *  pageViewTracker.registerPageView("/Home/OutageReport/:serviceType/:servicePointId/Report/:five", [pageViewTracker.IGNOREPARAM, "Premise", "Account"]);
     *
     *  Currently, The route must be a String and not a RegExp.
     *
     *  There must be as many substitutions as there are parameters.
     *  Possible scenarios for substitutions:
     *      substitutions = "Premise";
     *      substitutions = ["Premise"];
     *      substitutions = ["Premise", "Account"];
     *      substitutions = ["Premise", "Account", function(match) { return "Account"; }];
     *
     *      ---------- The match argument in the above function is the 3rd parameter in the route. In general, match is the nth parameter.
     *
     */

    function processPath(path) {
        array.forEach(pageViews, function(pageView) {
            var result = pageView.route.exec(path);
            if (result) {
                array.forEach(pageView.substitutions, function(substitution, index) {
                    var parameter = result[index + 1];
                    if (lang.isFunction(substitution)) {
                        substitution = substitution(parameter);
                    }
                    path = path.replace(parameter, substitution);
                });
            }
        });
        return path;
    }

    var idMatch = /(\/\*.*)|(\:[^\/]*)|([^:*]+\/?)/g;
    var idReplacement = "([^\\/]+)";
    var ignoredIdReplacement = "[^\\/]+";
    var globReplacement = "\/?.*";

    function createRegExp(route, substitutions) {
        var matches = route.match(idMatch);
        var numberOfMatches = 0;
        route = "";

        if (!matches) {
            return null;
        }

        var endChar = '';
        array.forEach(matches, function(match) {
            if (match.charAt(0) === ':') {
                var substitution = substitutions[numberOfMatches++];
                if (substitution === tracker.IGNOREPARAM) {
                    substitutions.splice(--numberOfMatches, 1);
                    route += ignoredIdReplacement;
                } else {
                    route += idReplacement;
                }
            } else if (match.charAt(1) === '*') {
                //guaranteed be the last match
                route += globReplacement;
                endChar = '$';
            } else {
                route += match;
            }
        });
        route = '^' + route + endChar;
        return new RegExp(route);
    }

    //track hash changes to Google Analytics
    topic.subscribe("/dojo/hashchange", function(path) {
        if (window._gaq) {
            path = processPath(path);
            window._gaq.push(["_trackPageview", path]);
        }
    });

    tracker.registerPageView = function(route, substitutions) {
        if (typeof route === "string") {
            if (typeof substitutions === "string") {
                substitutions = [substitutions];
            }
            route = createRegExp(route, substitutions);

            if (route) {
                pageViews.push({
                    route: route,
                    substitutions: substitutions
                });
            }
        }
    };

    tracker.setAccount = function(key) {
        if (window._gaq) {
            _gaq.push(["_setAccount", key]);
        }
    };

    tracker.IGNOREPARAM = "IGNORE";

    return tracker;
});
