import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { router } from "expo-router";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_FINANCES_API,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await AsyncStorage.getItem("user_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err: any) {
      console.error("An error ocurred while sending request to finances api");
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("Request details:");
    console.log(JSON.stringify(error.request, null, 2));
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError) => {
    if (error.response && error.response.status == 401) {
      console.error("The user is unauthorized");
      router.replace("/sign-in");
      AsyncStorage.removeItem("user_token");
    }

    console.error("Response data:", error?.response?.data);
    console.error("Response status:", error?.response?.status);
    console.error("Response headers:", error?.response?.headers);
    return Promise.reject(error);
  }
);

export default api;
