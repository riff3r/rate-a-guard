"use client";

import Footer from "@/components/dashboard/footer/Footer";
import RegistrationNavbar from "@/components/registration/navbar/Navbar";
import { BasicInput } from "@/components/ui/BasicInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface FormData {
    licenseNumber: string;
    licenseType: string;
    expirationDate: string;
    licenseStatus: string;
    secondaryStatus: string;
    city: string;
    state: string;
    county: string;
    zip: string;
    companyName: string;
    agentName: string;
    phoneNumber: string;
    email: string;
}

const Page = () => {
    const form = useForm({
        defaultValues: {
            licenseNumber: "",
            licenseType: "",
            expirationDate: "",
            licenseStatus: "",
            secondaryStatus: "",
            city: "",
            state: "",
            county: "",
            zip: "",
            companyName: "",
            agentName: "",
            phoneNumber: "",
            email: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <>
            <RegistrationNavbar />

            <div className="min-h-screen bg-gray-50 py-16 px-4 flex flex-col items-center">
                <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Company Registration</h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* License Information */}
                            <fieldset className="space-y-4">
                                <legend className="text-xl font-semibold text-gray-800">License Information</legend>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="licenseNumber"
                                        rules={{ required: "License Number is required" }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>License Number</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder="License Number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="licenseType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>License Type</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder="License Type" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="expirationDate"
                                        rules={{ required: "Expiration Date is required" }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Expiration Date</FormLabel>
                                                <FormControl>
                                                    <BasicInput
                                                        className="asdf"
                                                        placeholder="Expiration Date"
                                                        type="date"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="licenseStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>License Status</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder="License Status" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="secondaryStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Secondary Status</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder="Secondary Status" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </fieldset>

                            {/* Address Information */}
                            <fieldset className="space-y-4">
                                <legend className="text-xl font-semibold text-gray-800">Address Information</legend>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder="City" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder="State" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="county"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>County</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder="County" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="zip"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Zip</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder="Zip" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </fieldset>

                            {/* Registered Agent Information */}
                            <fieldset className="space-y-4">
                                <legend className="text-xl font-semibold text-gray-800">
                                    Registered Agent Information
                                </legend>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="companyName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Name</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder="Company Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="agentName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Registered Agent Name</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder="Registered Agent Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        rules={{
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Enter a valid 10-digit phone number",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mobile Phone Number</FormLabel>
                                                <FormControl>
                                                    <BasicInput
                                                        placeholder="Mobile Phone Number"
                                                        type="tel"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        rules={{
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                                message: "Enter a valid email address",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <BasicInput placeholder="Email Address" type="email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </fieldset>

                            <Button type="submit" className="w-full py-3">
                                Submit for Verification
                            </Button>
                        </form>
                    </Form>
                </div>

                <footer className="mt-8 text-center text-gray-600">
                    <p>Notes: Company details will be verified by the admin before activation.</p>
                </footer>
            </div>
            <Footer />
        </>
    );
};

export default Page;
