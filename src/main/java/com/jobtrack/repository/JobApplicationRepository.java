package com.jobtrack.repository;

import com.jobtrack.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByStatusIgnoreCase(String status);

    List<JobApplication> findByCompanyNameIgnoreCase(String companyName);

    List<JobApplication> findByLocationIgnoreCase(String location);
}