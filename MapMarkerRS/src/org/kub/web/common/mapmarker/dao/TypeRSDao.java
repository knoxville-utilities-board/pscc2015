package org.kub.web.common.mapmarker.dao;

import java.util.List;

import org.kub.web.common.mapmarker.model.ModelList;
import org.kub.web.common.mapmarker.model.Type;
import org.kub.web.exception.KUBGenericException;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.sorting.Sort;

public interface TypeRSDao {
	
	ModelList getTypes(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException;

	Type getType(int id) throws KUBGenericException;

    void deleteType(int id) throws KUBGenericException;

    Type createType(Type type) throws KUBGenericException;

    Type updateType(Type type) throws KUBGenericException;

}
