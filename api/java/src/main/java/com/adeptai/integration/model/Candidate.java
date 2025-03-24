
package com.adeptai.integration.model;

import java.util.List;
import java.util.Map;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {
    private String name;
    private String email;
    private String phone;
    private String resumeUrl;
    private String linkedinProfile;
    private List<String> skills;
    private Integer experience;
    private List<Map<String, Object>> education;
    private List<String> preferredJobTypes;
    private String notes;
}
