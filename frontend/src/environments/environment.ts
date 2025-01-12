export const environment = {
  production: false,
  apiUrl: window.location.hostname === 'localhost' 
    ? 'http://localhost:8080'
    : 'http://backend-service:8080'
};