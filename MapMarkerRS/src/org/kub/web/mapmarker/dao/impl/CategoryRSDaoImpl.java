package org.kub.web.mapmarker.dao.impl;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.kub.web.exception.KUBGenericException;
import org.kub.web.mapmarker.MarkerRSEmf;
import org.kub.web.mapmarker.dao.CategoryRSDao;
import org.kub.web.mapmarker.model.Category;
import org.kub.web.mapmarker.model.ModelList;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;

public class CategoryRSDaoImpl implements CategoryRSDao{
	
	public Category getCategory(int id) throws KUBGenericException {
		Category category = null;
        EntityManager em = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            category = em.find(Category.class, (long) id);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error getting the category with id " + id, "errorGettingCategory");
        } finally {
            try {
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error getting the category with id " + id, "errorGettingCategory");
            }
        }

        return category;
    }

    @SuppressWarnings("unchecked")
    public ModelList getCategories(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException {
        ModelList modelList = new ModelList();
        EntityManager em = null;

        int start = 0;
        int count = 24;
        if (page != null) {
            start = page.getStart();
            count = page.getCount();
        }

        try {
            em = MarkerRSEmf.createEntityManager();

            Query query = null;
            Query totalCountQuery = null;

//            String categoryId = null;
//            for(Filter filter : filterList) {
//                if (filter.getKey().equals("categoryId")) {
//                    categoryId = filter.getValue().getCriteria();
//                }
//            }
//
//            if (categoryId != null) {
//                totalCountQuery = em.createNamedQuery("Marker.getCount");
//                query = em.createNamedQuery("Marker.getList");
//
//                long value = Long.parseLong(categoryId);
//                query.setParameter("categoryId", value);
//                totalCountQuery.setParameter("categoryId", value);
//            } else {
                totalCountQuery = em.createNamedQuery("Category.getCountAll");
                query = em.createNamedQuery("Category.getListAll");
//            }

            query.setFirstResult(start);
            query.setMaxResults(count);

            int totalSize = ((Number) totalCountQuery.getSingleResult()).intValue();            
            modelList.setList(query.getResultList());        
            modelList.setRange(new Range(start, modelList.getList().size(), totalSize));
        } catch (Exception e) {
            throw new KUBGenericException("There was an error getting the categories", "errorGettingCategories");
        } finally {
            try {
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error getting the categories", "errorGettingCategories");
            }
        }

        return modelList;
    }

    public Category updateCategory(Category category) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            category = em.merge(category);
            entityTransaction.commit();
            em.refresh(category);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error updating the category", "errorUpdatingCategory");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }

                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error updating the category", "errorUpdatingCategory");
            }
        }

        return category;
    }

    public Category createCategory(Category category) throws KUBGenericException {
        EntityManager em= null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            em.persist(category);
            entityTransaction.commit();
        } catch (EntityExistsException e) {
            throw new KUBGenericException("A category already exists with this id.", "errorCategoryExists");
        } catch (Exception e) {
            throw new KUBGenericException("There was an error creating the category", "errorCreatingCategory");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error creating the category", "errorCreatingCategory");
            }
        }

        return category;
    }

    public void deleteCategory(int id) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            //check to to see if there is a note to delete
            Category category = em.find(Category.class, (long) id);
            if (category == null) return;

            entityTransaction.begin();
            em.remove(category);
            entityTransaction.commit();
        } catch (Exception e) {
            throw new KUBGenericException("There was an error removing the category with id " + id, "errorRemovingCategory");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error removing the category with id " + id, "errorRemovingCategory");
            }
        }
    }

}
