"use client";

import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { Building2, ChevronDown, Pencil, User } from "lucide-react";
import SearchGuard from "../search/SearchGuard";
import SearchCompany from "../search/SearchCompany";

const NavbarSearchSection = () => {
    const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
    const [findByCompany, setFindByCompany] = useState<boolean>(true);
    const [findCompany, setFindCompany] = useState<boolean>(true);

    useEffect(() => {
        const cookieSelectedCompany = Cookies.get("selectedCompany");

        if (cookieSelectedCompany) {
            const parsedCookieSelectedCompany = JSON.parse(cookieSelectedCompany);
            setFindCompany(false);
            setSelectedCompany(parsedCookieSelectedCompany);
        }
    }, []);

    const handleSelectCompany = (company: ICompany) => {
        setSelectedCompany(company);
        setFindCompany(false);
        Cookies.set("selectedCompany", JSON.stringify(company));
    };

    return (
        <div className="w-full">
            <div className="w-full flex items-center mx-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center text-white mr-2 select-none sm:flex focus: outline-none">
                        {findByCompany ? (
                            <Building2 className="cursor-pointer stroke-white" size={20} />
                        ) : (
                            <User className="cursor-pointer stroke-white" size={20} />
                        )}
                        <div className="ml-1 mr-2 text-white">{findByCompany ? "Company" : "Guard"}</div>
                        <ChevronDown className="cursor-pointer stroke-white" size={20} strokeWidth={3} />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent onClick={() => setFindByCompany((prevState) => !prevState)}>
                        {findByCompany ? (
                            <DropdownMenuItem>
                                <User size={20} />
                                Guard
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem>
                                <Building2 size={20} />
                                Company
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="w-full">
                    {findByCompany ? (
                        <div className="flex gap-2">
                            <SearchGuard selectedCompany={selectedCompany} />
                            {selectedCompany && !findCompany ? (
                                <div className="flex items-center gap-4 sm:flex">
                                    <div className="text-white">at</div>
                                    <div
                                        className="underline-offset-3 cursor-pointer font-bold text-white underline"
                                        onClick={() => {
                                            setFindCompany(true);
                                        }}
                                    >
                                        {selectedCompany?.companyName}
                                    </div>
                                    <Pencil
                                        size={18}
                                        className="cursor-pointer stroke-white"
                                        onClick={() => {
                                            setFindCompany(true);
                                        }}
                                    />
                                </div>
                            ) : (
                                <SearchCompany onSelectCompany={handleSelectCompany} />
                            )}
                        </div>
                    ) : (
                        <SearchGuard />
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavbarSearchSection;
