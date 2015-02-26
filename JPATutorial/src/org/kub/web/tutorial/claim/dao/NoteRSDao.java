package org.kub.web.tutorial.claim.dao;

import java.util.List;

import org.kub.web.exception.KUBGenericException;
import org.kub.web.tutorial.claim.model.ModelList;
import org.kub.web.tutorial.claim.model.Note;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.paging.Page;
import org.kub.web.util.sorting.Sort;

public interface NoteRSDao {

    ModelList getNotes(Page page, List<Filter> filterList, List<Sort> sortList) throws KUBGenericException;

    Note getNote(int noteId) throws KUBGenericException;

    void deleteNote(int noteId) throws KUBGenericException;

    Note createNote(Note note) throws KUBGenericException;

    Note updateNote(Note note) throws KUBGenericException;

}