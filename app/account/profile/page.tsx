import { TabsContent } from "@radix-ui/react-tabs";
import { Pencil } from "lucide-react";
import { Metadata } from "next";
import { cookies } from "next/headers";

async function fetchUserData() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    const response = await fetch(`${process.env.RATE_A_GUARD_BACKEND_BASE_URL}/api/users/profile`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionToken?.value}` },
    });

    const data = await response.json();

    return data.data;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Rate A Guard",
        description: "Guard Rating System",
    };
}

const Profile = async () => {
    const userData = await fetchUserData();
    const { agency: { companyName } } = userData;

    return (
        <TabsContent value="profile" className="focus: outline-none">
            <div className="mb-6 mt-10 flex items-center justify-end gap-4">
                <Pencil size={18} strokeWidth={3} className="cursor-pointer" />
                <span className="cursor-pointer text-sm font-semibold">Edit</span>
            </div>

            <div className="flex flex-col gap-8">
                <div className="flex items-center">
                    <span className="w-96">First Name </span>
                    <div className="w-full">John</div>
                </div>
                <div className="flex items-center">
                    <span className="w-96">Last Name </span>
                    <div className="w-full">Doe</div>
                </div>
                <div className="flex items-center">
                    <span className="w-96">Company Name</span>
                    <div className="w-full">{companyName}</div>
                </div>
            </div>
        </TabsContent>
    );
};

export default Profile;
