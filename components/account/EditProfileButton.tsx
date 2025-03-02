"use client";

import { FC, useState } from "react";
import { Pencil } from "lucide-react";
import EditProfileModal from "./EditProfile";

interface IProps {
    userData: {
        companyName: string;
        firstName: string;
        lastName: string;
    };
}

const EditProfileButton: FC<IProps> = ({ userData }) => {
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);

    return (
        <>
            <div
                className="mb-6 mt-10 flex items-center justify-end gap-4"
                onClick={() => {
                    setShowEditProfileModal(true);
                }}
            >
                <Pencil size={18} strokeWidth={3} className="cursor-pointer" />
                <span className="cursor-pointer text-sm font-semibold">Edit</span>
            </div>
            <EditProfileModal
                userData={userData}
                isOpen={showEditProfileModal}
                onClose={() => setShowEditProfileModal(false)}
            />
        </>
    );
};

export default EditProfileButton;
