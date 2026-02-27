import ChatbotWidget from '@/components/chatbot-widget';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import ProductCard from '@/components/product-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/helper/functions';
import { type Product, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
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

        if (navigator.share && navigator.canShare?.(shareData)) {
            await navigator.share(shareData);
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (error) {
                console.error('Gagal menyalin ke clipboard:', error);
            }
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'in_stock':
                return (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Tersedia
                    </Badge>
                );
            case 'low_stock':
                return (
                    <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Stok Menipis
                    </Badge>
                );
            case 'out_of_stock':
                return (
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        Habis
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Head title={`${product.name} - Gudang Sparepart`} />

            <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
                {/* Navbar */}
                <Navbar auth={auth} />

                {/* Main Content */}
                <main className="flex-1 px-4 py-8 lg:px-8 lg:py-12">
                    <div className="mx-auto max-w-7xl">
                        {/* Product Section */}
                        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                            {/* Product Image */}
                            <div className="w-full lg:w-1/2">
                                <div className="sticky top-24">
                                    <div className="overflow-hidden rounded-3xl bg-white shadow-lg dark:bg-slate-800">
                                        <div
                                            className="aspect-square w-full bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url('${product.image_url}')`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="flex w-full flex-col gap-6 lg:w-1/2">
                                {/* Brand & Status */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-blue-600">
                                        {product.brand}
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    {getStatusBadge(product.status)}
                                </div>

                                {/* Product Name */}
                                <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl dark:text-white">
                                    {product.name}
                                </h1>

                                {/* Price */}
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold text-blue-600">
                                        {formatPrice(product.price)}
                                    </span>
                                    {product.original_price > product.price && (
                                        <>
                                            <span className="text-lg text-slate-400 line-through">
                                                {formatPrice(
                                                    product.original_price,
                                                )}
                                            </span>
                                            <Badge className="bg-red-100 text-red-700">
                                                {Math.round(
                                                    ((product.original_price -
                                                        product.price) /
                                                        product.original_price) *
                                                        100,
                                                )}
                                                % OFF
                                            </Badge>
                                        </>
                                    )}
                                </div>

                                {/* Stock Info */}
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-slate-500">
                                        Stok:
                                    </span>
                                    <span
                                        className={`font-semibold ${
                                            product.stock > 10
                                                ? 'text-green-600'
                                                : product.stock > 0
                                                  ? 'text-amber-600'
                                                  : 'text-red-600'
                                        }`}
                                    >
                                        {product.stock} unit
                                    </span>
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

                                {/* Specifications */}
                                <div className="flex flex-col justify-end py-8">
                                    <h3 className="mb-4 font-bold">
                                        Spesifikasi Produk
                                    </h3>
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
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
                                        {product.stock > 0 ? (
                                            <Button
                                                size="lg"
                                                className="h-14 flex-1 rounded-xl bg-blue-600 text-lg font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                                                asChild
                                            >
                                                <Link
                                                    href={`/products/${product.id}/checkout`}
                                                >
                                                    Booking Sekarang
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button
                                                size="lg"
                                                className="h-14 flex-1 rounded-xl text-lg font-bold"
                                                disabled
                                            >
                                                Stok Habis
                                            </Button>
                                        )}
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
                        <div className="py-12">
                            <h2 className="mb-4 text-2xl font-bold lg:mb-8">
                                Produk Rekomendasi
                            </h2>
                            {recommendedProducts.length < 1 && (
                                <span className="flex h-12 items-center justify-center">
                                    <p>Belum ada produk serupa</p>
                                </span>
                            )}
                            <div
                                className={`grid ${recommendedProducts.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 md:grid-cols-4 lg:gap-6`}
                            >
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
