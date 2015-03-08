define(["dojo/_base/lang",
    "dojo/json",
    "dojo/request/xhr"],

function(lang, JSON, request) {

    var service = {};

    var baseUrl = "/wps/api/common/logger/dojorest/logger/error/";

    var site = "EWA";

    service.log = function(devMsg, errorMsg, lineNumber, url) {
        console.log("loggerService.log()");
        try {
            var logEntry = {};
            if (devMsg !== undefined) {
                logEntry.developerMessage = devMsg;
            } else {
                logEntry.developerMessage = "";
            }

            if (errorMsg !== undefined) {
                logEntry.errorMessage = errorMsg;
            } else {
                logEntry.errorMessage = "";
            }

            if (lineNumber !== undefined) {
                logEntry.errorLine = lineNumber;
            } else {
                logEntry.errorLine = "";
            }

            logEntry.queryString = "Release: " + lang.getObject("dojoConfig.kub.release") || "";
            if (url !== undefined) {
                logEntry.url = url;
            } else {
                logEntry.url = window.location.href;
            }

            logEntry.referrer = "";
            if (app.isAuthenticated()) {
                logEntry.referrer += app.getUser().username;
            }

            console.log("Logging Error:", logEntry);
            url = baseUrl + site;
            return request(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                handleAs: "text",
                preventCache: true,
                data: JSON.stringify(logEntry)
            });
        } catch (e) {
            console.error(e.message);
        }
    };

    return service;
});