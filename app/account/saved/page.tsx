"use client";

import React, { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Pencil, Trash2 } from "lucide-react";
import { genericClient } from "@/lib/genericClient";
import EditGuardModal from "@/components/guard/EditGuardModal";

type IUserProfileResponse = {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    joiningDate: string;
    resignationDate?: string;
    licenseNumber: string;
    licenseType: string;
    licenseExpirationDate: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
};

const Saved = () => {
    const [guards, setGuards] = useState<IUserProfileResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedGuard, setSelectedGuard] = useState<IUserProfileResponse | null>(null);
   
    const fetchGuardsData = async () => {
        try {
            const response = await genericClient<null, IUserProfileResponse[]>({
                url: "/api/guards?limit=100&page=1",
                method: "GET",
                requireAuth: true,
            });

            if (response.data) {
                setGuards(response.data);
            }
        } catch (err) {
            setError("Failed to fetch data.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuardsData();
    }, []);

    const handleEdit = (guard: IUserProfileResponse) => {
        setSelectedGuard(guard);
    };

    const handleDelete = (guardId: number) => {
        console.log("Deleting guard with id:", guardId);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <TabsContent value="saved" className="focus:outline-none">
            <ul>
                {guards.map((guard, index) => (
                    <li key={index} className="p-3 border-b last:border-b-0 flex justify-between items-center">
                        <div className="flex justify-between items-center gap-3">
                            <span className="font-medium">
                                {guard.firstName} {guard.lastName}
                            </span>
                            <span className="text-gray-500 text-sm">{guard.licenseNumber}</span>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex items-center justify-end gap-2" onClick={() => handleEdit(guard)}>
                                <Pencil size={18} strokeWidth={3} className="cursor-pointer" />
                                <span className="cursor-pointer text-sm font-semibold">Edit</span>
                            </div>

                            <div className="flex items-center justify-end gap-2" onClick={() => handleDelete(guard.id)}>
                                <Trash2 size={18} strokeWidth={3} className="cursor-pointer" />
                                <span className="cursor-pointer text-sm font-semibold">Delete</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedGuard && (
                <EditGuardModal
                    isOpen={!!selectedGuard}
                    onClose={() => setSelectedGuard(null)}
                    guardData={selectedGuard}
                    onSuccess={fetchGuardsData}
                />
            )}
        </TabsContent>
    );
};

export default Saved;
