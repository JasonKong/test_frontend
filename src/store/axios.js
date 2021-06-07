import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        config.headers['ApiKey'] = process.env.VUE_APP_BACKEND_API_KEY;
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
