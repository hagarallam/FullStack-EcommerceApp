package com.hagar.ecommerce.config;

import com.hagar.ecommerce.entity.Country;
import com.hagar.ecommerce.entity.Product;
import com.hagar.ecommerce.entity.ProductCategory;
import com.hagar.ecommerce.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {


    private final EntityManager entityManager;

    @Autowired
    public DataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unSupportedMethods = {
                HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};

        disableHttpMethods(Product.class,config, unSupportedMethods);
        disableHttpMethods(ProductCategory.class,config, unSupportedMethods);
        disableHttpMethods(Country.class,config, unSupportedMethods);
        disableHttpMethods(State.class,config, unSupportedMethods);


        exposeId(config);
    }

    private void disableHttpMethods(Class theClass ,RepositoryRestConfiguration config, HttpMethod[] unSupportedMethods) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata,httpMethods) -> httpMethods.disable(unSupportedMethods))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unSupportedMethods)));
    }

    private void exposeId(RepositoryRestConfiguration configuration){
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        List<Class> entityClasses = new ArrayList<>();


        entities.stream().forEach(
                entity -> {
                    entityClasses.add(entity.getJavaType());
                }
        );
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        configuration.exposeIdsFor(domainTypes);
    }
}
