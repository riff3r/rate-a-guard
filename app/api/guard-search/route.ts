import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type GuardSearchRequest = {
    text: string;
};

const POST = async (request: Request) => {
    const { text }: GuardSearchRequest = await request.json();
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    const response = await fetch(`${process.env.RATE_A_GUARD_BACKEND_BASE_URL}/api/search/employees?text=${text}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionToken?.value}` },
    });

    const data = await response.json();

    return NextResponse.json(data);
};

export { POST };
