# JobTrack – Job Application Management System

JobTrack is a full-stack job application management system built with Java, Spring Boot, and JavaScript.

It allows users to create an account, log in securely, and manage job applications through a REST API and browser-based dashboard.

## Features

### Authentication
- User registration
- User login
- BCrypt password hashing
- Logout
- Input validation

### Job Application Management
- Create job applications
- View all applications
- View an application by ID
- Update applications
- Delete applications
- Filter applications by status
- Search applications by company name
- Search applications by job title
- Search applications by location
- Case-insensitive search
- Application date tracking

### Backend
- RESTful API
- Layered architecture
- Spring Data JPA
- Hibernate ORM
- H2 persistent file-based database
- Bean validation
- Global exception handling
- Custom resource-not-found handling
- Appropriate HTTP status codes

### Frontend
- Login and registration interface
- Job application dashboard
- Add/Edit application modal
- Search functionality
- Status filtering
- Responsive layout
- REST API integration using Fetch API

## Technology Stack

### Backend
- Java 21
- Spring Boot 4
- Spring Web MVC
- Spring Data JPA
- Hibernate
- Spring Security
- BCrypt
- Jakarta Bean Validation
- Maven

### Database
- H2 Database

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- DOM manipulation

### Tools
- VS Code
- Git
- GitHub
- Postman
- PowerShell

## Architecture

JobTrack follows a layered backend architecture:

```text
                    Client
                      |
                      v
              REST Controller
                      |
                      v
                  Service
                      |
                      v
                 Repository
                      |
                      v
                H2 Database