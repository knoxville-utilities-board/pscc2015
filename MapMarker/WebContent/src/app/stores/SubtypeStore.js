define(["dojo/_base/declare",
    "common/stores/KubJsonStore"],

function(declare, KubJsonStore) {

    return declare([KubJsonStore], {
    	
        idProperty: "id",
        
        //getFromServer: false,
        
        baseURL: "/MapMarkerRS/dojorest/subtype"
    });
});