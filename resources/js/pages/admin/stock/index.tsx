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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Textarea } from '@/components/ui/textarea';
import { formatPrice, ProductStatusBadge } from '@/helper/functions';
import AppLayout from '@/layouts/app-layout';
import { type SharedData, type Product, type AllProduct, type Filters, BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    Edit,
    ImagePlus,
    Loader2,
    Plus,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Panel',
        href: '/admin',
    },
    {
        title: 'Manajemen Stok',
        href: '/stock',
    },
];


export default function StockManagement() {
    const { auth, products, filters } = usePage<{
        auth: SharedData['auth'];
        products: AllProduct;
        filters: Filters;
    }>().props;

    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState<'all' | string>(
        filters?.status || 'all',
    );
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Image upload states
    const [createImagePreview, setCreateImagePreview] = useState<string | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
    const createImageRef = useRef<HTMLInputElement>(null);
    const editImageRef = useRef<HTMLInputElement>(null);

    // Create form using Inertia useForm
    const createForm = useForm<{
        name: string;
        category: string;
        price: string;
        stock: string;
        original_price: string;
        brand: string;
        description: string;
        image: File | null;
    }>({
        name: '',
        category: '',
        price: '',
        stock: '',
        original_price: '',
        brand: '',
        description: '',
        image: null,
    });

    // Edit form using Inertia useForm
    const editForm = useForm<{
        name: string;
        category: string;
        price: string;
        stock: string;
        original_price: string;
        brand: string;
        description: string;
        image: File | null;
        _method?: string;
    }>({
        name: '',
        category: '',
        price: '',
        stock: '',
        original_price: '',
        brand: '',
        description: '',
        image: null,
    });

    // Build pagination URL with current filters
    const buildPaginationUrl = (page: number) => {
        const params = new URLSearchParams();
        if (filters?.category) params.set('category', filters.category);
        if (filters?.status) params.set('status', filters.status);
        if (filters?.search) params.set('search', filters.search);
        params.set('page', page.toString());
        return `/stock?${params.toString()}`;
    };

    // Filter products (client-side filtering for display)
    const filteredProducts = products?.data.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || product.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Handle create image change
    const handleCreateImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            createForm.setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCreateImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle edit image change
    const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            editForm.setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove create image
    const removeCreateImage = () => {
        createForm.setData('image', null);
        setCreateImagePreview(null);
        if (createImageRef.current) {
            createImageRef.current.value = '';
        }
    };

    // Remove edit image
    const removeEditImage = () => {
        editForm.setData('image', null);
        setEditImagePreview(null);
        if (editImageRef.current) {
            editImageRef.current.value = '';
        }
    };

    // Handle add product
    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/stock', {
            forceFormData: true,
            onSuccess: () => {
                setIsAddDialogOpen(false);
                createForm.reset();
                setCreateImagePreview(null);
                toast.success('Produk berhasil ditambahkan!', {
                    duration: 4000,
                    position: 'top-right',
                });
            },
            onError: () => {
                toast.error('Gagal menambahkan produk. Periksa kembali data Anda.', {
                    duration: 4000,
                    position: 'top-right',
                });
            },
        });
    };

    // Handle edit product
    const handleEditProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;
        
        editForm.post(`/stock/${selectedProduct.id}`, {
            forceFormData: true,
            headers: {
                'X-HTTP-Method-Override': 'PUT',
            },
            onSuccess: () => {
                setIsEditDialogOpen(false);
                setSelectedProduct(null);
                editForm.reset();
                setEditImagePreview(null);
                toast.success('Produk berhasil diperbarui!', {
                    duration: 4000,
                    position: 'top-right',
                });
            },
            onError: () => {
                toast.error('Gagal memperbarui produk. Periksa kembali data Anda.', {
                    duration: 4000,
                    position: 'top-right',
                });
            },
        });
    };

    // Handle delete product
    const handleDeleteProduct = () => {
        if (!selectedProduct) return;
        setIsDeleting(true);
        
        router.delete(`/stock/${selectedProduct.id}`, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                setSelectedProduct(null);
                toast.success('Produk berhasil dihapus!', {
                    duration: 4000,
                    position: 'top-right',
                });
            },
            onError: () => {
                toast.error('Gagal menghapus produk.', {
                    duration: 4000,
                    position: 'top-right',
                });
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    // Open edit dialog
    const openEditDialog = (product: Product) => {
        setSelectedProduct(product);
        editForm.setData({
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            stock: product.stock.toString(),
            original_price: product.original_price?.toString() || '',
            brand: product.brand || '',
            description: product.description || '',
            image: null,
        });
        // Set existing image as preview if available
        if (product.image_url) {
            setEditImagePreview(product.image_url);
        } else {
            setEditImagePreview(null);
        }
        setIsEditDialogOpen(true);
    };

    // Open delete dialog
    const openDeleteDialog = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteDialogOpen(true);
    };

    // Reset create form when dialog closes
    const handleAddDialogChange = (open: boolean) => {
        setIsAddDialogOpen(open);
        if (!open) {
            createForm.reset();
            setCreateImagePreview(null);
            if (createImageRef.current) {
                createImageRef.current.value = '';
            }
        }
    };

    // Reset edit form when dialog closes
    const handleEditDialogChange = (open: boolean) => {
        setIsEditDialogOpen(open);
        if (!open) {
            setSelectedProduct(null);
            editForm.reset();
            setEditImagePreview(null);
            if (editImageRef.current) {
                editImageRef.current.value = '';
            }
        }
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
                                Kelola data suku cadang, stok, dan harga produk.
                            </p>
                        </div>

                        {/* Add Product Dialog */}
                        <Dialog
                            open={isAddDialogOpen}
                            onOpenChange={handleAddDialogChange}
                        >
                            <DialogTrigger asChild>
                                <Button className="rounded-md bg-blue-600 text-white shadow-blue-600/25 hover:bg-blue-700">
                                    <Plus />
                                    Tambah Barang Baru
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <form onSubmit={handleAddProduct}>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Tambah Barang Baru
                                        </DialogTitle>
                                        <DialogDescription>
                                            Masukkan informasi barang baru yang akan
                                            ditambahkan.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <span className='flex gap-2 lg:gap-4 flex-col lg:flex-row'>

                                            {/* Image Upload */}
                                            <div className="grid gap-2">
                                                <Label>Gambar Produk</Label>
                                                <div className="flex items-center gap-4">
                                                    {createImagePreview ? (
                                                        <div className="relative">
                                                            <img
                                                                src={createImagePreview}
                                                                alt="Preview"
                                                                className="h-24 w-24 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={removeCreateImage}
                                                                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <label
                                                            htmlFor="create-image"
                                                            className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
                                                        >
                                                            <ImagePlus className="h-8 w-8 text-slate-400" />
                                                            <span className="mt-1 text-xs text-slate-500">Upload</span>
                                                        </label>
                                                    )}
                                                    <input
                                                        ref={createImageRef}
                                                        id="create-image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleCreateImageChange}
                                                        className="hidden"
                                                    />
                                                </div>
                                                {createForm.errors.image && (
                                                    <p className="text-sm text-red-500">{createForm.errors.image}</p>
                                                )}
                                            </div>

                                            <span className='grid gap-2 flex-grow'>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="create-name">
                                                        Nama Barang <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input
                                                        id="create-name"
                                                        value={createForm.data.name}
                                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                                        placeholder="Contoh: Yamalube Oil Sport"
                                                    />
                                                    {createForm.errors.name && (
                                                        <p className="text-sm text-red-500">{createForm.errors.name}</p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="create-category">
                                                        Kategori <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input
                                                        id="create-category"
                                                        value={createForm.data.category}
                                                        onChange={(e) => createForm.setData('category', e.target.value)}
                                                        placeholder="Contoh: Oli Mesin 4 Tak"
                                                    />
                                                    {createForm.errors.category && (
                                                        <p className="text-sm text-red-500">{createForm.errors.category}</p>
                                                    )}
                                                </div>
                                            </span>
                                        </span>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="create-original-price">Harga Awal (Rp) <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="create-original-price"
                                                    type="number"
                                                    value={createForm.data.original_price}
                                                    onChange={(e) => createForm.setData('original_price', e.target.value)}
                                                    placeholder="65000"
                                                />
                                                {createForm.errors.original_price && (
                                                    <p className="text-sm text-red-500">{createForm.errors.original_price}</p>
                                                )}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="create-price">Harga Diskon (Rp)</Label>
                                                <Input
                                                    id="create-price"
                                                    type="number"
                                                    value={createForm.data.price}
                                                    onChange={(e) => createForm.setData('price', e.target.value)}
                                                    placeholder="65000"
                                                />
                                                {createForm.errors.price && (
                                                    <p className="text-sm text-red-500">{createForm.errors.price}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="create-stock">Stok <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="create-stock"
                                                    type="number"
                                                    value={createForm.data.stock}
                                                    onChange={(e) => createForm.setData('stock', e.target.value)}
                                                    placeholder="0"
                                                />
                                                {createForm.errors.stock && (
                                                    <p className="text-sm text-red-500">{createForm.errors.stock}</p>
                                                )}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="create-brand">Brand</Label>
                                                <Input
                                                    id="create-brand"
                                                    value={createForm.data.brand}
                                                    onChange={(e) => createForm.setData('brand', e.target.value)}
                                                    placeholder="Contoh: Yamaha"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="create-description">Deskripsi</Label>
                                            <Textarea
                                                id="create-description"
                                                value={createForm.data.description}
                                                onChange={(e) => createForm.setData('description', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => handleAddDialogChange(false)}
                                        >
                                            Batal
                                        </Button>
                                        <Button 
                                            type="submit"
                                            disabled={createForm.processing}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            {createForm.processing ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Menyimpan...
                                                </>
                                            ) : (
                                                'Simpan'
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Search & Filter Toolbar */}
                     <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between dark:bg-slate-900">
                        {/* Search */}
                        <div className="relative w-full lg:max-w-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <Input
                                className="pl-10"
                                placeholder="Cari suku cadang..."
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
                                className={`cursor-pointer  rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                    statusFilter === 'all'
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'border bg-card text-muted-foreground hover:bg-muted'
                                }`}
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
                               className={`cursor-pointer  rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                        statusFilter === 'tersedia'
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'border bg-card text-muted-foreground hover:bg-muted'
                                    }`}
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
                                className={`cursor-pointer  rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                        statusFilter === 'menipis'
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'border bg-card text-muted-foreground hover:bg-muted'
                                    }`}
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
                                className={`cursor-pointer  rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                        statusFilter === 'habis'
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'border bg-card text-muted-foreground hover:bg-muted'
                                    }`}
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
                                            Kategori
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
                                        <th className="px-6 py-4 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
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
                                                            backgroundImage: `url('${product.image_url}')`,
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
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-900 dark:text-white">
                                                {formatPrice(product.price)}
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
                                                <ProductStatusBadge
                                                    status={product.status}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 bg-slate-100 text-blue-600 hover:bg-slate-200 hover:text-blue-700 dark:text-slate-500"
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
                                                        className="h-8 w-8 text-slate-400 bg-red-50 text-red-600 dark:text-slate-500 hover:bg-red-100 hover:text-red-700"
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
                    </div>
                    {/* Pagination */}
                    {products?.last_page > 1 && (
                        <Pagination>
                            <PaginationContent>
                                {/* Previous Button */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={buildPaginationUrl(products.current_page - 1)}
                                        className={
                                            products.current_page === 1
                                                ? 'pointer-events-none opacity-50'
                                                : 'cursor-pointer'
                                        }
                                    />
                                </PaginationItem>

                                {/* Page Numbers */}
                                {(() => {
                                    const pages: (number | string)[] = [];
                                    const current = products.current_page;
                                    const last = products.last_page;

                                    pages.push(1);

                                    if (current > 3) {
                                        pages.push('ellipsis-start');
                                    }

                                    for (
                                        let i = Math.max(2, current - 1);
                                        i <= Math.min(last - 1, current + 1);
                                        i++
                                    ) {
                                        if (!pages.includes(i)) {
                                            pages.push(i);
                                        }
                                    }

                                    if (current < last - 2) {
                                        pages.push('ellipsis-end');
                                    }

                                    if (last > 1 && !pages.includes(last)) {
                                        pages.push(last);
                                    }

                                    return pages.map((page) =>
                                        typeof page === 'string' ? (
                                            <PaginationItem key={page}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        ) : (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href={buildPaginationUrl(page)}
                                                    isActive={page === current}
                                                    className="cursor-pointer"
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ),
                                    );
                                })()}

                                {/* Next Button */}
                                <PaginationItem>
                                    <PaginationNext
                                        href={buildPaginationUrl(products.current_page + 1)}
                                        className={
                                            products.current_page === products.last_page
                                                ? 'pointer-events-none opacity-50'
                                                : 'cursor-pointer'
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogChange}>
                <DialogContent className="sm:max-w-[500px]">
                    <form onSubmit={handleEditProduct}>
                        <DialogHeader>
                            <DialogTitle>Edit Barang</DialogTitle>
                            <DialogDescription>
                                Ubah informasi barang yang dipilih.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <span className='flex gap-2 lg:gap-4 flex-col lg:flex-row'>
                                {/* Image Upload */}
                                <div className="grid gap-2">
                                    <Label>Gambar Produk</Label>
                                    <div className="flex items-center gap-4">
                                        {editImagePreview ? (
                                            <div className="relative">
                                                <img
                                                    src={editImagePreview}
                                                    alt="Preview"
                                                    className="h-24 w-24 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeEditImage}
                                                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <label
                                                htmlFor="edit-image"
                                                className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
                                            >
                                                <ImagePlus className="h-8 w-8 text-slate-400" />
                                                <span className="mt-1 text-xs text-slate-500">Upload</span>
                                            </label>
                                        )}
                                        <input
                                            ref={editImageRef}
                                            id="edit-image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleEditImageChange}
                                            className="hidden"
                                        />
                                    </div>
                                    {editForm.errors.image && (
                                        <p className="text-sm text-red-500">{editForm.errors.image}</p>
                                    )}
                                </div>

                                <span className='grid gap-2 flex-grow'>
                                    <div className="grid gap-2">
                                <Label htmlFor="edit-name">
                                    Nama Barang <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="edit-name"
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    placeholder="Contoh: Yamalube Oil Sport"
                                />
                                {editForm.errors.name && (
                                    <p className="text-sm text-red-500">{editForm.errors.name}</p>
                                )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-category">
                                            Kategori <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="edit-category"
                                            value={editForm.data.category}
                                            onChange={(e) => editForm.setData('category', e.target.value)}
                                            placeholder="Contoh: Oli Mesin 4 Tak"
                                        />
                                        {editForm.errors.category && (
                                            <p className="text-sm text-red-500">{editForm.errors.category}</p>
                                        )}
                                    </div>
                                </span>
                            </span>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-original-price">Harga (Rp) <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="edit-original-price"
                                        type="number"
                                        value={editForm.data.original_price}
                                        onChange={(e) => editForm.setData('original_price', e.target.value)}
                                        placeholder="65000"
                                    />
                                    {editForm.errors.original_price && (
                                        <p className="text-sm text-red-500">{editForm.errors.original_price}</p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-price">Harga Diskon(Rp)</Label>
                                    <Input
                                        id="edit-price"
                                        type="number"
                                        value={editForm.data.price}
                                        onChange={(e) => editForm.setData('price', e.target.value)}
                                        placeholder="65000"
                                    />
                                    {editForm.errors.price && (
                                        <p className="text-sm text-red-500">{editForm.errors.price}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                 <div className="grid gap-2">
                                    <Label htmlFor="edit-stock">Stok <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="edit-stock"
                                        type="number"
                                        value={editForm.data.stock}
                                        onChange={(e) => editForm.setData('stock', e.target.value)}
                                        placeholder="0"
                                    />
                                    {editForm.errors.stock && (
                                        <p className="text-sm text-red-500">{editForm.errors.stock}</p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-brand">Brand</Label>
                                    <Input
                                        id="edit-brand"
                                        value={editForm.data.brand}
                                        onChange={(e) => editForm.setData('brand', e.target.value)}
                                        placeholder="Contoh: Yamaha"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-description">Deskripsi</Label>
                                <Textarea
                                    id="edit-description"
                                    value={editForm.data.description}
                                    onChange={(e) => editForm.setData('description', e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleEditDialogChange(false)}
                            >
                                Batal
                            </Button>
                            <Button 
                                type="submit"
                                disabled={editForm.processing}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {editForm.processing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    'Simpan Perubahan'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation AlertDialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Barang</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus{' '}
                            <strong>{selectedProduct?.name}</strong>? Tindakan
                            ini tidak dapat dibatalkan dan semua data terkait
                            produk ini akan dihapus secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteProduct}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Menghapus...
                                </>
                            ) : (
                                'Hapus'
                            )}
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
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#10B981',
                        },
                    },
                    error: {
                        style: {
                            background: '#EF4444',
                            color: '#fff',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#EF4444',
                        },
                    },
                }}
            />
        </AppLayout>
    );
}
