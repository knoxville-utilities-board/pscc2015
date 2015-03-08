define(["dojo/_base/declare",
    "common/stores/KubJsonStore"],

function(declare, KubJsonStore) {

    return declare([KubJsonStore], {
        idProperty: "noteId",
                
        baseURL: "/JPATutorial/dojorest/note"
    });
});