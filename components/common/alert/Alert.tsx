"use client";

import { useState } from "react";
import AlertModal from "./AlertModal";
import { useSearchParams } from "next/navigation";

const Alert = () => {
    const searchParams = useSearchParams();
    const actionFromQuery = searchParams.get("action") || "";
    const messageFromQuery = searchParams.get("message") || "";
    const [showAlertModal, setShowAlertModal] = useState(actionFromQuery === "alert");
    
    return <AlertModal message={messageFromQuery} isOpen={showAlertModal} onClose={() => setShowAlertModal(false)} />;
};

export default Alert;
