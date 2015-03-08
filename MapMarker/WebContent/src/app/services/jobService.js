define(["dojo/request/registry"],

function(request) {

    var service = {};

    var baseUrl = "/internal/api/Employees/ami/dojorest/job";

    service.getFilters = function(filters) {
        console.log("getFilters()");

        var filter = [];
        for (var key in filters) {
            if (filters.hasOwnProperty(key) && (filters[key] || filters[key] === false)) {
                filter.push(key + ":" + filters[key]);
            }
        }
        
        var url = baseUrl + "/getFilters";
        return request(url, {
            method: "POST",
            handleAs: "json",
            preventCache: true,
            headers: {
                "Content-Type": "application/json"
            },
            query: {
            	filter:filter
            }
        });
    };

    return service;
});
