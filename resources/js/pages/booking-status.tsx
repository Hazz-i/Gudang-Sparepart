import ChatbotWidget from '@/components/chatbot-widget';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head } from '@inertiajs/react';
import {
    ArrowRightIcon,
    BookmarkIcon,
    HashIcon,
    HelpCircleIcon,
} from 'lucide-react';
import { useState } from 'react';

export default function BookingStatus() {
    const [bookingCode, setBookingCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (bookingCode.trim()) {
            setIsLoading(true);
            // Handle check booking status
            console.log('Checking booking:', bookingCode);
            setTimeout(() => setIsLoading(false), 1000);
        }
    };

    return (
        <>
            <Head title="Cek Status Booking - SparePartBot" />

            <Navbar />

            <main className="relative flex flex-grow items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                {/* Background decorations */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-blue-500/5 blur-3xl"></div>
                    <div className="absolute top-[40%] -right-[10%] h-[40%] w-[40%] rounded-full bg-purple-500/5 blur-3xl"></div>
                </div>

                <div className="relative z-10 w-full max-w-lg">
                    <div className="flex flex-col gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 backdrop-blur-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
                        {/* Header */}
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-600/10">
                                <BookmarkIcon className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                                    Cek Status Booking
                                </h1>
                                <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
                                    Cek detail pesanan sparepart Anda secara
                                    instan.
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <form
                            className="flex flex-col gap-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <Label
                                    htmlFor="booking-code"
                                    className="mb-2 block text-sm leading-6 font-bold text-slate-900 dark:text-slate-200"
                                >
                                    Kode Booking
                                </Label>
                                <div className="relative rounded-xl shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <HashIcon className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        id="booking-code"
                                        name="booking-code"
                                        type="text"
                                        required
                                        placeholder="contoh: SPB-8821-XYZ"
                                        value={bookingCode}
                                        onChange={(e) =>
                                            setBookingCode(e.target.value)
                                        }
                                        className="block w-full rounded-xl border-0 py-4 pl-12 text-sm font-medium text-slate-900 ring-1 ring-slate-200 transition-shadow ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-base dark:bg-slate-800 dark:text-white dark:ring-slate-700"
                                    />
                                </div>
                                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                                    Contoh:{' '}
                                    <span className="rounded bg-slate-100 px-1 py-0.5 font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                        SPB-XXXX-XXXX
                                    </span>
                                </p>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/20 active:scale-[0.98]"
                            >
                                <span>
                                    {isLoading ? 'Mengecek...' : 'Cek Status'}
                                </span>
                                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </form>

                        {/* Help box */}
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                            <div className="flex gap-3">
                                <HelpCircleIcon className="h-5 w-5 shrink-0 text-slate-400" />
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                    <p className="mb-1 font-semibold text-slate-900 dark:text-slate-200">
                                        Dimana kode booking saya?
                                    </p>
                                    <p>
                                        Kode booking dikirimkan oleh chatbot
                                        saat Anda mengkonfirmasi pesanan. Cek
                                        riwayat chat Anda.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <ChatbotWidget />
        </>
    );
}
