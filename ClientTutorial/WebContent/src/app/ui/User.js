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
    "common/ui/TextBox",
    "common/ui/View",
    "util/dateHandling",
    "dojo/text!./templates/User.html"],

function(declare, lang, _TemplatedMixin, _WidgetsInTemplateMixin, router, _ModelApiMixin, Button, DropdownStoreList, Form, FormItem, TextBox, View, dateHandling, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin], {
        templateString: template,

        postCreate: function() {
            var emptyValidate = function() {
                if (this.get("value") === "") {
                    return "Required field";
                }
                return true;
            };

            this.store = lang.getObject("user.stores.users", false, app);
            var rolesStore = lang.getObject("user.stores.roles", false, app);
            this.role.setStore(rolesStore);

            this.username.validate = emptyValidate;
            this.role.validate = emptyValidate;

            this.saveButton.on("click", lang.hitch(this, this.save));
            this.deleteButton.on("click", lang.hitch(this, this.remove));
        },

        onModelComplete: function(model) {

            this.form.clearValidation();

            this.username.set("value", this.model.userName || "");

            if (!model.userId) {
                model.isAnonymous = false;
                model.mobileAlias = null;
                model.lastActivityDate = dateHandling.javaISOString(new Date());
                model.roles = [];
                model.applicationId = "063C2A70-AE08-43CD-8604-CE63A438A5F3";
            }

            if (model.roles.length) {
                this.role.set("value", model.roles[0]);
                this.role.set("label", model.roles[0].roleName);
            } else {
                this.role.set("value", "");
                this.role.set("label", "Select One");
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
                    router.go("/user/create/success");
                }
            }
        },

        remove: function() {
            this.store.remove(this.item.userId);
            router.go("/user");
        }
    });
});