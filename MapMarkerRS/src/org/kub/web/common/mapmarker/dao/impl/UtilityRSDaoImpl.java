package org.kub.web.common.mapmarker.dao.impl;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.kub.web.common.mapmarker.MarkerRSEmf;
import org.kub.web.common.mapmarker.dao.UtilityRSDao;
import org.kub.web.common.mapmarker.model.ModelList;
import org.kub.web.common.mapmarker.model.Utility;
import org.kub.web.exception.KUBGenericException;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;

public class UtilityRSDaoImpl implements UtilityRSDao{
	
	public Utility getUtility(int id) throws KUBGenericException {
		Utility utility = null;
        EntityManager em = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            utility = em.find(Utility.class, (long) id);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error getting the utility with id " + id, "errorGettingUtility");
        } finally {
            try {
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error getting the utility with id " + id, "errorGettingUtility");
            }
        }

        return utility;
    }

    @SuppressWarnings("unchecked")
    public ModelList getUtilities(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException {
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
                totalCountQuery = em.createNamedQuery("Utility.getCountAll");
                query = em.createNamedQuery("Utility.getListAll");
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

    public Utility updateUtility(Utility utility) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            utility = em.merge(utility);
            entityTransaction.commit();
            em.refresh(utility);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error updating the utility", "errorUpdatingUtility");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }

                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error updating the utility", "errorUpdatingUtility");
            }
        }

        return utility;
    }

    public Utility createUtility(Utility utility) throws KUBGenericException {
        EntityManager em= null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            em.persist(utility);
            entityTransaction.commit();
        } catch (EntityExistsException e) {
            throw new KUBGenericException("A utility already exists with this id.", "errorUtilityExists");
        } catch (Exception e) {
            throw new KUBGenericException("There was an error creating the utility", "errorCreatingUtility");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error creating the utility", "errorCreatingUtility");
            }
        }

        return utility;
    }

    public void deleteUtility(int id) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            //check to to see if there is a note to delete
            Utility utility = em.find(Utility.class, (long) id);
            if (utility == null) return;

            entityTransaction.begin();
            em.remove(utility);
            entityTransaction.commit();
        } catch (Exception e) {
            throw new KUBGenericException("There was an error removing the utility with id " + id, "errorRemovingUtility");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error removing the utility with id " + id, "errorRemovingUtility");
            }
        }
    }

}

