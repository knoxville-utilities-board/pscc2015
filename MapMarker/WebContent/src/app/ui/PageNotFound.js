define(["dojo/_base/declare",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "common/ui/_ModelApiMixin",
    "common/ui/View",
    "dojo/text!./templates/PageNotFound.html"],

function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin, View, template) {
    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelApiMixin], {
        templateString: template,

        onModelComplete: function(model) {
            this.hashNode.innerHTML = model;
        }
    });
});