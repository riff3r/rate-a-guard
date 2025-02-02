import Footer from "@/components/dashboard/footer/Footer";
import Navbar from "@/components/dashboard/navbar/Navbar";
import { cookies } from "next/headers";

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    return (
        <>
            <Navbar />
            <div className={`${sessionToken ? "h-[calc(100vh-140px)]" : "h-[calc(100vh-136px)]"} overflow-y-auto`}>
                <div className="mx-auto max-w-[1240px] py-10">{children}</div>
            </div>

            <Footer />
        </>
    );
};

export default RootLayout;
