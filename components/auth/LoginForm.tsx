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
        <div className="max-w-md w-full mx-auto px-4 py-8 md:px-6 md:py-12 bg-white shadow-md rounded-lg">
            <h2 className="text-center text-3xl font-bold text-gray-800">Login</h2>
            {errorMessage && <div className="text-red-500 text-sm text-center mt-4">{errorMessage}</div>}
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <Input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
