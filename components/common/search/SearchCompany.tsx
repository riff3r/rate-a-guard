"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { genericClient } from "@/lib/genericClient";
import toast from "react-hot-toast";
import Link from "next/link";

type ISearchCompanyRequest = {
    text: string;
};

type ISearchCompanyResponse = Array<ICompany>;

interface IProps {
    redirect?: boolean;
    onSelectCompany?: (company: ICompany) => void;
}

const SearchCompany: React.FC<IProps> = ({ redirect = false, onSelectCompany }) => {
    const router = useRouter();
    const [text, setText] = useState<string>("");
    const [suggestions, setSuggestions] = useState<ICompany[]>([]);

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);

        if (value) {
            const response = await genericClient<ISearchCompanyRequest, ISearchCompanyResponse>({
                url: "/api/search/companies",
                method: "GET",
                params: { text: value },
            });

            if (response.error) {
                toast.error(response.error);
                return;
            }

            if (response.data) {
                setSuggestions(response.data);
                return;
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: ICompany) => {
        setText("");
        if (redirect) {
            router.push(`/company/${suggestion.id}`);
        } else if (onSelectCompany) {
            onSelectCompany(suggestion);
        }
        setSuggestions([]);
    };

    return (
        <div className="relative w-full max-w-[460px]">
            <Input
                type="text"
                value={text}
                onChange={handleInputChange}
                placeholder="Company name, License Number, State..."
            />
            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-1 overflow-hidden z-10">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-start"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleSuggestionClick(suggestion);
                            }}
                        >
                            <div>
                                <div className="text-lg font-semibold text-gray-800">{suggestion.companyName}</div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <span>{suggestion.licenseNumber}</span>
                                    <span className="mx-1">•</span>
                                    <span className="font-medium">{suggestion.state}</span>
                                    <Link
                                        className="underline font-semibold"
                                        onClick={(event) => event.stopPropagation()}
                                        href={`/company/${suggestion.id}`}
                                    >
                                        Go to company&apos;s page
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchCompany;
