import { cookies } from "next/headers";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { redirect } from "next/navigation";

const handleLogout = async () => {
    "use server";

    const cookieStore = await cookies();
    cookieStore.delete("sessionToken");
    cookieStore.delete("sessionUser");
};

const HomeNavbar = async () => {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    return (
        <div className="bg-white shadow-sm px-6 py-3">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="logo bg-black px-6 py-1 text-center text-lg font-semibold text-white">RAG</div>
                    </div>

                    <div className="flex items-center gap-4">
                        {sessionToken?.value ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex p-1 px-3 items-center text-white rounded-full font-semibold text-sm select-none bg-foreground hover:bg-neutral-700 focus: outline-none">
                                    Hey, User
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="focus:bg-primary focus:text-white">
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-primary focus:text-white">
                                        Account Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-primary focus:text-white">
                                        Your Ratings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-primary focus:text-white">
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
                                <Button
                                    size="sm"
                                    variant={"ghost"}
                                    className="font-semibold"
                                    onClick={async () => {
                                        "use server";
                                        redirect("/login");
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    size="sm"
                                    className="rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus: outline-none"
                                >
                                    Register
                                </Button>
                            </>
                        )}

                        <Button className="rounded-full bg-white font-semibold text-black hover:bg-neutral-700 hover:text-white h-8">
                            Help
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeNavbar;
