package org.kub.web.mapmarker.dao.impl;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.kub.web.exception.KUBGenericException;
import org.kub.web.mapmarker.MarkerRSEmf;
import org.kub.web.mapmarker.dao.TypeRSDao;
import org.kub.web.mapmarker.model.ModelList;
import org.kub.web.mapmarker.model.Type;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;

public class TypeRSDaoImpl implements TypeRSDao{
	
	public Type getType(int id) throws KUBGenericException {
		Type type = null;
        EntityManager em = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            type = em.find(Type.class, (long) id);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error getting the type with id " + id, "errorGettingType");
        } finally {
            try {
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error getting the type with id " + id, "errorGettingType");
            }
        }

        return type;
    }

    @SuppressWarnings("unchecked")
    public ModelList getTypes(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException {
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
                totalCountQuery = em.createNamedQuery("Type.getCountAll");
                query = em.createNamedQuery("Type.getListAll");
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

    public Type updateType(Type type) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            type = em.merge(type);
            entityTransaction.commit();
            em.refresh(type);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error updating the type", "errorUpdatingType");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }

                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error updating the type", "errorUpdatingType");
            }
        }

        return type;
    }

    public Type createType(Type type) throws KUBGenericException {
        EntityManager em= null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            em.persist(type);
            entityTransaction.commit();
        } catch (EntityExistsException e) {
            throw new KUBGenericException("A type already exists with this id.", "errorTypeExists");
        } catch (Exception e) {
            throw new KUBGenericException("There was an error creating the type", "errorCreatingType");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error creating the type", "errorCreatingType");
            }
        }

        return type;
    }

    public void deleteType(int id) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            //check to to see if there is a note to delete
            Type type = em.find(Type.class, (long) id);
            if (type == null) return;

            entityTransaction.begin();
            em.remove(type);
            entityTransaction.commit();
        } catch (Exception e) {
            throw new KUBGenericException("There was an error removing the type with id " + id, "errorRemovingType");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error removing the type with id " + id, "errorRemovingType");
            }
        }
    }

}

