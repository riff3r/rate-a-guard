import { cookies } from "next/headers";
import { Metadata } from "next";
import Footer from "@/components/dashboard/footer/Footer";
import Navbar from "@/components/dashboard/navbar/Navbar";
import "../../../globals.css";
import { redirect } from "next/navigation";

async function fetchGuardData(slug: string) {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    const response = await fetch(`${process.env.RATE_A_GUARD_BACKEND_BASE_URL}/api/employees/${slug}/profile`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionToken?.value}` },
    });

    const data = await response.json();

    return data.data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const guardData = await fetchGuardData(slug);
    const {
        employee: {
            firstName,
            lastName,
            agency: { companyName },
        },
    } = guardData;

    return {
        title: `${firstName} ${lastName} at ${companyName}`,
        description: `Give ratings and reviews for ${firstName} ${lastName}.`,
    };
}

const RootLayout = async ({
    params,
    children,
}: Readonly<{ params: Promise<{ slug: string }>; children: React.ReactNode }>) => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    if (!sessionToken?.value) {
        redirect("/login");
    }

    const { slug } = await params;
    const guardData = await fetchGuardData(slug);
    const {
        employee: {
            firstName,
            lastName,
            agency: { companyName },
        },
    } = guardData;

    return (
        <>
            <Navbar />

            <div className="sticky top-0 bg-white px-12 py-4 shadow-md">
                <h1 className="font-poppins text-3xl font-extrabold">
                    {firstName} {lastName}
                </h1>

                <h4 className="font-poppins text-xl mb-2">Add Rating</h4>

                <p className="text-sm">
                    <span className="font-semibold">Guard at · </span>
                    <span className="text-gray-500 underline">{companyName}</span>
                </p>
            </div>

            <div className="h-[calc(100vh-264px)] overflow-y-auto">
                <div className="mx-auto max-w-[1240px] py-10">{children}</div>
            </div>

            <Footer />
        </>
    );
};

export default RootLayout;
