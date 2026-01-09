import { Button } from '@/components/ui/button';
import { formatPrice, getInitials, ProductStatusBadge, getAvatarColor, StatusBadge } from '@/helper/functions';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type Product, type Order } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    CheckCircle,
    ClipboardList,
    Download,
    Info,
    Package,
    PackageCheck,
    ShoppingBag,
    Warehouse,
    XCircle,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        totalOrders: number;
        totalProducts: number;
        totalStock: number;
        lowStockCount: number;
    };
    lowStockProducts: Product[];
    orderStats: {
        pending: number;
        confirmed: number;
        cancelled: number;
        completed: number;
    };
    recentOrders: Order[];
}


export default function Dashboard({ stats, lowStockProducts, orderStats, recentOrders }: DashboardProps) {
    const maxOrders = Math.max(orderStats.pending, orderStats.confirmed, orderStats.cancelled, orderStats.completed, 1);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-7xl space-y-8">
                    {/* Page Heading */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
                                Dashboard Overview
                            </h1>
                            <p className="mt-1 text-slate-500 dark:text-slate-400">
                                Ringkasan metrik inventaris dan status pesanan
                                terkini.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="flex shrink-0 items-center gap-2"
                        >
                            <Download className="h-5 w-5" />
                            Unduh Laporan
                        </Button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Total Pesanan */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        Total Pesanan
                                    </p>
                                    <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                                        {stats.totalOrders.toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                    <ShoppingBag className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="font-medium text-slate-600 dark:text-slate-400">
                                    Semua pesanan masuk
                                </span>
                            </div>
                        </div>

                        {/* Jenis Produk */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        Jenis Produk
                                    </p>
                                    <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                                        {stats.totalProducts}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                                    <Package className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="font-medium text-slate-600 dark:text-slate-400">
                                    Aktif di katalog
                                </span>
                            </div>
                        </div>

                        {/* Total Stok Fisik */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        Total Stok Fisik
                                    </p>
                                    <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                                        {stats.totalStock.toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                                    <Warehouse className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                    Unit tersedia
                                </span>
                            </div>
                        </div>

                        {/* Perlu Restock */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-red-100 dark:border-slate-800 dark:bg-slate-900 dark:ring-red-900/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        Perlu Restock
                                    </p>
                                    <p className="mt-1 text-2xl font-bold text-red-600 dark:text-red-500">
                                        {stats.lowStockCount}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="font-medium text-red-600 dark:text-red-400">
                                    Item kritis / habis
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Low Stock Warning Table */}
                        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Peringatan Stok Menipis
                                </h2>
                                <Link
                                    href="/stock"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                >
                                    Lihat Semua
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                                Nama Barang
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                                Kategori
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                                Sisa Stok
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
                                        {lowStockProducts.length > 0 ? (
                                            lowStockProducts.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="h-8 w-8 flex-shrink-0 rounded-md bg-slate-100 bg-cover bg-center dark:bg-slate-800"
                                                                style={{
                                                                    backgroundImage: item.image_url ? `url('${item.image_url}')` : undefined,
                                                                }}
                                                            />
                                                            <div className="font-medium text-slate-900 dark:text-white">
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-slate-500 dark:text-slate-400">
                                                        {item.category}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`text-sm font-bold ${
                                                                item.stock === 0
                                                                    ? 'text-red-600 dark:text-red-400'
                                                                    : 'text-yellow-600 dark:text-yellow-400'
                                                            }`}
                                                        >
                                                            {item.stock}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                                        <ProductStatusBadge
                                                            status={item.status}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                                    Tidak ada produk dengan stok menipis
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Order Status */}
                        <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Status Pesanan
                                </h2>
                            </div>
                            <div className="flex flex-1 flex-col justify-center p-6">
                                <div className="space-y-6">
                                    {/* Pesanan Pending */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                            <ClipboardList className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="font-medium text-slate-900 dark:text-white">
                                                    Pending
                                                </p>
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    {orderStats.pending}
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                                                <div
                                                    className="h-2 rounded-full bg-blue-500"
                                                    style={{ width: `${(orderStats.pending / maxOrders) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Menunggu konfirmasi
                                            </p>
                                        </div>
                                    </div>

                                    {/* Pesanan Confirmed */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                            <CheckCircle className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="font-medium text-slate-900 dark:text-white">
                                                    Confirmed
                                                </p>
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    {orderStats.confirmed}
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                                                <div
                                                    className="h-2 rounded-full bg-green-500"
                                                    style={{ width: `${(orderStats.confirmed / maxOrders) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Pesanan dikonfirmasi
                                            </p>
                                        </div>
                                    </div>

                                    {/* Pesanan Cancelled */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                            <XCircle className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="font-medium text-slate-900 dark:text-white">
                                                    Cancelled
                                                </p>
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    {orderStats.cancelled}
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                                                <div
                                                    className="h-2 rounded-full bg-red-500"
                                                    style={{ width: `${(orderStats.cancelled / maxOrders) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Pesanan dibatalkan
                                            </p>
                                        </div>
                                    </div>

                                    {/* Pesanan Completed */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                                            <PackageCheck className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="font-medium text-slate-900 dark:text-white">
                                                    Completed
                                                </p>
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    {orderStats.completed}
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                                                <div
                                                    className="h-2 rounded-full bg-emerald-500"
                                                    style={{ width: `${(orderStats.completed / maxOrders) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Pesanan selesai
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="mt-8 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
                                    <div className="flex items-start gap-3">
                                        <Info className="h-5 w-5 text-slate-400" />
                                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                                            Pastikan untuk memproses pesanan
                                            pending sebelum pukul 15:00
                                            untuk pengiriman hari yang sama.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Section */}
                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Pesanan Terbaru
                            </h2>
                            <Link
                                href="/orders"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                            >
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Kode Booking
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Pelanggan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Produk
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Qty
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Total
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
                                    {recentOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
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
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                                                {order.product?.name || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                                                {order.quantity}
                                            </td>
                                            <td className="px-6 py-4 font-medium whitespace-nowrap text-slate-900 dark:text-white">
                                                {formatPrice(order.total_price)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={order.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    
                </div>
            </div>
        </AppLayout>
    );
}
