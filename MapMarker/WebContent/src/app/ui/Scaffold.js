define(["dojo/_base/declare",
    "dojo/dom-construct",
    "dijit/_TemplatedMixin",
    "common/ui/Appbar",
    "common/ui/AppContainer",
    "common/ui/Growler",
    "common/ui/LoginModal",
    "common/ui/NewFeatures",
    "common/ui/SideNav",
    "common/ui/View",
    "dojo/text!./templates/Scaffold.html"],

function(declare, domConstruct, _TemplatedMixin, Appbar, AppContainer, Growler, LoginModal, NewFeatures, SideNav, View, template) {

    return declare([View, _TemplatedMixin], {

        templateString: template,

        appbar: null,

        growler: null,

        sideNav: null,

        container: null,

        newFeatures: null,

        loading: false,

        postCreate: function() {
            this.inherited(arguments);

            this.appbar = new Appbar().placeAt(this.appbarNode);
            this.growler = new Growler().placeAt(this.growlerNode);
            this.sideNav = new SideNav({}, domConstruct.create("div", null, window.document.body));
            this.newFeatures = new NewFeatures({}, domConstruct.create("div", null, window.document.body));
            this.loginModal = new LoginModal({}, domConstruct.create("div", null, window.document.body));
            this.container = new AppContainer().placeAt(this.containerNode);
        },

        startup: function() {
            this.inherited(arguments);
            
            this.loginModal.startup();
            this.container.startup();
            this.growler.startup();
            this.appbar.startup();
            this.newFeatures.startup();
            this.sideNav.startup();
        },

        _setLoadingAttr: function(loading) {
            this.loading = loading;
            this.emit("loading", {
                loading: loading
            });
        }
    });
});
