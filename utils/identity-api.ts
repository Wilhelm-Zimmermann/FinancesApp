import axios, { AxiosResponse } from "axios";

const identityApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_IDENTITY_API,
    timeout: 10000,
});

identityApi.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    error => {
        if(error.response && error.response.status == 401) {
            console.error("The user is unauthorized")
        }
        return Promise.reject(error);
    }
)

export default identityApi;