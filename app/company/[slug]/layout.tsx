import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import "../../globals.css";

const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Navbar />

            <div className="h-[calc(100vh-136px)] overflow-y-auto">
                <div className="mx-auto max-w-[1240px] py-10">{children}</div>
            </div>

            <Footer />
        </>
    );
};

export default RootLayout;
