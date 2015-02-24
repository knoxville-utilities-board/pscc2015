package org.kub.web.tutorial.maxworkorder;

import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;

import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.codehaus.jackson.map.AnnotationIntrospector;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.introspect.JacksonAnnotationIntrospector;
import org.codehaus.jackson.xc.JaxbAnnotationIntrospector;
import org.kub.web.tutorial.maxworkorder.resources.MaxWorkOrderRSResource;

public class MaxWorkOrderRSApplication extends Application {
    // private static final String ISO_DATE_FORMAT =
    // "yyyy-MM-dd'T'HH:mm:ss.SSSZ";
    private static final String ISO_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ssZ";

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();
        // classes.add(HelloWorldRSResource.class);
        classes.add(MaxWorkOrderRSResource.class);
        return classes;
    }

    @Override
    public Set<Object> getSingletons() {
        Set<Object> s = new HashSet<Object>();

        // Register the Jackson provider for JSON

        // Make (de)serializer use a subset of JAXB and (afterwards) Jackson
        // annotations
        // See http://wiki.fasterxml.com/JacksonJAXBAnnotations for more
        // information
        ObjectMapper mapper = new ObjectMapper();
        AnnotationIntrospector primary = new JacksonAnnotationIntrospector();
        AnnotationIntrospector secondary = new JaxbAnnotationIntrospector();
        AnnotationIntrospector pair = new AnnotationIntrospector.Pair(primary,
                secondary);
        mapper.getDeserializationConfig().setAnnotationIntrospector(pair);
        mapper.getSerializationConfig().setAnnotationIntrospector(pair);

        // Make it so that our timestamps in JSON format are ISO formatted
        mapper.getSerializationConfig().setDateFormat(
                new SimpleDateFormat(ISO_DATE_FORMAT));
        mapper.getDeserializationConfig().setDateFormat(
                new SimpleDateFormat(ISO_DATE_FORMAT));
        mapper.configure(SerializationConfig.Feature.WRITE_DATES_AS_TIMESTAMPS,
                false);

        // Set up the provider
        JacksonJsonProvider jaxbProvider = new JacksonJsonProvider();
        jaxbProvider.setMapper(mapper);

        s.add(jaxbProvider);
        return s;
    }

}