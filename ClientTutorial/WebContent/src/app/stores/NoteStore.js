define(["dojo/_base/declare",
    "common/stores/KubJsonStore"],

function(declare, KubJsonStore) {

    return declare([KubJsonStore], {
        idProperty: "userId",
        
        getFromServer: false,
        
        baseURL: "/JPATutorial/dojorest/note"
    });
});