define(["dojo/_base/declare",
    "dojo/_base/lang",
    "common/routing/router",
    "common/ui/Button",
    "common/ui/StoreList",
    "common/ui/ListDetailView",
    "app/ui/Category",
    "app/ui/CategoryListItem"],

function(declare, lang, router, Button, StoreList, ListDetailView, Category, CategoryListItem) {

    return declare([ListDetailView], {
        postCreate: function() {
            console.log("postCreate()");

            var store = this.store = lang.getObject("marker.stores.categories", false, app);

            var list = new StoreList({
                store: store,
                select: "single",
                hasWidgetContainer: true,
                itemRenderer: CategoryListItem,
                onSelect: function(evt) {
                    router.go("/category/" + this.item.id);
                }
            });
            this.set("list", list);
            
            var createButton = this.createButton = new Button({
                innerHTML: '<i class="buttonIcon fa fa-2x fa-plus"></i>',
                "class": "pull-right btn-link userListWidget",
                title: "Create a Category"
            });
            createButton.on("click", lang.hitch(this, function() {
                list.deselectAll();
                router.go("/category/create");
            }));
            list.addWidget(createButton);
            
            var detail = new Category();
            this.set("detail", detail);
        }
    });
});
