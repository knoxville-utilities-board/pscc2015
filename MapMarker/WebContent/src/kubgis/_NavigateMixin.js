/* global esriConfig */
define(["dojo/_base/declare",
    "esri/geometry/Point"],

function(declare, Point) {
    function error(message) {
        app.growler.growl({
            message: message,
            level: "danger",
            timeout: 5000
        });
    }

    return declare(null, {
        navigate: function(event) {
            this.map.infoWindow.hide();
            if (event.navigateTo) {
                if (!event.navigateFrom) {
                    getDirections(this.navigationLayer, event.navigateTo, this.map.spatialReference);
                } else {
                    this.navigationLayer.getDirections(event.navigateFrom, event.navigateTo);
                }
            }
        }
    });

    function getDirections(navigationLayer, toPoint, spatialReference) {
        navigator.geolocation.getCurrentPosition(function(location) {
            var point = new Point([location.coords.longitude, location.coords.latitude]);

            esriConfig.defaults.geometryService.project([point], spatialReference).then(function(projectedPoints) {
                var fromPoint = projectedPoints[0];
                navigationLayer.getDirections(fromPoint, toPoint);
            }, function() {
                error("Error getting location data");
            });
        }, function() {
            error("Error getting location data");
        });
    }
});