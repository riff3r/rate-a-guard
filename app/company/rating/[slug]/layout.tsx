import { Metadata } from "next";
import { redirect } from "next/navigation";
import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import { apiClient } from "@/lib/apiClient";
import "../../../globals.css";

type ICompanyProfileResponse = {
    company: {
        companyName: string;
    };
    overallRatings: number;
    companyRatingCount: number;
    companyRatings: {
        review: number;
        overallRating: number;
    }[];
    starCounts: {
        [star: number]: number;
    };
};

async function fetchGuardMetaData(slug: string) {
    try {
        const response = await apiClient<ICompanyProfileResponse>({
            url: `/api/companies/${slug}/meta`,
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
    const guardData = await fetchGuardMetaData(slug);
    return {
        title: `${guardData?.company.companyName}`,
        description: `Give ratings and reviews for ${guardData?.company.companyName}.`,
    };
}

const RootLayout = async ({
    params,
    children,
}: Readonly<{ params: Promise<{ slug: string }>; children: React.ReactNode }>) => {
    const { slug } = await params;
    const guardData = await fetchGuardMetaData(slug);

    return (
        <>
            <Navbar />

            <div className="sticky top-0 bg-white px-12 py-4 shadow-md">
                <h1 className="font-poppins text-3xl font-extrabold">{guardData?.company.companyName}</h1>

                <h4 className="font-poppins text-xl mb-2">Add Rating</h4>
            </div>

            <div className="h-[calc(100vh-240px)] overflow-y-auto">
                <div className="mx-auto max-w-[1240px] py-10">{children}</div>
            </div>

            <Footer />
        </>
    );
};

export default RootLayout;
