import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import React from "react";

const Page = () => {
    return (
        <>
            <Navbar />
            <div className="h-[calc(100vh-140px)] bg-gray-50 py-16 px-4">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
                    <p className="text-gray-600 mb-4">
                        Welcome to RateAGuard! Your privacy is important to us. This Privacy Policy explains how we
                        collect, use, and safeguard your information.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Information We Collect</h2>
                    <p className="text-gray-600 mb-4">
                        We collect information that you provide to us directly and automatically when you use our
                        services.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">How We Use Information</h2>
                    <p className="text-gray-600 mb-4">
                        The information collected is used to provide and improve our services, communicate with you, and
                        ensure the security of our platform.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h2>
                    <p className="text-gray-600">
                        If you have any questions about this Privacy Policy, please contact us at
                        support@rateaguard.com.
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Page;
