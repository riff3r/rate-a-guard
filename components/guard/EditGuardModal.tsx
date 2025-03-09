import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { genericClient } from "@/lib/genericClient";
import { BasicInput } from "../ui/basic-input";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    guardData: {
        id: number;
        firstName: string;
        lastName: string;
        emailAddress: string;
        phoneNumber: string;
        joiningDate: string;
        resignationDate?: string;
        licenseNumber: string;
        licenseType: string;
        licenseExpirationDate: string;
        address: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    };
}

const EditGuardModal: React.FC<IProps> = ({ isOpen, onClose, guardData, onSuccess }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: guardData,
    });

    if (!isOpen) return null;

    const onSubmit = async (data: typeof guardData) => {
        try {
            const response = await genericClient({
                url: `/api/guards/${guardData.id}`,
                method: "PUT",
                data: data,
                requireAuth: true,
            });

            if (response.error) {
                toast.error(response.error);
                return;
            }
            onSuccess();
            toast.success("Guard updated successfully!");
            reset();
            onClose();
        } catch (error) {
            toast.error("Failed to update guard!");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-6">Edit Guard</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <h3 className="text-lg font-semibold mb-2">Guard Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <BasicInput
                                    {...field}
                                    value={field.value ?? ""}
                                    type="text"
                                    placeholder="First Name"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <BasicInput
                                    {...field}
                                    value={field.value ?? ""}
                                    type="text"
                                    placeholder="Last Name"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="emailAddress"
                            control={control}
                            render={({ field }) => (
                                <BasicInput
                                    {...field}
                                    value={field.value ?? ""}
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <BasicInput
                                    {...field}
                                    value={field.value ?? ""}
                                    type="text"
                                    placeholder="Phone Number"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="joiningDate"
                            control={control}
                            render={({ field }) => (
                                <BasicInput {...field} value={field.value ?? ""} type="date" required />
                            )}
                        />
                        <Controller
                            name="resignationDate"
                            control={control}
                            render={({ field }) => <BasicInput {...field} value={field.value ?? ""} type="date" />}
                        />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">License Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Controller
                            name="licenseNumber"
                            control={control}
                            render={({ field }) => (
                                <BasicInput
                                    {...field}
                                    value={field.value ?? ""}
                                    type="text"
                                    placeholder="License Number"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="licenseType"
                            control={control}
                            render={({ field }) => (
                                <BasicInput
                                    {...field}
                                    value={field.value ?? ""}
                                    type="text"
                                    placeholder="License Type"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="licenseExpirationDate"
                            control={control}
                            render={({ field }) => (
                                <BasicInput {...field} value={field.value ?? ""} type="date" required />
                            )}
                        />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Address Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <BasicInput
                                    {...field}
                                    value={field.value ?? ""}
                                    type="text"
                                    placeholder="Address"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <BasicInput
                                    {...field}
                                    value={field.value ?? ""}
                                    type="text"
                                    placeholder="City"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="state"
                            control={control}
                            render={({ field }) => (
                                <BasicInput
                                    {...field}
                                    value={field.value ?? ""}
                                    type="text"
                                    placeholder="State"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <BasicInput
                                    {...field}
                                    value={field.value ?? ""}
                                    type="text"
                                    placeholder="Country"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="zip"
                            control={control}
                            render={({ field }) => (
                                <BasicInput
                                    {...field}
                                    value={field.value ?? ""}
                                    type="text"
                                    placeholder="Zip Code"
                                    required
                                />
                            )}
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-full py-2 bg-black text-white rounded-full hover:bg-gray-800"
                        >
                            Save
                        </button>
                        <button onClick={onClose} className="mt-4 w-full text-center text-sm text-red-500">
                            Close
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditGuardModal;
