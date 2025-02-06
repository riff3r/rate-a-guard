import { ApiError, apiClient } from "@/lib/apiClient";
import { NextResponse } from "next/server";

type RequestPayload<T = unknown> = {
    url: string;
    method: string;
    data?: T;
    params?: T;
    requireAuth?: boolean;
    handleTokens?: boolean;
};

const POST = async (request: Request) => {
    try {
        const { url, method, data, params, requireAuth }: RequestPayload = await request.json();

        const response = await apiClient<RequestPayload>({
            url,
            method,
            data,
            params,
            requireAuth,
        });

        return NextResponse.json(response);
    } catch (error) {
        const axiosError = error as ApiError;

        return NextResponse.json({ error: (error as Error).message, details: axiosError.errorData }, { status: 500 });
    }
};

export { POST };
