import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    CheckCircle,
    ClipboardList,
    Download,
    Info,
    Package,
    ShoppingBag,
    TrendingUp,
    Warehouse,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Sample data for low stock items
const lowStockItems = [
    {
        id: 1,
        name: 'Kampas Rem Depan NMAX',
        sku: 'BRK-NMX-F',
        stock: 5,
        status: 'menipis',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsFLkCp4ZQDfqLGsRgGuMoM5FjTASVwNGddg_AvBYCwr_hXoJEhhBhR-CgDJhbzTMQe2u_8L9SSSVX9jd6Kv7upHpH3oSGPrSTq_TiCb8qmyGX_rAbV844zcZbigBUxHrcAErt2HGWhLoy6HY6W1cDWum23jX8KFybhmp14kPEgEh6YnUzEn0eUk7LePaNGDPin2es6NPbVy5-eJkZgENBts7yq29Pz0zvuXiufQObcRzUdgsUmkQFjWHQulEcC-muEApVSpFx5dk',
    },
    {
        id: 2,
        name: 'Spion Standard',
        sku: 'ACC-SP-02',
        stock: 0,
        status: 'habis',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm91j26a7VBAcVutAsPDe76TZ-uQXZS0zkpUcwaMhzudsdjlSqBvDDWYQNnmk1jViikBX2yb4YN6U6XHUGIgmLT2OG07U-ON4ATq6drcbdBDDt5wTyJ-u3WRMbG80x2E5zowlbICV3KEuLBmu37BA64ChhXzFScL35qA66dT5NM230h6PEEWYJD15whQoW9PlcJD8OgGxxkkVOwsfHSpJ8l86bsKuGusOM-8U_-6ERXSIV9SmRIajd0mTSp--NaL_iNEtASEvMW64',
    },
    {
        id: 3,
        name: 'Ban Tubeless 90/80',
        sku: 'WHL-TBL-14',
        stock: 2,
        status: 'kritis',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ9Am3RlwRt4eU7HjZBE1uCLUF3vaB-_xqa3ETt70aHnKYmyBd5w6_lTaq7oCrvOY6YjadH_Ue6IjiQKEk8M6m5r7gLpCP6n0fcVU6PY78I24JMET061dMVk_Nt6IppTfxfq6aypH4JWG3L3otnb-zwvoPyhgeLI9uAKeTE93bC-CPt4UvAx9MqfLqPjafn1x1kIpvyysJsxnrADaXh36Dp5uFrQuyGYVIAHmsUtaQAC6p9f3Kd226mA3FRTlFcB02v9cissOl_CE',
    },
    {
        id: 4,
        name: 'Busi Iridium Racing',
        sku: 'ENG-SPK-09',
        stock: 8,
        status: 'menipis',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQi2tM4uJOl3vJVLQl7Kg159A5m-QECh3DEdxsjld0whAF2F398YALkwQOd_1xyOcioXLS35mXNT_LJ3yJPD-loWrY0mQuSkrqjCSoz8KU5gis8T5F9CIFmvrXzpCnAmIt5VKfa9xK1OsCAq_qcDe5lfqQZHoPnqdjZDNBz9NVdYHoCD4Ven5zoC3b5XA2m0-ilLlbiEP4NjpgmdBuMS_7a9KepZqb0iccHRJQh85Ihtx7hbA3gWpafJdPcaPn2Xc6Q81lVCDpTvg',
    },
];

// Status badge component
function StockStatusBadge({ status }: { status: string }) {
    const variants: Record<string, string> = {
        menipis:
            'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20',
        habis: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
        kritis: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
    };

    const labels: Record<string, string> = {
        menipis: 'Menipis',
        habis: 'Habis',
        kritis: 'Kritis',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${variants[status]}`}
        >
            {labels[status]}
        </span>
    );
}

export default function Dashboard() {
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
                                        1,284
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                    <ShoppingBag className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="flex items-center font-medium text-green-600 dark:text-green-400">
                                    <TrendingUp className="mr-1 h-4 w-4" />
                                    +12.5%
                                </span>
                                <span className="ml-2 text-slate-500 dark:text-slate-400">
                                    dari bulan lalu
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
                                        142
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
                                        3,450
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                                    <Warehouse className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                    Kondisi Aman
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
                                        8
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
                                                SKU
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
                                        {lowStockItems.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="h-8 w-8 flex-shrink-0 rounded-md bg-slate-100 bg-cover bg-center dark:bg-slate-800"
                                                            style={{
                                                                backgroundImage: `url('${item.image}')`,
                                                            }}
                                                        />
                                                        <div className="font-medium text-slate-900 dark:text-white">
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-xs whitespace-nowrap text-slate-500 dark:text-slate-400">
                                                    {item.sku}
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
                                                    <StockStatusBadge
                                                        status={item.status}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Order Status Today */}
                        <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Status Pesanan Hari Ini
                                </h2>
                            </div>
                            <div className="flex flex-1 flex-col justify-center p-6">
                                <div className="space-y-6">
                                    {/* Pesanan Baru */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                            <ClipboardList className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="font-medium text-slate-900 dark:text-white">
                                                    Pesanan Baru
                                                </p>
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    12
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                                                <div
                                                    className="h-2 rounded-full bg-blue-500"
                                                    style={{ width: '65%' }}
                                                ></div>
                                            </div>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Menunggu konfirmasi admin
                                            </p>
                                        </div>
                                    </div>

                                    {/* Siap Dikirim */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                                            <Package className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="font-medium text-slate-900 dark:text-white">
                                                    Siap Dikirim
                                                </p>
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    5
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                                                <div
                                                    className="h-2 rounded-full bg-orange-500"
                                                    style={{ width: '35%' }}
                                                ></div>
                                            </div>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Sudah dipacking
                                            </p>
                                        </div>
                                    </div>

                                    {/* Selesai */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                            <CheckCircle className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="font-medium text-slate-900 dark:text-white">
                                                    Selesai
                                                </p>
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    45
                                                </span>
                                            </div>
                                            <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                                                <div
                                                    className="h-2 rounded-full bg-green-500"
                                                    style={{ width: '85%' }}
                                                ></div>
                                            </div>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                Diterima pelanggan
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
                                            "Siap Dikirim" sebelum pukul 15:00
                                            untuk pengiriman hari yang sama.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
