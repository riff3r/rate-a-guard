import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import React from "react";

const page = () => {
    return (
        <>
            <Navbar />
            <div className="h-[calc(100vh-140px)] bg-gray-50 py-16 px-4">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Terms of Service</h1>
                    <p className="text-gray-600 mb-4">
                        By accessing or using RateAGuard, you agree to be bound by these Terms of Service. Please read
                        them carefully.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Usage Guidelines</h2>
                    <p className="text-gray-600 mb-4">
                        Users must comply with all applicable laws and regulations while using our platform.
                        Unauthorized use is strictly prohibited.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Account Responsibilities</h2>
                    <p className="text-gray-600 mb-4">
                        Users are responsible for maintaining the confidentiality of their accounts and ensuring all
                        activity under their accounts complies with these terms.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Termination</h2>
                    <p className="text-gray-600">
                        We reserve the right to suspend or terminate accounts for violations of these Terms of Service
                        without prior notice.
                    </p>
                </div>
            </div>{" "}
            <Footer />
        </>
    );
};

export default page;
