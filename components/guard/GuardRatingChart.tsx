interface IProps {
    starCounts: { [star: number]: number };
}

const GuardRatingChart: React.FC<IProps> = ({ starCounts }) => {
    return (
        <div className="w-full max-w-lg mx-auto mt-10 p-5 pb-8 bg-gray-200">
            <h2 className="text-lg font-semibold mb-4">Rating Distribution</h2>
            <div className="space-y-4">
                <div className="flex items-center">
                    <div className="flex items-center mr-3">
                        {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                className={`w-5 h-5 ms-1 ${index < 5 ? "text-gray-500" : "text-gray-300 dark:text-gray-500"}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                    </div>
                    <div className="w-72 flex-1 h-4 bg-gray-300 rounded-md relative">
                        <div
                            className="absolute top-0 left-0 h-4 bg-gray-600 rounded-md"
                            style={{ width: "75%" }}
                        ></div>
                    </div>
                    <span className="w-10 text-right text-sm font-bold">{starCounts[5]}</span>
                </div>

                <div className="flex items-center">
                    <div className="flex items-center mr-3">
                        {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                className={`w-5 h-5 ms-1 ${index < 4 ? "text-gray-500" : "text-gray-300 dark:text-gray-500"}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                    </div>
                    <div className="w-72 flex-1 h-4 bg-gray-300 rounded-md relative">
                        <div
                            className="absolute top-0 left-0 h-4 bg-gray-600 rounded-md"
                            style={{ width: "75%" }}
                        ></div>
                    </div>
                    <span className="w-10 text-right text-sm font-bold">{starCounts[4]}</span>
                </div>

                <div className="flex items-center">
                    <div className="flex items-center mr-3">
                        {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                className={`w-5 h-5 ms-1 ${index < 3 ? "text-gray-500" : "text-gray-300 dark:text-gray-500"}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                    </div>
                    <div className="w-72 flex-1 h-4 bg-gray-300 rounded-md relative">
                        <div
                            className="absolute top-0 left-0 h-4 bg-gray-600 rounded-md"
                            style={{ width: "75%" }}
                        ></div>
                    </div>
                    <span className="w-10 text-right text-sm font-bold">{starCounts[3]}</span>
                </div>

                <div className="flex items-center">
                    <div className="flex items-center mr-3">
                        {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                className={`w-5 h-5 ms-1 ${index < 2 ? "text-gray-500" : "text-gray-300 dark:text-gray-500"}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                    </div>
                    <div className="w-72 flex-1 h-4 bg-gray-300 rounded-md relative">
                        <div
                            className="absolute top-0 left-0 h-4 bg-gray-600 rounded-md"
                            style={{ width: "75%" }}
                        ></div>
                    </div>
                    <span className="w-10 text-right text-sm font-bold">{starCounts[2]}</span>
                </div>

                <div className="flex items-center">
                    <div className="flex items-center mr-3">
                        {Array.from({ length: 5 }, (_, index) => (
                            <svg
                                key={index}
                                className={`w-5 h-5 ms-1 ${index < 1 ? "text-gray-500" : "text-gray-300 dark:text-gray-500"}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                    </div>
                    <div className="w-72 flex-1 h-4 bg-gray-300 rounded-md relative">
                        <div
                            className="absolute top-0 left-0 h-4 bg-gray-600 rounded-md"
                            style={{ width: "75%" }}
                        ></div>
                    </div>
                    <span className="w-10 text-right text-sm font-bold">{starCounts[1]}</span>
                </div>
            </div>
        </div>
    );
};

export default GuardRatingChart;
