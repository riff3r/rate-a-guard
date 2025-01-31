"use client";

import { BasicInput } from "@/components/ui/basic-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import StarRating from "@/components/rating/StarRating"; // Import for rating

interface FormData {
    name: string;
    licenseType: string;
    expirationDate: string;
    primaryStatus: string;
    addressOfRecord: string;
    city: string;
    state: string;
    zip: string;
    attendance: number;
    professionalism: number;
    productivity: number;
    customerService: number;
    communication: number;
    rehirable: string;
    review: string;
}

const Page = () => {
    const form = useForm<FormData>({
        defaultValues: {
            name: "",
            licenseType: "",
            expirationDate: "",
            primaryStatus: "",
            addressOfRecord: "",
            city: "",
            state: "",
            zip: "",
            attendance: 0,
            professionalism: 0,
            productivity: 0,
            customerService: 0,
            communication: 0,
            rehirable: "",
            review: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Guard Licensing Details</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Guard Licensing Details */}
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-gray-800">Guard Licensing Details</legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { name: "name", label: "Name" },
                                    { name: "licenseType", label: "License Type" },
                                    { name: "expirationDate", label: "Expiration Date", type: "date" },
                                    { name: "primaryStatus", label: "Primary Status" },
                                ].map(({ name, label, type }) => (
                                    <FormField
                                        key={name}
                                        control={form.control}
                                        name={name as keyof FormData}
                                        rules={{ required: `${label} is required.` }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{label}</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder={label} type={type || "text"} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        {/* Address */}
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-gray-800">Address</legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { name: "addressOfRecord", label: "Address of Record" },
                                    { name: "city", label: "City" },
                                    { name: "state", label: "State" },
                                    { name: "zip", label: "Zip" },
                                ].map(({ name, label }) => (
                                    <FormField
                                        key={name}
                                        control={form.control}
                                        name={name as keyof FormData}
                                        rules={{ required: `${label} is required.` }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{label}</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder={label} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        {/* Rating Categories */}
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-gray-800">
                                Rating Categories (5-star system)
                            </legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { name: "attendance", label: "Attendance/Punctuality" },
                                    { name: "professionalism", label: "Professionalism" },
                                    { name: "productivity", label: "Productivity" },
                                    { name: "customerService", label: "Customer Service" },
                                    { name: "communication", label: "Communication" },
                                ].map(({ name, label }) => (
                                    <FormField
                                        key={name}
                                        control={form.control}
                                        name={name as keyof FormData}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{label}</FormLabel>
                                                <FormControl>
                                                    <StarRating
                                                        value={field.value}
                                                        onChange={(value) => field.onChange(value)}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </fieldset>

                        {/* Re-hirable */}
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-gray-800">Re-hirable</legend>
                            <FormField
                                control={form.control}
                                name="rehirable"
                                rules={{ required: "Re-hirable is required." }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Re-hirable</FormLabel>
                                        <FormControl>
                                            <select className="w-full p-2 border rounded-lg" {...field}>
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </fieldset>

                        {/* Review */}
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-semibold text-gray-800">Review</legend>
                            <FormField
                                control={form.control}
                                name="review"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comments</FormLabel>
                                        <FormControl>
                                            <textarea
                                                className="w-full p-2 border rounded-lg"
                                                placeholder="Enter your comments"
                                                rows={4}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </fieldset>

                        <Button type="submit" className="w-full py-3">
                            Submit for Review
                        </Button>
                    </form>
                </Form>
            </div>

            <footer className="mt-8 text-center text-gray-600">
                <p>Notes: This information will be reviewed by the admin.</p>
            </footer>
        </div>
    );
};

export default Page;
