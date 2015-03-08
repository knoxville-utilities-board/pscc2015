define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/window",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "./_ModelApiMixin",
    "./View",
    "dojo/text!./templates/ListDetailView.html"],

function(declare, lang, win, domClass, domStyle, on, _TemplatedMixin, _ModelApiMixin, View, template) {

    return declare([View, _TemplatedMixin, _ModelApiMixin], {

        templateString: template,

        list: null,

        detail: null,

        baseClass: "no-gutter",

        _setModelAttr: function(model) {
            this.model = model;
            if (model.listItem) {
                this.list.set("model", model.listItem);
            }
            if (model.detailItem) {
                this.detailDiv.scrollTop = 0;
            }
            this.detail.set("model", model.detailItem);
            this.own(on(win.global, "resize", lang.hitch(this, this.resize)));
            this.resize();
        },

        _setListAttr: function(list) {
            this.list = list;
            list.placeAt(this.listDiv);
            list.startup();
        },

        _setDetailAttr: function(detail) {
            this.detail = detail;
            detail.placeAt(this.detailDiv);
            detail.startup();
        },

        resize: function() {
            var top = domStyle.get(window.document.body, "padding-top");
            var bottom = domStyle.get(window.document.body, "padding-bottom");
            domStyle.set(this.listDiv, "height", (window.innerHeight - top - bottom) + "px");
            domStyle.set(this.detailDiv, "height", (window.innerHeight - top - bottom) + "px");
        },

        showList: function() {
            this.list.deselectAll();
            this.isDetail = false;
            domClass.add(this.detailDiv, "hidden-xs");
            domClass.remove(this.listDiv, "hidden-xs");
        },

        showDetail: function() {
            window.scrollTo(0, 0);
            this.isDetail = true;
            domClass.add(this.listDiv, "hidden-xs");
            domClass.remove(this.detailDiv, "hidden-xs");
        }
    });
});
