import ChatbotWidget from '@/components/chatbot-widget';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type Product, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRightIcon,
    CircleIcon,
    ClipboardCheckIcon,
    CogIcon,
    CreditCardIcon,
    DiscIcon,
    DropletIcon,
    PackageSearchIcon,
    SearchIcon,
    StoreIcon,
} from 'lucide-react';

// Data kategori
const categories = [
    {
        icon: DropletIcon,
        title: 'Oli & Cairan',
        description: 'Oli mesin, coolant & lainnya',
        colorClass:
            'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
    },
    {
        icon: DiscIcon,
        title: 'Sistem Rem',
        description: 'Kampas, cakram & tuas rem',
        colorClass:
            'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300',
    },
    {
        icon: CircleIcon,
        title: 'Ban & Velg',
        description: 'Road, off-road & ban dalam',
        colorClass:
            'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
    },
    {
        icon: CogIcon,
        title: 'Komponen Mesin',
        description: 'Piston, rantai & belt',
        colorClass:
            'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300',
    },
];

// Data langkah-langkah booking
const steps = [
    {
        icon: PackageSearchIcon,
        title: '1. Pilih Produk',
        description:
            'Cari sparepart yang Anda butuhkan melalui katalog atau chatbot AI kami. Lihat detail harga, stok, dan spesifikasi produk.',
    },
    {
        icon: CreditCardIcon,
        title: '2. Pilih Pembayaran',
        description:
            'Pilih metode pembayaran: Transfer Bank, E-Wallet (GoPay, OVO, Dana).',
    },
    {
        icon: ClipboardCheckIcon,
        title: '3. Konfirmasi & Booking',
        description:
            'Setelah pembayaran dikonfirmasi, Anda akan menerima nomor booking via email. Simpan kode ini dengan baik.',
    },
    {
        icon: StoreIcon,
        title: '4. Ambil di Toko',
        description:
            'Kunjungi toko kami dengan menunjukkan nomor booking. Batas pengambilan 7 hari setelah konfirmasi.',
    },
];

export default function Welcome() {
    const { auth, products } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Gudang Sparepart - Sparepart Motor Instan" />

            <div className="relative flex min-h-screen w-full flex-col bg-background">
                {/* Top Navigation */}
                <Navbar auth={auth} />

                {/* Hero Section */}
                <section className="flex flex-col justify-center px-4 py-10 sm:px-10 sm:py-20">
                    <div className="mx-auto w-full max-w-[1280px]">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                            {/* Text Content */}
                            <div className="order-2 flex flex-col gap-6 lg:order-1">
                                <div className="flex flex-col gap-4 text-left">
                                    <h1 className="text-4xl leading-[1.1] font-black tracking-tighter sm:text-5xl lg:text-6xl">
                                        Booking Online,{' '}
                                        <span className="text-blue-600">
                                            Ambil di Toko
                                        </span>
                                    </h1>

                                    <p className="max-w-xl text-lg leading-relaxed font-normal text-muted-foreground">
                                        Pesan sparepart motor secara online dan
                                        ambil langsung di toko tanpa antri. Cek
                                        ketersediaan stok real-time via chatbot
                                        AI kami.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Link href="/products">
                                        <Button
                                            size="lg"
                                            className="h-12 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
                                        >
                                            Lihat Sparepart
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div className="relative order-1 h-full min-h-[300px] w-full lg:order-2 lg:min-h-[500px]">
                                <div className="absolute inset-0 -rotate-2 transform rounded-2xl bg-gradient-to-br from-blue-500/5 to-blue-500/30"></div>
                                <div
                                    className="absolute inset-0 h-full w-full rotate-2 transform rounded-2xl bg-cover bg-center shadow-2xl transition-transform duration-500 hover:rotate-0"
                                    style={{
                                        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPREB0C-nwzck1ZkA7VvLDEa_SdSeTxhfR77XIPmzT7FGf5Y-H5JFI6DyU3LyOdKTd7IOYkkIGl5YGgbV8i6UkhR0oRE_kxULMY8NAHhzK27u1wextPPTCKEeGH5xkmLVetZpdEQlUteoOj0KGAHhD621RoYJqhH5aaEibKqGZ9sGl1QYQWf-IJPTGTjMGSrC6uZoWM6rrZ7wdr4Pu2c8yY2TAWmMsl9djvzswecuXXZHgb97XHi3Qk5OoqJVu2QaKZWgRpxsOlag')`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Popular Categories Section */}
                <section className="bg-card py-12">
                    <div className="mx-auto max-w-[1280px]">
                        <div className="flex items-center justify-between pt-2 pb-6">
                            <h2 className="text-[28px] leading-tight font-bold tracking-tight">
                                Daftar Sparepart Terbaru
                            </h2>
                            <Link
                                className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
                                href="/products"
                            >
                                Lihat Semua <ArrowRightIcon />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products?.map((product: Product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16">
                    <div className="mx-auto max-w-[1280px]">
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-4 text-center md:text-left">
                                <h2 className="text-[32px] leading-tight font-black tracking-tight sm:text-4xl">
                                    Cara Booking Sparepart
                                </h2>
                                <p className="max-w-[720px] text-lg text-muted-foreground">
                                    Dapatkan sparepart Anda dalam 4 langkah
                                    mudah. Reservasi online, ambil di toko tanpa
                                    antri.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {steps.map((step, index) => (
                                    <Card
                                        key={index}
                                        className="border bg-card shadow-sm"
                                    >
                                        <CardContent className="flex flex-col gap-6 p-8">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                                                <step.icon />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-xl font-bold">
                                                    {step.title}
                                                </h3>
                                                <p className="leading-relaxed text-muted-foreground">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cek Status Booking Section */}
                <section className="pt-5 pb-16">
                    <div className="mx-auto max-w-[1280px] px-4">
                        <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 shadow-2xl shadow-blue-600/20">
                            <CardContent className="p-0">
                                <div className="grid gap-8 lg:grid-cols-2 lg:gap-0">
                                    {/* Left Content */}
                                    <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                                            <SearchIcon className="h-7 w-7 text-white" />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                                Sudah Booking?
                                            </h2>
                                            <p className="max-w-md text-blue-100">
                                                Lacak status pesanan Anda dengan
                                                memasukkan nomor booking yang
                                                dikirim via email.
                                            </p>
                                        </div>
                                        <Link href="/booking-status">
                                            <Button
                                                size="lg"
                                                className="h-12 w-fit rounded-xl bg-white px-6 font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
                                            >
                                                <SearchIcon className="mr-2 h-5 w-5" />
                                                Cek Status Booking
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Right Content - Status Legend */}
                                    <div className="flex flex-col justify-center gap-4 bg-white/5 p-8 backdrop-blur lg:p-12">
                                        <p className="text-sm font-medium text-blue-200">
                                            STATUS BOOKING
                                        </p>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3">
                                                <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"></div>
                                                <div>
                                                    <p className="font-semibold text-white">
                                                        PENDING
                                                    </p>
                                                    <p className="text-sm text-blue-200">
                                                        Menunggu pembayaran
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3">
                                                <div className="h-3 w-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50"></div>
                                                <div>
                                                    <p className="font-semibold text-white">
                                                        CONFIRMED
                                                    </p>
                                                    <p className="text-sm text-blue-200">
                                                        Siap diambil di toko
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3">
                                                <div className="h-3 w-3 rounded-full bg-blue-300 shadow-lg shadow-blue-300/50"></div>
                                                <div>
                                                    <p className="font-semibold text-white">
                                                        COMPLETED
                                                    </p>
                                                    <p className="text-sm text-blue-200">
                                                        Pesanan selesai
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Footer */}
                <Footer />

                {/* Floating Chat Widget */}
                <ChatbotWidget />
            </div>
        </>
    );
}
