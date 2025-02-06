"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import SearchCompany from "../common/search/SearchCompany";
import SearchGuard from "../common/search/SearchGuard";

const HeroWithSearchSection = () => {
    const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
    const [find, setFind] = useState<string>("company");

    useEffect(() => {
        const cookieSelectedCompany = Cookies.get("selectedCompany");

        if (cookieSelectedCompany) {
            const parsedCookieSelectedCompany = JSON.parse(cookieSelectedCompany);

            setSelectedCompany(parsedCookieSelectedCompany);
        }
    }, []);

    const handleSelectCompany = (company: ICompany) => {
        setSelectedCompany(company);
        Cookies.set("selectedCompany", JSON.stringify(company));
    };

    return (
        <div className="w-full flex flex-col items-center">
            {find === "company" ? (
                <>
                    {selectedCompany ? (
                        <div className="text-2xl text-gray-800 mb-6">
                            Find a <span className="font-semibold">guard</span> at{" "}
                            <Link className="underline font-semibold" href={`/company/${selectedCompany?.id}`}>
                                {selectedCompany?.companyName}
                            </Link>
                        </div>
                    ) : (
                        <div className="text-2xl text-gray-800 mb-6">
                            Enter a <span className="font-semibold">company</span> to get started
                        </div>
                    )}

                    {selectedCompany ? (
                        <SearchGuard selectedCompany={selectedCompany} />
                    ) : (
                        <SearchCompany onSelectCompany={handleSelectCompany} />
                    )}

                    {selectedCompany ? (
                        <div
                            className="font-semibold mt-3 cursor-pointer"
                            onClick={() => {
                                setSelectedCompany(null);
                                Cookies.remove("selectedCompany");
                            }}
                        >
                            I want to find a guard at a different company
                        </div>
                    ) : (
                        <div
                            className="font-semibold mt-3 cursor-pointer"
                            onClick={() => {
                                setFind("guard");
                            }}
                        >
                            I want to find a guard by license
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className="text-2xl text-gray-800 mb-6">
                        Find a <span className="font-semibold">guard</span>
                    </div>

                    <SearchGuard />

                    <div
                        className="font-semibold mt-3 cursor-pointer"
                        onClick={() => {
                            setFind("company");
                        }}
                    >
                        I want to find a guard at a company
                    </div>
                </>
            )}
        </div>
    );
};

export default HeroWithSearchSection;
