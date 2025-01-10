# Movie Management Application

A Spring Boot application that provides REST APIs for managing movies.

## Prerequisites

- Java 17
- Docker
- Minikube
- kubectl
- Maven

## Local Development Setup

1. Clone the repository
2. Build the application:
```bash
mvn clean package
```

3. Run MongoDB locally (if not using Docker):
```bash
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

4. Run the application:
```bash
java -jar target/movie-management-0.0.1-SNAPSHOT.jar
```

## Docker Build

Build the Docker image:
```bash
docker build -t movie-management:latest .
```

## Kubernetes Deployment

1. Start Minikube:
```bash
minikube start
```

2. Deploy MongoDB:
```bash
kubectl apply -f k8s/mongodb-deployment.yml
```

3. Deploy the application:
```bash
kubectl apply -f k8s/movie-app-deployment.yml
```

4. Get the application URL:
```bash
minikube service movie-app --url
```

## API Endpoints

- POST /movies - Add a new movie
  ```json
  {
    "title": "Movie Title",
    "genre": "Action",
    "releaseYear": 2023
  }
  ```

- GET /movies - Get all movies
- GET /movies/{id} - Get movie by ID

## Testing the API

You can test the API using curl or any API client like Postman:

```bash
# Add a movie
curl -X POST http://localhost:8080/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"Inception","genre":"Sci-Fi","releaseYear":2010}'

# Get all movies
curl http://localhost:8080/movies

# Get movie by ID
curl http://localhost:8080/movies/{id}
```
