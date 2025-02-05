import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import NavbarLoginButton from "@/components/auth/NavLoginButton";
import { Button } from "@/components/ui/button";
import SearchCombine from "../search/SearchCombine";

const handleLogout = async () => {
    "use server";

    const cookieStore = await cookies();
    cookieStore.delete("sessionToken");
    cookieStore.delete("sessionUser");
    cookieStore.delete("sessionUserCompany");
    cookieStore.delete("selectedCompany");
    redirect("/");
};

const Navbar: React.FC = async () => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    return (
        <div className="bg-foreground px-6 py-3">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 w-3/4">
                        <div
                            className="logo bg-white px-6 py-1 text-center text-lg font-semibold text-black cursor-default"
                            onClick={async () => {
                                "use server";

                                redirect("/");
                            }}
                        >
                            RAG
                        </div>

                        <SearchCombine />
                    </div>

                    <div className="flex items-center gap-4">
                        {sessionToken?.value ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex p-1 px-3 items-center text-white rounded-full font-semibold text-sm select-none bg-foreground hover:bg-neutral-700 focus: outline-none">
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
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="focus:bg-primary focus:text-white"
                                    >
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <NavbarLoginButton />
                                <Button
                                    size="sm"
                                    className="rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus: outline-none"
                                    onClick={async () => {
                                        "use server";

                                        redirect("/register/company");
                                    }}
                                >
                                    Register
                                </Button>
                            </>
                        )}

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
