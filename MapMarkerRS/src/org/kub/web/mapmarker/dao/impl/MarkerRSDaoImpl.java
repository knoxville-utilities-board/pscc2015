package org.kub.web.mapmarker.dao.impl;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.kub.web.exception.KUBGenericException;
import org.kub.web.mapmarker.MarkerRSEmf;
import org.kub.web.mapmarker.dao.MarkerRSDao;
import org.kub.web.mapmarker.model.Marker;
import org.kub.web.mapmarker.model.ModelList;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;

public class MarkerRSDaoImpl implements MarkerRSDao{
	
	public Marker getMarker(int id) throws KUBGenericException {
        Marker marker = null;
        EntityManager em = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            marker = em.find(Marker.class, (long) id);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error getting the marker with id " + id, "errorGettingMarker");
        } finally {
            try {
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error getting the marker with id " + id, "errorGettingMarker");
            }
        }

        return marker;
    }

    @SuppressWarnings("unchecked")
    public ModelList getMarkers(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException {
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

            String categoryId = null;
            for(Filter filter : filterList) {
                if (filter.getKey().equals("categoryId")) {
                    categoryId = filter.getValue().getCriteria();
                }
            }

            if (categoryId != null) {
                totalCountQuery = em.createNamedQuery("Marker.getCount");
                query = em.createNamedQuery("Marker.getList");

                long value = Long.parseLong(categoryId);
                query.setParameter("categoryId", value);
                totalCountQuery.setParameter("categoryId", value);
            } else {
                totalCountQuery = em.createNamedQuery("Marker.getCountAll");
                query = em.createNamedQuery("Marker.getListAll");
            }

            query.setFirstResult(start);
            query.setMaxResults(count);

            int totalSize = ((Number) totalCountQuery.getSingleResult()).intValue();            
            modelList.setList(query.getResultList());        
            modelList.setRange(new Range(start, modelList.getList().size(), totalSize));
        } catch (Exception e) {
            throw new KUBGenericException("There was an error getting the markers", "errorGettingMarkers");
        } finally {
            try {
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error getting the markers", "errorGettingMarkers");
            }
        }

        return modelList;
    }

    public Marker updateMarker(Marker marker) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            marker = em.merge(marker);
            entityTransaction.commit();
            em.refresh(marker);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error updating the marker", "errorUpdatingMarker");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }

                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error updating the marker", "errorUpdatingMarker");
            }
        }

        return marker;
    }

    public Marker createMarker(Marker marker) throws KUBGenericException {
        EntityManager em= null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            em.persist(marker);
            entityTransaction.commit();
        } catch (EntityExistsException e) {
            throw new KUBGenericException("A marker already exists with this id.", "errorMarkerExists");
        } catch (Exception e) {
            throw new KUBGenericException("There was an error creating the marker", "errorCreatingMarker");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error creating the marker", "errorCreatingMarker");
            }
        }

        return marker;
    }

    public void deleteMarker(int id) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = MarkerRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            //check to to see if there is a marker to delete
            Marker marker = em.find(Marker.class, (long) id);
            if (marker == null) return;

            entityTransaction.begin();
            em.remove(marker);
            entityTransaction.commit();
        } catch (Exception e) {
            throw new KUBGenericException("There was an error removing the marker with id " + id, "errorRemovingMarker");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error removing the marker with id " + id, "errorRemovingMarker");
            }
        }
    }

}
