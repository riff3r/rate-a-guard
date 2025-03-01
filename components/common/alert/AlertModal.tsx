import { motion } from "framer-motion";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const AlertModal: React.FC<IProps> = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg text-center"
            >
                <h2 className="text-xl font-bold mb-4">Alert</h2>
                <p className="text-gray-700 mb-6">{message}</p>
                <button onClick={onClose} className="w-full py-2 bg-black text-white rounded-full hover:bg-gray-800">
                    Close
                </button>
            </motion.div>
        </div>
    );
};

export default AlertModal;
