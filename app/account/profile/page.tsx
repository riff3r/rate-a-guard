import { apiClient } from "@/lib/apiClient";
import { TabsContent } from "@radix-ui/react-tabs";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";

type IUserProfileResponse = {
    agency: {
        companyName: string;
        registeredAgentName: string;
    };
};

async function fetchUserData() {
    try {
        const response = await apiClient<IUserProfileResponse>({
            url: "/api/users/profile",
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
}

const Profile = async () => {
    const userData = await fetchUserData();
    
    return (
        <TabsContent value="profile" className="focus: outline-none">
            <div className="mb-6 mt-10 flex items-center justify-end gap-4">
                <Pencil size={18} strokeWidth={3} className="cursor-pointer" />
                <span className="cursor-pointer text-sm font-semibold">Edit</span>
            </div>

            <div className="flex flex-col gap-8">
                <div className="flex items-center">
                    <span className="w-96">First Name </span>
                    <div className="w-full">{userData?.agency.registeredAgentName.split(" ")[0]}</div>
                </div>
                <div className="flex items-center">
                    <span className="w-96">Last Name </span>
                    <div className="w-full">{userData?.agency.registeredAgentName.split(" ")[1]}</div>
                </div>
                <div className="flex items-center">
                    <span className="w-96">Company Name</span>
                    <div className="w-full">{userData?.agency.companyName}</div>
                </div>
            </div>
        </TabsContent>
    );
};

export default Profile;
