import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { genericClient } from "@/lib/genericClient";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    userData: {
        companyName: string;
        firstName: string;
        lastName: string;
    };
}

interface IProfileUpdateRequest {
    companyName: string;
    firstName: string;
    lastName: string;
}

interface IProfileUpdateResponse {
    firstName: string;
    lastName: string;
}

const EditProfileModal: React.FC<IProps> = ({ isOpen, onClose, userData: { firstName, lastName, companyName } }) => {
    const router = useRouter();
    const { control, reset, handleSubmit } = useForm<IProfileUpdateRequest>({
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            companyName: companyName,
        },
    });

    if (!isOpen) return null;

    const onSubmit = async (data: IProfileUpdateRequest) => {
        const response = await genericClient<IProfileUpdateRequest, IProfileUpdateResponse>({
            url: "/api/users/profile",
            method: "PUT",
            data: data,
            requireAuth: true,
        });

        if (response.error) {
            toast.error(response.error);
            return;
        }

        if (response.data) {
            reset();
            onClose();
            router.refresh();
            return;
        }

        toast.error("Something went wrong! Try again later.");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
            >
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="First Name"
                                className="h-10 w-full border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                required
                            />
                        )}
                    />

                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Last Name"
                                className="h-10 w-full border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                required
                            />
                        )}
                    />
                    
                    <Controller
                        name="companyName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Company Name"
                                className="h-10 w-full border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                required
                            />
                        )}
                    />

                    <button type="submit" className="w-full py-2 bg-black text-white rounded-full hover:bg-gray-800">
                        Save
                    </button>
                </form>
                <button onClick={onClose} className="mt-4 w-full text-center text-sm text-red-500 hover:underline">
                    Close
                </button>
            </motion.div>
        </div>
    );
};

export default EditProfileModal;
