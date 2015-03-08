define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/when",
    "dojox/mobile/_StoreListMixin",
    "./GenericListItem",
    "./GroupLabelListItem",
    "./List"],

function(declare, lang, domClass, domConstruct, on, when, _StoreListMixin, GenericListItem, GroupLabelListItem, List) {

    return declare([List, _StoreListMixin], {

        itemRenderer: GenericListItem,

        onDeleteClass: "listItemRemove",

        onUpdateClass: "listItemUpdate",

        noEntriesLabel: "No entries",

        loadingLabel: "Loading",

        errorLabel: "Error getting data",

        moreLabel: "More",

        total: 0,

        runningCount: 0,

        append: true,

        query: {},

        pageSize: 25,

        startIndex: 0,

        refreshOnStartup: true,

        showMore: true,

        state: "none",

        addedItemsGroupLabel: "Now",

        constructor: function() {
            this.stateItem = new GenericListItem({
                noCheck: true,
                leftLabelCenter: true,
                noArrow: true
            });
            this.stateItem.startup();
        },

        _setStateAttr: function(state) {
            this.state = state;
            if (this.stateItem) {
                this.stateItem.set("busy", false);
                this.removeChild(this.stateItem);

                var label = "";
                if (state === "loading") {
                    this.stateItem.set("busy", true);
                    label = this.loadingLabel;
                } else if (state === "more") {
                    label = this.moreLabel;
                } else if (state === "empty") {
                    label = this.noEntriesLabel;
                } else if (state === "error") {
                    label = this.getErrorLabel();
                }

                if (state !== "none") {
                    this.stateItem.set("leftLabel", label);
                    this.addChild(this.stateItem, null, false);
                }
            }
        },

        setStore: function(store, query, queryOptions) {
            this._configurePaging(store);
            this.inherited(arguments);
        },

        _configurePaging: function(store) {
            store = store || this.store;
            if (store) {
                this.pageSize = store.pageSize || this.pageSize;
                this.startIndex = store.startIndex || this.startIndex;
            }
        },

        postCreate: function() {
            console.info("postCreate()");
            this.inherited(arguments);

            this.stateItem.on("click", lang.hitch(this, "_loadMore"));

            if (!this.onCompleteFired && this.refreshOnStartup) {
                this.set("state", "loading");
            }
        },

        refresh: function(append) {
            this.__NowGroupListItem = null;

            var oldAppend = this.append;
            if (append === false || append === true) {
                this.append = append;
                on.once(this, "complete", lang.hitch(this, function() {
                    this.append = oldAppend;
                }));
            }

            if (!this.append) {
                this._lastGroupLabel = "";
                this.runningCount = 0;
            }

            if (!this.refreshOnStartup) {
                this.refreshOnStartup = true;
                return null;
            } else {
                this.set("state", "loading");
                var results = this.inherited(arguments);
                if (results.total) {
                    this.total = results.total;
                } else {
                    //when the total is not sent with the query results
                    //assume there are no more items to be resolved
                    this.total = when(results, function(items) {
                        return items.length;
                    });
                }
                return results;
            }
        },

        getErrorLabel: function() {
            return this.errorLabel;
        },

        //overriding _StoreListMixin method
        _createItemProperties: function( /*Object*/ item) {
            var props = {};

            if (!item.label) {
                props.label = item[this.labelProperty];
            }

            props.item = {};
            for (var name in item) {
                if (item.hasOwnProperty(name)) {
                    props.item[(this.itemMap && this.itemMap[name]) || name] = item[name];
                }
            }

            return props;
        },

        onComplete: function(items) {
            this.set("state", "none");
            this.inherited(arguments);
            this.runningCount += items.length;

            when(this.total, lang.hitch(this, function(total) {
                if (this.runningCount < total) {
                    if (this.showMore) {
                        this.set("state", "more");
                    }
                } else if (this.runningCount === 0) {
                    this.set("state", "empty");
                }
                this.onCompleteFired = true;
            }));
        },

        onError: function(err) {
            this.inherited(arguments);
            this.clearList();

            //if the deferred was canceled, keep whatever state the list is in
            if (err.dojoType !== "cancel") {
                this.set("state", "error");
            } else {
                this.set("state", "loading");
            }
        },

        _loadMore: function() {
            console.info("loadMore()");

            if (this.state === "more") {
                this.set("state", "loading");
                this.setQuery(this.query, lang.mixin(this.options, {
                    start: this.runningCount + this.startIndex,
                    count: this.pageSize
                }));
            }
        },

        onAdd: function(item, insertedInto, active) {
            this.set("state", "none");

            var updateClass = this.onUpdateClass;
            var listItem = this.createListItem(item);

            if (this.groupLabel(item) !== false) {
                if (insertedInto === 0) {
                    insertedInto = 1;
                }
                if (!this.__NowGroupListItem) {
                    this.__NowGroupListItem = new GroupLabelListItem({
                        innerHTML: this.addedItemsGroupLabel
                    });
                    this.addChild(this.__NowGroupListItem, 0);
                }
            }

            domClass.add(listItem.domNode || listItem, updateClass);

            this.addChild(listItem, insertedInto, false);
            if (active) {
                domClass.add(listItem.domNode || listItem, "active");
            }
            setTimeout(function() {
                domClass.remove(listItem.domNode || listItem, updateClass);
            }, 1000);
        },

        onDelete: function(item, removedFrom) {
            var children = this.getChildren();
            var child = children[removedFrom];
            var node = child.domNode;

            domClass.add(node, this.onDeleteClass);
            child.destroyRecursive(true);
            this.total = --children.length;

            setTimeout(lang.hitch(this, function() {
                domConstruct.destroy(node);
                if (children.length === 0) {
                    this.set("state", "empty");
                }
            }), 600);
        },

        onUpdate: function(item, insertedInto) {
            //find the child to be updated
            var updatedChild;
            var count = 0;
            this.getChildren().some(function(child, index) {
                if (!(child instanceof GroupLabelListItem)) {
                    if (count++ === insertedInto) {
                        insertedInto = index;
                        updatedChild = child;
                        return true;
                    }
                }
            });

            if (updatedChild) {
                var active = domClass.contains(updatedChild.domNode || updatedChild, "active");
                updatedChild.destroyRecursive();
            }

            this.onAdd(item, insertedInto, active);
        },

        clearList: function() {
            this.set("state", "none");

            this.destroyDescendants();

            this.runningCount = 0;
            this.total = 0;

            this.queryOptions = lang.mixin(this.options, {
                start: this.startIndex,
                count: this.pageSize
            });
        }
    });
});
