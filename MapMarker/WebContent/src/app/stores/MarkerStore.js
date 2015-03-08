define(["dojo/_base/declare",
    "common/stores/KubJsonStore"],

function(declare, KubJsonStore) {

    return declare([KubJsonStore], {
    	
        idProperty: "id",
        
        getFromServer: true,
        
        baseURL: "/MapMarkerRS/dojorest/marker"
    });
});