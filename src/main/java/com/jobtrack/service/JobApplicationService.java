package com.jobtrack.service;

import com.jobtrack.entity.JobApplication;
import com.jobtrack.exception.ResourceNotFoundException;
import com.jobtrack.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    public JobApplication createApplication(JobApplication application) {
        return repository.save(application);
    }

    public List<JobApplication> getAllApplications() {
        return repository.findAll();
    }

    public JobApplication getApplicationById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job application not found with id: " + id
                        ));
    }

    public JobApplication updateApplication(
            Long id,
            JobApplication updatedApplication) {

        JobApplication application = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job application not found with id: " + id
                        ));

        application.setCompanyName(
                updatedApplication.getCompanyName());

        application.setJobTitle(
                updatedApplication.getJobTitle());

        application.setStatus(
                updatedApplication.getStatus());

        application.setLocation(
                updatedApplication.getLocation());

        application.setApplicationDate(
                updatedApplication.getApplicationDate());

        return repository.save(application);
    }

    public boolean deleteApplication(Long id) {

        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Job application not found with id: " + id
            );
        }

        repository.deleteById(id);
        return true;
    }

    public List<JobApplication> getApplicationsByStatus(String status) {
        return repository.findByStatusIgnoreCase(status);
    }

    public List<JobApplication> getApplicationsByCompany(String companyName) {
        return repository.findByCompanyNameIgnoreCase(companyName);
    }

    public List<JobApplication> getApplicationsByLocation(String location) {
        return repository.findByLocationIgnoreCase(location);
    }
}