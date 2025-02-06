import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Page = () => {
    return (
        <>
            <Navbar />

            <div className="h-[calc(100vh-140px)] bg-gray-50 py-16 px-4 flex items-center justify-center">
                <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
                    <p className="text-gray-600 mb-8">
                        Have questions or need support? Reach out to us, and we’ll get back to you as soon as possible.
                    </p>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <Input type="text" id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <Input type="email" id="email" placeholder="Your email" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <Textarea id="message" rows={4} placeholder="Your message" />
                        </div>
                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Page;
