package org.kub.web.mapmarker;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class MarkerRSEmf implements ServletContextListener{
	
	private static EntityManagerFactory emf;

    @Override
    public void contextInitialized(ServletContextEvent event) {
        try {
            emf = Persistence.createEntityManagerFactory("MapMarker");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        emf.close();
    }

    public static EntityManager createEntityManager() {
        if (emf == null) {
            throw new IllegalStateException("Context is not initialized yet.");
        }

        return emf.createEntityManager();
    }

}
