//>>built
define("esri/dijit/editing/tools/EditingTools", ["dojo/_base/lang", "dojo/has", "../../../toolbars/draw", "../../../kernel"], function(b, c, a, d) {
    return {
        point: {
            id: "esriPointTool",
            _enabledIcon: "toolbarIcon pointIcon",
            _disabledIcon: "toolbarIcon pointIconDisabled",
            _drawType: a.POINT,
            _geomType: "esriGeometryPoint",
            _label: "NLS_pointLbl"
        },
        polyline: {
            id: "toolDrawFreehandPolyline",
            _enabledIcon: "toolbarIcon polylineIcon",
            _disabledIcon: "toolbarIcon polylineIconDisabled",
            _drawType: a.POLYLINE,
            _geomType: "esriGeometryPolyline",
            _label: "NLS_polylineLbl"
        },
        freehandpolyline: {
            id: "toolDrawPolyline",
            _enabledIcon: "toolbarIcon freehandPolylineIcon",
            _disabledIcon: "toolbarIcon freehandPolylineIcon",
            _drawType: a.FREEHAND_POLYLINE,
            _geomType: "esriGeometryPolyline",
            _label: "NLS_freehandPolylineLbl"
        },
        polygon: {
            id: "toolDrawPolygon",
            _enabledIcon: "toolbarIcon polygonIcon",
            _disabledIcon: "toolbarIcon polygonIconDisabled",
            _drawType: a.POLYGON,
            _geomType: "esriGeometryPolygon",
            _label: "NLS_polygonLbl"
        },
        freehandpolygon: {
            id: "toolDrawFreehandPolygon",
            _enabledIcon: "toolbarIcon freehandPolygonIcon",
            _disabledIcon: "toolbarIcon freehandPolygonIconDisabled",
            _drawType: a.FREEHAND_POLYGON,
            _label: "NLS_freehandPolygonLbl",
            _geomType: "esriGeometryPolygon"
        },
        autocomplete: {
            id: "btnFeatureAutoComplete",
            _enabledIcon: "toolbarIcon autoCompleteIcon",
            _disabledIcon: "toolbarIcon autoCompleteIcon",
            _drawType: a.POLYGON,
            _label: "NLS_autoCompleteLbl",
            _geomType: "esriGeometryPolygon"
        },
        rectangle: {
            id: "toolDrawRect",
            _enabledIcon: "toolbarIcon rectangleIcon",
            _disabledIcon: "toolbarIcon rectangleIcon",
            _drawType: a.RECTANGLE,
            _geomType: "esriGeometryPolygon",
            _label: "NLS_rectangleLbl"
        },
        arrow: {
            id: "toolDrawArrow",
            _enabledIcon: "toolbarIcon arrowIcon",
            _disabledIcon: "toolbarIcon arrowIcon",
            _drawType: a.ARROW,
            _geomType: "esriGeometryPolygon",
            _label: "NLS_arrowLbl"
        },
        uparrow: {
            id: "toolDrawArrowUp",
            _enabledIcon: "toolbarIcon arrowUpIcon",
            _disabledIcon: "toolbarIcon arrowUpIcon",
            _drawType: a.UP_ARROW,
            _geomType: "esriGeometryPolygon",
            _label: "NLS_arrowUpLbl"
        },
        downarrow: {
            id: "toolDrawDownArrow",
            _enabledIcon: "toolbarIcon arrowDownIcon",
            _disabledIcon: "toolbarIcon arrowDownIcon",
            _drawType: a.DOWN_ARROW,
            _geomType: "esriGeometryPolygon",
            _label: "NLS_arrowDownLbl"
        },
        leftarrow: {
            id: "toolDrawLeftArrow",
            _enabledIcon: "toolbarIcon arrowLeftIcon",
            _disabledIcon: "toolbarIcon arrowLeftIcon",
            _drawType: a.LEFT_ARROW,
            _geomType: "esriGeometryPolygon",
            _label: "NLS_arrowLeftLbl"
        },
        rightarrow: {
            id: "toolDrawRightArrow",
            _enabledIcon: "toolbarIcon arrowIcon",
            _disabledIcon: "toolbarIcon arrowIcon",
            _drawType: a.RIGHT_ARROW,
            _geomType: "esriGeometryPolygon",
            _label: "NLS_arrowRightLbl"
        },
        circle: {
            id: "toolDrawCircle",
            _enabledIcon: "toolbarIcon circleIcon",
            _disabledIcon: "toolbarIcon circleIcon",
            _drawType: a.CIRCLE,
            _geomType: "esriGeometryPolygon",
            _label: "NLS_circleLbl"
        },
        ellipse: {
            id: "toolDrawEllipse",
            _enabledIcon: "toolbarIcon ellipseIcon",
            _disabledIcon: "toolbarIcon ellipseIcon",
            _drawType: a.ELLIPSE,
            _geomType: "esriGeometryPolygon",
            _label: "NLS_ellipseLbl"
        },
        triangle: {
            id: "toolDrawTriangle",
            _enabledIcon: "toolbarIcon triangleIcon",
            _disabledIcon: "toolbarIcon triangleIcon",
            _drawType: a.TRIANGLE,
            _geomType: "esriGeometryPolygon",
            _label: "NLS_triangleLbl"
        },
        attributes: {
            id: "btnAttributes",
            _enabledIcon: "toolbarIcon attributesIcon",
            _disabledIcon: "toolbarIcon attributesIcon",
            _enabled: !1,
            _label: "NLS_attributesLbl"
        },
        del: {
            id: "btnDelete2",
            _enabledIcon: "toolbarIcon deleteFeatureIcon",
            _disabledIcon: "toolbarIcon deleteFeatureIcon",
            _enabled: !1,
            _label: "NLS_deleteLbl"
        },
        undo: {
            id: "btnUndo",
            _enabledIcon: "dijitEditorIcon dijitEditorIconUndo",
            _disabledIcon: "dijitEditorIcon dijitEditorIconUndo",
            _enabled: !1,
            _label: "NLS_undoLbl"
        },
        redo: {
            id: "btnRedo",
            _enabledIcon: "dijitEditorIcon dijitEditorIconRedo",
            _disabledIcon: "dijitEditorIcon dijitEditorIconRedo",
            _enabled: !1,
            _label: "NLS_redoLbl"
        }
    }
});