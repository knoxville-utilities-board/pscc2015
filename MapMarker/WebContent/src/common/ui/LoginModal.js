define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "common/ui/LoginForm",
    "common/ui/View",
    "dojo/text!./templates/LoginModal.html"],

function(declare, lang, _TemplatedMixin, _WidgetsInTemplateMixin, LoginForm, View, template) {

    return declare([View, _TemplatedMixin, _WidgetsInTemplateMixin], {

        templateString: template,

        postCreate: function() {
            this.inherited(arguments);

            $(this.domNode).modal({
                backdrop: "static",
                show: false,
                keyboard: false
            });

            this.loginForm.onLoginSuccess = lang.hitch(this, "onLoginSuccess");
        },

        onLoginSuccess: function(response) {
            this.hide();
        },

        _setTitleAttr: {
            node: "titleNode",
            type: "innerHTML"
        },

        show: function() {
            this.timedOut = app.timedOut;
            app.timedOut = false;

            if (this.timedOut) {
                this.set("title", "Your session has timed out. Please login again.");
            } else {
                this.set("title", "Login");
            }

            $(this.domNode).modal("show");
        },

        hide: function() {
            $(this.domNode).modal("hide");
        }
    });
});
