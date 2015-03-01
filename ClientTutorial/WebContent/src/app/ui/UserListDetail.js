define(["dojo/_base/declare",
    "dojo/_base/lang",
    "common/routing/router",
    "common/ui/Button",
    "common/ui/StoreList",
    "common/ui/ListDetailView",
    "app/ui/User"],

function(declare, lang, router, Button, StoreList, ListDetailView, User) {

    return declare([ListDetailView], {
        postCreate: function() {
            console.log("postCreate()");

            var store = this.store = lang.getObject("user.stores.users", false, app);

            var list = new StoreList({
                store: store,
                select: "single",
                hasWidgetContainer: true,
                onSelect: function(evt) {
                    router.go("/user/" + this.item.userId);
                }
            });
            this.set("list", list);

            var createButton = this.createButton = new Button({
                innerHTML: '<i class="buttonIcon fa fa-2x fa-plus"></i>',
                "class": "pull-right btn-link userListWidget",
                title: "Create a user"
            });
            createButton.on("click", lang.hitch(this, function() {
                list.deselectAll();
                router.go("/user/create");
            }));
            list.addWidget(createButton);

            var detail = new User();
            this.set("detail", detail);
        }
    });
});
