import EditProfileButton from "@/components/account/EditProfileButton";
import { apiClient } from "@/lib/apiClient";
import { TabsContent } from "@radix-ui/react-tabs";
import { redirect } from "next/navigation";

type IUserProfileResponse = {
    company: {
        companyName: string;
        registeredAgentName: string;
    };
};

const fetchUserData = async () => {
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
};

const Profile = async () => {
    const userData = await fetchUserData();

    return (
        <TabsContent value="profile" className="focus: outline-none">
            <EditProfileButton
                userData={{
                    firstName: userData?.company.registeredAgentName.split(" ")[0],
                    lastName: userData?.company.registeredAgentName.split(" ")[1],
                    companyName: userData?.company.companyName
                }}
            />

            <div className="flex flex-col gap-8">
                <div className="flex items-center">
                    <span className="w-96">First Name </span>
                    <div className="w-full">{userData?.company.registeredAgentName.split(" ")[0]}</div>
                </div>
                <div className="flex items-center">
                    <span className="w-96">Last Name </span>
                    <div className="w-full">{userData?.company.registeredAgentName.split(" ")[1]}</div>
                </div>
                <div className="flex items-center">
                    <span className="w-96">Company Name</span>
                    <div className="w-full">{userData?.company.companyName}</div>
                </div>
            </div>
        </TabsContent>
    );
};

export default Profile;
