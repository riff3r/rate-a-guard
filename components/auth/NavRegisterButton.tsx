"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const NavRegisterButton = () => {
    const router = useRouter();

    return (
        <Button
            size="sm"
            className="rounded-full font-semibold bg-foreground hover:bg-neutral-700 focus:outline-none"
            onClick={() => {
                router.push("/register/company");
            }}
        >
            Register
        </Button>
    );
};

export default NavRegisterButton;
