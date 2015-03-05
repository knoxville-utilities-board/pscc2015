package org.kub.web.mapmarker.dao;

import java.util.List;

import org.kub.web.exception.KUBGenericException;
import org.kub.web.mapmarker.model.Direction;
import org.kub.web.mapmarker.model.ModelList;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.sorting.Sort;

public interface DirectionRSDao {
	
	ModelList getDirections(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException;

	Direction getDirection(int id) throws KUBGenericException;

    void deleteDirection(int id) throws KUBGenericException;

    Direction createDirection(Direction direction) throws KUBGenericException;

    Direction updateDirection(Direction direction) throws KUBGenericException;

}
