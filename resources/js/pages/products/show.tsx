import ChatbotWidget from '@/components/chatbot-widget';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import ProductCard from '@/components/product-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/helper/functions';
import { welcomeProducts } from '@/helper/product';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Share2, Verified } from 'lucide-react';

// Data produk (contoh)
const product = {
    id: 1,
    name: 'Kampas Rem Keramik X-Grip (Belakang)',
    stock: 100,
    category: 'Sistem Rem',
    originalPrice: 185000,
    price: 145000,
    rating: 4.8,
    reviewCount: 128,
    status: 'in_stock',
    isGenuine: true,
    description:
        'Direkayasa untuk daya pengereman superior dan minim debu. Kampas rem keramik ini menawarkan daya tahan yang sangat baik dan performa konsisten baik dalam kondisi basah maupun kering. Kompatibel dengan sebagian besar motor sport 250cc.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPREB0C-nwzck1ZkA7VvLDEa_SdSeTxhfR77XIPmzT7FGf5Y-H5JFI6DyU3LyOdKTd7IOYkkIGl5YGgbV8i6UkhR0oRE_kxULMY8NAHhzK27u1wextPPTCKEeGH5xkmLVetZpdEQlUteoOj0KGAHhD621RoYJqhH5aaEibKqGZ9sGl1QYQWf-IJPTGTjMGSrC6uZoWM6rrZ7wdr4Pu2c8yY2TAWmMsl9djvzswecuXXZHgb97XHi3Qk5OoqJVu2QaKZWgRpxsOlag',
    specifications: [
        { label: 'Merek', value: 'X-Grip Racing' },
        { label: 'Material', value: 'Keramik Komposit' },
        { label: 'Posisi', value: 'Belakang' },
        { label: 'Kompatibilitas', value: 'CBR250RR, R25, Ninja 250' },
        { label: 'Garansi', value: '6 Bulan' },
        { label: 'Berat', value: '450g' },
    ],
};

export default function ProductShow() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title={`${product.name} - Gudang Sparepart`} />

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background">
                {/* Header */}
                <Navbar auth={auth} />

                {/* Main Content */}
                <main className="flex flex-col items-center px-4 py-6 sm:px-10">
                    <div className="w-full max-w-[1280px]">
                        {/* Product Detail Grid */}
                        <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                            {/* Product Images */}
                            <div className="flex flex-col gap-4">
                                {/* Main Image */}
                                <div className="group relative aspect-square overflow-hidden rounded-2xl border bg-card shadow-sm">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{
                                            backgroundImage: `url('${product.image}')`,
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40"></div>
                                    </div>
                                    {product.isGenuine && (
                                        <div className="absolute top-4 left-4 z-10">
                                            <Badge className="gap-1 border bg-card/90 text-foreground backdrop-blur-sm">
                                                <Verified className="h-4 w-4 text-blue-600" />
                                                Produk Asli
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="flex h-full flex-col">
                                {/* Header Section */}
                                <div className="flex flex-col gap-4 border-b pb-8">
                                    <div>
                                        <h1 className="mb-2 text-3xl font-black tracking-tight sm:text-4xl">
                                            {product.name}
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <span className="text-muted-foreground">
                                                stok tersedia: {product.stock}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price & Stock */}
                                    <div className="mt-2 flex flex-wrap items-center gap-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-base font-medium text-muted-foreground line-through">
                                                {formatPrice(
                                                    product.originalPrice,
                                                )}
                                            </span>
                                            <span className="text-4xl font-bold text-blue-600">
                                                {formatPrice(product.price)}
                                            </span>
                                        </div>
                                        <Badge className="gap-1.5 border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
                                            Tersedia
                                        </Badge>
                                    </div>

                                    {/* Description */}
                                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Specifications */}
                                <div className="flex-grow py-8">
                                    <h3 className="mb-4 font-bold">
                                        Spesifikasi Produk
                                    </h3>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                                        {product.specifications.map(
                                            (spec, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between border-b pb-2"
                                                >
                                                    <span className="text-muted-foreground">
                                                        {spec.label}
                                                    </span>
                                                    <span className="font-medium">
                                                        {spec.value}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {/* CTA Section */}
                                <div className="mt-auto flex flex-col gap-4">
                                    {/* Action Buttons */}
                                    <div className="flex gap-4">
                                        <Button
                                            size="lg"
                                            className="h-14 flex-1 rounded-xl bg-green-600 text-lg font-bold text-white shadow-lg shadow-green-600/25 transition-all hover:-translate-y-0.5 hover:bg-green-700"
                                        >
                                            Booking via Chat
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="h-14 w-14 rounded-xl"
                                        >
                                            <Share2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Products */}
                        <div className="border-t py-12">
                            <h2 className="mb-8 text-2xl font-bold">
                                Produk Terkait
                            </h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                                {welcomeProducts.map((relatedProduct) => (
                                    <ProductCard
                                        key={relatedProduct.id}
                                        product={relatedProduct}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <Footer />

                {/* Floating Chat Widget */}
                <ChatbotWidget />
            </div>
        </>
    );
}
