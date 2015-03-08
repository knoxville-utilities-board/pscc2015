define(["dojo/request/registry"],

function(request) {

    var service = {};

    var baseUrl = "/wps/wcm/";

    service.getContent = function(path) {
        console.log("wcmService.getContent()");
        
        var wcmSegment = "connect";

        // change URL if logged in
        if (app.getUser().username) {
            wcmSegment = "myconnect";
        }

        var url = baseUrl + wcmSegment + path;
        return request(url, {
            method: "GET",
            handleAs: "html"
        });
    };
    return service;
});
