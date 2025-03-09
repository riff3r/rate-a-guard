import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { genericClient } from "@/lib/genericClient";
import Link from "next/link";
import { ApiResponse } from "@/lib/apiClient";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ILoginRequest {
    emailAddress: string;
    password: string;
}

interface ILoginResponse {
    authTokens: IAuthTokens;
    user: unknown;
    company: unknown;
    error?: string;
    details?: object;
}

const LoginModal: React.FC<IProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { control, reset, handleSubmit } = useForm<ILoginRequest>();
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const onSubmit = async (data: ILoginRequest) => {
        await toast.promise(
            genericClient<ILoginRequest, ILoginResponse>({
                url: "/api/users/login",
                method: "POST",
                data: data,
            }),
            {
                loading: "Processing...",
                success: (response: ApiResponse<ILoginResponse>) => {
                    if (response.data) {
                        reset();
                        onClose();
                        const epochTime = response.data.authTokens.access.expires;
                        
                        Cookies.set("sessionToken", JSON.stringify(response.data.authTokens), { expires: new Date(epochTime * 1000) });
                        Cookies.set("sessionUser", JSON.stringify(response.data.user), { expires: new Date(epochTime * 1000) });
                        Cookies.set("sessionUserCompany", JSON.stringify(response.data.company), { expires: new Date(epochTime * 1000) });
                        router.refresh();
                        return;
                    } else if (response.error) {
                        throw new Error(response.error as unknown as string);
                    }
                    throw new Error("Unexpected response format.");
                },
                error: (err: { message: string }) => err.message || "Something went wrong! Try again later.",
            }
        );
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
                    <h2 className="text-2xl font-bold mb-6">Login</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        name="emailAddress"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                placeholder="Email"
                                className="h-10 w-full border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                required
                            />
                        )}
                    />
                    <div className="relative">
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="h-10 w-full border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    required
                                />
                            )}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </button>
                    </div>

                    <Link href="/password/reset" className="text-sm text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>

                    <button type="submit" className="w-full py-2 bg-black text-white rounded-full hover:bg-gray-800">
                        Continue
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Don’t have an account?{" "}
                    <Link href="/register/company" className="text-blue-500 hover:underline">
                        Register Now
                    </Link>
                </p>
                <button onClick={onClose} className="mt-4 w-full text-center text-sm text-red-500 hover:underline">
                    Close
                </button>
            </motion.div>
        </div>
    );
};

export default LoginModal;
