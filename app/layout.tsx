import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // Specify the weights you need
    variable: "--font-poppins", // Custom variable for Tailwind
});

export const metadata: Metadata = {
    title: "RateAGuard.com",
    description: "Generated by create next app",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}>
                <Toaster position="top-right" />
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </body>
        </html>
    );
};

export default RootLayout;
