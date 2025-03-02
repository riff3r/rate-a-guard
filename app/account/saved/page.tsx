import { TabsContent } from "@/components/ui/tabs";
import { apiClient } from "@/lib/apiClient";
import { redirect } from "next/navigation";
import React from "react";

type IUserProfileResponse = {
    firstName: string;
    lastName: string;
    licenseNumber: string;
};

const fetchGuardsData = async () => {
    try {
        const response = await apiClient<IUserProfileResponse[]>({
            url: "/api/guards?limit=100&page=1",
            method: "GET",
            requireAuth: true,
        });

        if (response.data) {
            return response.data;
        }

        redirect("/");
    } catch (err) {
        console.log(err);
        redirect("/");
    }
};

const Saved = async () => {
    const guards = await fetchGuardsData();

    return (
        <TabsContent value="saved" className="focus: outline-none">
            <ul>
                {guards.map((guard, index) => (
                    <li key={index} className="p-3 border-b last:border-b-0 flex justify-between items-center">
                        <span className="font-medium">
                            {guard.firstName} {guard.lastName}
                        </span>
                        <span className="text-gray-500 text-sm">{guard.licenseNumber}</span>
                    </li>
                ))}
            </ul>
        </TabsContent>
    );
};

export default Saved;
