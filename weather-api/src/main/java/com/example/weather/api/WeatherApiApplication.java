package com.example.weather.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class WeatherApiApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(WeatherApiApplication.class, args);
    }

    // Enable CORS so React frontend (localhost:3000) can call backend
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // allow all endpoints
                        .allowedOrigins("http://localhost:3000") // React app
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
