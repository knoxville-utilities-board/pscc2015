define(["dojo/_base/declare",
    "./KubJsonRest",
    "./Cache"],

function(declare, KubJsonRest, Cache) {
    return declare([KubJsonRest, Cache], {
        //        /*** Overridable parameters ***/
        //
        //        sort: null, //default sort parameter for the query
        //
        //        pageSize: 25, //default number of items to get when requesting a list
        //
        //        startIndex: 0, //default first index when getting fresh data if none given
        //
        //        baseURL: "", //exclude trailing "/" i.e. "/wps/api/Customers/meter/dojorest/meter"
        //
        //        idProperty: "id",
        //
        //        getFromServer: undefined

        ///////////// if getFromServer is true --- it will always go to the server for a GET
        ///////////// if getFromServer is false --- it will never go to the server for a GET 
        ///////////// if getFromServer is undefined (default) --- it will only go to the server if it is not in the cache
    });
});
