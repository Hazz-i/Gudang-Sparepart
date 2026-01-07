import ChatbotWidget from '@/components/chatbot-widget';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import ProductCard from '@/components/product-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/helper/functions';
import { type Product, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CheckIcon, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function ProductShow() {
    const { auth, product, recommendedProducts } = usePage<{
        auth: SharedData['auth'];
        product: Product;
        recommendedProducts: Product[];
    }>().props;

    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: product.name,
            text: `Cek sparepart ${product.name} di Gudang Sparepart - ${formatPrice(product.price)}`,
            url: window.location.href,
        };

        // Check if Web Share API is available
        if (navigator.share && navigator.canShare?.(shareData)) {
            await navigator.share(shareData);
        } else {
            // Fallback: copy URL to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (error) {
                console.error('Gagal menyalin ke clipboard:', error);
            }
        }
    };
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
                                            backgroundImage: `url('${product.image_url}')`,
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40"></div>
                                    </div>
                                    {/* {product.is_genuine && (
                                        <div className="absolute top-4 left-4 z-10">
                                            <Badge className="gap-1 border bg-card/90 text-foreground backdrop-blur-sm">
                                                <Verified className="h-4 w-4 text-blue-600" />
                                                Produk Asli
                                            </Badge>
                                        </div>
                                    )} */}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="flex h-full flex-col">
                                {/* Header Section */}
                                <div className="flex flex-grow flex-col gap-4 border-b pb-8">
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
                                                    product.original_price,
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
                                    <div className="mt-4 flex flex-grow flex-col items-start justify-end">
                                        <h1 className="text-lg font-bold">
                                            Deskripsi
                                        </h1>
                                        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Specifications */}
                                <div className="flex flex-col justify-end py-8">
                                    <h3 className="mb-4 font-bold">
                                        Spesifikasi Produk
                                    </h3>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">
                                                Garansi
                                            </span>
                                            <span className="font-medium">
                                                {product.warranty}
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">
                                                Kategori
                                            </span>
                                            <span className="font-medium">
                                                {product.category}
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">
                                                Material
                                            </span>
                                            <span className="font-medium">
                                                {product.material}
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">
                                                Merek
                                            </span>
                                            <span className="font-medium">
                                                {product.brand}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Section */}
                                <div className="mt-auto flex flex-col gap-4">
                                    {/* Action Buttons */}
                                    <div className="flex gap-4">
                                        <Button
                                            size="lg"
                                            className="h-14 flex-1 rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                                        >
                                            Booking Sekarang
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="h-14 w-14 rounded-xl"
                                            onClick={handleShare}
                                            title={
                                                copied
                                                    ? 'Link disalin!'
                                                    : 'Bagikan'
                                            }
                                        >
                                            {copied ? (
                                                <CheckIcon className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <Share2 className="h-5 w-5" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rekomendasi Produk */}
                        <div className="border-t py-12">
                            <h2 className="mb-8 text-2xl font-bold">
                                Produk Rekomendasi
                            </h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                                {recommendedProducts.map(
                                    (relatedProduct: any) => (
                                        <ProductCard
                                            key={relatedProduct.id}
                                            product={relatedProduct}
                                        />
                                    ),
                                )}
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
