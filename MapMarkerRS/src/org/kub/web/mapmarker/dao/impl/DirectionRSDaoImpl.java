package org.kub.web.mapmarker.dao.impl;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.kub.web.exception.KUBGenericException;
import org.kub.web.mapmarker.MarkerRSEmf;
import org.kub.web.mapmarker.dao.DirectionRSDao;
import org.kub.web.mapmarker.model.Direction;
import org.kub.web.mapmarker.model.ModelList;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;

public class DirectionRSDaoImpl implements DirectionRSDao{
	
	public Direction getDirection(int id) throws KUBGenericException {
		Direction direction = null;
        EntityManager em = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            direction = em.find(Direction.class, (long) id);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error getting the direction with id " + id, "errorGettingDirection");
        } finally {
            try {
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error getting the direction with id " + id, "errorGettingDirection");
            }
        }

        return direction;
    }

    @SuppressWarnings("unchecked")
    public ModelList getDirections(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException {
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
                totalCountQuery = em.createNamedQuery("Direction.getCountAll");
                query = em.createNamedQuery("Direction.getListAll");
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

    public Direction updateDirection(Direction direction) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            direction = em.merge(direction);
            entityTransaction.commit();
            em.refresh(direction);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error updating the direction", "errorUpdatingDirection");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }

                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error updating the direction", "errorUpdatingDirection");
            }
        }

        return direction;
    }

    public Direction createDirection(Direction direction) throws KUBGenericException {
        EntityManager em= null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            em.persist(direction);
            entityTransaction.commit();
        } catch (EntityExistsException e) {
            throw new KUBGenericException("A direction already exists with this id.", "errorDirectionExists");
        } catch (Exception e) {
            throw new KUBGenericException("There was an error creating the direction", "errorCreatingDirection");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error creating the direction", "errorCreatingDirection");
            }
        }

        return direction;
    }

    public void deleteDirection(int id) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            //check to to see if there is a note to delete
            Direction direction = em.find(Direction.class, (long) id);
            if (direction == null) return;

            entityTransaction.begin();
            em.remove(direction);
            entityTransaction.commit();
        } catch (Exception e) {
            throw new KUBGenericException("There was an error removing the direction with id " + id, "errorRemovingDirection");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error removing the direction with id " + id, "errorRemovingDirection");
            }
        }
    }

}
