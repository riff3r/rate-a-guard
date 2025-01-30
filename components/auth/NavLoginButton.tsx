"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import LoginModal from "./LoginModal";

const NavbarLoginButton = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <>
            <Button
                size="sm"
                variant={"ghost"}
                className="font-semibold"
                onClick={() => { setShowLoginModal(true) }}
            >
                Login
            </Button>

            <LoginModal 
                isOpen={showLoginModal} 
                onClose={() => setShowLoginModal(false)}
            />
        </>
    );
};

export default NavbarLoginButton;
