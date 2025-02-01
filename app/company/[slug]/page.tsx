import React from "react";
import { Metadata } from "next";
import { ArrowRight, Bookmark } from "lucide-react";
import GuardRatingChart from "@/components/guard/GuardRatingChart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import { apiClient } from "@/lib/apiClient";

type IAgencyProfileResponse = {
    agency: {
        companyName: string;
    };
    overallRatings: number;
    agencyRatingCount: number;
    agencyRatings: {
        review: number;
        overallRating: number;
    }[];
    starCounts: {
        [star: number]: number;
    };
};

async function fetchAgencyData(slug: string) {
    try {
        const response = await apiClient<IAgencyProfileResponse>({
            url: `/api/agencies/${slug}/profile`,
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
    const agencyData = await fetchAgencyData(slug);

    return {
        title: `${agencyData?.agency.companyName}`,
        description: `Explore the ratings and reviews for ${agencyData?.agency.companyName}. Overall Quality: ${agencyData?.overallRatings}/5 based on ${agencyData?.agencyRatingCount} ratings.`,
    };
}

const Agency = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const agencyData = await fetchAgencyData(slug);

    if (!agencyData) {
        return null;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-5">
                <div className="lg:w-4/12 w-full">
                    <div className="flex gap-2 mb-2">
                        <div className="text-5xl lg:text-7xl font-poppins font-[900]">
                            {Number(agencyData?.overallRatings).toFixed(1) || "N/A"}
                        </div>
                        <div className="text-base text-gray-400 font-bold top-3 relative">/ 5</div>
                    </div>

                    <div className="font-semibold">
                        Overall Quality Based on{" "}
                        <span className="underline">{agencyData?.agencyRatingCount || "0"} Ratings</span>
                    </div>

                    <div className="flex items-center gap-2 my-5">
                        <div>
                            <h1 className="font-poppins text-3xl lg:text-5xl font-black mb-3">
                                {agencyData?.agency.companyName}
                            </h1>
                        </div>
                        <Bookmark />
                    </div>

                    <div className="">
                        <Button
                            className="rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus: outline-none"
                            size={"lg"}
                            onClick={async () => {
                                "use server";

                                redirect(`/company/rating/${slug}`);
                            }}
                        >
                            Rate <ArrowRight strokeWidth={3} />
                        </Button>
                    </div>
                </div>

                <div className="lg:w-6/12 w-full">
                    <GuardRatingChart starCounts={agencyData?.starCounts} />
                </div>
            </div>

            <div className="w-full lg:w-8/12 mt-5">
                <Tabs defaultValue="profile">
                    <TabsList className="mb-5">
                        <TabsTrigger value="profile">{agencyData?.agencyRatingCount} Ratings</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex flex-col gap-5">
                    {agencyData?.agencyRatings.map(
                        (rating: { review: number; overallRating: number }, index: number) => (
                            <div key={index} className="flex flex-col md:flex-row gap-2 p-5 bg-primary-foreground">
                                <div className="flex gap-5">
                                    <div>
                                        <div className="text-center uppercase font-semibold text-sm">Quality</div>
                                        <div className="h-16 min-w-[72px] bg-destructive font-poppins text-3xl font-extrabold flex justify-center items-center">
                                            {Number(rating.overallRating).toFixed(1)}
                                        </div>
                                    </div>

                                    <div className="flex-1">{rating.review}</div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Agency;
