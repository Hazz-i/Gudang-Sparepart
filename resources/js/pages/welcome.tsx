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
    CogIcon,
    DiscIcon,
    DropletIcon,
    MessagesSquareIcon,
    PackageIcon,
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

// Data langkah-langkah
const steps = [
    {
        icon: MessagesSquareIcon,
        title: '1. Tanya Chatbot',
        description:
            'Ketik nama sparepart yang Anda butuhkan di widget chat. AI kami memahami model spesifik maupun istilah umum.',
    },
    {
        icon: PackageIcon,
        title: '2. Konfirmasi Stok',
        description:
            'Bot kami mengecek inventaris secara real-time di semua gudang dan toko yang terhubung.',
    },
    {
        icon: StoreIcon,
        title: '3. Pesan & Ambil',
        description:
            'Reservasi barang Anda segera dan dapatkan kode booking untuk mengambilnya di toko tanpa antri.',
    },
];

// Avatar pengguna untuk indikator kepercayaan
const userAvatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBEKl6Aubzx0PvOTPybZvlrVKaCFdjWDL_y2yFaopftI-kR9z7aBldVXYV0-6g8WeTnJH5RCJVv9Hz_A9rgSGFkgScjIWj24-VXnUrfovHLUFEOnPR8doijtZn6hHx-NcxQoMqFh8GfsgofySSq_hS48A02fIJUfuIcqhMDhP5jJ9LYL_l9DoGV9QQJanME1MEViOzwqa8NZZIEJtW5cA7hTnMEiQ9Q-AbgVWsiF8ImP95TnIgGaMq1bkd7U0h_2mbV2VSGEhZXtUs',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAFhg_RxaCQlaiZ-MH_vfmMYASnh0OkPJL6qBG5xYN8uCuBgvxl0WbE0pQ7MM5pb-7VD1GfO78e5JAwBe1VxFgQJWYOsYPm2Bix_yDxl_UYMBetd_DKY85nknMzwUjDeJoXVwsp4ewMroIV69g23GIjn80MeOxyaz6zpwCwzGX_0kt_NN-SLVeFagNr3mliaYKxnW3bfZsGB4S6qPUPpcv0WC_bExGyVfLzDaKavegXs5k-r2EL-VwpXeO5nlFudYKktJnThNQOz94',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBSmtFBELKZum6JPbYF3BzcZusn6z-h0LD022XnbIeyzKKXqzvlLBDFRyNwiI-Aje_wJbbEuFL0THV1QO_zei8QQA9oJqh_eZ7u-HyytRnuigDnwJW-rrk5aR8k69LgKEvb-gsZIrfxQXCX6U1gRlbHdbeNnYG2YTCMmPrSBr8EATggRqpytTEjXhQR0DNXU0HBWzVayslKbG0k3ymTHxy7jndzTURPTGm43lakCAz7ssjy6awPA0v5oIhC6QghkNJkyIWXS4SDhTw',
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
                                        Temukan & Pesan Instan{' '}
                                        <span className="text-blue-600">
                                            Sparepart Motor
                                        </span>
                                    </h1>

                                    <p className="max-w-xl text-lg leading-relaxed font-normal text-muted-foreground">
                                        Lewati antrian toko. Cukup chat dengan
                                        asisten cerdas kami untuk mengecek
                                        ketersediaan stok secara real-time dan
                                        pesan sparepart dalam hitungan detik.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Link href="/products">
                                        <Button
                                            size="lg"
                                            className="h-12 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
                                        >
                                            Lihat Katalog
                                        </Button>
                                    </Link>
                                </div>

                                {/* Trust indicators */}
                                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex -space-x-2">
                                        {userAvatars.map((avatar, index) => (
                                            <div
                                                key={index}
                                                className="h-8 w-8 rounded-full border-2 border-background bg-muted bg-cover"
                                                style={{
                                                    backgroundImage: `url('${avatar}')`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <p>Dipercaya oleh 2.000+ pengendara</p>
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
                                    Cara Kerja
                                </h2>
                                <p className="max-w-[720px] text-lg text-muted-foreground">
                                    Dapatkan sparepart Anda dalam 3 langkah
                                    mudah tanpa keluar rumah.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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

                {/* Footer */}
                <Footer />

                {/* Floating Chat Widget */}
                <ChatbotWidget />
            </div>
        </>
    );
}
