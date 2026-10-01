package com.jobtrack.controller;

import com.jobtrack.entity.JobApplication;
import com.jobtrack.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<JobApplication> createApplication(
            @Valid @RequestBody JobApplication application) {

        JobApplication createdApplication =
                service.createApplication(application);

        return new ResponseEntity<>(createdApplication, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllApplications() {
        return ResponseEntity.ok(service.getAllApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getApplicationById(
            @PathVariable Long id) {

        JobApplication application =
                service.getApplicationById(id);

        return ResponseEntity.ok(application);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<JobApplication>> getApplicationsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                service.getApplicationsByStatus(status)
        );
    }

    @GetMapping("/company/{companyName}")
    public ResponseEntity<List<JobApplication>> getApplicationsByCompany(
            @PathVariable String companyName) {

        return ResponseEntity.ok(
                service.getApplicationsByCompany(companyName)
        );
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<JobApplication>> getApplicationsByLocation(
            @PathVariable String location) {

        return ResponseEntity.ok(
                service.getApplicationsByLocation(location)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> updateApplication(
            @PathVariable Long id,
            @Valid @RequestBody JobApplication application) {

        JobApplication updatedApplication =
                service.updateApplication(id, application);

        return ResponseEntity.ok(updatedApplication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(
            @PathVariable Long id) {

        service.deleteApplication(id);

        return ResponseEntity.noContent().build();
    }
}