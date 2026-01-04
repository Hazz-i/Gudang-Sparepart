import { EditIcon, MessageCircleIcon } from "lucide-react";


const ChatbotWidget = () => {
    return (
        <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-2">
            {/* FAB */}
            <button className="group flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 transition-transform hover:scale-110 active:scale-95">
                <span className="group-hover:hidden">
                    <MessageCircleIcon />
                </span>
                <span className="hidden group-hover:block">
                    <EditIcon />
                </span>
            </button>
        </div>
    );
};

export default ChatbotWidget;
