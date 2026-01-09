import ChatbotWidget from '@/components/chatbot-widget';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Head, router, usePage, Link } from '@inertiajs/react';
import { ArrowLeft, Loader2, Minus, Plus, Upload, X, ShoppingBag, CreditCard, User, ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Checkout() {
    const { auth, product } = usePage<{
        auth: SharedData['auth'];
        product: Product;
    }>().props;

    const [quantity, setQuantity] = useState(1);
    const [evidencePreview, setEvidencePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        payment_method: '',
        evidence: null as File | null,
    });

    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(1, Math.min(product.stock, quantity + delta));
        setQuantity(newQuantity);
    };

    const handleEvidenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Ukuran file maksimal 2MB');
                return;
            }
            setFormData({ ...formData, evidence: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setEvidencePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeEvidence = () => {
        setFormData({ ...formData, evidence: null });
        setEvidencePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/orders', {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            quantity: quantity,
            payment_method: formData.payment_method,
            product_id: product.id,
            evidence: formData.evidence,
        }, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Pesanan berhasil dibuat!');
            },
            onError: (errors) => {
                const errorMessage = Object.values(errors)[0] || 'Gagal membuat pesanan';
                toast.error(errorMessage as string);
                setIsSubmitting(false);
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const totalPrice = product.price * quantity;

    return (
        <>
            <Head title={`Checkout - ${product.name}`} />

            <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
                <Navbar auth={auth} />

                <main className="flex-1 pb-8 pt-4">
                    <div className="container mx-auto px-4">
                        {/* Back Button */}
                        <Link
                            href={`/products/${product.id}`}
                            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Detail Produk
                        </Link>

                        <div className="grid gap-8 lg:grid-cols-12">
                            {/* Left Column - Form */}
                            <div className="lg:col-span-7">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Customer Information */}
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="mb-6 flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                                    <User className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Informasi Pemesan</h2>
                                                    <p className="text-sm text-slate-500">Lengkapi data diri Anda</p>
                                                </div>
                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2 sm:col-span-2">
                                                    <Label htmlFor="name">Nama Lengkap <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder="Masukkan nama lengkap"
                                                        className="h-12"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="nama@email.com"
                                                        className="h-12"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">No. Telepon</Label>
                                                    <Input
                                                        id="phone"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="08xxxxxxxxxx"
                                                        className="h-12"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Payment Method */}
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="mb-6 flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                                    <CreditCard className="h-5 w-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Metode Pembayaran</h2>
                                                    <p className="text-sm text-slate-500">Pilih cara pembayaran Anda</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Metode Pembayaran <span className="text-red-500">*</span></Label>
                                                    <Select
                                                        value={formData.payment_method}
                                                        onValueChange={(value) => setFormData({ ...formData, payment_method: value })}
                                                        required
                                                    >
                                                        <SelectTrigger className="h-12">
                                                            <SelectValue placeholder="Pilih metode pembayaran" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Transfer Bank">Transfer Bank</SelectItem>
                                                            <SelectItem value="COD">COD (Bayar di Tempat)</SelectItem>
                                                            <SelectItem value="QRIS">QRIS</SelectItem>
                                                            <SelectItem value="E-Wallet">E-Wallet</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Evidence Upload */}
                                                <div className="space-y-2">
                                                    <Label>Bukti Pembayaran (Opsional)</Label>
                                                    <p className="text-xs text-slate-500 mb-2">
                                                        Upload bukti transfer jika sudah melakukan pembayaran
                                                    </p>
                                                    {evidencePreview ? (
                                                        <div className="relative">
                                                            <img
                                                                src={evidencePreview}
                                                                alt="Preview bukti pembayaran"
                                                                className="h-48 w-full rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={removeEvidence}
                                                                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg hover:bg-red-600 transition-colors"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-blue-400 hover:bg-blue-50/50 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-blue-500 dark:hover:bg-blue-900/20">
                                                            <Upload className="mb-2 h-8 w-8 text-slate-400" />
                                                            <span className="font-medium text-slate-600 dark:text-slate-300">Klik untuk upload</span>
                                                            <span className="mt-1 text-xs text-slate-400">Max 2MB (JPG, PNG, WEBP)</span>
                                                            <input
                                                                ref={fileInputRef}
                                                                type="file"
                                                                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                                                className="hidden"
                                                                onChange={handleEvidenceChange}
                                                            />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Submit Button - Mobile Only */}
                                    <div className="lg:hidden">
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="h-12 w-full rounded-lg bg-blue-600 text-lg font-bold hover:bg-blue-700"
                                            disabled={isSubmitting || !formData.payment_method || !formData.name || !formData.email}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Memproses...
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingBag className="mr-2 h-5 w-5" />
                                                    Buat Pesanan - {formatPrice(totalPrice)}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="lg:col-span-5">
                                <div className="space-y-6">
                                    <Card>
                                        <CardContent className="p-6">
                                            <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Ringkasan Pesanan</h2>

                                            {/* Product Info */}
                                            <div className="flex gap-4 mb-6">
                                                <div
                                                    className="h-24 w-24 flex-shrink-0 rounded-xl bg-cover bg-center bg-slate-100 dark:bg-slate-800"
                                                    style={{ backgroundImage: product.image_url ? `url('${product.image_url}')` : undefined }}
                                                >
                                                    {!product.image_url && (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <ImageIcon className="h-8 w-8 text-slate-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-slate-900 dark:text-white">{product.name}</h3>
                                                    <p className="text-sm text-slate-500">{product.brand}</p>
                                                    <p className="mt-1 text-lg font-bold text-blue-600">{formatPrice(product.price)}</p>
                                                </div>
                                            </div>

                                            {/* Quantity Selector */}
                                            <div className="mb-6">
                                                <Label className="mb-2 block">Jumlah</Label>
                                                <div className="flex items-center gap-3">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-10 w-10 rounded-lg"
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
                                                        className="h-10 w-10 rounded-lg"
                                                        onClick={() => handleQuantityChange(1)}
                                                        disabled={quantity >= product.stock}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="ml-2 text-sm text-slate-500">
                                                        Stok: {product.stock}
                                                    </span>
                                                </div>
                                            </div>

                                            <hr className="my-6 border-slate-200 dark:border-slate-700" />

                                            {/* Price Summary */}
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                                                    <span className="font-medium">{formatPrice(product.price)} x {quantity}</span>
                                                </div>
                                                <div className="flex justify-between text-lg font-bold">
                                                    <span>Total</span>
                                                    <span className="text-blue-600">{formatPrice(totalPrice)}</span>
                                                </div>
                                            </div>

                                            {/* Submit Button - Desktop Only */}
                                            <div className="mt-6 hidden lg:block">
                                                <Button
                                                    type="submit"
                                                    size="lg"
                                                    className="h-12 w-full rounded-lg bg-blue-600 text-lg font-bold hover:bg-blue-700"
                                                    disabled={isSubmitting || !formData.payment_method || !formData.name || !formData.email}
                                                    onClick={handleSubmit}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                            Memproses...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShoppingBag className="mr-2 h-5 w-5" />
                                                            Buat Pesanan
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Info Box */}
                                    <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
                                        <CardContent className="p-4">
                                            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Informasi Penting</p>
                                            <ul className="mt-2 space-y-1 text-sm text-amber-700 dark:text-amber-400">
                                                <li>• Kode booking akan dikirim ke email Anda</li>
                                                <li>• Pesanan akan dikonfirmasi oleh admin</li>
                                                <li>• Ambil barang dalam 7 hari setelah konfirmasi</li>
                                            </ul>
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

            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />
        </>
    );
}
