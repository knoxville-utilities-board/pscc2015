package org.kub.web.common.mapmarker.resources;

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
import org.kub.web.common.mapmarker.dao.DirectionRSDao;
import org.kub.web.common.mapmarker.model.Direction;
import org.kub.web.common.mapmarker.model.ModelList;
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

@Path("direction")
public class DirectionRSResource implements BeanFactoryAware{
	
    private DirectionRSDao directionRSDao;

    // The beanFactory reference is intentionally static. We are using the Spring context to create
    // one of these beans in order to set the static reference to the beanFactory object. The actual
    // Resource beans that are being used are being created by the IBM JAX-RS Servlet.
    private static BeanFactory beanFactory;

    public DirectionRSResource() {
        if (beanFactory != null) {
            setDirectionRSDao((DirectionRSDao) beanFactory.getBean("directionRSDao"));
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

        ModelList directions = directionRSDao.getDirections(page, filterList, sortList);

        return Response.ok(new KUBDataObject(directions.getList()))
                .header(Range.CONTENT_RANGE_HEADER, directions.getRange().toContentRange()).build();
    }

    @POST
    @Path("getById/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) throws KUBGenericException {
        Direction direction = directionRSDao.getDirection(Integer.parseInt(id));

        if (direction == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(new KUBDataObject(direction)).build();
    }

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(Direction direction) throws KUBGenericException {
        direction = directionRSDao.createDirection(direction);
        return Response.ok(new KUBDataObject(direction)).build();
    }

    @POST
    @Path("update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(Direction direction) throws KUBGenericException {
        direction = directionRSDao.updateDirection(direction);
        return Response.ok(new KUBDataObject(direction)).build();
    }

    @POST
    @Path("remove/{id}")
    public Response remove(@PathParam("id") String id) throws KUBGenericException {
        directionRSDao.deleteDirection(Integer.parseInt(id));
        return Response.noContent().build();
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        // The beanFactory reference is intentionally being set in a static way.
        DirectionRSResource.beanFactory = beanFactory;
    }

    public DirectionRSDao getDirectionRSDao() {
        return directionRSDao;
    }

    public void setDirectionRSDao(DirectionRSDao directionRSDao) {
        this.directionRSDao = directionRSDao;
    }

}
