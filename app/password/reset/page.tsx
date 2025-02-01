"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { genericClient } from "@/lib/genericClient";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { BasicInput } from "@/components/ui/basic-input";

interface IAgencyRegisterRequest {
    emailAddress: string;
    password: string;
    otp: string;
}

const Page = () => {
    const {
        control,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        const response = await genericClient<IAgencyRegisterRequest, unknown>({
            url: "/api/users/reset-password",
            method: "PUT",
            data: data,
        });

        if (response.error) {
            toast.error(response.error);
            return;
        }

        if (response.data) {
            redirect("/");
            return;
        }

        toast.error("Something went wrong! Try again later.");
    };

    return (
        <div className="bg-gray-50 py-16 px-4 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Reset Password</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                        OTP
                    </label>
                    <Controller
                        name="otp"
                        control={control}
                        rules={{ required: "OTP is required" }}
                        render={({ field }) => <BasicInput type="text" id="otp" placeholder="Enter OTP" {...field} value={field.value || ""} />}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <Controller
                        name="emailAddress"
                        control={control}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                            },
                        }}
                        render={({ field }) => <BasicInput type="email" id="email" placeholder="Your email" {...field} value={field.value || ""} />}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                        }}
                        render={({ field }) => (
                            <BasicInput type="password" id="password" placeholder="New password" {...field} value={field.value || ""} />
                        )}
                    />
                </div>

                <Button type="submit" className="w-full bg-black text-white">
                    Reset New Password
                </Button>
            </form>
        </div>
        </div>
    );
};

export default Page;
