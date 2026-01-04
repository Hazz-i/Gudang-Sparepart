import ChatbotWidget from '@/components/chatbot-widget';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products } from '@/helper/product';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    FilterIcon,
    SearchIcon,
} from 'lucide-react';

// Data kategori
const categories = [
    { id: 'all', name: 'Semua Produk', active: true },
    { id: 'engine', name: 'Mesin', active: false },
    { id: 'brakes', name: 'Rem', active: false },
    { id: 'tires', name: 'Ban & Velg', active: false },
    { id: 'electrical', name: 'Kelistrikan', active: false },
    { id: 'accessories', name: 'Aksesoris', active: false },
];

export default function ProductsIndex() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Daftar Produk Suku Cadang - Gudang Sparepart" />

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background">
                {/* Header */}
                <Navbar auth={auth} />

                {/* Page Header Section */}
                <section className="px-4 pt-8 pb-4 sm:px-10">
                    <div className="mx-auto w-full max-w-[1280px]">
                        {/* Title and Search */}
                        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h1 className="text-3xl font-black tracking-tight">
                                    Daftar Produk Suku Cadang
                                </h1>
                                <p className="mt-2 text-muted-foreground">
                                    Jelajahi inventaris suku cadang motor
                                    berkualitas tinggi kami.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <Input
                                        className="h-10 w-full pr-4 pl-10 md:w-64"
                                        placeholder="Cari suku cadang..."
                                        type="text"
                                    />
                                    <span className="absolute top-2.5 left-3 text-muted-foreground">
                                        <SearchIcon />
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <FilterIcon />
                                    Filter
                                </Button>
                            </div>
                        </div>

                        {/* Category Tabs */}
                        <div className="mb-6 flex gap-2 overflow-x-auto pb-4">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                        category.active
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'border bg-card text-muted-foreground hover:bg-muted'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="flex-grow px-4 pb-16 sm:px-10">
                    <div className="mx-auto w-full max-w-[1280px]">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products?.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center gap-1 rounded-lg border bg-card p-1 shadow-sm">
                                <button className="flex h-9 w-9 items-center justify-center rounded hover:bg-muted">
                                    <ChevronLeftIcon />
                                </button>
                                <button className="flex h-9 w-9 items-center justify-center rounded bg-blue-600 text-sm font-bold text-white shadow-sm">
                                    1
                                </button>
                                <button className="flex h-9 w-9 items-center justify-center rounded text-sm font-medium text-muted-foreground hover:bg-muted">
                                    2
                                </button>
                                <button className="flex h-9 w-9 items-center justify-center rounded text-sm font-medium text-muted-foreground hover:bg-muted">
                                    3
                                </button>
                                <span className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground">
                                    ...
                                </span>
                                <button className="flex h-9 w-9 items-center justify-center rounded text-sm font-medium text-muted-foreground hover:bg-muted">
                                    8
                                </button>
                                <button className="flex h-9 w-9 items-center justify-center rounded hover:bg-muted">
                                    <ChevronRightIcon />
                                </button>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <Footer />

                {/* Floating Chat Widget */}
                <ChatbotWidget />
            </div>
        </>
    );
}
