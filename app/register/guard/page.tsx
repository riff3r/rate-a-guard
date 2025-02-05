"use client";

import FormWizard, { FormWizardStepProps } from "@/components/ui/form-wizard";
import { genericClient } from "@/lib/genericClient";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

interface IGuardRegisterRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    licenseNumber?: string;
    licenseType?: string;
    licenseExpirationDate?: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}

interface IGuardRegisterResponse {
    id: number;
}

const Page = () => {
    const steps: FormWizardStepProps[] = [
        {
            id: "STEP_1",
            legend: "Guard Information",
            fields: [
                {
                    label: "First Name",
                    type: "text",
                    name: "firstName",
                    placeholder: "Type a guard's first name",
                    rules: { required: "Guard first name is required." },
                },
                {
                    label: "Last Name",
                    type: "text",
                    name: "lastName",
                    placeholder: "Type a guard's last name",
                    rules: { required: "Guard last name is required." },
                },
                {
                    label: "Email Address",
                    type: "email",
                    name: "emailAddress",
                    placeholder: "Type a valid email address",
                    rules: { required: "Email address is required." },
                },
                {
                    label: "Phone Number",
                    type: "text",
                    name: "phoneNumber",
                    placeholder: "Type a valid phone number",
                    rules: { required: "Phone number is required." },
                },
            ],
        },
        {
            id: "STEP_2",
            legend: "License Information",
            fields: [
                {
                    label: "License Number",
                    type: "text",
                    name: "licenseNumber",
                    placeholder: "Type a valid license number",
                    rules: { required: "License number is required." },
                },
                {
                    label: "License Type",
                    type: "text",
                    name: "licenseType",
                    placeholder: "Type license type",
                    rules: { required: "License type is required." },
                },
                {
                    label: "Expiration Date",
                    type: "date",
                    name: "licenseExpirationDate",
                    rules: { required: "Expiration date is required." },
                },
            ],
        },
        {
            id: "STEP_3",
            legend: "Address Information",
            fields: [
                {
                    label: "Address",
                    type: "text",
                    name: "address",
                    placeholder: "Type Address",
                    rules: { required: "Address is required." },
                },
                {
                    label: "City",
                    type: "text",
                    name: "city",
                    placeholder: "Type city",
                    rules: { required: "City is required." },
                },
                {
                    label: "State",
                    type: "text",
                    name: "state",
                    placeholder: "Type state",
                    rules: { required: "State is required." },
                },
                {
                    label: "Country",
                    type: "text",
                    name: "country",
                    placeholder: "Type country",
                    rules: { required: "Country is required." },
                },
                {
                    label: "Zip",
                    type: "text",
                    name: "zip",
                    placeholder: "Type zip code",
                    rules: { required: "Zip code is required." },
                },
            ],
        },
    ];

    const defaultValues = {};

    const handleSubmit = async (values: IGuardRegisterRequest) => {
        const response = await genericClient<IGuardRegisterRequest, IGuardRegisterResponse>({
            url: "/api/guards",
            method: "POST",
            data: values,
            requireAuth: true,
        });

        if (response.error) {
            toast.error(response.error);
            return;
        }

        if (response.data) {
            toast.success("Guard added successfully");
            redirect(`/guard/rating/${response.data.id}`);
            return;
        }

        toast.error("Something went wrong! Try again later.");
    };

    return (
        <div className="bg-gray-50 pt-8 pb-4 px-4 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">Guard Registration</h1>

                <FormWizard
                    steps={steps}
                    defaultValues={defaultValues}
                    onSubmit={(values) => handleSubmit(values as unknown as IGuardRegisterRequest)}
                />
            </div>

            <footer className="mt-8 text-center text-gray-600">
                <p>Notes: This information will be reviewed by the admin.</p>
            </footer>
        </div>
    );
};

export default Page;
