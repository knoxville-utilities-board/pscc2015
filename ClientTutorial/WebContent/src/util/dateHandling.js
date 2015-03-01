/* global moment */
define(["dojo/_base/lang"],

function(lang) {

    var dateHandling = {};
    //I don't think this necessary... - BZA
    lang.setObject("kub.util.dateHandling", dateHandling);

    var DATE_FORMAT = "L"; /* MM/DD/YYYY */
    var TIME_FORMAT = "hh:mm A";
    var DATETIME_FORMAT = DATE_FORMAT + " " + TIME_FORMAT;
    var JAVA_ISO_FORMAT = "YYYY-MM-DD[T]HH:mm:ssZZ";

    //formats that moment can be made to accept
    var PARSE_FORMATS = [moment.ISO_8601, "L HH:mm:ss", "L HH:mm:ss A", "YYYYMMDDHHmm", "HH:mm:ss A", "HH:mm:ss", "L", "YYYY-MM-DD"];

    function isDateObject(date) {
        return Object.prototype.toString.call(date) === "[object Date]";
    }

    function getMoment(date, parseFormat, displayFormat) {
        if (date) {
            if (!parseFormat && !isDateObject(date)) {
                parseFormat = PARSE_FORMATS;
            }
            return moment(date, parseFormat);
        }
        return null;
    }

    function getFormattedMoment(date, parseFormat, displayFormat) {
        var moment = getMoment(date, parseFormat);
        return moment ? moment.format(displayFormat) : null;
    }

    dateHandling.getDate = function(date, /* optional */ parseFormat) {
        return getMoment(date, parseFormat).toDate();
    };

    dateHandling.getMoment = function(date, /* optional */ parseFormat) {
        return getMoment(date, parseFormat);
    };

    dateHandling.currentMoment = function(displayFormat) {
        return moment().format(displayFormat);
    };

    dateHandling.parseIsoDate = function(date, /* optional */ parseFormat) {
        return getMoment(date, parseFormat).toDate();
    };

    dateHandling.toIsoString = function(date, /* optional */ parseFormat) {
        return getMoment(date, parseFormat).toISOString();
    };

    dateHandling.kubDateTime = function(date, /* optional */ parseFormat) {
        return getFormattedMoment(date, parseFormat, DATETIME_FORMAT);
    };

    dateHandling.kubDate = function(date, /* optional */ parseFormat) {
        return getFormattedMoment(date, parseFormat, DATE_FORMAT);
    };

    dateHandling.kubTime = function(date, /* optional */ parseFormat) {
        return getFormattedMoment(date, parseFormat, TIME_FORMAT);
    };

    dateHandling.javaISOString = function(date, /* optional */ parseFormat) {
        return getFormattedMoment(date, parseFormat, JAVA_ISO_FORMAT);
    };

    dateHandling.formattedDate = function(date, displayFormat, /* optional */ parseFormat) {
        return getFormattedMoment(date, parseFormat, displayFormat);
    };

    return dateHandling;
});
