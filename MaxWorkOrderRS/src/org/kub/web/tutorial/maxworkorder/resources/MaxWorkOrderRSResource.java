package org.kub.web.tutorial.maxworkorder.resources;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

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
import org.kub.web.util.filtering.Filter;
import org.kub.web.util.filtering.FilterUtils;
import org.kub.web.util.paging.Page;
import org.kub.web.util.paging.Range;
import org.kub.web.util.sorting.Sort;
import org.kub.web.util.sorting.SortUtils;

import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

@Path("workorder")
public class MaxWorkOrderRSResource {

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

        SimpleDateFormat dateFormatter = new SimpleDateFormat();

        JSONArray workOrders = new JSONArray();

        // paramsDebug is just to demo what came in with the request
        JSONObject paramsDebug = new JSONObject();
        paramsDebug.put("rangeHeader", rangeHeader);
        paramsDebug.put("filterCount", filterList.size());
        paramsDebug.put("sortCount", sortList.size());
        paramsDebug.put("page", page.getStart());

        // Some fake Work Orders
        for (int i = 0; i < 4; i++) {

            JSONObject workOrder = new JSONObject();

            // the fake work order
            workOrder.put("id", 100 + i);
            workOrder.put("workOrder", "WO-" + (100 + i));
            workOrder.put("status", "pending");
            workOrder.put("location", "42 Wallaby Way");
            workOrder.put("startDate", dateFormatter.format(new Date()));

            // just for proofing of params
            workOrder.put("debugging", paramsDebug);

            workOrders.add(workOrder);
        }

        return Response.ok(new KUBDataObject(workOrders))
                .header(Range.CONTENT_RANGE_HEADER, "items 0-4/4").build();
    }

    @POST
    @Path("getById/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") String id) {

        SimpleDateFormat dateFormatter = new SimpleDateFormat();

        String idProof = id;

        // demo 404 response when item not found
        if (idProof.equals("bogus")) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        // fake Work Order
        JSONObject workOrder = new JSONObject();
        workOrder.put("id", idProof + " -- from path param. Woot!");
        workOrder.put("workOrder", "WO-3871");
        workOrder.put("status", "complete");
        workOrder.put("location", "742 Evergreen Terrace");
        workOrder.put("startDate", dateFormatter.format(new Date()));

        return Response.ok(workOrder).build();
    }

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(JSONObject workOrder) throws KUBGenericException {

        SimpleDateFormat dateFormatter = new SimpleDateFormat();

        // New fake Work Order
        Random randomGenerator = new Random();
        int randomInt = randomGenerator.nextInt(100);

        workOrder.put("id", randomInt);
        workOrder.put("workOrder", "W12-" + randomInt);
        workOrder.put("status", "new");
        workOrder.put("location", workOrder.get("location"));
        workOrder.put("startDate", dateFormatter.format(new Date()));

        return Response.ok(new KUBDataObject(workOrder)).build();
    }

    @POST
    @Path("update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(JSONObject workOrder) throws KUBGenericException {

        SimpleDateFormat dateFormatter = new SimpleDateFormat();

        workOrder.put("updatedDateTime", dateFormatter.format(new Date()));

        return Response.ok(new KUBDataObject(workOrder)).build();
    }

    @POST
    @Path("remove/{id}")
    public Response remove(@PathParam("id") String id)
            throws KUBGenericException {
    	
    	//just to demo PathParams
    	System.out.println("deleted work order:  " + id);
    	
        return Response.status(501).build();
    }
}