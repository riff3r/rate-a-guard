type RequestPayload<T> = {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    data?: T;
    params?: T;
    requireAuth?: boolean;
    handleTokens?: boolean;
};

type Metadata = {
    count?: number;
};

type Links = {
    [key: string]: string;
};

type ApiResponse<T> = {
    data?: T;
    error?: string;
    metadata?: Metadata;
    links?: Links;
};

export const genericClient = async <T, R>(payload: RequestPayload<T>): Promise<ApiResponse<R>> => {
    try {
        const response = await fetch("/api/generic", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        });

        const result: ApiResponse<R> = await response.json();
        return result;
    } catch (error) {
        return { error: (error as Error).message };
    }
};

