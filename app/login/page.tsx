import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Login: React.FC = async () => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    if (sessionToken?.value) {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <LoginForm />
        </div>
    );
};

export default Login;
