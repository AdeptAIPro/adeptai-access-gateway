
# AdeptAI Integration API (Java)

This is a Java-based API for integrating AdeptAI platform with third-party services like Ceipal and LinkedIn.

## Setup Instructions

1. Install Java 11+ and Maven
2. Build the project: `mvn clean install`
3. Run the API server: `java -jar target/adeptai-integration-api-0.0.1-SNAPSHOT.jar`
4. API will be available at http://localhost:8080
5. API documentation will be available at http://localhost:8080/swagger-ui.html

## Configuration

Create an `application.properties` file with the following settings:

```
# Server settings
server.port=8080

# Ceipal API settings
ceipal.api.key=your_ceipal_api_key
ceipal.api.url=https://api.ceipal.com/v1

# LinkedIn API settings
linkedin.client.id=your_linkedin_client_id
linkedin.client.secret=your_linkedin_client_secret

# Security settings
api.key=your_api_key
```

## Endpoints

- `/api/v1/ceipal/jobs`: Fetch and sync jobs from Ceipal
- `/api/v1/ceipal/candidates`: Send candidate data to Ceipal
- `/api/v1/linkedin/jobs`: Fetch and post jobs to LinkedIn
- `/api/v1/linkedin/profile`: Get profile information from LinkedIn

## Security

- All endpoints require API key authentication
- LinkedIn authentication uses OAuth 2.0
