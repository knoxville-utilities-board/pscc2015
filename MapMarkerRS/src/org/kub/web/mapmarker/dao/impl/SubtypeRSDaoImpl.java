package org.kub.web.mapmarker.dao.impl;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.kub.web.exception.KUBGenericException;
import org.kub.web.mapmarker.MarkerRSEmf;
import org.kub.web.mapmarker.dao.SubtypeRSDao;
import org.kub.web.mapmarker.model.ModelList;
import org.kub.web.mapmarker.model.Subtype;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;

public class SubtypeRSDaoImpl implements SubtypeRSDao{
	
	public Subtype getSubtype(int id) throws KUBGenericException {
		Subtype subtype = null;
        EntityManager em = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            subtype = em.find(Subtype.class, (long) id);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error getting the subtype with id " + id, "errorGettingSubtype");
        } finally {
            try {
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error getting the subtype with id " + id, "errorGettingSubtype");
            }
        }

        return subtype;
    }

    @SuppressWarnings("unchecked")
    public ModelList getSubtypes(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException {
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
                totalCountQuery = em.createNamedQuery("Subtype.getCountAll");
                query = em.createNamedQuery("Subtype.getListAll");
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

    public Subtype updateSubtype(Subtype subtype) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            subtype = em.merge(subtype);
            entityTransaction.commit();
            em.refresh(subtype);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error updating the subtype", "errorUpdatingSubtype");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }

                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error updating the subtype", "errorUpdatingSubtype");
            }
        }

        return subtype;
    }

    public Subtype createSubtype(Subtype subtype) throws KUBGenericException {
        EntityManager em= null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            em.persist(subtype);
            entityTransaction.commit();
        } catch (EntityExistsException e) {
            throw new KUBGenericException("A subtype already exists with this id.", "errorSubtypeExists");
        } catch (Exception e) {
            throw new KUBGenericException("There was an error creating the subtype", "errorCreatingSubtype");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error creating the subtype", "errorCreatingSubtype");
            }
        }

        return subtype;
    }

    public void deleteSubtype(int id) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            //check to to see if there is a note to delete
            Subtype subtype = em.find(Subtype.class, (long) id);
            if (subtype == null) return;

            entityTransaction.begin();
            em.remove(subtype);
            entityTransaction.commit();
        } catch (Exception e) {
            throw new KUBGenericException("There was an error removing the subtype with id " + id, "errorRemovingSubtype");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error removing the subtype with id " + id, "errorRemovingSubtype");
            }
        }
    }

}
