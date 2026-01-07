import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Download, Search } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Panel',
        href: '/admin',
    },
    {
        title: 'Daftar Pesanan',
        href: '/orders',
    },
];

// Types
interface Order {
    id: string;
    customerName: string;
    customerPhone: string;
    customerInitials: string;
    customerColor: string;
    itemName: string;
    itemQty: number;
    itemPrice: number;
    motorType: string;
    bookingDate: string;
    status: 'menunggu' | 'dikonfirmasi' | 'selesai' | 'dibatalkan';
}

// Sample data
const sampleOrders: Order[] = [
    {
        id: '#ORD-2023-001',
        customerName: 'Budi Pratama',
        customerPhone: '0812-3456-7890',
        customerInitials: 'BP',
        customerColor: 'bg-purple-100 text-purple-600',
        itemName: 'Yamalube Oil Sport',
        itemQty: 2,
        itemPrice: 130000,
        motorType: 'Yamaha Vixion R',
        bookingDate: '12 Okt 2023',
        status: 'menunggu',
    },
    {
        id: '#ORD-2023-002',
        customerName: 'Siti Rahayu',
        customerPhone: '0813-9876-5432',
        customerInitials: 'SR',
        customerColor: 'bg-green-100 text-green-600',
        itemName: 'Kampas Rem Depan NMAX',
        itemQty: 1,
        itemPrice: 85000,
        motorType: 'Yamaha NMAX 155',
        bookingDate: '11 Okt 2023',
        status: 'dikonfirmasi',
    },
    {
        id: '#ORD-2023-003',
        customerName: 'Ahmad Hidayat',
        customerPhone: '0857-1234-5678',
        customerInitials: 'AH',
        customerColor: 'bg-orange-100 text-orange-600',
        itemName: 'Busi Iridium Racing',
        itemQty: 4,
        itemPrice: 500000,
        motorType: 'Honda CBR250RR',
        bookingDate: '10 Okt 2023',
        status: 'selesai',
    },
    {
        id: '#ORD-2023-004',
        customerName: 'Dewi Lestari',
        customerPhone: '0811-2233-4455',
        customerInitials: 'DL',
        customerColor: 'bg-pink-100 text-pink-600',
        itemName: 'Spion Standard',
        itemQty: 2,
        itemPrice: 90000,
        motorType: 'Honda Scoopy',
        bookingDate: '09 Okt 2023',
        status: 'dibatalkan',
    },
    {
        id: '#ORD-2023-005',
        customerName: 'Riko Ardiansyah',
        customerPhone: '0822-5566-7788',
        customerInitials: 'RA',
        customerColor: 'bg-teal-100 text-teal-600',
        itemName: 'Ban Tubeless 90/80',
        itemQty: 1,
        itemPrice: 320000,
        motorType: 'Yamaha Mio M3',
        bookingDate: '09 Okt 2023',
        status: 'selesai',
    },
];

// Status badge component
function StatusBadge({ status }: { status: Order['status'] }) {
    const variants = {
        menunggu:
            'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20',
        dikonfirmasi:
            'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20',
        selesai:
            'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20',
        dibatalkan:
            'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
    };

    const labels = {
        menunggu: 'Menunggu Konfirmasi',
        dikonfirmasi: 'Dikonfirmasi',
        selesai: 'Selesai',
        dibatalkan: 'Dibatalkan',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${variants[status]}`}
        >
            {labels[status]}
        </span>
    );
}

// Format currency
function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID').format(amount);
}

export default function OrdersManagement() {
    const [orders] = useState<Order[]>(sampleOrders);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>(
        'all',
    );

    // Filter orders
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

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
                                Kelola pesanan spare part motor dari chatbot.
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
                    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between dark:border-slate-800 dark:bg-slate-900">
                        {/* Search */}
                        <div className="relative w-full lg:max-w-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <Input
                                className="pl-10"
                                placeholder="Cari ID Pesanan, Nama Customer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                                Status:
                            </span>
                            <Button
                                variant={
                                    statusFilter === 'all'
                                        ? 'default'
                                        : 'secondary'
                                }
                                size="sm"
                                className="rounded-full"
                                onClick={() => setStatusFilter('all')}
                            >
                                Semua
                            </Button>
                            <Button
                                variant={
                                    statusFilter === 'menunggu'
                                        ? 'default'
                                        : 'secondary'
                                }
                                size="sm"
                                className="rounded-full"
                                onClick={() => setStatusFilter('menunggu')}
                            >
                                Menunggu
                            </Button>
                            <Button
                                variant={
                                    statusFilter === 'dikonfirmasi'
                                        ? 'default'
                                        : 'secondary'
                                }
                                size="sm"
                                className="rounded-full"
                                onClick={() => setStatusFilter('dikonfirmasi')}
                            >
                                Dikonfirmasi
                            </Button>
                            <Button
                                variant={
                                    statusFilter === 'selesai'
                                        ? 'default'
                                        : 'secondary'
                                }
                                size="sm"
                                className="rounded-full"
                                onClick={() => setStatusFilter('selesai')}
                            >
                                Selesai
                            </Button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            ID Pesanan
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Nama Customer
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Barang Dipesan
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Tipe Motor
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Tanggal Booking
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
                                    {filteredOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        >
                                            <td className="px-6 py-4 font-mono text-sm font-medium whitespace-nowrap text-blue-600 dark:text-blue-400">
                                                {order.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${order.customerColor}`}
                                                    >
                                                        {order.customerInitials}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-slate-900 dark:text-white">
                                                            {order.customerName}
                                                        </div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                                            {order.customerPhone}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600 dark:text-slate-300">
                                                <div className="font-medium">
                                                    {order.itemName}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {order.itemQty} Unit • Rp{' '}
                                                    {formatCurrency(
                                                        order.itemPrice,
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600 dark:text-slate-400">
                                                {order.motorType}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-600 dark:text-slate-400">
                                                {order.bookingDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge
                                                    status={order.status}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <Button
                                                    variant="link"
                                                    className="h-auto p-0 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                                >
                                                    Detail
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Menampilkan{' '}
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        1
                                    </span>{' '}
                                    sampai{' '}
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        {filteredOrders.length}
                                    </span>{' '}
                                    dari{' '}
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        50
                                    </span>{' '}
                                    data
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Sebelumnya
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                >
                                    Selanjutnya
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
