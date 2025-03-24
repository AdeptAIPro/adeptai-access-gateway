
package com.adeptai.integration.model;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobListing {
    private String title;
    private String description;
    private String location;
    private String company;
    private String salaryRange;
    private String jobType;
    private List<String> requirements;
    private LocalDateTime postingDate;
    private LocalDateTime closingDate;
    private String externalId;
    private String source;
}
