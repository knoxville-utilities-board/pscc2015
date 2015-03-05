package org.kub.web.mapmarker.resources;

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
import org.kub.web.exception.KUBGenericException;
import org.kub.web.mapmarker.dao.SubtypeRSDao;
import org.kub.web.mapmarker.model.ModelList;
import org.kub.web.mapmarker.model.Subtype;
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.filtering.FilterUtils;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;
import org.kub.web.util.sorting.SortUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;

@Path("subtype")
public class SubtypeRSResource implements BeanFactoryAware{
	
    private SubtypeRSDao subtypeRSDao;

    // The beanFactory reference is intentionally static. We are using the Spring context to create
    // one of these beans in order to set the static reference to the beanFactory object. The actual
    // Resource beans that are being used are being created by the IBM JAX-RS Servlet.
    private static BeanFactory beanFactory;

    public SubtypeRSResource() {
        if (beanFactory != null) {
            setSubtypeRSDao((SubtypeRSDao) beanFactory.getBean("subtypeRSDao"));
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

        ModelList subtypes = subtypeRSDao.getSubtypes(page, filterList, sortList);

        return Response.ok(new KUBDataObject(subtypes.getList()))
                .header(Range.CONTENT_RANGE_HEADER, subtypes.getRange().toContentRange()).build();
    }

    @POST
    @Path("getById/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) throws KUBGenericException {
        Subtype subtype = subtypeRSDao.getSubtype(Integer.parseInt(id));

        if (subtype == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(new KUBDataObject(subtype)).build();
    }

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(Subtype subtype) throws KUBGenericException {
        subtype = subtypeRSDao.createSubtype(subtype);
        return Response.ok(new KUBDataObject(subtype)).build();
    }

    @POST
    @Path("update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(Subtype subtype) throws KUBGenericException {
        subtype = subtypeRSDao.updateSubtype(subtype);
        return Response.ok(new KUBDataObject(subtype)).build();
    }

    @POST
    @Path("remove/{id}")
    public Response remove(@PathParam("id") String id) throws KUBGenericException {
        subtypeRSDao.deleteSubtype(Integer.parseInt(id));
        return Response.noContent().build();
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        // The beanFactory reference is intentionally being set in a static way.
        SubtypeRSResource.beanFactory = beanFactory;
    }

    public SubtypeRSDao getSubtypeRSDao() {
        return subtypeRSDao;
    }

    public void setSubtypeRSDao(SubtypeRSDao subtypeRSDao) {
        this.subtypeRSDao = subtypeRSDao;
    }

}