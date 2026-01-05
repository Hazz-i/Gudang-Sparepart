import { MessageCircleIcon, SendIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'bot';
};

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBotResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();
        if (
            lowerMessage.includes('hai') ||
            lowerMessage.includes('halo') ||
            lowerMessage.includes('hi')
        ) {
            return 'Hai! Selamat datang di Gudang Sparepart. Ada yang bisa kami bantu?\n\nKami menyediakan berbagai sparepart berkualitas untuk kebutuhan kendaraan dan mesin Anda.\n\nJika ada yang ingin ditanyakan atau butuh rekomendasi sparepart, jangan ragu beritahu kami, ya!\n\n🔧';
        }
        return 'Terima kasih atas pertanyaannya! Ada yang bisa saya bantu lagi?';
    };

    const handleSend = () => {
        if (inputMessage.trim()) {
            const userMsg: Message = {
                id: Date.now(),
                text: inputMessage,
                sender: 'user',
            };
            setMessages((prev) => [...prev, userMsg]);

            // Simulate bot response
            setTimeout(() => {
                const botMsg: Message = {
                    id: Date.now() + 1,
                    text: getBotResponse(inputMessage),
                    sender: 'bot',
                };
                setMessages((prev) => [...prev, botMsg]);
            }, 500);

            setInputMessage('');
        }
    };

    return (
        <>
            <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-2">
                {/* FAB */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 transition-transform hover:scale-110 hover:cursor-pointer active:scale-95"
                >
                    {isOpen ? <XIcon /> : <MessageCircleIcon />}
                </button>
            </div>

            {isOpen && (
                <Card className="fixed right-7 bottom-24 z-50 flex h-[400px] w-80 max-w-full flex-col overflow-hidden rounded-2xl border shadow-xl">
                    <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
                        {/* Chat Messages */}
                        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
                            {messages.length === 0 ? (
                                /* Initial Greeting */
                                <div className="flex flex-col items-center py-4">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200">
                                        <MessageCircleIcon className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <p className="text-center text-sm text-gray-600">
                                        Hai, aku asisten chatbot Gudang
                                        Sparepart. Tanya seputar sparepart dan
                                        layanan kami di sini 🔧
                                    </p>
                                </div>
                            ) : (
                                /* Messages List */
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                                                msg.sender === 'user'
                                                    ? 'rounded-br-sm bg-blue-600 text-white'
                                                    : 'rounded-bl-sm bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Section */}
                        <div className="flex items-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) =>
                                    setInputMessage(e.target.value)
                                }
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && handleSend()
                                }
                                placeholder="Tulis pertanyaanmu"
                                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                            />
                            <button
                                onClick={handleSend}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
                            >
                                <SendIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default ChatbotWidget;
