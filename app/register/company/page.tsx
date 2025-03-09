"use client";

import FormWizard, { FormWizardStepProps } from "@/components/ui/form-wizard";
import { ApiResponse } from "@/lib/apiClient";
import { genericClient } from "@/lib/genericClient";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ICompanyRegisterRequest {
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
    const router = useRouter();
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
                    label: "Email Address",
                    type: "email",
                    name: "emailAddress",
                    placeholder: "Type email address",
                    rules: { required: "Email address is required." },
                },
                {
                    label: "Registered Agent First Name",
                    type: "text",
                    name: "registeredAgentFirstName",
                    placeholder: "Type registered agent first name",
                    rules: { required: "Registered agent first name is required." },
                },
                {
                    label: "Registered Agent Last Name",
                    type: "text",
                    name: "registeredAgentLastName",
                    placeholder: "Type registered agent last name",
                    rules: { required: "Registered agent last name is required." },
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

    const handleSubmit = async (values: ICompanyRegisterRequest) => {
        await toast.promise(
            genericClient<ICompanyRegisterRequest, unknown>({
                url: "/api/companies",
                method: "POST",
                data: values,
            }),
            {
                loading: "Processing...",
                success: (response: ApiResponse<unknown>) => {
                    if (response.data) {
                        router.push("/register/company/success");
                        return "Company registered successfully!";
                    } else if (response.error) {
                        throw new Error(response.error as unknown as string);
                    }
                    throw new Error("Unexpected response format.");
                },
                error: (err: { message: string }) => err.message || "Something went wrong! Try again later.",
            }
        );
    };

    return (
        <div className="bg-gray-50 pt-8 pb-4 px-4 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">Company Registration</h1>
                <FormWizard
                    steps={steps}
                    defaultValues={defaultValues}
                    onSubmit={(values) => handleSubmit(values as unknown as ICompanyRegisterRequest)}
                />
            </div>

            <footer className="mt-8 text-center text-gray-600">
                <p>Notes: Company details will be verified by the admin before activation.</p>
            </footer>
        </div>
    );
};

export default Page;
