// api.ts
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// Define interfaces for credentials and responses.
interface LoginCredentials {
    username: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

// Create an Axios instance with your API's base URL.
const api = axios.create({
    baseURL: 'https://192.168.0.0:8080/api/v1/auth',
});

// Helper function to store tokens securely.
const storeTokens = async ({ accessToken, refreshToken }: LoginResponse): Promise<void> => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
};

// Retrieve the access token from AsyncStorage.
export const getAccessToken = async (): Promise<string | null> =>
    await AsyncStorage.getItem('accessToken');

// Retrieve the refresh token from SecureStore.
export const getRefreshToken = async (): Promise<string | null> =>
    await SecureStore.getItemAsync('refreshToken');

// Remove tokens from storage (e.g., on logout).
export const removeTokens = async (): Promise<void> => {
    await AsyncStorage.removeItem('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
};

// Login function that authenticates and stores tokens.
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response: AxiosResponse<LoginResponse> = await api.post('/login', credentials);
        const { accessToken, refreshToken } = response.data;
        await storeTokens({ accessToken, refreshToken });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Request interceptor to attach the access token to outgoing requests.
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const token = await getAccessToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config as InternalAxiosRequestConfig;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to refresh the access token on 401 errors.
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error) => {
        const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = await getRefreshToken();
            if (refreshToken) {
                try {
                    // Request a new access token using the refresh token.
                    const { data } = await api.post<LoginResponse>('/refresh-token', { refreshToken });
                    const { accessToken: newAccessToken } = data;
                    // Store the new access token.
                    await AsyncStorage.setItem('accessToken', newAccessToken);
                    // Update the authorization header and retry the original request.
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    }
                    return api(originalRequest);
                } catch (refreshError) {
                    // Remove tokens if refresh fails (e.g., invalid refresh token).
                    await removeTokens();
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
