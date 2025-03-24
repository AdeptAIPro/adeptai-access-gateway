
package com.adeptai.integration.controller;

import com.adeptai.integration.model.JobListing;
import com.adeptai.integration.model.Candidate;
import com.adeptai.integration.service.CeipalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ceipal")
@Tag(name = "Ceipal Integration", description = "APIs for integrating with Ceipal")
public class CeipalController {

    private final CeipalService ceipalService;

    @Autowired
    public CeipalController(CeipalService ceipalService) {
        this.ceipalService = ceipalService;
    }

    @GetMapping("/jobs")
    @Operation(summary = "Get jobs from Ceipal", description = "Fetches job listings from Ceipal API")
    public ResponseEntity<List<JobListing>> getJobs() {
        List<JobListing> jobs = ceipalService.getJobs();
        return ResponseEntity.ok(jobs);
    }

    @PostMapping("/candidates")
    @Operation(summary = "Post candidate to Ceipal", description = "Sends candidate data to Ceipal API")
    public ResponseEntity<Map<String, Object>> postCandidate(@RequestBody Candidate candidate) {
        Map<String, Object> response = ceipalService.postCandidate(candidate);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
