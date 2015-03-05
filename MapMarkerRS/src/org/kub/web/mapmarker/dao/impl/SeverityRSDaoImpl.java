package org.kub.web.mapmarker.dao.impl;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.kub.web.exception.KUBGenericException;
import org.kub.web.mapmarker.MarkerRSEmf;
import org.kub.web.mapmarker.dao.SeverityRSDao;
import org.kub.web.mapmarker.model.ModelList;
import org.kub.web.mapmarker.model.Severity;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;

public class SeverityRSDaoImpl implements SeverityRSDao{
	
	public Severity getSeverity(int id) throws KUBGenericException {
		Severity severity = null;
        EntityManager em = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            severity = em.find(Severity.class, (long) id);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error getting the severity with id " + id, "errorGettingSeverity");
        } finally {
            try {
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error getting the severity with id " + id, "errorGettingSeverity");
            }
        }

        return severity;
    }

    @SuppressWarnings("unchecked")
    public ModelList getSeverities(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException {
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
                totalCountQuery = em.createNamedQuery("Severity.getCountAll");
                query = em.createNamedQuery("Severity.getListAll");
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

    public Severity updateSeverity(Severity severity) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            severity = em.merge(severity);
            entityTransaction.commit();
            em.refresh(severity);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error updating the severity", "errorUpdatingSeverity");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }

                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error updating the severity", "errorUpdatingSeverity");
            }
        }

        return severity;
    }

    public Severity createSeverity(Severity severity) throws KUBGenericException {
        EntityManager em= null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            em.persist(severity);
            entityTransaction.commit();
        } catch (EntityExistsException e) {
            throw new KUBGenericException("A severity already exists with this id.", "errorSeverityExists");
        } catch (Exception e) {
            throw new KUBGenericException("There was an error creating the severity", "errorCreatingSeverity");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error creating the severity", "errorCreatingSeverity");
            }
        }

        return severity;
    }

    public void deleteSeverity(int id) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            //check to to see if there is a note to delete
            Severity severity = em.find(Severity.class, (long) id);
            if (severity == null) return;

            entityTransaction.begin();
            em.remove(severity);
            entityTransaction.commit();
        } catch (Exception e) {
            throw new KUBGenericException("There was an error removing the severity with id " + id, "errorRemovingSeverity");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error removing the severity with id " + id, "errorRemovingSeverity");
            }
        }
    }

}
