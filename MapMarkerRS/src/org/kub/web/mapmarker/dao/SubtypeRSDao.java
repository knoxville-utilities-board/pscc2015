package org.kub.web.mapmarker.dao;

import java.util.List;

import org.kub.web.exception.KUBGenericException;
import org.kub.web.mapmarker.model.ModelList;
import org.kub.web.mapmarker.model.Subtype;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.sorting.Sort;

public interface SubtypeRSDao {
	
	ModelList getSubtypes(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException;

	Subtype getSubtype(int id) throws KUBGenericException;

    void deleteSubtype(int id) throws KUBGenericException;

    Subtype createSubtype(Subtype subtype) throws KUBGenericException;

    Subtype updateSubtype(Subtype subtype) throws KUBGenericException;

}
