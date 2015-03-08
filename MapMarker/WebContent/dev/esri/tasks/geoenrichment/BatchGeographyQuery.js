//>>built
define("esri/tasks/geoenrichment/BatchGeographyQuery", ["../../declare", "./GeographyQuery"], function(b, c) {
    return b("esri.tasks.geoenrichment.BatchGeographyQuery", c, {
        where: null,
        constructor: function(a) {
            a && (this.where = a.where || a.geographyQueries)
        },
        toJson: function() {
            var a = this.inherited(arguments);
            delete a.geographyQuery;
            this.where && (a.geographyQueries = this.where);
            return a
        }
    })
});