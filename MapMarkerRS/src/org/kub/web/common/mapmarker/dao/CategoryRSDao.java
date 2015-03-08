package org.kub.web.common.mapmarker.dao;

import java.util.List;

import org.kub.web.common.mapmarker.model.Category;
import org.kub.web.common.mapmarker.model.ModelList;
import org.kub.web.exception.KUBGenericException;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.sorting.Sort;

public interface CategoryRSDao {

	ModelList getCategories(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException;

    Category getCategory(int id) throws KUBGenericException;

    void deleteCategory(int id) throws KUBGenericException;

    Category createCategory(Category category) throws KUBGenericException;

    Category updateCategory(Category category) throws KUBGenericException;
	
}
