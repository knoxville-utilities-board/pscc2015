package org.kub.web.mapmarker.dao;

import java.util.List;

import org.kub.web.exception.KUBGenericException;
import org.kub.web.mapmarker.model.ModelList;
import org.kub.web.mapmarker.model.Severity;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.sorting.Sort;

public interface SeverityRSDao {
	
	ModelList getSeverities(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException;

	Severity getSeverity(int id) throws KUBGenericException;

    void deleteSeverity(int id) throws KUBGenericException;

    Severity createSeverity(Severity severity) throws KUBGenericException;

    Severity updateSeverity(Severity severity) throws KUBGenericException;

}
