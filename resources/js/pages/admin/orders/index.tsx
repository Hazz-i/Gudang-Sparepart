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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPrice, getAvatarColor, getInitials, formatDate, StatusBadge } from '@/helper/functions';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Order } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Check, Download, Edit, Eye, Search, XIcon } from 'lucide-react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Panel',
        href: '/dashboard',
    },
    {
        title: 'Daftar Pesanan',
        href: '/orders',
    },
];


interface OrdersPageProps {
    orders: Order[];
}

export default function OrdersManagement({ orders }: OrdersPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showStatusDialog, setShowStatusDialog] = useState(false);
    const [newStatus, setNewStatus] = useState<Order['status']>('pending');
    const [isUpdating, setIsUpdating] = useState(false);

    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

    // Filter orders
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.booking_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = (order: Order, status: Order['status']) => {
        setSelectedOrder(order);
        setNewStatus(status);
        setShowStatusDialog(true);
    };

    const confirmStatusChange = () => {
        if (!selectedOrder) return;

        setIsUpdating(true);
        router.patch(
            `/orders/${selectedOrder.id}/status`,
            { status: newStatus },
            {
                onSuccess: () => {
                    toast.success('Status pesanan berhasil diperbarui!');
                    setShowStatusDialog(false);
                    setSelectedOrder(null);
                    setIsUpdating(false);
                },
                onError: () => {
                    toast.error('Gagal memperbarui status pesanan.');
                    setIsUpdating(false);
                },
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Pesanan - Admin" />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Page Heading */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
                                Daftar Pesanan
                            </h1>
                            <p className="mt-1 text-slate-500 dark:text-slate-400">
                                Kelola pesanan sparepart dari pelanggan.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="flex shrink-0 items-center gap-2"
                        >
                            <Download className="h-5 w-5" />
                            Export Data
                        </Button>
                    </div>

                    {/* Search & Filter Toolbar */}
                    <div className="flex flex-col gap-4 rounded-xl bg-white lg:flex-row lg:items-center lg:justify-between dark:bg-slate-900">
                        {/* Search */}
                        <div className="relative w-full lg:max-w-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <Input
                                className="pl-10"
                                placeholder="Cari kode booking, nama, atau email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                                Status:
                            </span>
                            <button
                                   className={`cursor-pointer  rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                        statusFilter === 'all' 
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'border bg-card text-muted-foreground hover:bg-muted'
                                    }`}
                                onClick={() => setStatusFilter('all')}
                            >
                                Semua ({orders.length})
                            </button>
                            <button
                                   className={`cursor-pointer  rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                        statusFilter === 'pending' 
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'border bg-card text-muted-foreground hover:bg-muted'
                                    }`}
                                onClick={() => setStatusFilter('pending')}
                            >
                                Menunggu ({orders.filter((o) => o.status === 'pending').length})
                            </button>
                            <button
                                   className={`cursor-pointer  rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                        statusFilter === 'confirmed' 
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'border bg-card text-muted-foreground hover:bg-muted'
                                    }`}
                                onClick={() => setStatusFilter('confirmed')}
                            >
                                Dikonfirmasi ({orders.filter((o) => o.status === 'confirmed').length})
                            </button>
                            <button
                                   className={`cursor-pointer  rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                        statusFilter === 'cancelled' 
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'border bg-card text-muted-foreground hover:bg-muted'
                                    }`}
                                onClick={() => setStatusFilter('cancelled')}
                            >
                                Dibatalkan ({orders.filter((o) => o.status === 'cancelled').length})
                            </button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Kode Booking
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Pelanggan
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Produk
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Total
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                            >
                                                <td className="px-6 py-4 font-mono text-sm font-medium whitespace-nowrap text-blue-600 dark:text-blue-400">
                                                    {order.booking_code}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${getAvatarColor(order.name)}`}
                                                        >
                                                            {getInitials(order.name)}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-slate-900 dark:text-white">
                                                                {order.name}
                                                            </div>
                                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                                {order.phone || order.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600 dark:text-slate-300">
                                                    <div className="font-medium">
                                                        {order.product?.name || '-'}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        {order.quantity} Unit
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-900 dark:text-white">
                                                    {formatPrice(order.total_price)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge status={order.status} />
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 bg-slate-100 text-blue-600 hover:bg-slate-200 hover:text-blue-700 dark:text-slate-500"
                                                            onClick={() => {
                                                                setSelectedOrder(order);
                                                                setIsDetailDialogOpen(true);
                                                            }}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        {order.status !== 'completed' && order.status !== 'cancelled' && order.status !== 'confirmed' && (
                                                            <>
                                                                <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="bg-yellow-50 text-yellow-700 ring-yellow-600/20 hover:bg-yellow-100 hover:text-yellow-800"
                                                                onClick={() =>
                                                                    handleStatusChange(order, 'confirmed')
                                                                }
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="bg-red-50 text-red-700 ring-red-600/20 hover:bg-red-100 hover:text-red-800"
                                                                onClick={() =>
                                                                handleStatusChange(order, 'cancelled')
                                                                }
                                                            >
                                                                <XIcon className="h-4 w-4" />
                                                            </Button>
                                                            </>
                                                        )}
                                                        {order.status === 'confirmed' && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="bg-green-50 text-green-700 ring-green-600/20 hover:bg-green-100 hover:text-green-800"
                                                            onClick={() =>
                                                                handleStatusChange(order, 'completed')
                                                            }
                                                        >
                                                            <Check className="h-4 w-4" />
                                                        </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                                Tidak ada pesanan ditemukan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Menampilkan{' '}
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        {filteredOrders.length}
                                    </span>{' '}
                                    dari{' '}
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        {orders.length}
                                    </span>{' '}
                                    pesanan
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Show Detail Modal */}
            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Detail Pesanan</DialogTitle>
                        <DialogDescription>
                            Kode Booking: <span className="font-semibold">{selectedOrder?.booking_code}</span>
                        </DialogDescription>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="space-y-6 py-4">
                            {/* Product Info */}
                            <div className="flex items-center gap-4 rounded-lg">
                                <div
                                    className="h-16 w-16 flex-shrink-0 rounded-lg bg-cover bg-center bg-slate-200"
                                    style={{ backgroundImage: selectedOrder.product?.image_url ? `url('${selectedOrder.product.image_url}')` : undefined }}
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900 dark:text-white">
                                        {selectedOrder.product?.name || '-'}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {selectedOrder.quantity} unit x {formatPrice(selectedOrder.product?.price || 0)}
                                    </p>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="space-y-3">
                                <h4 className="font-semibold text-slate-900 dark:text-white">Informasi Pelanggan</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <Label className="text-muted-foreground">Nama</Label>
                                        <p className="font-medium">{selectedOrder.name}</p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">Email</Label>
                                        <p className="font-medium">{selectedOrder.email}</p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">No. Telepon</Label>
                                        <p className="font-medium">{selectedOrder.phone || '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">Metode Pembayaran</Label>
                                        <p className="font-medium">{selectedOrder.payment_method}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Info */}
                            <div className="space-y-3">
                                <h4 className="font-semibold text-slate-900 dark:text-white">Informasi Pesanan</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <Label className="text-muted-foreground">Tanggal Pesanan</Label>
                                        <p className="font-medium">{formatDate(selectedOrder.created_at)}</p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">Status</Label>
                                        <div className="mt-1">
                                            <StatusBadge status={selectedOrder.status} />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-muted-foreground">Total Harga</Label>
                                        <p className="font-medium text-blue-600">{formatPrice(selectedOrder.total_price)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Evidence */}
                            {selectedOrder.evidence && (
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-slate-900 dark:text-white">Bukti Pembayaran</h4>
                                    <a
                                        href={`/storage/${selectedOrder.evidence}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <img
                                            src={`/storage/${selectedOrder.evidence}`}
                                            alt="Bukti pembayaran"
                                            className="h-48 w-full rounded-lg object-cover border border-slate-200 dark:border-slate-700 hover:opacity-90 transition-opacity"
                                        />
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Status Change Confirmation Dialog */}
            <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Perubahan Status</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin mengubah status pesanan{' '}
                            <span className="font-semibold">{selectedOrder?.booking_code}</span> menjadi{' '}
                            <span className="font-semibold">
                                {newStatus === 'pending'
                                    ? 'Menunggu'
                                    : newStatus === 'confirmed'
                                    ? 'Dikonfirmasi'
                                    : newStatus === 'completed'
                                    ? 'Selesai'
                                    : 'Dibatalkan'}
                            </span>
                            ?
                            {newStatus === 'cancelled' && (
                                <span className="mt-2 block text-red-600">
                                    Catatan: Membatalkan pesanan akan mengembalikan stok produk.
                                </span>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isUpdating}>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmStatusChange}
                            disabled={isUpdating}
                            className={
                                newStatus === 'confirmed'
                                    ? 'bg-yellow-600 hover:bg-yellow-700'
                                    : newStatus === 'cancelled'
                                    ? 'bg-red-600 hover:bg-red-700'
                                    : newStatus === 'completed'
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-yellow-600 hover:bg-yellow-700'
                            }
                        >
                            {isUpdating ? 'Memproses...' : 'Ya, Ubah Status'}
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
