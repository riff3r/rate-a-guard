"use client";

import React, { useState } from "react";

interface IProps {
    defaultChecked?: string;
    onChange: (rating: string) => void;
}

const Rehireable: React.FC<IProps> = ({ defaultChecked = "", onChange }) => {
    const [selected, setSelected] = useState<string>(defaultChecked);

    const handleChange = (rating: string) => {
        setSelected(rating);
        onChange(rating);
    };

    return (
        <div className="flex justify-center gap-6">
            <div className="flex items-center">
                <input
                    id="rehireable-radio-yes"
                    type="radio"
                    value="1"
                    name="default-radio"
                    checked={selected === "yes"}
                    onChange={() => handleChange("yes")}
                    className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    htmlFor="rehireable-radio-yes"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Yes
                </label>
            </div>
            <div className="flex items-center">
                <input
                    id="rehireable-radio-no"
                    type="radio"
                    value="0"
                    name="default-radio"
                    checked={selected === "no"}
                    onChange={() => handleChange("no")}
                    className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    htmlFor="rehireable-radio-no"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    No
                </label>
            </div>
        </div>
    );
};

export default Rehireable;
