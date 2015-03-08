define(["dojo/_base/array",
    "dojo/_base/lang",
    "dojo/number"],

function(array, lang, number) {

    var stringHandling = {};

    lang.setObject("kub.util.stringHandling", stringHandling);

    stringHandling.mask = function(input) {
        var result = new Array(7).join("*") + input.substr(input.length - 4, 4);

        return result;
    };

    stringHandling.formatAsMoney = function(value) {
        if (isNaN(value)) {
            return value;
        } else {
            var newValue = number.format(Math.abs(value), {
                places: 2
            });

            if (value < 0) {

                return "($" + newValue + ")";
            } else {

                return "$" + newValue;
            }
        }
    };

    stringHandling.formatAsPhone = function(value) {
        var formatted = stringHandling.stripNonNumber(value, true);

        if (formatted.length > 3 && formatted.length < 8) {
            formatted = formatted.replace(/(\d{3})(\d*)/, '$1-$2');
        } else if (formatted.length > 7) {
            formatted = formatted.replace(/(\d{3})(\d{3})(\d*)/, '$1/$2-$3');
        }

        return formatted;
    };

    stringHandling.stripNonNumber = function(value, removeSpace) {
        removeSpace = typeof removeSpace !== 'undefined' ? removeSpace : false;
        var newValue;
        if (removeSpace) {
            newValue = value.replace(/[^0-9]/g, "");
        } else {
            newValue = value.replace(/[^0-9\s]/g, "");
        }
        return newValue;
    };

    stringHandling.stripNonAlpha = function(value, removeSpace) {
        removeSpace = typeof removeSpace !== 'undefined' ? removeSpace : false;
        var newValue;
        if (removeSpace) {
            newValue = value.replace(/[^a-zA-Z]/g, "");
        } else {
            newValue = value.replace(/[^a-zA-Z\s]/g, "");
        }
        return newValue;
    };

    stringHandling.stripNonAlphaNum = function(value, removeSpace) {
        removeSpace = typeof removeSpace !== 'undefined' ? removeSpace : false;
        var newValue;
        if (removeSpace) {
            newValue = value.replace(/[^a-zA-Z0-9]/g, "");
        } else {
            newValue = value.replace(/[^a-zA-Z0-9\s]/g, "");
        }
        return newValue;
    };

    stringHandling.formatErrors = function(errors) {
        var errMsg = "<ul>";
        array.forEach(errors, function(element) {
            errMsg += "<li>" + element + "</li>";
        });
        errMsg += "</ul>";

        return errMsg;
    };

    return stringHandling;
});
