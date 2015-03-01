define(["dojo/json",
    "dojo/request/registry"],

function(JSON, request) {

    var service = {};
    var baseUrl = "/wps/api/Customers/person/dojorest/person/";

    service.forgotUsername = function(data) {
        var url = baseUrl + "forgotUsername";
        return request(url, {
            method: "POST",
            handleAs: "json",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data)
        });
    };

    service.forgotPassword = function(data) {
        var url = baseUrl + "forgotPassword";
        return request(url, {
            method: "POST",
            handleAs: "json",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data)
        });
    };

    service.registerWebsiteUser = function(data) {
        var url = baseUrl + "registerWebsiteUser";
        return request(url, {
            method: "POST",
            handleAs: "json",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data)
        });
    };

    service.authorizeWebsiteUser = function(data) {
        var url = baseUrl + "authorizeWebsiteUser";
        return request(url, {
            method: "POST",
            handleAs: "json",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data)
        });
    };

    service.updateWebsiteUser = function(data) {
        var url = baseUrl + "updateWebsiteUser";
        return request(url, {
            method: "POST",
            handleAs: "json",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data)
        });
    };

    return service;
});