import { redirect } from "next/navigation";
import React from "react";
// import { Button } from "../../ui/button";
import { Button } from "@/components/ui/button";
// import Search from "@/components/ui/search";

const RegistrationNavbar: React.FC = () => {
    return (
        <div className="bg-foreground px-6 py-3">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 sm:w-2/5 w-2/3">
                        <div
                            className="logo bg-white px-6 py-1 text-center text-lg font-semibold text-black cursor-pointer"
                            onClick={async () => {
                                redirect("/");
                            }}
                        >
                            RAG
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            size="sm"
                            variant={"ghost"}
                            className="bg-black text-white font-semibold"
                            onClick={async () => {
                                redirect("/login");
                            }}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationNavbar;
