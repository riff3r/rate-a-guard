import { NextResponse } from "next/server";

type LoginRequest = {
    emailAddress: string;
    password: string;
};

const POST = async (request: Request) => {
    const { emailAddress, password }: LoginRequest = await request.json();

    const response = await fetch(`${process.env.RATE_A_GUARD_BACKEND_BASE_URL}/api/users/login`, {
        method: "POST",
        body: JSON.stringify({ emailAddress, password }),
        headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    return NextResponse.json(data);
};

export { POST };
