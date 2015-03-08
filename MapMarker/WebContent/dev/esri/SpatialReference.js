//>>built
define("esri/SpatialReference", ["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/has", "./kernel", "./lang"], function(g, f, e, c, d, h) {
    c = [-2.0037508342788905E7, 2.0037508342788905E7];
    d = [-2.0037508342787E7, 2.0037508342787E7];
    return g(null, {
        declaredClass: "esri.SpatialReference",
        constructor: function(a) {
            a && (e.isObject(a) ? e.mixin(this, a) : e.isString(a) ? this.wkt = a : this.wkid = a)
        },
        wkid: null,
        wkt: null,
        _info: {
            102113: {
                wkTemplate: 'PROJCS["WGS_1984_Web_Mercator",GEOGCS["GCS_WGS_1984_Major_Auxiliary_Sphere",DATUM["D_WGS_1984_Major_Auxiliary_Sphere",SPHEROID["WGS_1984_Major_Auxiliary_Sphere",6378137.0,0.0]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",${Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],UNIT["Meter",1.0]]',
                valid: c,
                origin: d,
                dx: 1E-5
            },
            102100: {
                wkTemplate: 'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",${Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]',
                valid: c,
                origin: d,
                dx: 1E-5
            },
            3785: {
                wkTemplate: 'PROJCS["WGS_1984_Web_Mercator",GEOGCS["GCS_WGS_1984_Major_Auxiliary_Sphere",DATUM["D_WGS_1984_Major_Auxiliary_Sphere",SPHEROID["WGS_1984_Major_Auxiliary_Sphere",6378137.0,0.0]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",${Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],UNIT["Meter",1.0]]',
                valid: c,
                origin: d,
                dx: 1E-5
            },
            3857: {
                wkTemplate: 'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",${Central_Meridian}],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]',
                valid: c,
                origin: d,
                dx: 1E-5
            },
            4326: {
                wkTemplate: 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",${Central_Meridian}],UNIT["Degree",0.0174532925199433]]',
                altTemplate: 'PROJCS["WGS_1984_Plate_Carree",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Plate_Carree"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",${Central_Meridian}],UNIT["Degrees",111319.491]]',
                valid: [-180, 180],
                origin: [-180, 180],
                dx: 1E-5
            }
        },
        _isWebMercator: function() {
            return -1 !== f.indexOf([102113, 102100, 3857, 3785], this.wkid)
        },
        _isWrappable: function() {
            return -1 !== f.indexOf([102113, 102100, 3857, 3785, 4326], this.wkid)
        },
        _getInfo: function() {
            return this.wkid ? this._info[this.wkid] : null
        },
        _canProject: function(a) {
            var b = !1;
            a && (b = this.isWebMercator() && 4326 === a.wkid || a.isWebMercator() && 4326 === this.wkid);
            return b
        },
        isWebMercator: function() {
            return this._isWebMercator()
        },
        equals: function(a) {
            var b = !1;
            a && (this === a &&
                (b = !0), this.wkid || a.wkid ? b = this.wkid === a.wkid || this.isWebMercator() && a.isWebMercator() || this.wkid === a.latestWkid || a.wkid === this.latestWkid : this.wkt && a.wkt && (b = this.wkt.toUpperCase() === a.wkt.toUpperCase()));
            return b
        },
        toJson: function() {
            var a = null,
                b = h.isDefined;
            b(this.wkid) ? a = {
                wkid: this.wkid
            } : b(this.wkt) && (a = {
                wkt: this.wkt
            });
            a && b(this.latestWkid) && (a.latestWkid = this.latestWkid);
            return a
        }
    })
});