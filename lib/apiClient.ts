import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";

declare module "axios" {
    interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

export interface ApiResponse<T> {
    status?: string;
    data?: T;
    metadata: Record<string, unknown>;
    links: Record<string, unknown>;
    error?: {
        code: number;
        message: string;
        details?: Record<string, unknown>;
    };
}

export interface ApiError {
    message: string;
    statusCode?: number;
    errorData?: unknown;
}

export interface ModAxiosError extends AxiosError {
    statusCode: number;
    details: object;
}

interface ApiHelperConfig<T> extends AxiosRequestConfig {
    handleTokens?: boolean;
    validateResponse?: (data: ApiResponse<T>) => boolean;
    requireAuth?: boolean;
}

// let isRefreshing = false;
// let failedQueue: Array<(token?: string | null) => void> = [];

// const processQueue = (_error: unknown, token: string | null = null) => {
//     failedQueue.forEach((callback) => {
//         callback(token);
//     });
//     failedQueue = [];
// };

export const apiClient = async <T>(
    config: ApiHelperConfig<T>
): Promise<{
    data: T;
    tokens?: IAuthTokens;
    metadata: Record<string, unknown>;
    links: Record<string, unknown>;
}> => {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("sessionToken");

        const cookieTokens = config.requireAuth ? sessionToken : null;
        let tokens: IAuthTokens | null = null;

        if (cookieTokens) {
            tokens = JSON.parse(cookieTokens.value) as IAuthTokens;
        }

        const response = await axios.request<ApiResponse<T>>({
            ...config,
            baseURL: process.env.RATE_A_GUARD_BACKEND_BASE_URL || "http://localhost:4000",
            validateStatus: (status) => status >= 200 && status < 500,
            headers: {
                ...config.headers,
                Authorization: tokens ? `Bearer ${tokens.access.token}` : undefined,
            },
        });

        const isSuccess = config.validateResponse
            ? config.validateResponse(response.data)
            : response.data.status === "success";

        if (!isSuccess || !response.data.data) {
            throw {
                message: response.data.error?.message || "API request failed",
                statusCode: response.data.error?.code,
                details: response.data.error?.details,
            } as ModAxiosError;
        }

        const result = {
            data: response.data.data,
            metadata: response.data.metadata,
            links: response.data.links,
        };

        if (config.handleTokens) {
            const tokens = (response.data.data as unknown as { tokens: IAuthTokens }).tokens;

            if (tokens?.access?.token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${tokens.access.token}`;
            }

            return { ...result, tokens };
        }

        return result;
    } catch (error: unknown) {
        const axiosError = error as ModAxiosError;
        
        const apiError: ApiError = {
            message: (axiosError.response?.data as ApiResponse<unknown>)?.error?.message || axiosError.message,
            statusCode: axiosError.response?.status || axiosError.statusCode,
            errorData: (axiosError.response?.data as ApiResponse<unknown>)?.error?.details || axiosError.details,
        };

        throw apiError;
    }
};

// axios.interceptors.response.use(
//     (response: AxiosResponse) => {
//         if (response.status === 401) {
//             return handleTokenRefresh(response);
//         }
//         return response;
//     },
//     async (error) => Promise.reject(error)
// );

// const handleTokenRefresh = async (response: AxiosResponse): Promise<AxiosResponse> => {
//     const originalRequest = response.config;

//     if (isRefreshing) {
//         return new Promise((resolve) => {
//             failedQueue.push((token) => {
//                 if (token) {
//                     originalRequest.headers.Authorization = `Bearer ${token}`;
//                 }
//                 resolve(axios(originalRequest));
//             });
//         });
//     }

//     originalRequest._retry = true;
//     isRefreshing = true;

//     try {
//         const cookieStore = await cookies();
//         const sessionToken = cookieStore.get("sessionToken");

//         const tokens: IAuthTokens | null = sessionToken ? (JSON.parse(sessionToken.value) as IAuthTokens) : null;

//         const response = await apiClient<{ tokens: IAuthTokens; user: unknown; company: unknown }>({
//             url: "/api/users/refresh-access-token",
//             method: "POST",
//             data: { refreshToken: tokens?.refresh.token },
//         });

//         if (response.data) {
//             axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.tokens?.access.token}`;
//             processQueue(null, response.data.tokens?.access.token);

//             originalRequest.headers.Authorization = `Bearer ${response.data.tokens?.access.token}`;
//             // cookieStore.set("sessionToken", JSON.stringify(response.data.tokens));
//             // cookieStore.set("sessionUser", JSON.stringify(response.data.user));
//             // cookieStore.set("sessionUserCompany", JSON.stringify(response.data.company));

//             return axios(originalRequest);
//         }

//         return Promise.reject("Failed to refresh token");
//     } catch (refreshError) {
//         processQueue(refreshError, null);
//         return Promise.reject(refreshError);
//     } finally {
//         isRefreshing = false;
//     }
// };
