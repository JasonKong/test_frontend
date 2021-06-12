import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvZ3JhcGhxbC9hdXRoIiwiaWF0IjoxNjIzNDU1MzEzLCJleHAiOjE2MjM0NTg5MTMsIm5iZiI6MTYyMzQ1NTMxMywianRpIjoib2cyZWhXZFBNUmg4S2JwMSIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.0p_ELQJl7jyqFNEhhp-1xlpku9O16u2B2OTCuWjXPMU';
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function(error) {
    return Promise.reject(error);
});
