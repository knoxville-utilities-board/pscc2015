define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/when",
    "dojo/store/Memory",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojox/widget/ColorPicker",
    "common/routing/router",
    "common/ui/_ModelApiMixin",
    "common/ui/Button",
    "common/ui/DateTimePicker",
    "common/ui/DropdownStoreList",
    "common/ui/Form",
    "common/ui/FormItem",
    "common/ui/TextArea",
    "common/ui/TextBox",
    "common/ui/View",
    "app/ui/DropdownListItem",
    "util/dateHandling",
    "dojo/text!./templates/Category.html"],

function(declare, lang, when, Memory, _TemplatedMixin, _WidgetsInTemplateMixin, ColorPicker, router, _ModelApiMixin, Button, DateTimePicker, DropdownStoreList, Form, FormItem, TextArea, TextBox, View, DropdownListItem, dateHandling, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin], {
        templateString: template,

        postCreate: function() {
            var emptyValidate = function() {
                if (this.get("value") === "") {
                    return "Required field";
                }
                return true;
            };

            this.store = lang.getObject("marker.stores.categories", false, app);
            console.log("the store", this.store);

            var symbolStore = new Memory({
                idProperty: "id",
                data: [{
                    id: "Circle",
                    title: "Circle"
                /*}, {		For some reason Esri's cross and X markers don't seem to display. They appear to be working properly, data looks fine... they just don't show.
                    id: "Cross",
                    title: "Cross"*/
                }, {
                    id: "Diamond",
                    title: "Diamond"
                }, {
                    id: "Square",
                    title: "Square"
                /*}, {
                    id: "X",
                    title: "X"*/
                }]
            });
            this.symbol.setStore(symbolStore);
            this.symbol.itemRenderer = DropdownListItem;

            this.saveButton.on("click", lang.hitch(this, function() {
                this.save();
            }));

            this.deleteButton.on("click", lang.hitch(this, this.remove));
        },

        onModelComplete: function(model) {
            console.log("model", model);

            var categoryNo = model.id ? model.id : 'New';
            app.appbar.set("title", "Categories > " + categoryNo);

            this.form.clearValidation();

            var symbolStore = new Memory({
                idProperty: "id",
                data: [{
                    id: "Circle",
                    title: "Circle"
                /*}, {
                    id: "Cross",
                    title: "Cross"*/
                }, {
                    id: "Diamond",
                    title: "Diamond"
                }, {
                    id: "Square",
                    title: "Square"
                /*}, {
                    id: "X",
                    title: "X"*/
                }]
            });
            this.symbol.setStore(symbolStore);
            this.symbol.itemRenderer = DropdownListItem;

            //Text
            this.title.set("value", this.model.title || "");
            this.description.set("value", this.model.description || "");

            //Dropdowns
            var symbol = "Circle";
            var color = "#000000";
            if (this.model.symbology) {
                var split = this.model.symbology.split(",");
                symbol = split[0];
                if (split[1]) {
                    color = split[1];
                }
            }

            var label = "Select One...";
            var value = null;
            if (symbol) {
                var symbolModel = symbolStore.get(symbol);
                when(symbolModel).then(function(symbolModel) {
                    label = symbolModel.title;
                    value = symbolModel.id;
                });
            }
            this.symbol.set("label", label || 'Select One...');
            this.symbol.set("value", value);

            //ColorPicker
            this.color.set("value", color);

            //Should be disabled & set with login info when app is deployed
            this.createdBy.set("value", this.model.createdBy || "");
            this.createdBy.set("disabled", true);
            this.editedBy.set("value", this.model.editedBy || "");
            this.editedBy.set("disabled", false); 

            if (this.model.id) {
                this.deleteButton.show();
                if(this._confirmDelete) {
                	this._confirmDelete = false;
                	this.deleteButton.set("label", "Delete");
                    this.deleteButton.set("style", "color: #063c6f;");
                }
                $('#catCreateDetails').text("Created on " + dateHandling.kubDate(this.model.createdDate) + " at " + dateHandling.kubTime(this.model.createdDate) + " by " + this.model.createdBy);
                if (this.model.editedDate && this.model.editedBy !== '') {
                	$('#catEditDetails').text("Last modified on " + dateHandling.kubDate(this.model.editedDate) + " at " + dateHandling.kubTime(this.model.editedDate) + " by " + this.model.editedBy);
                } else {
                	$('#catEditDetails').text("");
                }
            } else {
                this.deleteButton.hide();
                this.createdBy.set("disabled", false); //Should be disabled & set with login info when app is deployed
                this.editedBy.set("disabled", true);
                $('#catCreateDetails').text("");
                $('#catEditDetails').text("");
            }

        },

        save: function() {
            if (this.form.validate()) {
                this.model.title = this.title.get("value");
                this.model.description = this.description.get("value");
                this.model.symbology = this.symbol.get("value") + "," + this.color.get("value");
                this.model.createdBy = this.createdBy.get("value");
                this.model.editedBy = this.editedBy.get("value");
                //createdDate and editedDate are set automatically

                if (this.model.id) {
                    this.model.editedDate = dateHandling.javaISOString(new Date());
                    this.store.put(this.model);
                } else {
                    this.model.isActive = true;
                    this.model.createdDate = dateHandling.javaISOString(new Date());
                    console.log(this.store.put(this.model));
                    router.go("/category/create/success");
                }
            }
        },

        remove: function() {
            if (!this._confirmDelete) {
                this.deleteButton.set("label", "Confirm Delete");
                this.deleteButton.set("style", "color: #dc6e65;");
                this._confirmDelete = true;
            } else {
                this.deleteButton.set("label", "Delete");
            	this.deleteButton.set("style", "color: #063c6f;");
                this._confirmDelete = false;
                this.store.remove(this.model.id).then(function() {
                    router.go("/category");
                });
            }
        }

    });
});