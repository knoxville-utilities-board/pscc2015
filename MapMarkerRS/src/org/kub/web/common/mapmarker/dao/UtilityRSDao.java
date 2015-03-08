package org.kub.web.common.mapmarker.dao;

import java.util.List;

import org.kub.web.common.mapmarker.model.ModelList;
import org.kub.web.common.mapmarker.model.Utility;
import org.kub.web.exception.KUBGenericException;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.sorting.Sort;

public interface UtilityRSDao {
	
	ModelList getUtilities(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException;

	Utility getUtility(int id) throws KUBGenericException;

    void deleteUtility(int id) throws KUBGenericException;

    Utility createUtility(Utility utility) throws KUBGenericException;

    Utility updateUtility(Utility utility) throws KUBGenericException;

}
