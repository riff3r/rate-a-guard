"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const emailAddress = formData.get("emailAddress") as string;
        const password = formData.get("password") as string;

        try {
            const response = await fetch("/login/api", {
                method: "POST",
                body: JSON.stringify({ emailAddress, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const data = await response.json();
                Cookies.set("sessionToken", data.data.tokens.access.token);
                Cookies.set("sessionUser", JSON.stringify(data.data.user));

                router.push("/");
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="max-w-md w-full space-y-8">
            <h2 className="text-center text-3xl font-bold">Login</h2>
            {errorMessage && <div className="text-red-500 text-sm text-center">{errorMessage}</div>}
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="emailAddress" className="block text-sm font-medium">
                        Email
                    </label>
                    <Input
                        id="emailAddress"
                        name="emailAddress"
                        type="text"
                        required
                        className="block w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="block w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
