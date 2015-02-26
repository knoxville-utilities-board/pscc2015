package org.kub.web.tutorial.claim.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.kub.model.KUBDataObject;
import org.kub.web.tutorial.claim.dao.NoteRSDao;
import org.kub.web.tutorial.claim.model.ModelList;
import org.kub.web.tutorial.claim.model.Note;
import org.kub.web.exception.KUBGenericException;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.filtering.FilterUtils;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;
import org.kub.web.util.sorting.SortUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;

@Path("note")
public class NoteRSResource implements BeanFactoryAware {
    private NoteRSDao noteRSDao;

    // The beanFactory reference is intentionally static. We are using the Spring context to create
    // one of these beans in order to set the static reference to the beanFactory object. The actual
    // Resource beans that are being used are being created by the IBM JAX-RS Servlet.
    private static BeanFactory beanFactory;

    public NoteRSResource() {
        if (beanFactory != null) {
            setNoteRSDao((NoteRSDao) beanFactory.getBean("noteRSDao"));
        }
    }

    @POST
    @Path("getList")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getList(@HeaderParam(value = "Range") String rangeHeader,
            @QueryParam("filter") List<String> filters,
            @QueryParam("sort") List<String> sorts) throws KUBGenericException {
        List<Filter> filterList = null;
        List<Sort> sortList = null;

        // Process incoming filters
        try {
            filterList = FilterUtils.getFiltersFromQueryParameterList(filters);
        } catch (Exception e) {
            throw new KUBGenericException(e.getMessage(), "filterException");
        }

        // Process incoming sorts
        try {
            sortList = SortUtils.getSortsFromQueryParameterList(sorts);
        } catch (Exception e) {
            throw new KUBGenericException(e.getMessage(), "sortException");
        }

        // Process incoming paging
        Page page = null;
        if (rangeHeader != null) {
            // parses the rangeHeader into a usable Range object
            Range range = new Range(rangeHeader);
            page = new Page(range);
        }

        ModelList notes = noteRSDao.getNotes(page, filterList, sortList);

        return Response.ok(new KUBDataObject(notes.getList()))
                .header(Range.CONTENT_RANGE_HEADER, notes.getRange().toContentRange()).build();
    }

    @POST
    @Path("getById/{noteId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("noteId") String noteId) throws KUBGenericException {
        Note note = noteRSDao.getNote(Integer.parseInt(noteId));

        if (note == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(new KUBDataObject(note)).build();
    }

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(Note note) throws KUBGenericException {
        note = noteRSDao.createNote(note);
        return Response.ok(new KUBDataObject(note)).build();
    }

    @POST
    @Path("update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(Note note) throws KUBGenericException {
        note = noteRSDao.updateNote(note);
        return Response.ok(new KUBDataObject(note)).build();
    }

    @POST
    @Path("remove/{noteId}")
    public Response remove(@PathParam("noteId") String noteId) throws KUBGenericException {
        noteRSDao.deleteNote(Integer.parseInt(noteId));
        return Response.noContent().build();
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        // The beanFactory reference is intentionally being set in a static way.
        NoteRSResource.beanFactory = beanFactory;
    }

    public NoteRSDao getNoteRSDao() {
        return noteRSDao;
    }

    public void setNoteRSDao(NoteRSDao noteRSDao) {
        this.noteRSDao = noteRSDao;
    }

}