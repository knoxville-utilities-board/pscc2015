define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "common/routing/router",
    "common/ui/_ModelApiMixin",
    "common/ui/Button",
    "common/ui/DropdownStoreList",
    "common/ui/Form",
    "common/ui/FormItem",
    "common/ui/TextArea",
    "common/ui/TextBox",
    "common/ui/View",
    "util/dateHandling",
    "dojo/text!./templates/Marker.html"],

function(declare, lang, _TemplatedMixin, _WidgetsInTemplateMixin, router, _ModelApiMixin, Button, DropdownStoreList, Form, FormItem, TextArea, TextBox, View, dateHandling, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin], {
        templateString: template,

        postCreate: function() {
            var emptyValidate = function() {
                if (this.get("value") === "") {
                    return "Required field";
                }
                return true;
            };

            this.store = lang.getObject("marker.stores.markers", false, app);
            console.log("the store", this.store);
            // var rolesStore = lang.getObject("user.stores.roles", false, app);
            /// this.role.setStore(rolesStore);

            //this.username.validate = emptyValidate;
            // this.role.validate = emptyValidate;

            //    this.saveButton.on("click", lang.hitch(this, this.save));
            //   this.deleteButton.on("click", lang.hitch(this, this.remove));
        },

        onModelComplete: function(model) {
            console.log("model", model);
            app.appbar.set("title", "Markers > " + model.id);
            
            this.form.clearValidation();

            this.createdBy.set("value", this.model.createdBy || "");
            this.description.set("value", this.model.description || "");

            if (!model.id) {
                //model defaults here
                model.createdDate = dateHandling.javaISOString(new Date());
            }
        },

        save: function() {
            if (this.form.validate()) {
                this.model.userName = this.username.get("value");
                this.model.loweredUserName = this.username.get("value").toLowerCase();
                this.model.roles[0] = this.role.get("value");

                if (this.model.userId) {
                    this.store.put(this.model, {
                        id: this.model.userId
                    });
                } else {
                    console.log(this.store.put(this.model));
                    router.go("/marker/create/success");
                }
            }
        },

        remove: function() {
            this.store.remove(this.item.userId);
            router.go("/marker");
        }
    });
});