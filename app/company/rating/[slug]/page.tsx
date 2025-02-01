"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/components/rating/StarRating";
import Rehirable from "@/components/rating/Rehirable";
import { genericClient } from "@/lib/genericClient";

type ISearchAgencyRequest = {
    benefitsRating: number;
    cultureRating: number;
    managementRating: number;
    payRating: number;
    growthRating: number;
    rejoinable: string;
    review: string;
};

type ISearchAgencyResponse = Array<IGuard>;

const Rating = () => {
    const searchParams = useParams();
    const slug = searchParams.slug;
    const router = useRouter();
    const [formData, setFormData] = useState({
        benefitsRating: 0,
        cultureRating: 0,
        managementRating: 0,
        payRating: 0,
        growthRating: 0,
        rejoinable: "",
        review: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            const response = await genericClient<ISearchAgencyRequest, ISearchAgencyResponse>({
                url: `/api/agency-ratings/${slug}`,
                method: "POST",
                data: formData,
                requireAuth: true,
            });

            if (response.error) {
                toast.error(response.error);
                setErrorMessage(response.error || "Review submission failed. Please try again.");
                return;
            }

            if (response.data) {
                router.push(`/company/rating/${slug}/success`);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col gap-5">
            {errorMessage && <div className="text-red-500 text-sm text-center">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Benefits <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <StarRating
                            initialRating={formData.benefitsRating}
                            onChange={(rating: number) => {
                                setFormData((prevState) => ({ ...prevState, benefitsRating: rating }));
                            }}
                        />
                    </div>
                </div>

                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Culture <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <StarRating
                            initialRating={formData.cultureRating}
                            onChange={(rating: number) => {
                                setFormData((prevState) => ({ ...prevState, cultureRating: rating }));
                            }}
                        />
                    </div>
                </div>

                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Management <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <StarRating
                            initialRating={formData.managementRating}
                            onChange={(rating: number) => {
                                setFormData((prevState) => ({ ...prevState, managementRating: rating }));
                            }}
                        />
                    </div>
                </div>

                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Pay <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <StarRating
                            initialRating={formData.payRating}
                            onChange={(rating: number) => {
                                setFormData((prevState) => ({ ...prevState, payRating: rating }));
                            }}
                        />
                    </div>
                </div>

                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Growth <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <StarRating
                            initialRating={formData.growthRating}
                            onChange={(rating: number) => {
                                setFormData((prevState) => ({ ...prevState, growthRating: rating }));
                            }}
                        />
                    </div>
                </div>

                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Rejoinable <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <Rehirable
                            defaultChecked={formData.rejoinable}
                            onChange={(state: string) => {
                                setFormData((prevState) => ({ ...prevState, rejoinable: state }));
                            }}
                        />
                    </div>
                </div>

                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Write a Review <span className="text-red-500">*</span>
                    </h2>

                    <Textarea
                        className="min-h-32"
                        name="review"
                        placeholder="Type your message here."
                        value={formData.review}
                        onChange={(event) => {
                            setFormData((prevState) => ({ ...prevState, review: event.target.value }));
                        }}
                    />
                </div>

                <div className="border rounded-md shadow-md px-8 py-6 text-center">
                    <p className="mb-5">
                        By clicking the &quot;Submit&quot; button, I acknowledge that I have read and agreed to the Rate
                        A Guard Site Guidelines, Terms of Use and Privacy Policy.
                    </p>

                    <Button className="rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus: outline-none" type="submit">
                        Submit Rating
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Rating;
