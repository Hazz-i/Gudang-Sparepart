import ChatbotWidget from '@/components/chatbot-widget';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    ArrowRightIcon,
    CheckCircle2Icon,
    ClockIcon,
    MailIcon,
    PackageCheckIcon,
    SearchIcon,
} from 'lucide-react';
import { useState } from 'react';

const statusInfo = [
    {
        status: 'PENDING',
        label: 'Menunggu Pembayaran',
        color: 'bg-yellow-400',
        icon: ClockIcon,
    },
    {
        status: 'CONFIRMED',
        label: 'Siap Diambil',
        color: 'bg-green-400',
        icon: CheckCircle2Icon,
    },
    {
        status: 'COMPLETED',
        label: 'Pesanan Selesai',
        color: 'bg-blue-400',
        icon: PackageCheckIcon,
    },
];

export default function BookingStatus() {
    const { auth } = usePage<SharedData>().props;
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
            <Head title="Cek Status Booking - Gudang Sparepart" />

            <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
                <Navbar auth={auth} />

                <main className="flex flex-1 items-center justify-center px-4 py-16">
                    <div className="w-full max-w-5xl">
                        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
                            {/* Left - Form Section */}
                            <div className="lg:col-span-3">
                                <Card className="border-0">
                                    <CardContent className="p-8 sm:p-10">
                                        {/* Header */}
                                        <div className="mb-8 flex flex-col gap-4">
                                            <div>
                                                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                                                    Cek Status Booking
                                                </h1>
                                                <p className="mt-2 text-slate-500 dark:text-slate-400">
                                                    Masukkan kode booking untuk
                                                    melihat status pesanan
                                                    sparepart Anda.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Form */}
                                        <form
                                            className="flex flex-col gap-5"
                                            onSubmit={handleSubmit}
                                        >
                                            <div>
                                                <Label
                                                    htmlFor="booking-code"
                                                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                                                >
                                                    Nomor Booking
                                                </Label>
                                                <Input
                                                    id="booking-code"
                                                    name="booking-code"
                                                    type="text"
                                                    required
                                                    placeholder="SPB-XXXX-XXXX"
                                                    value={bookingCode}
                                                    onChange={(e) =>
                                                        setBookingCode(
                                                            e.target.value.toUpperCase(),
                                                        )
                                                    }
                                                    className="h-14 rounded-xl border-slate-200 bg-slate-50 px-4 text-center font-mono text-lg font-semibold tracking-wider uppercase transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800"
                                                />
                                                <p className="mt-2 text-center text-xs text-slate-500">
                                                    Format: SPB-XXXX-XXXX
                                                </p>
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={
                                                    isLoading ||
                                                    !bookingCode.trim()
                                                }
                                                className="h-12 rounded-xl bg-blue-600 text-base font-semibold transition-all hover:bg-blue-700 hover:shadow-blue-600/30 disabled:opacity-50"
                                            >
                                                {isLoading ? (
                                                    <span className="flex items-center gap-2">
                                                        <span className="inline-flex gap-1">
                                                            <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></span>
                                                            <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></span>
                                                            <span className="h-2 w-2 animate-bounce rounded-full bg-white"></span>
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-2">
                                                        Cek Status
                                                        <ArrowRightIcon className="h-5 w-5" />
                                                    </span>
                                                )}
                                            </Button>
                                        </form>

                                        {/* Help Info */}
                                        <div className="mt-8 flex items-start gap-3 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30">
                                            <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                            <div className="text-sm">
                                                <p className="font-semibold text-blue-900 dark:text-blue-300">
                                                    Belum punya kode booking?
                                                </p>
                                                <p className="mt-1 text-blue-700 dark:text-blue-400">
                                                    Kode booking dikirim ke
                                                    email Anda setelah
                                                    pembayaran dikonfirmasi. Cek
                                                    folder inbox atau spam.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right - Status Info */}
                            <div className="lg:col-span-2">
                                <div className="sticky top-24 flex flex-col gap-6">
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                            Status Booking
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            Berikut adalah status yang mungkin
                                            muncul pada pesanan Anda.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {statusInfo.map((item) => (
                                            <Card
                                                key={item.status}
                                                className="border-slate-100 transition-shadow hover:shadow-md dark:border-slate-800"
                                            >
                                                <CardContent className="flex items-center gap-4 p-4">
                                                    <div
                                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${item.color}/20`}
                                                    >
                                                        <item.icon
                                                            className={`h-5 w-5 ${item.color === 'bg-yellow-400' ? 'text-yellow-600' : item.color === 'bg-green-400' ? 'text-green-600' : 'text-blue-600'}`}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-bold text-slate-900 dark:text-white">
                                                            {item.status}
                                                        </p>
                                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                                            {item.label}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={`h-3 w-3 rounded-full ${item.color}`}
                                                    ></div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>

                                    {/* Additional Info */}
                                    <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
                                        <CardContent className="p-4">
                                            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                                                Batas Pengambilan
                                            </p>
                                            <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                                                Sparepart harus diambil dalam
                                                waktu 7 hari setelah status
                                                CONFIRMED. Lewat dari itu,
                                                pesanan otomatis dibatalkan.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
                <ChatbotWidget />
            </div>
        </>
    );
}
