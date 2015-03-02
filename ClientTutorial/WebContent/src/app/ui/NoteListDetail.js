define(["dojo/_base/declare",
    "dojo/_base/lang",
    "common/routing/router",
    "common/ui/Button",
    "common/ui/StoreList",
    "common/ui/ListDetailView",
    "app/ui/Note",
    "app/ui/NoteListItem"],

function(declare, lang, router, Button, StoreList, ListDetailView, Note, NoteListItem) {

    return declare([ListDetailView], {
        postCreate: function() {
            console.log("postCreate()");

            var store = this.store = lang.getObject("note.stores.notes", false, app);

            var list = new StoreList({
                store: store,
                select: "single",
                hasWidgetContainer: true,
                itemRenderer: NoteListItem,
                onSelect: function(evt) {
                    router.go("/note/" + this.item.noteId);
                }
            });
            this.set("list", list);

            var createButton = this.createButton = new Button({
                innerHTML: '<i class="buttonIcon fa fa-2x fa-plus"></i>',
                "class": "pull-right btn-link userListWidget",
                title: "Create a Note"
            });
            createButton.on("click", lang.hitch(this, function() {
                list.deselectAll();
                router.go("/note/create");
            }));
            list.addWidget(createButton);

            var detail = new Note();
            this.set("detail", detail);
        }
    });
});
