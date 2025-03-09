"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/components/rating/StarRating";
import Rehirable from "@/components/rating/Rehirable";
import { genericClient } from "@/lib/genericClient";
import { ApiResponse } from "@/lib/apiClient";

type ISearchGuardRequest = {
    regularityRating: number;
    professionalismRating: number;
    productivityRating: number;
    customerServiceRating: number;
    communicationRating: number;
    rehirable: string;
    review: string;
};

type ISearchGuardResponse = Array<IGuard>;

const Rating = () => {
    const searchParams = useParams();
    const slug = searchParams.slug;
    const router = useRouter();
    const [formData, setFormData] = useState({
        regularityRating: 0,
        professionalismRating: 0,
        productivityRating: 0,
        customerServiceRating: 0,
        communicationRating: 0,
        rehirable: "",
        review: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            await toast.promise(
                genericClient<ISearchGuardRequest, ISearchGuardResponse>({
                    url: `/api/guard-ratings/${slug}`,
                    method: "POST",
                    data: formData,
                    requireAuth: true,
                }),
                {
                    loading: "Processing...",
                    success: (response: ApiResponse<ISearchGuardResponse>) => {
                        if (response.data) {
                            router.push(`/guard/rating/${slug}/success`);
                            return;
                        } else if (response.error) {
                            throw new Error(response.error as unknown as string);
                        }
                        throw new Error("Unexpected response format.");
                    },
                    error: (err: { message: string }) => err.message || "Something went wrong! Try again later.",
                }
            );
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
                        Attendance / Punctuality <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <StarRating
                            initialRating={formData.regularityRating}
                            onChange={(rating: number) => {
                                setFormData((prevState) => ({ ...prevState, regularityRating: rating }));
                            }}
                        />
                    </div>
                </div>

                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Professionalism <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <StarRating
                            initialRating={formData.professionalismRating}
                            onChange={(rating: number) => {
                                setFormData((prevState) => ({ ...prevState, professionalismRating: rating }));
                            }}
                        />
                    </div>
                </div>

                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Productivity <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <StarRating
                            initialRating={formData.productivityRating}
                            onChange={(rating: number) => {
                                setFormData((prevState) => ({ ...prevState, productivityRating: rating }));
                            }}
                        />
                    </div>
                </div>

                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Customer Service <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <StarRating
                            initialRating={formData.customerServiceRating}
                            onChange={(rating: number) => {
                                setFormData((prevState) => ({ ...prevState, customerServiceRating: rating }));
                            }}
                        />
                    </div>
                </div>

                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Communication <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <StarRating
                            initialRating={formData.communicationRating}
                            onChange={(rating: number) => {
                                setFormData((prevState) => ({ ...prevState, communicationRating: rating }));
                            }}
                        />
                    </div>
                </div>

                <div className="border rounded-md shadow-md px-8 py-6">
                    <h2 className="text-md font-bold mb-5">
                        Rehirable <span className="text-red-500">*</span>
                    </h2>

                    <div className="flex justify-center">
                        <Rehirable
                            defaultChecked={formData.rehirable}
                            onChange={(state: string) => {
                                setFormData((prevState) => ({ ...prevState, rehirable: state }));
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

                    <Button
                        className="rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus: outline-none"
                        type="submit"
                    >
                        Submit Rating
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Rating;
