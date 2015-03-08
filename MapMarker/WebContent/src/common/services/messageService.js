define(["dojo/request/registry"],

function(request) {

    var service = {};

    var baseUrl = "/wps/wcm/connect/kub.content_en/kub_web/Help+Messages/";

    service.getHomeMessage = function() {
        var url = baseUrl + "4057";
        return request(url, {
            method: "GET",
            headers: {
                "Content-Type": "text/html"
            },
            query: {
                "id": "34c28020-48a9-4d48-ad07-b08b447202c4"
            },
            handleAs: "text"
        });
    };

    service.getMyAccountMessage = function() {
        var url = baseUrl + "My+Account+Alert";
        return request(url, {
            method: "GET",
            headers: {
                "Content-Type": "text/html"
            },
            query: {
                "id": "fd805c004a4d696abc3cff26f655c58c"
            },
            handleAs: "text"
        });
    };

    return service;
});