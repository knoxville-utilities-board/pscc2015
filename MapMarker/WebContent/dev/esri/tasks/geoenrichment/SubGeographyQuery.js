//>>built
define("esri/tasks/geoenrichment/SubGeographyQuery", ["../../declare", "./GeographyQueryBase"], function(b, c) {
    return b("esri.tasks.geoenrichment.SubGeographyQuery", [c], {
        filterGeographyLayerID: null,
        filterGeographyIDs: null,
        filterGeographyWhere: null,
        subGeographyLayerID: null,
        subGeographyWhere: null,
        constructor: function(a) {
            a && (this.filterGeographyLayerID = a.filterGeographyLayerID || a.geographyLayers, this.filterGeographyIDs = a.filterGeographyIDs || a.geographyIDs, this.filterGeographyWhere = a.filterGeographyWhere || a.geographyQuery, this.subGeographyLayerID = a.subGeographyLayerID ||
                a.subGeographyLayer, this.subGeographyWhere = a.subGeographyWhere || a.subGeographyQuery)
        },
        toJson: function() {
            var a = this.inherited(arguments);
            a.returnSubGeographyLayer = !0;
            this.filterGeographyLayerID && (a.geographyLayers = this.filterGeographyLayerID);
            this.filterGeographyIDs && (a.geographyIDs = this.filterGeographyIDs);
            this.filterGeographyWhere && (a.geographyQuery = this.filterGeographyWhere);
            this.subGeographyLayerID && (a.subGeographyLayer = this.subGeographyLayerID);
            this.subGeographyWhere && (a.subGeographyQuery = this.subGeographyWhere);
            return a
        }
    })
});