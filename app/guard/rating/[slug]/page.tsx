"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Rating from "@/components/rating/rating";
import Rehireable from "@/components/rating/rehireable";

const page = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="border rounded-md shadow-md px-8 py-6">
                <h2 className="text-md font-bold mb-5">
                    Attendance / Punctuality <span className="text-red-500">*</span>
                </h2>

                <div className="flex justify-center">
                    <Rating
                        initialRating={2}
                        onChange={(rating) => {
                            console.log(rating);
                        }}
                    />
                </div>
            </div>

            <div className="border rounded-md shadow-md px-8 py-6">
                <h2 className="text-md font-bold mb-5">
                    Professionalism <span className="text-red-500">*</span>
                </h2>

                <div className="flex justify-center">
                    <Rating
                        initialRating={3}
                        onChange={(rating) => {
                            console.log(rating);
                        }}
                    />
                </div>
            </div>

            <div className="border rounded-md shadow-md px-8 py-6">
                <h2 className="text-md font-bold mb-5">
                    Productivity <span className="text-red-500">*</span>
                </h2>

                <div className="flex justify-center">
                    <Rating
                        initialRating={4}
                        onChange={(rating) => {
                            console.log(rating);
                        }}
                    />
                </div>
            </div>

            <div className="border rounded-md shadow-md px-8 py-6">
                <h2 className="text-md font-bold mb-5">
                    Customer Service <span className="text-red-500">*</span>
                </h2>

                <div className="flex justify-center">
                    <Rating
                        initialRating={2}
                        onChange={(rating) => {
                            console.log(rating);
                        }}
                    />
                </div>
            </div>

            <div className="border rounded-md shadow-md px-8 py-6">
                <h2 className="text-md font-bold mb-5">
                    Communication <span className="text-red-500">*</span>
                </h2>

                <div className="flex justify-center">
                    <Rating
                        initialRating={3}
                        onChange={(rating) => {
                            console.log(rating);
                        }}
                    />
                </div>
            </div>

            <div className="border rounded-md shadow-md px-8 py-6">
                <h2 className="text-md font-bold mb-5">
                    Rehireable <span className="text-red-500">*</span>
                </h2>

                <div className="flex justify-center">
                    <Rehireable
                        onChange={(rehireable) => {
                            console.log(rehireable);
                        }}
                    />
                </div>
            </div>

            <div className="border rounded-md shadow-md px-8 py-6">
                <h2 className="text-md font-bold mb-5">
                    Write a Review <span className="text-red-500">*</span>
                </h2>

                <Textarea className="min-h-32" placeholder="Type your message here." />
            </div>

            <div className="border rounded-md shadow-md px-8 py-6 text-center">
                <p className="mb-5">
                    By clicking the &quot;Submit&quot; button, I acknowledge that I have read and agreed to the Rate A
                    Guard Site Guidelines, Terms of Use and Privacy Policy.
                </p>

                <Button className="rounded-full w-60">Submit Rating</Button>
            </div>
        </div>
    );
};

export default page;
