import axios, { AxiosResponse } from "axios";
import { IDENTITY_API } from "@env";

const identityApi = axios.create({
    baseURL: IDENTITY_API,
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