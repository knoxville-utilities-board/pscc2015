define(["dojo/_base/declare",
    "dojo/_base/lang",
    "common/routing/router",
    "common/ui/_ModelApiMixin",
    "common/ui/View"],

function(declare, lang, router, _ModelApiMixin, View) {

    return declare([View, _ModelApiMixin], {

        onLoginSuccess: function(response) {
            var redirectURL = "";
            var segue = null;

            if (this.model) {
                redirectURL = this.model.redirectURL;
                segue = this.model.segue;
            }

            router.go(redirectURL, true, segue);

            this.set("model", false);
        },

        show: function() {
            this.inherited(arguments);
            app.appbar.hideMenuButtons(true);
            app.loginModal.show();
            $(app.loginModal.domNode).one("hidden.bs.modal", lang.hitch(this, "onLoginSuccess"));
        },

        hide: function() {
            this.inherited(arguments);
            app.appbar.hideMenuButtons(false);
        }
    });
});
