package com.hospital.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000")  // Allow frontend to access the backend
            .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allowed methods
            .allowedHeaders("*")  // Allow all headers
            .allowCredentials(true);  // Allow cookies if needed
    }
}



