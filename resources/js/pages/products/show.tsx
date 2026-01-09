import ChatbotWidget from '@/components/chatbot-widget';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import ProductCard from '@/components/product-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { formatPrice } from '@/helper/functions';
import { type Product, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CheckIcon, Loader2, Minus, Plus, Share2 } from 'lucide-react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductShow() {
    const { auth, product, recommendedProducts } = usePage<{
        auth: SharedData['auth'];
        product: Product;
        recommendedProducts: Product[];
    }>().props;

    const [copied, setCopied] = useState(false);
    const [showBookingDialog, setShowBookingDialog] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        quantity: 1,
        payment_method: '',
        product_id: product.id,
    });

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

    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(1, Math.min(product.stock, quantity + delta));
        setQuantity(newQuantity);
        form.setData('quantity', newQuantity);
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.setData('quantity', quantity);
        
        form.post('/orders', {
            onSuccess: () => {
                toast.success('Pesanan berhasil dibuat! Cek halaman status booking.', {
                    duration: 5000,
                });
                setShowBookingDialog(false);
                form.reset();
                setQuantity(1);
            },
            onError: (errors) => {
                const errorMessage = Object.values(errors)[0] || 'Gagal membuat pesanan';
                toast.error(errorMessage as string);
            },
        });
    };

    const totalPrice = product.price * quantity;

    return (
        <>
            <Head title={`${product.name} - Gudang Sparepart`} />

            <div className="relative flex min-h-screen w-full flex-col bg-background">
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
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="flex h-full flex-col">
                                {/* Header Section */}
                                <div className="flex flex-grow flex-col gap-4 border-b pb-8">
                                    <div>
                                        <h1 className="mb-2 text-2xl lg:text-3xl font-black tracking-tight sm:text-4xl">
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
                                            <span className="text-sm lg:text-base font-medium text-muted-foreground line-through">
                                                {formatPrice(product.original_price)}
                                            </span>
                                            <span className="text-2xl lg:text-4xl font-bold text-blue-600">
                                                {formatPrice(product.price)}
                                            </span>
                                        </div>
                                        <Badge
                                            className={`gap-1.5 ${
                                                product.stock > 0
                                                    ? 'border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400'
                                            }`}
                                        >
                                            {product.stock > 0 ? 'Tersedia' : 'Habis'}
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
                                            className="h-14 flex-1 rounded-xl bg-blue-600 text-lg font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                                            onClick={() => setShowBookingDialog(true)}
                                            disabled={product.stock === 0}
                                        >
                                            {product.stock > 0 ? 'Booking Sekarang' : 'Stok Habis'}
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
                            <h2 className="mb-4 lg:mb-8 text-2xl font-bold">
                                Produk Rekomendasi
                            </h2>
                            {recommendedProducts.length < 1 && (
                                <span className='flex items-center justify-center h-12'>
                                    <p>Belum ada produk serupa</p>
                                </span>
                            )}
                            <div className={`grid ${recommendedProducts.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 lg:gap-6 md:grid-cols-4`}>
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

            {/* Booking Dialog */}
            <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Booking Produk</DialogTitle>
                        <DialogDescription>
                            Isi data untuk memesan {product.name}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleBookingSubmit}>
                        <div className="space-y-4 py-4">
                            {/* Product Summary */}
                            <div className="flex items-center gap-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                                <div
                                    className="h-16 w-16 flex-shrink-0 rounded-lg bg-cover bg-center"
                                    style={{ backgroundImage: `url('${product.image_url}')` }}
                                />
                                <div className="flex-1">
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatPrice(product.price)} / unit
                                    </p>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-2">
                                <Label>Jumlah</Label>
                                <div className="flex items-center gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center text-lg font-bold">{quantity}</span>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= product.stock}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        (max: {product.stock})
                                    </span>
                                </div>
                            </div>

                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Lengkap *</Label>
                                <Input
                                    id="name"
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                    required
                                />
                                {form.errors.name && (
                                    <p className="text-sm text-red-500">{form.errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={form.data.email}
                                    onChange={(e) => form.setData('email', e.target.value)}
                                    placeholder="Masukkan email"
                                    required
                                />
                                {form.errors.email && (
                                    <p className="text-sm text-red-500">{form.errors.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">No. Telepon</Label>
                                <Input
                                    id="phone"
                                    value={form.data.phone}
                                    onChange={(e) => form.setData('phone', e.target.value)}
                                    placeholder="Masukkan no. telepon"
                                />
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-2">
                                <Label>Metode Pembayaran *</Label>
                                <Select
                                    value={form.data.payment_method}
                                    onValueChange={(value) => form.setData('payment_method', value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih metode pembayaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Transfer Bank">Transfer Bank</SelectItem>
                                        <SelectItem value="COD">COD (Bayar di Tempat)</SelectItem>
                                        <SelectItem value="QRIS">QRIS</SelectItem>
                                        <SelectItem value="E-Wallet">E-Wallet</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.errors.payment_method && (
                                    <p className="text-sm text-red-500">{form.errors.payment_method}</p>
                                )}
                            </div>

                            {/* Total */}
                            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                <span className="font-medium">Total Pembayaran</span>
                                <span className="text-xl font-bold text-blue-600">
                                    {formatPrice(totalPrice)}
                                </span>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowBookingDialog(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={form.processing || !form.data.payment_method}
                            >
                                {form.processing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    'Konfirmasi Booking'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Toast Notifications */}
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: '#10B981',
                            color: '#fff',
                        },
                    },
                    error: {
                        style: {
                            background: '#EF4444',
                            color: '#fff',
                        },
                    },
                }}
            />
        </>
    );
}
