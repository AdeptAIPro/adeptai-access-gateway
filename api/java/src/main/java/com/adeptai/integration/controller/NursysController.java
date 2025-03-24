
package com.adeptai.integration.controller;

import com.adeptai.integration.service.NursysService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/nursys")
@Tag(name = "Nursys Integration", description = "APIs for integrating with Nursys license verification")
public class NursysController {

    private final NursysService nursysService;

    @Autowired
    public NursysController(NursysService nursysService) {
        this.nursysService = nursysService;
    }

    @GetMapping("/license/{licenseNumber}")
    @Operation(summary = "Get nurse license information", description = "Fetches license details from Nursys API")
    public ResponseEntity<Map<String, Object>> getLicenseInfo(
            @PathVariable String licenseNumber,
            @RequestParam String state) {
        Map<String, Object> licenseInfo = nursysService.getLicenseInfo(licenseNumber, state);
        return ResponseEntity.ok(licenseInfo);
    }

    @PostMapping("/verify")
    @Operation(summary = "Verify multiple nurse licenses", description = "Verifies multiple nurse licenses in bulk")
    public ResponseEntity<Map<String, Object>> verifyLicenses(@RequestBody List<Map<String, String>> licenseRequests) {
        List<Map<String, Object>> results = nursysService.verifyLicenses(licenseRequests);
        Map<String, Object> response = Map.of("results", results);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
