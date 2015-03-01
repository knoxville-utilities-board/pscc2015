package org.kub.web.tutorial.hellojaxrs.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.wink.json4j.JSONException;
import org.apache.wink.json4j.JSONObject;
import org.kub.web.tutorial.hellojaxrs.model.Person;



@Path("/helloworld")
public class HelloWorldRSResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String sayHello() {
        return "Hello from REST Api";
    }
    
    @GET    
    @Produces(MediaType.APPLICATION_JSON)
    public JSONObject sayHelloJson() {
        JSONObject greeting = new JSONObject();

        try {
            greeting.put("Greeting", "Hello, as JSON Object");
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return greeting;
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Person addAgeToPerson(Person person) {
        Person peep = person;

            peep.setAge("Hello World Age");
        return peep;
    }
}