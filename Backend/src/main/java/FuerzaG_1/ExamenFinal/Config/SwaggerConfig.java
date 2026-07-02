package com.example.vSIAF.Config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Seguro Universitario Potosí - Fuerza_G Grupo 1")
                        .version("1.0")

                        .description("""
                                Sistema CRUD desarrollado en Spring Boot.

                                INTEGRANTES:
                                • Diana
                                • Samira
                                • Armando
                                • Alfredo
                                • Fatima
                                • Benjamin
                                • Ximena

                                Materia: Tecnologías Emergentes
                                Gestión 2026
                                """));
    }
}