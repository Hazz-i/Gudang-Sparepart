import ChatbotWidget from '@/components/chatbot-widget';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPrice, formatDate, StatusBadge } from '@/helper/functions';
import { type SharedData, type Order } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
    ArrowRightIcon,
    CheckCircle2Icon,
    ClockIcon,
    Loader2,
    Loader2Icon,
    MailIcon,
    PackageCheckIcon,
    XCircle,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const statusInfo = [
    {
        status: 'Menunggu',
        label: 'Menunggu Konfirmasi Dari Admin',
        color: 'bg-yellow-400',
        icon: ClockIcon,
    },
    {
        status: 'Dikonfirmasi',
        label: 'Barang Sudah Bisa Diambil',
        color: 'bg-blue-400',
        icon: CheckCircle2Icon,
    },
    {
        status: 'Selesai',
        label: 'Barang Sudah Selesai Diambil',
        color: 'bg-green-400',
        icon: PackageCheckIcon,
    },
    {
        status: 'Dibatalkan',
        label: 'Proses Booking Dibatalkan Oleh Admin',
        color: 'bg-red-400',
        icon: XCircle,
    },
];

interface BookingStatusProps {
    order?: Order;
}

export default function BookingStatus({ order }: BookingStatusProps) {
    const { auth } = usePage<SharedData>().props;

    const form = useForm({
        booking_code: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.data.booking_code.trim()) {
            form.post('/booking-status', {
                onError: (errors) => {
                    if (errors.booking_code) {
                        toast.error(errors.booking_code);
                    }
                },
            });
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
                                            className="flex flex-col gap-3"
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
                                                    placeholder="ORD-XXXXXXXX-XXXXX"
                                                    value={form.data.booking_code}
                                                    onChange={(e) =>
                                                        form.setData(
                                                            'booking_code',
                                                            e.target.value.toUpperCase(),
                                                        )
                                                    }
                                                    className="h-10 rounded-xl border-slate-200 bg-slate-50 px-4 text-center font-mono text-lg font-semibold tracking-wider uppercase transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800"
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={
                                                    form.processing ||
                                                    !form.data.booking_code.trim()
                                                }
                                                className="h-10 rounded-lg bg-blue-600 text-base font-semibold transition-all hover:bg-blue-700 hover:shadow-blue-600/30 disabled:opacity-50"
                                            >
                                                 {form.processing ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Ceking Status...
                                                    </>
                                                    ) : (
                                                        'Cek Status'
                                                    )}
                                            </Button>
                                        </form>

                                        {/* Order Result */}
                                        {order && (
                                            <div className="mt-8 space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2Icon className="h-5 w-5 text-green-600" />
                                                    <h3 className="font-bold text-slate-900 dark:text-white">
                                                        Pesanan Ditemukan
                                                    </h3>
                                                </div>

                                                {/* Booking Code & Status */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm text-slate-500">Kode Booking</p>
                                                        <p className="font-mono text-lg font-bold text-blue-600">
                                                            {order.booking_code}
                                                        </p>
                                                    </div>
                                                    <StatusBadge status={order.status} />
                                                </div>

                                                <hr className="border-slate-200 dark:border-slate-700" />

                                                {/* Product Info */}
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className="h-16 w-16 flex-shrink-0 rounded-lg bg-cover bg-center bg-slate-200"
                                                        style={{ 
                                                            backgroundImage: order.product?.image_url 
                                                                ? `url('${order.product.image_url}')` 
                                                                : undefined 
                                                        }}
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-slate-900 dark:text-white">
                                                            {order.product?.name || '-'}
                                                        </p>
                                                        <p className="text-sm text-slate-500">
                                                            {order.quantity} unit x {formatPrice(order.product?.price || 0)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <hr className="border-slate-200 dark:border-slate-700" />

                                                {/* Order Details */}
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-slate-500">Nama Pemesan</p>
                                                        <p className="font-medium">{order.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">Email</p>
                                                        <p className="font-medium">{order.email}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">No. Telepon</p>
                                                        <p className="font-medium">{order.phone || '-'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">Metode Pembayaran</p>
                                                        <p className="font-medium">{order.payment_method}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">Tanggal Pesanan</p>
                                                        <p className="font-medium">{formatDate(order.created_at)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">Total Pembayaran</p>
                                                        <p className="font-bold text-blue-600">{formatPrice(order.total_price)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Help Info */}
                                        {!order && (
                                            <div className="mt-8 flex items-start gap-3 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30">
                                                <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                                <div className="text-sm">
                                                    <p className="font-semibold text-blue-900 dark:text-blue-300">
                                                        Belum punya kode booking?
                                                    </p>
                                                    <p className="mt-1 text-blue-700 dark:text-blue-400">
                                                        Kode booking dikirim ke
                                                        email Anda setelah
                                                        melakukan pemesanan. Cek
                                                        folder inbox atau spam.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
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
                                                            className={`h-5 w-5 ${item.color === 'bg-yellow-400' ? 'text-yellow-600' : item.color === 'bg-green-400' ? 'text-green-600' : item.color === 'bg-blue-400' ? 'text-blue-600' : 'text-red-600'}`}
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

            {/* Toast Notifications */}
            <Toaster
                toastOptions={{
                    error: {
                        style: {
                            background: '#EF4444',
                            color: '#fff',
                        },
                    },
                    success: {
                        style: {
                            background: '#10B981',
                            color: '#fff',
                        },
                    },
                }}
            />
        </>
    );
}
