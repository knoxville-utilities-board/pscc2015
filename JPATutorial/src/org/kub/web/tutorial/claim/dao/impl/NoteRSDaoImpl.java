package org.kub.web.tutorial.claim.dao.impl;

import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.kub.web.exception.KUBGenericException;
import org.kub.web.tutorial.claim.ClaimRSEmf;
import org.kub.web.tutorial.claim.dao.NoteRSDao;
import org.kub.web.tutorial.claim.model.ModelList;
import org.kub.web.tutorial.claim.model.Note;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;

public class NoteRSDaoImpl implements NoteRSDao {

    public Note getNote(int noteId) throws KUBGenericException {
        Note note = null;
        EntityManager em = null;

        try {
            em = ClaimRSEmf.createEntityManager();
            note = em.find(Note.class, (long) noteId);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error getting the note with id " + noteId, "errorGettingNote");
        } finally {
            try {
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error getting the note with id " + noteId, "errorGettingNote");
            }
        }

        return note;
    }

    @SuppressWarnings("unchecked")
    public ModelList getNotes(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException {
        ModelList modelList = new ModelList();
        EntityManager em = null;

        int start = 0;
        int count = 24;
        if (page != null) {
            start = page.getStart();
            count = page.getCount();
        }

        try {
            em = ClaimRSEmf.createEntityManager();

            Query query = null;
            Query totalCountQuery = null;

            String incidentId = null;
            for(Filter filter : filterList) {
                if (filter.getKey().equals("incidentId")) {
                    incidentId = filter.getValue().getCriteria();
                }
            }

            if (incidentId != null) {
                totalCountQuery = em.createNamedQuery("Note.getCount");
                query = em.createNamedQuery("Note.getList");

                long value = Long.parseLong(incidentId);
                query.setParameter("incidentId", value);
                totalCountQuery.setParameter("incidentId", value);
            } else {
                totalCountQuery = em.createNamedQuery("Note.getCountAll");
                query = em.createNamedQuery("Note.getListAll");
            }

            query.setFirstResult(start);
            query.setMaxResults(count);

            int totalSize = ((Number) totalCountQuery.getSingleResult()).intValue();            
            modelList.setList(query.getResultList());        
            modelList.setRange(new Range(start, modelList.getList().size(), totalSize));
        } catch (Exception e) {
            throw new KUBGenericException("There was an error getting the notes", "errorGettingNotes");
        } finally {
            try {
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error getting the notes", "errorGettingNotes");
            }
        }

        return modelList;
    }

    public Note updateNote(Note note) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = ClaimRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            note = em.merge(note);
            entityTransaction.commit();
            em.refresh(note);
        } catch (Exception e) {
            throw new KUBGenericException("There was an error updating the note", "errorUpdatingNote");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }

                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error updating the note", "errorUpdatingNote");
            }
        }

        return note;
    }

    public Note createNote(Note note) throws KUBGenericException {
        EntityManager em= null;
        EntityTransaction entityTransaction = null;

        try {
            em = ClaimRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            entityTransaction.begin();
            em.persist(note);
            entityTransaction.commit();
        } catch (EntityExistsException e) {
            throw new KUBGenericException("A note already exists with this id.", "errorNoteExists");
        } catch (Exception e) {
            throw new KUBGenericException("There was an error creating the note", "errorCreatingNote");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error creating the note", "errorCreatingNote");
            }
        }

        return note;
    }

    public void deleteNote(int noteId) throws KUBGenericException {
        EntityManager em = null;
        EntityTransaction entityTransaction = null;

        try {
            em = ClaimRSEmf.createEntityManager();
            entityTransaction = em.getTransaction();

            //check to to see if there is a note to delete
            Note note = em.find(Note.class, (long) noteId);
            if (note == null) return;

            entityTransaction.begin();
            em.remove(note);
            entityTransaction.commit();
        } catch (Exception e) {
            throw new KUBGenericException("There was an error removing the note with id " + noteId, "errorRemovingNote");
        } finally {
            try {
                if (entityTransaction.isActive()) {
                    entityTransaction.commit();
                }
                em.close();
            } catch (Exception e) {
                throw new KUBGenericException("There was an error removing the note with id " + noteId, "errorRemovingNote");
            }
        }
    }

}