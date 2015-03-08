define(["dojo/_base/declare",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "common/ui/View",
    "dojo/text!./templates/Home.html"],

function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, View, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template
    });
});
