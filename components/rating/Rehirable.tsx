"use client";

import React, { useState } from "react";

interface IProps {
    defaultChecked?: string;
    onChange?: (rating: string) => void;
}

const Rehirable: React.FC<IProps> = ({ defaultChecked = "", onChange }) => {
    const [selected, setSelected] = useState<string>(defaultChecked);

    const handleChange = (rating: string) => {
        setSelected(rating);
        if (onChange) {
            onChange(rating);
        }
    };

    return (
        <div className="flex justify-center gap-6">
            <div className="flex items-center">
                <input
                    id="rehirable-radio-yes"
                    type="radio"
                    value="1"
                    checked={selected === "yes"}
                    onChange={() => handleChange("yes")}
                    className="w-8 h-8 text-blue-600 accent-black bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    htmlFor="rehirable-radio-yes"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Yes
                </label>
            </div>
            <div className="flex items-center">
                <input
                    id="rehirable-radio-no"
                    type="radio"
                    value="0"
                    checked={selected === "no"}
                    onChange={() => handleChange("no")}
                    className="w-8 h-8 text-blue-600 accent-black bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    htmlFor="rehirable-radio-no"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    No
                </label>
            </div>
        </div>
    );
};

export default Rehirable;
