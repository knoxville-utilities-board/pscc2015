define(["dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Table.html"],

function(array, declare, lang, domConstruct, _WidgetBase, _TemplatedMixin, template) {
    return declare([_WidgetBase, _TemplatedMixin], {

        baseClass: "borderless",

        addHeading: function(headers) {
            if (headers) {
                var head = this._createDomNode("thead", null, this.containerNode, "first");
                var row = this._createRow(null, head);
                array.forEach(headers, function(header) {
                    var className;
                    if (lang.isObject(header)) {
                        className = header["class"];
                        header = header.header;
                    }
                    this._createColumn(header, row, className);
                }, this);
            }
        },

        addRow: function(columns) {
            if (columns) {
                var row = this._createRow();
                array.forEach(columns, function(column) {
                    var className;
                    if (column.isInstanceOf) {
                        //jshint noempty: false 
                        //is a widget..
                    } else if (lang.isObject(column)) {
                        className = column["class"];
                        column = column.column;
                    }
                    this._createColumn(column, row, className);
                }, this);
            }
        },

        ///// Private Methods /////

        templateString: template,

        _createDomNode: function(tag, innerHTML, refNode, pos, className) {
            var args = {};

            if (innerHTML === 0 || innerHTML && !innerHTML.isInstanceOf) {
                args.innerHTML = innerHTML;
            }
            if (className) {
                args["class"] = className;
            }
            var node = domConstruct.create(tag, args, refNode, pos);
            if (innerHTML && innerHTML.isInstanceOf) {
                innerHTML.placeAt(node);
            }
            return node;
        },

        _createRow: function(innerHTML, refNode, pos, className) {
            if (!this._body) {
                this._createBody();
            }
            if (!refNode) {
                refNode = this._body;
            }
            return this._createDomNode("tr", innerHTML, refNode, pos, className);
        },

        _createColumn: function(innerHTML, row, className) {
            return this._createDomNode("th", innerHTML, row, undefined, className);
        },

        _createBody: function() {
            this._body = this._createDomNode("tbody", null, this.containerNode);
            return this._body;
        }
    });
});