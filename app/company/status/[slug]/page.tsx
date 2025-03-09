import React, { JSX } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { CheckCircle, XCircle, Clock, MinusCircle, ShieldCheck, Info } from "lucide-react";

type ICompanyActivationStatusResponse = {
    company: {
        companyName: string;
        status: "active" | "inactive" | "pending" | "approved" | "rejected";
        rejectionReasons?: string;
    };
};

async function fetchCompanyStatusData(slug: string) {
    try {
        const response = await apiClient<ICompanyActivationStatusResponse>({
            url: `/api/companies/${slug}/activation-status`,
            method: "GET",
        });

        if (response.data) {
            return response.data;
        }

        redirect("/");
    } catch (err) {
        redirect(`/?action=alert&message=${err.message}`);
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const companyData = await fetchCompanyStatusData(slug);

    return {
        title: `${companyData?.company.companyName}`,
        description: `Company status for ${companyData?.company.companyName}.`,
    };
}

const statusStyles: Record<string, { label: string; color: string; icon: JSX.Element; message: string }> = {
    active: {
        label: "Active",
        color: "bg-green-600 text-white",
        icon: <CheckCircle className="w-6 h-6 text-white" />,
        message: "This company is fully active and operational.",
    },
    inactive: {
        label: "Inactive",
        color: "bg-gray-500 text-white",
        icon: <MinusCircle className="w-6 h-6 text-white" />,
        message: "This company is currently inactive and not operational.",
    },
    pending: {
        label: "Pending",
        color: "bg-yellow-500 text-black",
        icon: <Clock className="w-6 h-6 text-black" />,
        message: "This company's activation is under review.",
    },
    approved: {
        label: "Approved",
        color: "bg-blue-500 text-white",
        icon: <ShieldCheck className="w-6 h-6 text-white" />,
        message: "This company has been successfully approved.",
    },
    rejected: {
        label: "Rejected",
        color: "bg-red-600 text-white",
        icon: <XCircle className="w-6 h-6 text-white" />,
        message: "This company's activation request was rejected.",
    },
};

const Company = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const companyData = await fetchCompanyStatusData(slug);

    if (!companyData) {
        return null;
    }

    const { companyName, status, rejectionReasons } = companyData.company;
    const { label, color, icon, message } = statusStyles[status];

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="font-poppins text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900">{companyName}</h1>

                <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full ${color} shadow-md`}>
                    {icon}
                    <span className="text-lg font-semibold uppercase">{label}</span>
                </div>

                <div className="mt-4 flex items-center gap-3 p-4 bg-gray-100 rounded-lg shadow-sm">
                    <Info className="w-5 h-5 text-gray-600" />
                    <p className="text-gray-700 text-lg">{message}</p>
                </div>

                {status === "rejected" && rejectionReasons && (
                    <div className="mt-6 p-5 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm">
                        <h3 className="font-bold text-xl mb-2">🚫 Rejection Reason</h3>
                        <p className="text-lg">{rejectionReasons}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Company;
