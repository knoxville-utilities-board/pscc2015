package org.kub.web.common.mapmarker.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.apache.commons.lang.StringUtils; //*** Ed Broxson - For JPA Tutorial Sort and Filters update  3-14-15
import org.kub.web.common.mapmarker.MarkerRSEmf;
import org.kub.web.common.mapmarker.dao.MarkerRSDao;
import org.kub.web.common.mapmarker.model.Marker;
import org.kub.web.common.mapmarker.model.ModelList;
import org.kub.web.exception.KUBGenericException;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;

public class MarkerRSDaoImpl implements MarkerRSDao {

	public Marker getMarker(int id) throws KUBGenericException {
		Marker marker = null;
		EntityManager em = null;

		try {
			em = MarkerRSEmf.createEntityManager();
			marker = em.find(Marker.class, (long) id);
		} catch (Exception e) {
			throw new KUBGenericException(
					"There was an error getting the marker with id " + id,
					"errorGettingMarker");
		} finally {
			try {
				em.close();
			} catch (Exception e) {
				throw new KUBGenericException(
						"There was an error getting the marker with id " + id,
						"errorGettingMarker");
			}
		}

		return marker;
	}

	@SuppressWarnings("unchecked")
	public ModelList getMarkers(Page page, List<Filter> filterList,
			List<Sort> sortList) throws KUBGenericException {
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

			// *** Ed Broxson
			// *** This is the code I added
			// *** From JPA Tutorial Sort and Filters update 3-14-15

			// Ed Broxson 3-29-15
			// Added isActive parameter for sorting and filtering

			// Create the dynamic query based on the input to the server
			String queryString = "SELECT n FROM Marker n, Category c";
			List<String> whereClauses = new ArrayList<String>();
			Map<String, Object> parameters = new HashMap<String, Object>();
			whereClauses.add("n.categoryId = c.id ");
			whereClauses.add("c.isActive = true ");
			boolean active = false;
			for (Filter filter : filterList) {
				String value = filter.getValue().getCriteria();
				if (StringUtils.equals(filter.getKey(), "categoryId")) {
					whereClauses.add("n.categoryId LIKE :categoryId ");
					parameters.put("categoryId", value);
				} else if (StringUtils.equals(filter.getKey(), "isActive")) {
					if (!value.equalsIgnoreCase("all")) {
						whereClauses.add("n.isActive = :isActive ");	
						parameters.put("isActive", Boolean.parseBoolean(value));
					}
					active = true;
				}
			}

			if (!active) {
				whereClauses.add("n.isActive = true ");
			}

			// add the whereClauses to queryString
			if (whereClauses.size() > 0) {
				queryString += " WHERE ";
				Iterator<String> querysIterator = whereClauses.iterator();

				queryString += querysIterator.next();
				while (querysIterator.hasNext()) {
					queryString += " AND " + querysIterator.next();
				}
			}

			// Query created before we add "order by" because you can't have an
			// "order by" with Count()
			Query totalCountQuery = em.createQuery(queryString.replace(
					"SELECT n", "SELECT COUNT(n)"));

			int i = 0;
			for (Sort sort : sortList) {
				String fieldName = sort.getFieldName();
				String direction = sort.getDirection();
				if (isPropertyName(Marker.class, fieldName)) {
					if (direction.equals("ASC") || direction.equals("DESC")) {
						if (i++ != 0) {
							queryString += ",";
						} else {
							queryString += " ORDER BY";
						}
						queryString += " n." + fieldName + " " + direction;
					}
				}
			}

			// a default sort order
			if (i == 0) {
				queryString += " ORDER BY n.title";
			}

			Query query = em.createQuery(queryString);
			// Set query parameters
			for (String parameter : parameters.keySet()) {
				Object value = parameters.get(parameter);
				query.setParameter(parameter, value);
				totalCountQuery.setParameter(parameter, value);
			}
			query.setFirstResult(start);
			query.setMaxResults(count);
			int totalSize = ((Number) totalCountQuery.getSingleResult())
					.intValue();
			modelList.setList(query.getResultList());
			modelList.setRange(new Range(start, modelList.getList().size(),
					totalSize));
		} catch (Exception e) {
			throw new KUBGenericException(
					"There was an error getting the markers",
					"errorGettingMarkers");
		} finally {
			try {
				em.close();
			} catch (Exception e) {
				throw new KUBGenericException(
						"There was an error getting the markers",
						"errorGettingMarkers");
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
			throw new KUBGenericException(
					"There was an error updating the marker",
					"errorUpdatingMarker");
		} finally {
			try {
				if (entityTransaction.isActive()) {
					entityTransaction.commit();
				}

				em.close();
			} catch (Exception e) {
				throw new KUBGenericException(
						"There was an error updating the marker",
						"errorUpdatingMarker");
			}
		}

		return marker;
	}

	public Marker createMarker(Marker marker) throws KUBGenericException {
		EntityManager em = null;
		EntityTransaction entityTransaction = null;

		try {
			em = MarkerRSEmf.createEntityManager();
			entityTransaction = em.getTransaction();

			entityTransaction.begin();
			em.persist(marker);
			entityTransaction.commit();
		} catch (EntityExistsException e) {
			throw new KUBGenericException(
					"A marker already exists with this id.",
					"errorMarkerExists");
		} catch (Exception e) {
			throw new KUBGenericException(
					"There was an error creating the marker",
					"errorCreatingMarker");
		} finally {
			try {
				if (entityTransaction.isActive()) {
					entityTransaction.commit();
				}
				em.close();
			} catch (Exception e) {
				throw new KUBGenericException(
						"There was an error creating the marker",
						"errorCreatingMarker");
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

			// check to to see if there is a marker to delete
			Marker marker = em.find(Marker.class, (long) id);
			if (marker == null)
				return;

			marker.setIsActive(false);
			entityTransaction.begin();
			marker = em.merge(marker);
			// em.remove(marker); // Uncomment to re-implement full delete
			entityTransaction.commit();
		} catch (Exception e) {
			throw new KUBGenericException(
					"There was an error removing the marker with id " + id,
					"errorRemovingMarker");
		} finally {
			try {
				if (entityTransaction.isActive()) {
					entityTransaction.commit();
				}
				em.close();
			} catch (Exception e) {
				throw new KUBGenericException(
						"There was an error removing the marker with id " + id,
						"errorRemovingMarker");
			}
		}
	}

	// *** Ed Broxson
	// *** This is code I added
	// *** From JPA Tutorial Sort and Filters update 3-14-15
	@SuppressWarnings("unused")
	private boolean isPropertyName(@SuppressWarnings("rawtypes") Class model,
			String fieldName) {
		try {
			// if the field is not a property it will throw an error
			model.getDeclaredField(fieldName);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
