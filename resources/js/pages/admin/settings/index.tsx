import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Loader2, Mail } from 'lucide-react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Panel',
        href: '/dashboard',
    },
    {
        title: 'Pengaturan',
        href: '/settings',
    },
];

export default function SettingsPage() {
    const { auth } = usePage<{ auth: SharedData['auth'] }>().props;
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    // Combined form for profile and password
    const form = useForm({
        first_name: auth.user?.name?.split(' ')[0] || '',
        last_name: auth.user?.name?.split(' ').slice(1).join(' ') || '',
        email: auth.user?.email || '',
        phone: '',
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const handleConfirmSave = () => {
        setShowConfirmDialog(false);
        form.put('/settings/profile', {
            onSuccess: () => {
                form.setData({
                    ...form.data,
                    current_password: '',
                    new_password: '',
                    new_password_confirmation: '',
                });
                toast.success('Pengaturan berhasil disimpan!', {
                    duration: 4000,
                    position: 'top-right',
                });
            },
            onError: () => {
                toast.error('Gagal menyimpan. Periksa kembali data Anda.', {
                    duration: 4000,
                    position: 'top-right',
                });
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmDialog(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan - Admin" />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Profile Card */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4 h-24 w-24">
                            <img
                                alt="Profile"
                                className="h-full w-full rounded-full object-cover ring-4 ring-slate-50 dark:ring-slate-800"
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user?.name || 'Admin')}&background=3b82f6&color=fff&size=96`}
                            />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {auth.user?.name || 'Admin User'}
                        </h3>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                            Super Administrator
                        </span>
                    </div>

                    {/* Settings Form - Single Card */}
                    <Card>
                        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Pengaturan Akun
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Perbarui informasi pribadi dan password Anda.
                            </p>
                        </div>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit}>
                                {/* Profile Section */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="col-span-1">
                                        <Label htmlFor="first-name">Nama Depan</Label>
                                        <Input
                                            id="first-name"
                                            className="mt-1"
                                            value={form.data.first_name}
                                            onChange={(e) => form.setData('first_name', e.target.value)}
                                        />
                                        {form.errors.first_name && (
                                            <p className="mt-1 text-sm text-red-500">{form.errors.first_name}</p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <Label htmlFor="last-name">Nama Belakang</Label>
                                        <Input
                                            id="last-name"
                                            className="mt-1"
                                            value={form.data.last_name}
                                            onChange={(e) => form.setData('last_name', e.target.value)}
                                        />
                                        {form.errors.last_name && (
                                            <p className="mt-1 text-sm text-red-500">{form.errors.last_name}</p>
                                        )}
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Mail className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <Input
                                                id="email"
                                                type="email"
                                                className="pl-10"
                                                value={form.data.email}
                                                onChange={(e) => form.setData('email', e.target.value)}
                                            />
                                        </div>
                                        {form.errors.email && (
                                            <p className="mt-1 text-sm text-red-500">{form.errors.email}</p>
                                        )}
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <Label htmlFor="phone">Nomor Telepon</Label>
                                        <Input
                                            id="phone"
                                            className="mt-1"
                                            value={form.data.phone}
                                            onChange={(e) => form.setData('phone', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Password Section */}
                                <Separator className="my-6" />
                                <div className="mb-4">
                                    <h3 className="text-md font-semibold text-slate-900 dark:text-white">
                                        Ubah Password
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Kosongkan jika tidak ingin mengubah password.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div>
                                        <Label htmlFor="current-password">Password Saat Ini</Label>
                                        <Input
                                            id="current-password"
                                            type="password"
                                            className="mt-1"
                                            value={form.data.current_password}
                                            onChange={(e) => form.setData('current_password', e.target.value)}
                                        />
                                        {form.errors.current_password && (
                                            <p className="mt-1 text-sm text-red-500">{form.errors.current_password}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="new-password">Password Baru</Label>
                                        <Input
                                            id="new-password"
                                            type="password"
                                            className="mt-1"
                                            value={form.data.new_password}
                                            onChange={(e) => form.setData('new_password', e.target.value)}
                                        />
                                        {form.errors.new_password && (
                                            <p className="mt-1 text-sm text-red-500">{form.errors.new_password}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            className="mt-1"
                                            value={form.data.new_password_confirmation}
                                            onChange={(e) => form.setData('new_password_confirmation', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-6 flex justify-end">
                                    <Button 
                                        type="submit" 
                                        className="bg-blue-600 hover:bg-blue-700"
                                        disabled={form.processing}
                                    >
                                        {form.processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            'Simpan Perubahan'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Simpan</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menyimpan perubahan pengaturan akun ini?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleConfirmSave}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Ya, Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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
        </AppLayout>
    );
}
