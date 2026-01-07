import axios from 'axios';
import { MessageCircleIcon, SendIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (inputMessage.trim() && !isLoading) {
            const userMsg: Message = {
                id: Date.now(),
                text: inputMessage,
                sender: 'user',
            };
            setMessages((prev) => [...prev, userMsg]);
            setInputMessage('');
            setIsLoading(true);

            try {
                const response = await axios.post('/chatbot/ask', {
                    question: inputMessage,
                });

                const botMsg: Message = {
                    id: Date.now() + 1,
                    text: response.data.answer,
                    sender: 'bot',
                };
                setMessages((prev) => [...prev, botMsg]);
            } catch (error) {
                const errorMsg: Message = {
                    id: Date.now() + 1,
                    text: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
                    sender: 'bot',
                };
                setMessages((prev) => [...prev, errorMsg]);
            } finally {
                setIsLoading(false);
            }
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
                <Card className="fixed right-7 bottom-24 z-50 flex h-[450px] w-96 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl shadow-xl">
                    <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
                        {/* Header */}
                        <div className="flex items-center gap-3 border-b bg-blue-600 px-4 py-3 text-white">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                                <MessageCircleIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">
                                    Asisten Gudang Sparepart
                                </h3>
                                <p className="text-xs text-blue-100">
                                    Tersedia 24 Jam
                                </p>
                            </div>
                        </div>

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
                                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                setInputMessage(
                                                    'Cara booking sparepart',
                                                );
                                                handleSend();
                                            }}
                                            className="rounded-full border bg-gray-50 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
                                        >
                                            Cara booking
                                        </button>
                                        <button
                                            onClick={() => {
                                                setInputMessage(
                                                    'Produk rem motor',
                                                );
                                                handleSend();
                                            }}
                                            className="rounded-full border bg-gray-50 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
                                        >
                                            Produk rem
                                        </button>
                                        <button
                                            onClick={() => {
                                                setInputMessage(
                                                    'Oli motor terbaik',
                                                );
                                                handleSend();
                                            }}
                                            className="rounded-full border bg-gray-50 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
                                        >
                                            Oli motor
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Messages List */
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                                                msg.sender === 'user'
                                                    ? 'rounded-br-sm bg-blue-600 text-white'
                                                    : 'rounded-bl-sm bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {msg.sender === 'bot' ? (
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ children }) => (
                                                            <p className="mb-2 last:mb-0">
                                                                {children}
                                                            </p>
                                                        ),
                                                        strong: ({
                                                            children,
                                                        }) => (
                                                            <strong className="font-semibold">
                                                                {children}
                                                            </strong>
                                                        ),
                                                        ul: ({ children }) => (
                                                            <ul className="mb-2 ml-4 list-disc last:mb-0">
                                                                {children}
                                                            </ul>
                                                        ),
                                                        ol: ({ children }) => (
                                                            <ol className="mb-2 ml-4 list-decimal last:mb-0">
                                                                {children}
                                                            </ol>
                                                        ),
                                                        li: ({ children }) => (
                                                            <li className="mb-1">
                                                                {children}
                                                            </li>
                                                        ),
                                                        a: ({
                                                            href,
                                                            children,
                                                        }) => (
                                                            <a
                                                                href={href}
                                                                className="text-blue-600 underline hover:text-blue-800"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {children}
                                                            </a>
                                                        ),
                                                        code: ({
                                                            children,
                                                        }) => (
                                                            <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-xs">
                                                                {children}
                                                            </code>
                                                        ),
                                                    }}
                                                >
                                                    {msg.text}
                                                </ReactMarkdown>
                                            ) : (
                                                msg.text
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 text-gray-600">
                                        <span className="inline-flex gap-1">
                                            <span className="h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></span>
                                            <span className="h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></span>
                                            <span className="h-1 w-1 animate-bounce rounded-full bg-gray-400"></span>
                                        </span>
                                    </div>
                                </div>
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
                                    e.key === 'Enter' &&
                                    !isLoading &&
                                    handleSend()
                                }
                                placeholder="Tulis pertanyaanmu..."
                                disabled={isLoading}
                                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none disabled:opacity-50"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !inputMessage.trim()}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
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
