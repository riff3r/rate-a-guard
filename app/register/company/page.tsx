"use client";

import FormWizard, { FormWizardStepProps } from "@/components/ui/form-wizard";
import { genericClient } from "@/lib/genericClient";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

interface IAgencyRegisterRequest {
    address: string;
    city: string;
    companyName: string;
    emailAddress: string;
    licenseExpirationDate: string;
    licenseNumber: string;
    licenseType: string;
    phoneNumber: string;
    registeredAgentName: string;
    country: string;
    state: string;
    zip: string;
}

const Page = () => {
    const steps: FormWizardStepProps[] = [
        {
            id: "STEP_1",
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
            id: "STEP_2",
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
        {
            id: "STEP_3",
            legend: "Agent Information",
            fields: [
                {
                    label: "Company Name",
                    type: "text",
                    name: "companyName",
                    placeholder: "Type company name",
                    rules: { required: "Company name is required." },
                },
                {
                    label: "Registered Agent Name",
                    type: "text",
                    name: "registeredAgentName",
                    placeholder: "Type registered agent name",
                    rules: { required: "Registered agent name is required." },
                },
                {
                    label: "Email Address",
                    type: "email",
                    name: "emailAddress",
                    placeholder: "Type email address",
                    rules: { required: "Email address is required." },
                },
                {
                    label: "Phone Number",
                    type: "text",
                    name: "phoneNumber",
                    placeholder: "Type phone number",
                    rules: { required: "Phone number is required." },
                },
            ],
        },
    ];

    const defaultValues = {};

    const handleSubmit = async (values: IAgencyRegisterRequest) => {
        const response = await genericClient<IAgencyRegisterRequest, unknown>({
            url: "/api/agencies",
            method: "POST",
            data: values,
        });

        if (response.error) {
            toast.error(response.error);
            return;
        }

        if (response.data) {
            redirect("/register/company/success");
            return;
        }

        toast.error("Something went wrong! Try again later.");
    };

    return (
        <div className="bg-gray-50 pt-8 pb-4 px-4 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">Company Registration</h1>
                <FormWizard
                    steps={steps}
                    defaultValues={defaultValues}
                    onSubmit={(values) => handleSubmit(values as unknown as IAgencyRegisterRequest)}
                />
            </div>

            <footer className="mt-8 text-center text-gray-600">
                <p>Notes: Company details will be verified by the admin before activation.</p>
            </footer>
        </div>
    );
};

export default Page;
