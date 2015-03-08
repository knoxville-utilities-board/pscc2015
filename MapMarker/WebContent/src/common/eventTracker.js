/* global _gaq */
define([],

function() {

    var tracker = {};

    tracker.trackEvent = function(category, action, /* String? */ label, /* String? */ value) {
        if (window._gaq) {
            var event = ["_trackEvent", category, action];
            if (label) {
                event.push(label);
            }
            if (value) {
                event.push(value);
            }
            _gaq.push(event);
        }
    };

    tracker.setAccount = function(key) {
        if (window._gaq) {
            _gaq.push(["_setAccount", key]);
        }
    };

    return tracker;
});