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
    "dojo/text!./templates/Note.html"],

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

            this.store = lang.getObject("note.stores.notes", false, app);

            this.saveButton.on("click", lang.hitch(this, this.save));
            this.deleteButton.on("click", lang.hitch(this, this.remove));
        },

        onModelComplete: function(model) {
            console.log("model", model);
            app.appbar.set("title", "Notes > " + model.noteId);

            this.form.clearValidation();

            this.createdBy.set("value", this.model.createdBy || "");
            this.note.set("value", this.model.note || "");

            if (this.model.noteId) {
                this.deleteButton.show();
            } else {
                this.deleteButton.hide();
            }
        },

        save: function() {
            if (this.form.validate()) {
                this.model.note = this.note.get("value");
                this.model.createdBy = this.createdBy.get("value");

                if (this.model.noteId) {
                    this.store.put(this.model);
                } else {
                    this.store.add(this.model).then(function() {
                        router.go("/note/create/success");
                    });
                }
            }
        },

        remove: function() {
            if (!this._confirmDelete) {
                this.deleteButton.set("label", "Confirm Delete");
                this._confirmDelete = true;
            } else {
                this._confirmDelete = false;
                this.store.remove(this.model.noteId).then(function() {
                    router.go("/note");
                });
            }
        }
    });
});