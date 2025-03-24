
package com.adeptai.integration.service;

import com.adeptai.integration.model.JobListing;
import com.adeptai.integration.model.Candidate;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CeipalService {

    @Value("${ceipal.api.url}")
    private String ceipalApiUrl;

    @Value("${ceipal.api.key}")
    private String ceipalApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<JobListing> getJobs() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + ceipalApiKey);
        
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        ResponseEntity<Map> response = restTemplate.exchange(
            ceipalApiUrl + "/jobs",
            HttpMethod.GET,
            entity,
            Map.class
        );
        
        Map<String, Object> responseBody = response.getBody();
        List<Map<String, Object>> jobsData = (List<Map<String, Object>>) responseBody.get("data");
        
        return jobsData.stream()
            .map(job -> JobListing.builder()
                .title((String) job.get("jobTitle"))
                .description((String) job.get("description"))
                .location((String) job.get("location"))
                .company("AdeptAI")
                .salaryRange((String) job.get("compensationDetails"))
                .jobType((String) job.get("employmentType"))
                .requirements((List<String>) job.get("requirements"))
                .externalId((String) job.get("id"))
                .source("ceipal")
                .build())
            .collect(Collectors.toList());
    }

    public Map<String, Object> postCandidate(Candidate candidate) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + ceipalApiKey);
        headers.set("Content-Type", "application/json");
        
        // Transform to Ceipal's format
        Map<String, Object> ceipalCandidate = new HashMap<>();
        String[] nameParts = candidate.getName().split(" ", 2);
        ceipalCandidate.put("firstName", nameParts[0]);
        ceipalCandidate.put("lastName", nameParts.length > 1 ? nameParts[1] : "");
        ceipalCandidate.put("email", candidate.getEmail());
        ceipalCandidate.put("phone", candidate.getPhone());
        ceipalCandidate.put("resumeUrl", candidate.getResumeUrl());
        ceipalCandidate.put("linkedinProfile", candidate.getLinkedinProfile());
        ceipalCandidate.put("skills", candidate.getSkills());
        ceipalCandidate.put("totalExperience", candidate.getExperience());
        ceipalCandidate.put("education", candidate.getEducation());
        ceipalCandidate.put("notes", candidate.getNotes());
        
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(ceipalCandidate, headers);
        
        ResponseEntity<Map> response = restTemplate.exchange(
            ceipalApiUrl + "/candidates",
            HttpMethod.POST,
            entity,
            Map.class
        );
        
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("status", "success");
        responseMap.put("message", "Candidate submitted to Ceipal");
        responseMap.put("data", response.getBody());
        
        return responseMap;
    }
}
