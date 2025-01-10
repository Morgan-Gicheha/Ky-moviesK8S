# Movie Management Application

This application consists of a Spring Boot backend and an Angular frontend, containerized with Docker and deployed using Kubernetes.

## Backend (Spring Boot)

### Build and Run Backend

```bash
# Build Docker image for backend
docker build -t movie-management:latest ./backend

# Create Docker network for communication between services
docker network create movie-network

# Run MongoDB container
docker run -d --name mongodb \
    --network movie-network \
    -p 27017:27017 \
    mongo:6.0

# Run backend application
docker run -d --name movie-app \
    --network movie-network \
    -p 8080:8080 \
    -e SPRING_DATA_MONGODB_HOST=mongodb \
    movie-management:latest
```

### Important Backend Endpoints
- `GET /movies` - Retrieve all movies
- `POST /movies` - Add a new movie
- `GET /health` - Check application health status
