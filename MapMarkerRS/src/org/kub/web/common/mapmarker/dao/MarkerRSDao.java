package org.kub.web.common.mapmarker.dao;

import java.util.List;

import org.kub.web.common.mapmarker.model.Marker;
import org.kub.web.common.mapmarker.model.ModelList;
import org.kub.web.exception.KUBGenericException;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.sorting.Sort;

public interface MarkerRSDao {
	
	ModelList getMarkers(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException;

    Marker getMarker(int id) throws KUBGenericException;

    void deleteMarker(int id) throws KUBGenericException;

    Marker createMarker(Marker marker) throws KUBGenericException;

    Marker updateMarker(Marker marker) throws KUBGenericException;

}
