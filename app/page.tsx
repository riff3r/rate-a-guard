import Footer from "@/components/common/footer/Footer";
import HomeNavbar from "@/components/home/HomeNavbar";
import HeroWithSearchSection from "@/components/home/HeroWithSearchSection";

const Home = async () => {
    return (
        <>
            <HomeNavbar />

            <div className="h-[calc(100vh-136px)] overflow-y-auto">
                <section className="bg-gray-50 py-16 px-4 text-center relative">
                    <div
                        className="absolute inset-0 bg-black opacity-40 h-full w-full z-1 blur-sm bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/flagged/photo-1570343271132-8949dd284a04?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                        }}
                    />

                    <div className="max-w-3xl mx-auto bg-white bg-opacity-75 p-8 rounded-lg z-2 relative">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Enhancing Security Workforce Stability
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Welcome to RateAGuard.com, your trusted platform for finding reviews about guards and
                            security companies. Join us in creating a more transparent and efficient security workforce.
                        </p>

                        <div className="flex justify-center">
                            <HeroWithSearchSection />
                        </div>
                    </div>
                </section>

                <section className="bg-white py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose RateAGuard?</h2>
                        <ul className="grid md:grid-cols-3 gap-8 text-left">
                            <li className="p-4 border rounded-lg shadow-sm">
                                <h3 className="text-xl font-bold text-blue-600 mb-2">Token Rewards</h3>
                                <p className="text-gray-600">
                                    Earn rewards for contributing valuable reviews and information.
                                </p>
                            </li>
                            <li className="p-4 border rounded-lg shadow-sm">
                                <h3 className="text-xl font-bold text-blue-600 mb-2">Rating System</h3>
                                <p className="text-gray-600">
                                    Rate guards and companies based on performance and reliability.
                                </p>
                            </li>
                            <li className="p-4 border rounded-lg shadow-sm">
                                <h3 className="text-xl font-bold text-blue-600 mb-2">Guard Information</h3>
                                <p className="text-gray-600">
                                    Access and share detailed profiles of security personnel.
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Home;
