"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Building2, ChevronDown, Pencil, User, X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { genericClient } from "@/lib/genericClient";

type ISearchAgencyRequest = {
    text: string;
};

type ISearchAgencyResponse = Array<IAgency>;

type ISearchGuardRequest = {
    text: string;
};

type ISearchGuardResponse = Array<IGuard>;

interface IProps {
    textColorDark: boolean;
}

const SearchCombine: React.FC<IProps> = ({ textColorDark = false }) => {
    const router = useRouter();
    const [companyText, setCompanyText] = useState<string>("");
    const [guardText, setGuardText] = useState<string>("");
    const [isSearchingCompany, setIsSearchingCompany] = useState(false);
    const [companySuggestions, setCompanySuggestions] = useState<IAgency[]>([]);
    const [guardSuggestions, setGuardSuggestions] = useState<IGuard[]>([]);
    const [isSearchingGuard, setIsSearchingGuard] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState<IAgency | null>(null);

    useEffect(() => {
        const selectedAgency = Cookies.get("selectedAgency");
        const sessionUserAgency = Cookies.get("sessionUserAgency");
    
        if (selectedAgency) {
            setSelectedCompany(JSON.parse(selectedAgency));
        } else if (sessionUserAgency) {
            setSelectedCompany(JSON.parse(sessionUserAgency));
        }else{
            setIsSearchingGuard(false);
        }
    }, []);
    
    const handleCompanyInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCompanyText(value);

        if (value) {
            const response = await genericClient<ISearchAgencyRequest, ISearchAgencyResponse>({
                url: "/api/search/agencies",
                method: "GET",
                params: { text: value },
            });

            if (response.error) {
                toast.error(response.error);
                return;
            }

            if (response.data) {
                setCompanySuggestions(response.data);
                return;
            }
        } else {
            setCompanySuggestions([]);
        }
    };

    const handleCompanySuggestionClick = (suggestion: IAgency) => {
        setCompanyText("");
        router.push(`/company/${suggestion.id}`);
        setCompanySuggestions([]);
    };

    const handleGuardInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setGuardText(value);

        if (value) {
            const response = await genericClient<ISearchGuardRequest, ISearchGuardResponse>({
                url: `/api/search/${selectedCompany?.id}/employees`,
                method: "GET",
                params: { text: value },
            });

            if (response.error) {
                toast.error(response.error);
                return;
            }

            if (response.data) {
                setGuardSuggestions(response.data);
                return;
            }
        } else {
            setGuardSuggestions([]);
        }
    };

    const handleGuardSuggestionClick = (suggestion: IGuard) => {
        setGuardText("");
        router.push(`/guard/${suggestion.id}`);
        setGuardSuggestions([]);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-white select-none hidden sm:flex focus: outline-none">
                    {isSearchingGuard ? <User className={`cursor-pointer ${textColorDark ? "stroke-gray-600" : "stroke-white"}`} size={20} /> : <Building2 className={`cursor-pointer ${textColorDark ? "stroke-gray-600" : "stroke-white"}`} size={20} />}{" "}
                    <div className={`ml-1 mr-2 ${textColorDark ? "text-gray-600" : "text-white"}`}>{isSearchingGuard ? "Guard" : "Company"}</div>
                    <ChevronDown className={`cursor-pointer ${textColorDark ? "stroke-gray-600" : "stroke-white"}`} size={20} strokeWidth={3} />
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

            {isSearchingGuard ? (
                <div className="relative w-full flex items-center gap-2 mx-auto">
                    <Input
                        type="text"
                        className="max-w-[450px]"
                        value={guardText}
                        onChange={handleGuardInputChange}
                        placeholder="Guard name, License Number, State..."
                    />
                    <div className="text-white hidden sm:block">at</div>
                    {guardSuggestions.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-1 max-w-[450px] overflow-hidden z-10">
                            {guardSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-start"
                                    onClick={() => handleGuardSuggestionClick(suggestion)}
                                >
                                    <div>
                                        <div className="text-lg font-semibold text-gray-800">
                                            {suggestion.firstName} {suggestion.lastName}
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <span>{suggestion.licenseNumber}</span>
                                            <span className="mx-1">•</span>
                                            <span className="font-medium">{suggestion.state}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {isSearchingCompany ? (
                        <div className="relative w-full mx-auto">
                            <Input
                                type="text"
                                className="max-w-[450px]"
                                value={companyText}
                                onChange={handleCompanyInputChange}
                                placeholder="Company name, License Number, State..."
                            />
                            <X
                                color="black"
                                size={18}
                                className="cursor-pointer absolute top-[11px] right-[10px] z-index-[999]"
                                onClick={() => {setIsSearchingCompany(false);}}
                            />
                            {companySuggestions.length > 0 && (
                                <ul className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-1 max-w-[450px] overflow-hidden z-10">
                                    {companySuggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-start"
                                            onClick={() => {
                                                Cookies.set("selectedAgency", JSON.stringify(suggestion));
                                                setSelectedCompany(suggestion);
                                                setIsSearchingCompany(false);
                                                setCompanyText("");
                                                setCompanySuggestions([]);
                                            }}
                                        >
                                            <div>
                                                <div className="text-lg font-semibold text-gray-800">
                                                    {suggestion.companyName}
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <span>{suggestion.licenseNumber}</span>
                                                    <span className="mx-1">•</span>
                                                    <span className="font-medium">{suggestion.state}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-4  hidden sm:flex">
                            <div
                                className={`underline-offset-3 cursor-pointer font-bold ${textColorDark ? "text-gray-600" : "text-white"} underline`}
                                onClick={() => setIsSearchingCompany(true)}
                            >
                                {selectedCompany?.companyName}
                            </div>
                            <Pencil
                                size={18}
                                className={`cursor-pointer ${textColorDark ? "stroke-gray-600" : "stroke-white"}`}
                                onClick={() => {setIsSearchingCompany(true); Cookies.remove("selectedAgency");}}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="relative w-full mx-auto max-w-[450px]">
                    <Input
                        type="text"
                        className="max-w-[450px]"
                        value={companyText}
                        onChange={handleCompanyInputChange}
                        placeholder="Company name, License Number, State..."
                    />
                    {companySuggestions.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-1 max-w-[450px] overflow-hidden z-10">
                            {companySuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-start"
                                    onClick={() => handleCompanySuggestionClick(suggestion)}
                                >
                                    <div>
                                        <div className="text-lg font-semibold text-gray-800">
                                            {suggestion.companyName}
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <span>{suggestion.licenseNumber}</span>
                                            <span className="mx-1">•</span>
                                            <span className="font-medium">{suggestion.state}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchCombine;
