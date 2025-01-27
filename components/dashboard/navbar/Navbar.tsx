import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import Search from "@/components/ui/search";

const handleLogout = async () => {
    "use server";

    const cookieStore = await cookies();
    cookieStore.delete("sessionToken");
    cookieStore.delete("sessionUser");
};

const Navbar: React.FC = () => {
    return (
        <div className="bg-foreground px-6 py-3">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div
                            className="logo bg-white px-6 py-1 text-center text-lg font-semibold text-black cursor-pointer"
                            onClick={async () => {
                                "use server";

                                redirect("/");
                            }}
                        >
                            RAG
                        </div>

                        <Search />
                    </div>

                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex p-1 px-3 items-center text-white rounded-full font-semibold select-none bg-foreground hover:bg-neutral-700 focus: outline-none">
                                Hey, User
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={async () => {
                                        "use server";

                                        redirect("/account/profile");
                                    }}
                                    className="focus:bg-primary focus:text-white"
                                >
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={async () => {
                                        "use server";

                                        redirect("/account/profile");
                                    }}
                                    className="focus:bg-primary focus:text-white"
                                >
                                    Account Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={async () => {
                                        "use server";

                                        redirect("/account/profile");
                                    }}
                                    className="focus:bg-primary focus:text-white"
                                >
                                    Your Ratings
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={async () => {
                                        "use server";

                                        redirect("/account/profile");
                                    }}
                                    className="focus:bg-primary focus:text-white"
                                >
                                    Saved Guards
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout} className="focus:bg-primary focus:text-white">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* <Button className="rounded-full bg-white font-semibold text-black select-none	hover:bg-neutral-700 hover:text-white h-8">
                            Help
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
