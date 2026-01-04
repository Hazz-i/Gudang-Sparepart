import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Edit,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Panel',
        href: '/admin',
    },
    {
        title: 'Manajemen Stok',
        href: '/admin/stock',
    },
];

// Types
interface Product {
    id: number;
    name: string;
    category: string;
    sku: string;
    price: number;
    stock: number;
    status: 'tersedia' | 'menipis' | 'habis';
    image: string;
}

// Sample data
const sampleProducts: Product[] = [
    {
        id: 1,
        name: 'Yamalube Oil Sport',
        category: 'Oli Mesin 4 Tak',
        sku: 'OIL-001',
        price: 65000,
        stock: 124,
        status: 'tersedia',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp3NENXGq9zrtJ-WSWwEHJ441uV0lt3kQLohpYnoZRYGQnwA7vz-F8Vi0M5FYF32aRX30my_l39q_go4D9Tw0anT2ayPmQ_UetVXYvxyee21PTwus4IvuFsmawnO-h3hhtKEerYMQvjxmZaFW5YBfcIPOc1LhJyBoIbGTzo0nj7PfXrRgmBzFZHt6qTADHCOFWx47SA-85kUbs5mkeu4-GUOWpuhIPSp8fGsqrR2ErcoWjUa-H8RJCCy0dYueKxpZkfCEYRqUL52o',
    },
    {
        id: 2,
        name: 'Kampas Rem Depan NMAX',
        category: 'Sistem Pengereman',
        sku: 'BRK-NMX-F',
        price: 85000,
        stock: 5,
        status: 'menipis',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsFLkCp4ZQDfqLGsRgGuMoM5FjTASVwNGddg_AvBYCwr_hXoJEhhBhR-CgDJhbzTMQe2u_8L9SSSVX9jd6Kv7upHpH3oSGPrSTq_TiCb8qmyGX_rAbV844zcZbigBUxHrcAErt2HGWhLoy6HY6W1cDWum23jX8KFybhmp14kPEgEh6YnUzEn0eUk7LePaNGDPin2es6NPbVy5-eJkZgENBts7yq29Pz0zvuXiufQObcRzUdgsUmkQFjWHQulEcC-muEApVSpFx5dk',
    },
    {
        id: 3,
        name: 'Spion Standard',
        category: 'Aksesoris Body',
        sku: 'ACC-SP-02',
        price: 45000,
        stock: 0,
        status: 'habis',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm91j26a7VBAcVutAsPDe76TZ-uQXZS0zkpUcwaMhzudsdjlSqBvDDWYQNnmk1jViikBX2yb4YN6U6XHUGIgmLT2OG07U-ON4ATq6drcbdBDDt5wTyJ-u3WRMbG80x2E5zowlbICV3KEuLBmu37BA64ChhXzFScL35qA66dT5NM230h6PEEWYJD15whQoW9PlcJD8OgGxxkkVOwsfHSpJ8l86bsKuGusOM-8U_-6ERXSIV9SmRIajd0mTSp--NaL_iNEtASEvMW64',
    },
    {
        id: 4,
        name: 'Busi Iridium Racing',
        category: 'Sistem Pengapian',
        sku: 'ENG-SPK-09',
        price: 125000,
        stock: 42,
        status: 'tersedia',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQi2tM4uJOl3vJVLQl7Kg159A5m-QECh3DEdxsjld0whAF2F398YALkwQOd_1xyOcioXLS35mXNT_LJ3yJPD-loWrY0mQuSkrqjCSoz8KU5gis8T5F9CIFmvrXzpCnAmIt5VKfa9xK1OsCAq_qcDe5lfqQZHoPnqdjZDNBz9NVdYHoCD4Ven5zoC3b5XA2m0-ilLlbiEP4NjpgmdBuMS_7a9KepZqb0iccHRJQh85Ihtx7hbA3gWpafJdPcaPn2Xc6Q81lVCDpTvg',
    },
    {
        id: 5,
        name: 'Ban Tubeless 90/80',
        category: 'Roda & Ban',
        sku: 'WHL-TBL-14',
        price: 320000,
        stock: 18,
        status: 'tersedia',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ9Am3RlwRt4eU7HjZBE1uCLUF3vaB-_xqa3ETt70aHnKYmyBd5w6_lTaq7oCrvOY6YjadH_Ue6IjiQKEk8M6m5r7gLpCP6n0fcVU6PY78I24JMET061dMVk_Nt6IppTfxfq6aypH4JWG3L3otnb-zwvoPyhgeLI9uAKeTE93bC-CPt4UvAx9MqfLqPjafn1x1kIpvyysJsxnrADaXh36Dp5uFrQuyGYVIAHmsUtaQAC6p9f3Kd226mA3FRTlFcB02v9cissOl_CE',
    },
];

// Status badge component
function StatusBadge({ status }: { status: Product['status'] }) {
    const variants = {
        tersedia:
            'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20',
        menipis:
            'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20',
        habis: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
    };

    const labels = {
        tersedia: 'Tersedia',
        menipis: 'Stok Menipis',
        habis: 'Habis',
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

export default function StockManagement() {
    const [products, setProducts] = useState<Product[]>(sampleProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | Product['status']>(
        'all',
    );
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        sku: '',
        price: '',
        stock: '',
    });

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || product.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle add product
    const handleAddProduct = () => {
        const stock = parseInt(formData.stock);
        let status: Product['status'] = 'tersedia';
        if (stock === 0) status = 'habis';
        else if (stock <= 10) status = 'menipis';

        const newProduct: Product = {
            id: products.length + 1,
            name: formData.name,
            category: formData.category,
            sku: formData.sku,
            price: parseInt(formData.price),
            stock: stock,
            status: status,
            image: 'https://via.placeholder.com/100',
        };

        setProducts([...products, newProduct]);
        setFormData({ name: '', category: '', sku: '', price: '', stock: '' });
        setIsAddDialogOpen(false);
    };

    // Handle edit product
    const handleEditProduct = () => {
        if (!selectedProduct) return;

        const stock = parseInt(formData.stock);
        let status: Product['status'] = 'tersedia';
        if (stock === 0) status = 'habis';
        else if (stock <= 10) status = 'menipis';

        const updatedProducts = products.map((product) =>
            product.id === selectedProduct.id
                ? {
                      ...product,
                      name: formData.name,
                      category: formData.category,
                      sku: formData.sku,
                      price: parseInt(formData.price),
                      stock: stock,
                      status: status,
                  }
                : product,
        );

        setProducts(updatedProducts);
        setFormData({ name: '', category: '', sku: '', price: '', stock: '' });
        setIsEditDialogOpen(false);
        setSelectedProduct(null);
    };

    // Handle delete product
    const handleDeleteProduct = () => {
        if (!selectedProduct) return;
        setProducts(products.filter((p) => p.id !== selectedProduct.id));
        setIsDeleteDialogOpen(false);
        setSelectedProduct(null);
    };

    // Open edit dialog
    const openEditDialog = (product: Product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            sku: product.sku,
            price: product.price.toString(),
            stock: product.stock.toString(),
        });
        setIsEditDialogOpen(true);
    };

    // Open delete dialog
    const openDeleteDialog = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Stok - Admin" />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Page Heading & Actions */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
                                Manajemen Stok
                            </h1>
                            <p className="mt-1 text-slate-500 dark:text-slate-400">
                                Kelola inventaris spare part motor untuk booking
                                chatbot.
                            </p>
                        </div>

                        {/* Add Product Dialog */}
                        <Dialog
                            open={isAddDialogOpen}
                            onOpenChange={setIsAddDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button className="flex shrink-0 items-center gap-2">
                                    <Plus className="h-5 w-5" />
                                    Tambah Barang Baru
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        Tambah Barang Baru
                                    </DialogTitle>
                                    <DialogDescription>
                                        Masukkan informasi barang baru yang akan
                                        ditambahkan ke inventaris.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">
                                            Nama Barang
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Contoh: Yamalube Oil Sport"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="category">
                                            Kategori
                                        </Label>
                                        <Input
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            placeholder="Contoh: Oli Mesin 4 Tak"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="sku">
                                                Kode SKU
                                            </Label>
                                            <Input
                                                id="sku"
                                                name="sku"
                                                value={formData.sku}
                                                onChange={handleInputChange}
                                                placeholder="OIL-001"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="stock">Stok</Label>
                                            <Input
                                                id="stock"
                                                name="stock"
                                                type="number"
                                                value={formData.stock}
                                                onChange={handleInputChange}
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">
                                            Harga (Rp)
                                        </Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="65000"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setIsAddDialogOpen(false)
                                        }
                                    >
                                        Batal
                                    </Button>
                                    <Button onClick={handleAddProduct}>
                                        Simpan
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
                                placeholder="Cari nama barang atau kode SKU..."
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
                                    statusFilter === 'tersedia'
                                        ? 'default'
                                        : 'secondary'
                                }
                                size="sm"
                                className="rounded-full"
                                onClick={() => setStatusFilter('tersedia')}
                            >
                                Tersedia
                            </Button>
                            <Button
                                variant={
                                    statusFilter === 'menipis'
                                        ? 'default'
                                        : 'secondary'
                                }
                                size="sm"
                                className="rounded-full"
                                onClick={() => setStatusFilter('menipis')}
                            >
                                Stok Menipis
                            </Button>
                            <Button
                                variant={
                                    statusFilter === 'habis'
                                        ? 'default'
                                        : 'secondary'
                                }
                                size="sm"
                                className="rounded-full"
                                onClick={() => setStatusFilter('habis')}
                            >
                                Habis
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
                                            Nama Barang
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Kode SKU
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Harga (Rp)
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Stok
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
                                    {filteredProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-100 bg-cover bg-center dark:bg-slate-800"
                                                        style={{
                                                            backgroundImage: `url('${product.image}')`,
                                                        }}
                                                    />
                                                    <div>
                                                        <div className="font-medium text-slate-900 dark:text-white">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                                            {product.category}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-slate-600 dark:text-slate-400">
                                                {product.sku}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-900 dark:text-white">
                                                {formatCurrency(product.price)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`text-sm ${
                                                        product.stock === 0
                                                            ? 'font-bold text-red-600 dark:text-red-400'
                                                            : product.stock <=
                                                                10
                                                              ? 'font-bold text-yellow-600 dark:text-yellow-400'
                                                              : 'text-slate-600 dark:text-slate-400'
                                                    }`}
                                                >
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge
                                                    status={product.status}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-400 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                                                        onClick={() =>
                                                            openEditDialog(
                                                                product,
                                                            )
                                                        }
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:text-slate-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                                                        onClick={() =>
                                                            openDeleteDialog(
                                                                product,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
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
                                        {filteredProducts.length}
                                    </span>{' '}
                                    dari{' '}
                                    <span className="font-medium text-slate-900 dark:text-white">
                                        {products.length}
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

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Barang</DialogTitle>
                        <DialogDescription>
                            Ubah informasi barang yang dipilih.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Nama Barang</Label>
                            <Input
                                id="edit-name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Contoh: Yamalube Oil Sport"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-category">Kategori</Label>
                            <Input
                                id="edit-category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="Contoh: Oli Mesin 4 Tak"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-sku">Kode SKU</Label>
                                <Input
                                    id="edit-sku"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleInputChange}
                                    placeholder="OIL-001"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-stock">Stok</Label>
                                <Input
                                    id="edit-stock"
                                    name="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-price">Harga (Rp)</Label>
                            <Input
                                id="edit-price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="65000"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button onClick={handleEditProduct}>
                            Simpan Perubahan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Hapus Barang</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus{' '}
                            <strong>{selectedProduct?.name}</strong>? Tindakan
                            ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteProduct}
                        >
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
