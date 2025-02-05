import { cookies } from "next/headers";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Footer from "@/components/dashboard/footer/Footer";
import Navbar from "@/components/dashboard/navbar/Navbar";
import { apiClient } from "@/lib/apiClient";
import "../../../globals.css";

type IGuardProfileResponse = {
    guard: {
        firstName: string;
        lastName: string;
        company: {
            companyName: string;
        };
    };
    overallRatings: number;
    guardRatingCount: number;
    guardRatings: {
        review: number;
        overallRating: number;
    }[];
    starCounts: {
        [star: number]: number;
    };
};

async function fetchGuardData(slug: string) {
    const cookieStore = await cookies();
    const selectedCompany = cookieStore.get("selectedCompany");
    const sessionUserCompany = cookieStore.get("sessionUserCompany");
    try {
        let companyId = null;

        if (selectedCompany?.value) {
            companyId = JSON.parse(selectedCompany?.value).id;
        } else if (sessionUserCompany?.value) {
            companyId = JSON.parse(sessionUserCompany?.value).id;
        }

        const response = await apiClient<IGuardProfileResponse>({
            url: `/api/guards/${companyId}/${slug}/profile`,
            method: "GET",
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
        title: `${guardData?.guard.firstName} ${guardData?.guard.lastName} at ${guardData?.guard.company.companyName}`,
        description: `Give ratings and reviews for ${guardData?.guard.firstName} ${guardData?.guard.lastName}.`,
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
                    {guardData?.guard.firstName} {guardData?.guard.lastName}
                </h1>

                <h4 className="font-poppins text-xl mb-2">Add Rating</h4>

                <p className="text-sm">
                    <span className="font-semibold">Guard at · </span>
                    <span className="text-gray-500 underline">{guardData?.guard.company.companyName}</span>
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
