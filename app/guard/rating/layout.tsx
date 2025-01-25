import type { Metadata } from "next";
import Footer from "@/components/dashboard/footer/Footer";
import Navbar from "@/components/dashboard/navbar/Navbar";
import "../../globals.css";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Generated by Dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />

            <div className="sticky top-0 bg-white px-12 py-4 shadow-md">
                <h1 className="font-poppins text-3xl font-extrabold">Ashley Moraguez</h1>

                <h4 className="font-poppins text-xl mb-2">Add Rating</h4>

                <p className="text-sm">
                    <span className="font-semibold">Guard at · </span>
                    <span className="text-gray-500 underline">XYZ Limited</span>
                </p>
            </div>

            <div className="h-[calc(100vh-264px)] overflow-y-auto">
                <div className="mx-auto max-w-[1240px] py-10">{children}</div>
            </div>

            <Footer />
        </>
    );
}
