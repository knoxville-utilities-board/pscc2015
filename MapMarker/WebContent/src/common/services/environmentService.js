define(["dojo/Deferred",
    "dojo/request/registry"],

function(Deferred, request) {

    var service = {};
    var baseUrl = "dojorest/environment/";

    service.getPropertyBag = function() {
        console.log("environmentService.getPropertyBag()");

        var url = baseUrl + "getPropertyBag";
        return request(url, {
            method: "POST",
            handleAs: "json",
            preventCache: true
        });
    };

    service.logout = function() {
        console.log("environmentService.logout()");

        var url = baseUrl + "logout";
        return request(url, {
            method: "POST"
        });
    };

    //WASv7 container login
    service.login = function(username, password) {
        console.log("login()");

        var params = "j_username=" + encodeURIComponent(username) + "&j_password=" + encodeURIComponent(password);
        var deferred = new Deferred();

        request("j_security_check", {
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: params
        }).then(function(response) {
            console.log("success");

            deferred.resolve();

        }, function() {
            console.log("failed");

            deferred.reject("Login Failed");
        });

        return deferred.promise;
    };

    service.clearWASReqURL = function() {
        console.log("environmentService.clearWASReqURL()");

        var url = baseUrl + "clearWASReqURL";

        return request(url, {
            method: "POST",
            preventCache: true
        });
    };

    return service;
});