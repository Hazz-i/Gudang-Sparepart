import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Bell, Lock, MessageSquare, Save, Store, User } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Panel',
        href: '/admin',
    },
    {
        title: 'Pengaturan',
        href: '/admin/settings',
    },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('store');

    const tabs = [
        { id: 'store', label: 'Toko', icon: Store },
        { id: 'account', label: 'Akun', icon: User },
        { id: 'notifications', label: 'Notifikasi', icon: Bell },
        { id: 'chatbot', label: 'Chatbot', icon: MessageSquare },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan - Admin" />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Page Heading */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
                            Pengaturan
                        </h1>
                        <p className="mt-1 text-slate-500 dark:text-slate-400">
                            Kelola pengaturan toko dan akun Anda.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row">
                        {/* Sidebar Tabs */}
                        <div className="w-full lg:w-64">
                            <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        <tab.icon className="h-5 w-5" />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Content */}
                        <div className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            {activeTab === 'store' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            Informasi Toko
                                        </h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Pengaturan umum untuk toko Anda.
                                        </p>
                                    </div>
                                    <Separator />
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="storeName">
                                                Nama Toko
                                            </Label>
                                            <Input
                                                id="storeName"
                                                defaultValue="Gudang Sparepart"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="storeAddress">
                                                Alamat
                                            </Label>
                                            <Input
                                                id="storeAddress"
                                                defaultValue="Jl. Otomotif No. 123, Jakarta"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="storePhone">
                                                    Telepon
                                                </Label>
                                                <Input
                                                    id="storePhone"
                                                    defaultValue="021-12345678"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="storeWhatsapp">
                                                    WhatsApp
                                                </Label>
                                                <Input
                                                    id="storeWhatsapp"
                                                    defaultValue="08123456789"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="storeEmail">
                                                Email
                                            </Label>
                                            <Input
                                                id="storeEmail"
                                                type="email"
                                                defaultValue="info@gudangsparepart.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button className="flex items-center gap-2">
                                            <Save className="h-4 w-4" />
                                            Simpan Perubahan
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'account' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            Pengaturan Akun
                                        </h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Kelola informasi akun dan keamanan.
                                        </p>
                                    </div>
                                    <Separator />
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="userName">
                                                Nama Lengkap
                                            </Label>
                                            <Input
                                                id="userName"
                                                defaultValue="Admin User"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="userEmail">
                                                Email
                                            </Label>
                                            <Input
                                                id="userEmail"
                                                type="email"
                                                defaultValue="admin@gudangsparepart.com"
                                            />
                                        </div>
                                        <Separator />
                                        <div>
                                            <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                                                <Lock className="h-4 w-4" />
                                                Ubah Password
                                            </h3>
                                            <div className="grid gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="currentPassword">
                                                        Password Saat Ini
                                                    </Label>
                                                    <Input
                                                        id="currentPassword"
                                                        type="password"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="newPassword">
                                                        Password Baru
                                                    </Label>
                                                    <Input
                                                        id="newPassword"
                                                        type="password"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="confirmPassword">
                                                        Konfirmasi Password
                                                    </Label>
                                                    <Input
                                                        id="confirmPassword"
                                                        type="password"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button className="flex items-center gap-2">
                                            <Save className="h-4 w-4" />
                                            Simpan Perubahan
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            Pengaturan Notifikasi
                                        </h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Atur bagaimana Anda menerima
                                            notifikasi.
                                        </p>
                                    </div>
                                    <Separator />
                                    <div className="space-y-4">
                                        {[
                                            {
                                                label: 'Pesanan Baru',
                                                desc: 'Notifikasi saat ada pesanan baru masuk',
                                            },
                                            {
                                                label: 'Stok Menipis',
                                                desc: 'Peringatan saat stok barang hampir habis',
                                            },
                                            {
                                                label: 'Pembayaran Masuk',
                                                desc: 'Notifikasi saat pembayaran diterima',
                                            },
                                            {
                                                label: 'Laporan Mingguan',
                                                desc: 'Ringkasan penjualan setiap minggu',
                                            },
                                        ].map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between rounded-lg border border-slate-200 p-4 dark:border-slate-700"
                                            >
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">
                                                        {item.label}
                                                    </p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                                <label className="relative inline-flex cursor-pointer items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="peer sr-only"
                                                        defaultChecked
                                                    />
                                                    <div className="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-slate-700"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end">
                                        <Button className="flex items-center gap-2">
                                            <Save className="h-4 w-4" />
                                            Simpan Perubahan
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'chatbot' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            Pengaturan Chatbot
                                        </h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Konfigurasi integrasi chatbot
                                            WhatsApp.
                                        </p>
                                    </div>
                                    <Separator />
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="whatsappApiKey">
                                                API Key WhatsApp
                                            </Label>
                                            <Input
                                                id="whatsappApiKey"
                                                type="password"
                                                placeholder="Masukkan API Key"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="webhookUrl">
                                                Webhook URL
                                            </Label>
                                            <Input
                                                id="webhookUrl"
                                                defaultValue="https://gudangsparepart.com/api/webhook"
                                                readOnly
                                                className="bg-slate-50 dark:bg-slate-800"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="greeting">
                                                Pesan Sambutan
                                            </Label>
                                            <textarea
                                                id="greeting"
                                                rows={3}
                                                className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-slate-700"
                                                defaultValue="Halo! Selamat datang di Gudang Sparepart. Ada yang bisa kami bantu?"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button className="flex items-center gap-2">
                                            <Save className="h-4 w-4" />
                                            Simpan Perubahan
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
