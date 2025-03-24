
package com.adeptai.integration.controller;

import com.adeptai.integration.model.JobListing;
import com.adeptai.integration.service.LinkedInService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/linkedin")
@Tag(name = "LinkedIn Integration", description = "APIs for integrating with LinkedIn")
public class LinkedInController {

    private final LinkedInService linkedInService;

    @Autowired
    public LinkedInController(LinkedInService linkedInService) {
        this.linkedInService = linkedInService;
    }

    @GetMapping("/jobs")
    @Operation(summary = "Get jobs from LinkedIn", description = "Fetches job listings from LinkedIn API")
    public ResponseEntity<List<JobListing>> getJobs() {
        List<JobListing> jobs = linkedInService.getJobs();
        return ResponseEntity.ok(jobs);
    }

    @PostMapping("/jobs")
    @Operation(summary = "Post job to LinkedIn", description = "Posts a job listing to LinkedIn API")
    public ResponseEntity<Map<String, Object>> postJob(@RequestBody JobListing job) {
        Map<String, Object> response = linkedInService.postJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
