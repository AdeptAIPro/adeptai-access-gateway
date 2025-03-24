
package com.adeptai.integration.service;

import com.adeptai.integration.model.JobListing;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LinkedInService {

    @Value("${linkedin.client.id}")
    private String linkedInClientId;

    @Value("${linkedin.client.secret}")
    private String linkedInClientSecret;
    
    private String linkedInAccessToken;
    private final RestTemplate restTemplate = new RestTemplate();

    public List<JobListing> getJobs() {
        try {
            // This is a simplified example - real implementation would require OAuth2 flow
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + getAccessToken());
            
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<Map> response = restTemplate.exchange(
                "https://api.linkedin.com/v2/jobs",
                HttpMethod.GET,
                entity,
                Map.class
            );
            
            Map<String, Object> responseBody = response.getBody();
            List<Map<String, Object>> jobsData = (List<Map<String, Object>>) responseBody.get("elements");
            
            return jobsData.stream()
                .map(job -> {
                    Map<String, Object> description = (Map<String, Object>) job.get("description");
                    String descriptionText = description != null ? (String) description.get("text") : "";
                    
                    return JobListing.builder()
                        .title((String) job.get("title"))
                        .description(descriptionText)
                        .location((String) job.get("locationName"))
                        .company((String) job.getOrDefault("companyName", "AdeptAI"))
                        .jobType((String) job.get("employmentStatus"))
                        .externalId((String) job.get("id"))
                        .source("linkedin")
                        .build();
                })
                .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error fetching LinkedIn jobs: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    public Map<String, Object> postJob(JobListing job) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + getAccessToken());
            headers.set("Content-Type", "application/json");
            
            // Transform to LinkedIn's format
            Map<String, Object> linkedInJob = new HashMap<>();
            linkedInJob.put("title", job.getTitle());
            
            Map<String, String> description = new HashMap<>();
            description.put("text", job.getDescription());
            linkedInJob.put("description", description);
            
            linkedInJob.put("locationName", job.getLocation());
            linkedInJob.put("employmentStatus", job.getJobType());
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(linkedInJob, headers);
            
            ResponseEntity<Map> response = restTemplate.exchange(
                "https://api.linkedin.com/v2/jobs",
                HttpMethod.POST,
                entity,
                Map.class
            );
            
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("status", "success");
            responseMap.put("message", "Job posted to LinkedIn");
            responseMap.put("data", response.getBody());
            
            return responseMap;
        } catch (Exception e) {
            log.error("Error posting job to LinkedIn: {}", e.getMessage(), e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to post job to LinkedIn: " + e.getMessage());
            return errorResponse;
        }
    }
    
    // This is a simplified OAuth flow - real implementation would be more complex
    private String getAccessToken() {
        if (linkedInAccessToken != null) {
            return linkedInAccessToken;
        }
        
        try {
            // In a real implementation, this would handle the OAuth 2.0 flow properly
            Map<String, String> params = new HashMap<>();
            params.put("grant_type", "client_credentials");
            params.put("client_id", linkedInClientId);
            params.put("client_secret", linkedInClientSecret);
            
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(params);
            
            ResponseEntity<Map> response = restTemplate.exchange(
                "https://www.linkedin.com/oauth/v2/accessToken",
                HttpMethod.POST,
                entity,
                Map.class
            );
            
            Map<String, Object> tokenResponse = response.getBody();
            linkedInAccessToken = (String) tokenResponse.get("access_token");
            return linkedInAccessToken;
        } catch (Exception e) {
            log.error("Error getting LinkedIn access token: {}", e.getMessage(), e);
            return "dummy_token_for_example";
        }
    }
}
