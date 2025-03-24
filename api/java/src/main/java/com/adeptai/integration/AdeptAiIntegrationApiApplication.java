
package com.adeptai.integration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.Contact;

@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "AdeptAI Integration API",
        version = "1.0",
        description = "API for integrating AdeptAI with third-party services like Ceipal and LinkedIn",
        contact = @Contact(name = "AdeptAI Support", email = "support@adeptaipro.com")
    )
)
public class AdeptAiIntegrationApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(AdeptAiIntegrationApiApplication.class, args);
    }
}
