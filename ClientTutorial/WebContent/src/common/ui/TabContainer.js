define(["dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "common/ui/View",
    "dojo/text!./templates/TabContainer.html"],

function(declare, domConstruct, on, _TemplatedMixin, View, template) {
    return declare([View, _TemplatedMixin], {
        templateString: template,

        _tabs: null,

        postCreate: function() {
            this.inherited(arguments);

            this._tabs = [];
            $(this.tabNode).tabdrop();
        },

        addChild: function(child, index, name) {
            var id = child.id + "1";

            var li = domConstruct.create("li", {
                "class": ""
            }, this.tabNode, "last");

            var a = domConstruct.create("a", {
                innerHTML: name,
                href: "#" + id,
                "data-toggle": "tab"
            }, li);

            var tabPane = domConstruct.create("div", {
                "class": "tab-pane",
                id: id
            }, this.containerNode, "last");
            domConstruct.place(child.domNode || child, tabPane);
            if (child.startup && !child._started) {
                child.startup();
            }

            this._tabs.push({
                tab: li,
                content: tabPane,
                child: child,
                a: a
            });

            $(a).on("shown.bs.tab", function(e) {
                on.emit(child, "show");
                if (child.resize) {
                    child.resize();
                }
            });

            this._layout();
        },

        clear: function(preserveDom) {
            if (this._tabs.length) {
                this._tabs.forEach(function(item) {
                    if (preserveDom) {
                        domConstruct.empty(item.tab);
                        domConstruct.empty(item.content);
                    } else {
                        domConstruct.destroy(item.tab);
                        domConstruct.destroy(item.content);
                    }
                    item.child.destroyRecursive();
                    $(item.a).off("shown.bs.tab");
                });
                this._tabs = [];
                this._layout();
            }
        },

        _layout: function() {
            this.defer(function() {
                $(this.tabNode).tabdrop("layout");
            }, 1000);
        },

        show: function() {
            if (this._tabs.length) {
                $(this._tabs[0].a).tab("show");
            }
        }
    });
});