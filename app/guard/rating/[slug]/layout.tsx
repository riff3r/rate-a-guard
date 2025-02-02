import { cookies } from "next/headers";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Footer from "@/components/dashboard/footer/Footer";
import Navbar from "@/components/dashboard/navbar/Navbar";
import { apiClient } from "@/lib/apiClient";
import "../../../globals.css";

type IGuardProfileResponse = {
    employee: {
        firstName: string;
        lastName: string;
        agency: {
            companyName: string;
        };
    };
    overallRatings: number;
    employeeRatingCount: number;
    employeeRatings: {
        review: number;
        overallRating: number;
    }[];
    starCounts: {
        [star: number]: number;
    };
};

async function fetchGuardData(slug: string) {
    try {
        const response = await apiClient<IGuardProfileResponse>({
            url: `/api/employees/${slug}/profile`,
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const guardData = await fetchGuardData(slug);
    return {
        title: `${guardData?.employee.firstName} ${guardData?.employee.lastName} at ${guardData?.employee.agency.companyName}`,
        description: `Give ratings and reviews for ${guardData?.employee.firstName} ${guardData?.employee.lastName}.`,
    };
}

const RootLayout = async ({
    params,
    children,
}: Readonly<{ params: Promise<{ slug: string }>; children: React.ReactNode }>) => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    if (!sessionToken?.value) {
        redirect("/?action=login");
    }

    const { slug } = await params;
    const guardData = await fetchGuardData(slug);
    
    return (
        <>
            <Navbar />

            <div className="sticky top-0 bg-white px-12 py-4 shadow-md">
                <h1 className="font-poppins text-3xl font-extrabold">
                    {guardData?.employee.firstName} {guardData?.employee.lastName}
                </h1>

                <h4 className="font-poppins text-xl mb-2">Add Rating</h4>

                <p className="text-sm">
                    <span className="font-semibold">Guard at · </span>
                    <span className="text-gray-500 underline">{guardData?.employee.agency.companyName}</span>
                </p>
            </div>

            <div className="h-[calc(100vh-264px)] overflow-y-auto">
                <div className="mx-auto max-w-[1240px] py-10">{children}</div>
            </div>

            <Footer />
        </>
    );
};

export default RootLayout;
