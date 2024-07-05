package com.hagar.ecommerce.config;

import com.hagar.ecommerce.entity.Product;
import com.hagar.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unSupportedMethods = {
                HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};

        // disable them in Product version 1.0
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata,httpMethods) -> httpMethods.disable(unSupportedMethods))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unSupportedMethods)));


        // disable them in Product Category version 1.0
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata,httpMethods) -> httpMethods.disable(unSupportedMethods))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unSupportedMethods)));

    }
}
