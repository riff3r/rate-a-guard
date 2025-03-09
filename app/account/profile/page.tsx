"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TabsContent } from "@radix-ui/react-tabs";
import { Pencil, Check, X } from "lucide-react";
import { genericClient } from "@/lib/genericClient";
import { Button } from "@/components/ui/button";
import { BasicInput } from "@/components/ui/basic-input";

interface IUserProfileResponse {
    company: {
        companyName: string;
        registeredAgentFirstName: string;
        registeredAgentLastName: string;
        [key: string]: string;
    };
}

interface IProfileUpdateRequest {
    companyName: string;
    registeredAgentFirstName: string;
    registeredAgentLastName: string;
}

interface IProfileUpdateResponse {
    companyName: string;
    registeredAgentFirstName: string;
    registeredAgentLastName: string;
}

const Profile = () => {
    const [userData, setUserData] = useState<IUserProfileResponse | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<IProfileUpdateRequest>({
        defaultValues: {
            registeredAgentFirstName: "",
            registeredAgentLastName: "",
            companyName: "",
        },
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await genericClient<null, IUserProfileResponse>({
                    url: "/api/users/profile",
                    method: "GET",
                    requireAuth: true,
                });

                if (response.data) {
                    setUserData(response.data);
                    reset(response.data.company);
                }
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            }
        };

        fetchUserData();
    }, [reset]);

    const updateUserProfile = async (data: IProfileUpdateRequest) => {
        try {
            const response = await genericClient<IProfileUpdateRequest, IProfileUpdateResponse>({
                url: "/api/users/profile",
                method: "PUT",
                data: data,
                requireAuth: true,
            });

            if (response.data) {
                reset(response.data);
                return true;
            }
        } catch (err) {
            console.error("Update failed:", err);
            return false;
        }
    };

    const onSubmit = async (data: IProfileUpdateRequest) => {
        setSaving(true);
        const success = await updateUserProfile(data);
        setSaving(false);

        if (success) {
            setUserData((prev) => (prev ? { ...prev, company: { ...data } } : null));
            setIsEditing(false);
        }
    };

    return (
        <TabsContent value="profile" className="focus:outline-none">
            <div className="mb-6 mt-10 flex items-center justify-end gap-4">
                {isEditing ? (
                    <>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            disabled={!isDirty || saving}
                            size="sm"
                            className="rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus: outline-none"
                        >
                            <Check size={18} strokeWidth={3} />
                            Save
                        </Button>
                        <Button
                            onClick={() => {
                                reset();
                                setIsEditing(false);
                            }}
                            size="sm"
                            className="text-black flex items-center text-sm font-semibold gap-2 bg-transparent hover:bg-transparent"
                        >
                            <X size={18} strokeWidth={3} />
                            Cancel
                        </Button>
                    </>
                ) : (
                    <div className="flex items-center justify-end gap-4" onClick={() => setIsEditing(true)}>
                        <Pencil size={18} strokeWidth={3} className="cursor-pointer" />
                        <span className="cursor-pointer text-sm font-semibold">Edit</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-8">
                {[
                    { label: "First Name", field: "registeredAgentFirstName" },
                    { label: "Last Name", field: "registeredAgentLastName" },
                    { label: "Company Name", field: "companyName" },
                ].map(({ label, field }) => (
                    <div key={field} className="flex items-center">
                        <span className="w-96">{label}</span>
                        {isEditing ? (
                            <Controller
                                control={control}
                                name={field as keyof IProfileUpdateResponse}
                                rules={{ required: "This field is required" }}
                                render={({ field }) => (
                                    <BasicInput
                                        {...field}
                                        className={`${
                                            errors[field.name] ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                                        }`}
                                    />
                                )}
                            />
                        ) : (
                            <div className="w-full"> {userData?.company[field] || "—"}</div>
                        )}
                    </div>
                ))}
            </div>
        </TabsContent>
    );
};

export default Profile;
