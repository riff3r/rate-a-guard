"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import LoginModal from "./LoginModal";
import { useSearchParams } from "next/navigation";

const NavbarLoginButton = () => {
    const searchParams = useSearchParams();
    const actionFromQuery = searchParams.get("action") || "";
    const [showLoginModal, setShowLoginModal] = useState(actionFromQuery === "login");

    return (
        <>
            <Button
                size="sm"
                variant={"ghost"}
                className="font-semibold bg-white"
                onClick={() => {
                    setShowLoginModal(true);
                }}
            >
                Login
            </Button>

            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </>
    );
};

export default NavbarLoginButton;
