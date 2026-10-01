# JobTrack – Job Application Management REST API

JobTrack is a backend REST API built with Java and Spring Boot for managing job applications.

The application provides CRUD operations, filtering, search functionality, input validation, exception handling, and persistent storage using an H2 database.

## Features

- Create job applications
- View all job applications
- View a job application by ID
- Update job applications
- Delete job applications
- Filter applications by status
- Search applications by company name
- Search applications by location
- Input validation
- Global exception handling
- Custom resource-not-found handling
- Persistent H2 file-based database
- Case-insensitive search

## Technology Stack

- Java 21
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Hibernate
- H2 Database
- Maven
- Jakarta Bean Validation
- REST API
- Git & GitHub

## Architecture

The project follows a layered architecture:

```text
Client
   |
   v
Controller
   |
   v
Service
   |
   v
Repository
   |
   v
H2 Database