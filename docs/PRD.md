# Product Requirements Document (PRD) for Movie Management Application

## Introduction
This PRD outlines the requirements for a movie management application that allows users to **add** and **read** movies. The focus is on automating the deployment process using modern DevOps practices, including containerization, CI/CD automation, and deployment on Minikube.

## Objective
To develop a simple application that serves as a REST API for movie management, enabling users to add new movie entries and retrieve existing ones.

## Scope
- **Application Type**: Backend REST API using Spring Boot (Java).
- **Database**: MongoDB for storing movie data.
- **Deployment**: Utilize Minikube for local Kubernetes deployment.
- **Containerization**: Docker for packaging the application.
- **CI/CD**: GitHub Actions for automating build and deployment processes.

## User Personas
- **Developers**: Need a straightforward API to manage movies.
- **End Users**: Want to interact with the application to add and view movies.

## Functional Requirements
1. **API Endpoints**:
   - `POST /movies`: Add a new movie.
     - Request Body:
       ```
       {
         "title": "string",
         "genre": "string",
         "releaseYear": integer
       }
       ```
     - Response:
       - 201 Created: Movie successfully added.
       - 400 Bad Request: Invalid input data.
   - `GET /movies`: Retrieve a list of all movies.
     - Response:
       - 200 OK: Returns a list of movies.
   - `GET /movies/{id}`: Retrieve details of a specific movie by ID.
     - Response:
       - 200 OK: Returns movie details.
       - 404 Not Found: Movie with given ID does not exist.

2. **Database Schema**:
   - Movie ID (String, unique)
   - Title (String, mandatory)
   - Genre (String, mandatory)
   - Release Year (Integer, range: 1888 to current year)

3. **Containerization**:
   - Create a Dockerfile that packages the Spring Boot application.
   - Ensure Dockerfile follows best practices (e.g., multi-stage builds, using a lightweight base image).

4. **CI/CD Pipeline**:
   - Implement a GitHub Actions workflow to:
     - Build the Docker image.
     - Run unit tests to ensure code quality and functionality.
     - Push the image to Docker Hub or GitHub Container Registry.
     - Deploy using Kubernetes manifests automatically upon successful build and test.

5. **Kubernetes Deployment**:
   - Create Kubernetes manifests for:
     - Deployment of the application.
     - Service configuration to expose the application locally.
   - Include readiness and liveness probes in the deployment to ensure robust health checking.

 
## Documentation
The following documentation will be included in the `README.md` file:
1. Steps to build and run the application locally using Docker.
2. Instructions for deploying the application on Minikube, including necessary setup commands.
3. Accessing the application locally after deployment.
4. Explanation of the CI/CD pipeline implemented in GitHub Actions.
5. Justifications for design decisions and challenges encountered during development.
6. Contribution guidelines for developers who wish to contribute to the project.

## Timeline
- **Day 1**: 
  - Set up project structure and implement API endpoints.
  - Create Dockerfile and test containerization locally.
  
- **Day 2**:
  - Implement CI/CD pipeline with GitHub Actions.
  - Create Kubernetes manifests and deploy on Minikube.
  - Finalize documentation and prepare for submission.

## Deliverables
1. Source code repository (public or accessible).
2. Dockerfile for containerization.
3. GitHub Actions workflow file.
4. Kubernetes manifests (YAML files).
5. Comprehensive `README.md` with setup instructions and CI/CD details.
6. Screenshots or outputs verifying successful deployment and functionality.

 