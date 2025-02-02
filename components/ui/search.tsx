"use client";

import React, { useState } from "react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Building2, ChevronDown, Pencil, User } from "lucide-react";
import { Input } from "./input";
import { Popover, PopoverContent } from "./popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";

const Search: React.FC = () => {
    const [isSearchingGuard, setIsSearchingGuard] = useState(true);
    const [isSearchingCompany, setIsSearchingCompany] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-white select-none hidden sm:flex focus: outline-none">
                    {isSearchingGuard ? <User size={20} /> : <Building2 size={20} />}{" "}
                    <div className="ml-1 mr-2">{isSearchingGuard ? "Guard" : "Company"}</div>
                    <ChevronDown size={20} strokeWidth={3} />
                </DropdownMenuTrigger>

                <DropdownMenuContent onClick={() => setIsSearchingGuard(!isSearchingGuard)}>
                    {isSearchingGuard ? (
                        <DropdownMenuItem>
                            <Building2 size={20} />
                            Company
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem>
                            <User size={20} />
                            Guard
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
                <PopoverTrigger>
                    <Input
                        type="text"
                        placeholder={isSearchingGuard ? "Guard Name" : "Company Name"}
                        className="w-[350px] hidden sm:block"
                    />
                </PopoverTrigger>
                <PopoverContent>Place content for the popover here.</PopoverContent>
            </Popover>

            {isSearchingGuard && (
                <>
                    <div className="text-white hidden sm:block">at</div>
                    {isSearchingCompany ? (
                        <Input
                            type="text"
                            placeholder="Company Name"
                            className="w-[250px]"
                            onMouseLeave={() => setIsSearchingCompany(false)}
                        />
                    ) : (
                        <div className="flex items-center gap-4  hidden sm:flex">
                            <div
                                className="underline-offset-3 cursor-pointer font-bold text-white underline"
                                onClick={() => setIsSearchingCompany(true)}
                            >
                                Guard Company
                            </div>
                            <Pencil
                                color="white"
                                size={18}
                                className="cursor-pointer"
                                onClick={() => setIsSearchingCompany(true)}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Search;
