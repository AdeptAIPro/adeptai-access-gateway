
package com.adeptai.integration.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NursysService {

    @Value("${nursys.api.url}")
    private String nursysApiUrl;

    @Value("${nursys.api.key}")
    private String nursysApiKey;
    
    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> getLicenseInfo(String licenseNumber, String state) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + nursysApiKey);
            
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<Map> response = restTemplate.exchange(
                nursysApiUrl + "/licenses/" + state + "/" + licenseNumber,
                HttpMethod.GET,
                entity,
                Map.class
            );
            
            return response.getBody();
        } catch (Exception e) {
            log.error("Error fetching license information from Nursys: {}", e.getMessage(), e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to fetch license information: " + e.getMessage());
            return errorResponse;
        }
    }
    
    public List<Map<String, Object>> verifyLicenses(List<Map<String, String>> licenseRequests) {
        List<Map<String, Object>> results = new ArrayList<>();
        
        for (Map<String, String> licenseInfo : licenseRequests) {
            String licenseNumber = licenseInfo.get("licenseNumber");
            String state = licenseInfo.get("state");
            
            if (licenseNumber == null || state == null) {
                Map<String, Object> errorResult = new HashMap<>();
                errorResult.put("licenseNumber", licenseNumber);
                errorResult.put("state", state);
                errorResult.put("valid", false);
                errorResult.put("error", "License number and state are required");
                results.add(errorResult);
                continue;
            }
            
            try {
                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", "Bearer " + nursysApiKey);
                
                HttpEntity<String> entity = new HttpEntity<>(headers);
                
                ResponseEntity<Map> response = restTemplate.exchange(
                    nursysApiUrl + "/licenses/" + state + "/" + licenseNumber + "/verify",
                    HttpMethod.GET,
                    entity,
                    Map.class
                );
                
                Map<String, Object> verificationResult = new HashMap<>();
                verificationResult.put("licenseNumber", licenseNumber);
                verificationResult.put("state", state);
                
                Map<String, Object> responseBody = response.getBody();
                verificationResult.put("valid", responseBody.get("valid"));
                verificationResult.put("status", responseBody.get("status"));
                verificationResult.put("expirationDate", responseBody.get("expirationDate"));
                verificationResult.put("message", responseBody.get("message"));
                
                results.add(verificationResult);
            } catch (Exception e) {
                log.error("Error verifying license with Nursys: {}", e.getMessage(), e);
                Map<String, Object> errorResult = new HashMap<>();
                errorResult.put("licenseNumber", licenseNumber);
                errorResult.put("state", state);
                errorResult.put("valid", false);
                errorResult.put("error", e.getMessage());
                results.add(errorResult);
            }
        }
        
        return results;
    }
}
