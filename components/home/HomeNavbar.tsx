import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import NavbarLoginButton from "../auth/NavLoginButton";
import { apiClient } from "@/lib/apiClient";
import Alert from "../common/alert/Alert";

const handleLogout = async () => {
    "use server";

    const cookieStore = await cookies();
    cookieStore.delete("sessionToken");
    cookieStore.delete("sessionUser");
    cookieStore.delete("sessionUserCompany");
    cookieStore.delete("selectedCompany");
};

type IUserTokensResponse = {
    tokenBalance: number;
};

const fetchUserTokenData = async () => {
    try {
        const response = await apiClient<IUserTokensResponse>({
            url: "/api/users/tokens",
            method: "GET",
            requireAuth: true,
        });

        if (response.data) {
            return response.data;
        }

        redirect("/");
    } catch (err) {
        console.log(err);
        redirect("/");
    }
};

const HomeNavbar: React.FC = async () => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    let userTokenData = null;

    if (sessionToken?.value) {
        userTokenData = await fetchUserTokenData();
    }

    return (
        <div className="bg-white shadow-sm px-6 py-3">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 sm:w-2/5 w-2/3">
                        <div
                            className="logo bg-black px-6 py-1 text-center text-lg font-semibold text-white cursor-default"
                            onClick={async () => {
                                "use server";

                                redirect("/");
                            }}
                        >
                            RAG
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {sessionToken?.value && userTokenData && (
                            <div className="flex items-center bg-gray-800 px-2 py-1 rounded-full shadow-md select-none">
                                <svg
                                    className="w-5 h-5 text-yellow-400 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 14V6l6 4-6 4z" />
                                </svg>
                                <span className="text-sm font-semibold text-white">{userTokenData.tokenBalance}</span>
                            </div>
                        )}

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
                                    {/* <DropdownMenuItem
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
                                    </DropdownMenuItem> */}
                                    <DropdownMenuItem
                                        onClick={async () => {
                                            "use server";

                                            redirect("/account/saved");
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

                        {/* <Button className="rounded-full bg-white font-semibold text-black hover:bg-neutral-700 hover:text-white h-8">
                            Help
                        </Button> */}
                    </div>
                </div>
            </div>
            <Alert />
        </div>
    );
};

export default HomeNavbar;
