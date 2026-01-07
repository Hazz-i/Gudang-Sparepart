import ChatbotWidget from '@/components/chatbot-widget';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { type Product, type SharedData, type AllProduct, type Filters } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { FilterIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';


export default function ProductsIndex() {
    const { auth, products, categories, filters } = usePage<{
        auth: SharedData['auth'];
        products: AllProduct;
        categories: string[];
        filters: Filters;
    }>().props;

    const [searchValue, setSearchValue] = useState(filters?.search || '');

    const handleCategoryClick = (category?: string) => {
        router.get(
            '/products',
            { ...filters, category, page: 1 },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/products',
            { ...filters, search: searchValue, page: 1 },
            { preserveState: true, preserveScroll: true },
        );
    };

    const buildPaginationUrl = (page: number) => {
        const params = new URLSearchParams();
        if (filters?.category) params.set('category', filters.category);
        if (filters?.brand) params.set('brand', filters.brand);
        if (filters?.status) params.set('status', filters.status);
        if (filters?.search) params.set('search', filters.search);
        params.set('page', page.toString());
        return `/products?${params.toString()}`;
    };

    return (
        <>
            <Head title="Daftar Produk Suku Cadang - Gudang Sparepart" />

            <div className="relative flex min-h-screen w-full flex-col bg-background">
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
                                <form
                                    onSubmit={handleSearch}
                                    className="relative"
                                >
                                    <Input
                                        className="h-10 w-full pr-4 pl-10 md:w-64"
                                        placeholder="Cari suku cadang..."
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) =>
                                            setSearchValue(e.target.value)
                                        }
                                    />
                                    <button
                                        type="submit"
                                        className="absolute top-2.5 left-3 text-muted-foreground"
                                    >
                                        <SearchIcon className="h-5 w-5" />
                                    </button>
                                </form>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <FilterIcon className="h-4 w-4" />
                                    Filter
                                </Button>
                            </div>
                        </div>

                        {/* Category Tabs */}
                        <div className="mb-6 flex gap-2 overflow-x-auto pb-4">
                            <button
                                onClick={() => handleCategoryClick(undefined)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                    !filters?.category
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'border bg-card text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                Semua Produk
                            </button>
                            {categories?.map((category) => (
                                <button
                                    key={category}
                                    onClick={() =>
                                        handleCategoryClick(category)
                                    }
                                    className={`cursor-pointer  rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                        filters?.category === category
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'border bg-card text-muted-foreground hover:bg-muted'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="flex-grow px-4 pb-16 sm:px-10">
                    <div className="mx-auto w-full max-w-[1280px]">
                        <div className="grid grid-cols-2 gap-2 lg:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                            {products?.data.map((product: any) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {products?.last_page > 1 && (
                            <div className="mt-12">
                                <Pagination>
                                    <PaginationContent>
                                        {/* Previous Button */}
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href={
                                                    products.current_page > 1
                                                        ? buildPaginationUrl(
                                                              products.current_page -
                                                                  1,
                                                          )
                                                        : undefined
                                                }
                                                className={
                                                    products.current_page === 1
                                                        ? 'pointer-events-none opacity-50'
                                                        : ''
                                                }
                                            />
                                        </PaginationItem>

                                        {/* Page Numbers */}
                                        {(() => {
                                            const pages: (number | string)[] =
                                                [];
                                            const current =
                                                products.current_page;
                                            const last = products.last_page;

                                            pages.push(1);

                                            if (current > 3) {
                                                pages.push('ellipsis-start');
                                            }

                                            for (
                                                let i = Math.max(
                                                    2,
                                                    current - 1,
                                                );
                                                i <=
                                                Math.min(last - 1, current + 1);
                                                i++
                                            ) {
                                                if (!pages.includes(i)) {
                                                    pages.push(i);
                                                }
                                            }

                                            if (current < last - 2) {
                                                pages.push('ellipsis-end');
                                            }

                                            if (
                                                last > 1 &&
                                                !pages.includes(last)
                                            ) {
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
                                                            href={buildPaginationUrl(
                                                                page,
                                                            )}
                                                            isActive={
                                                                page === current
                                                            }
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
                                                href={
                                                    products.current_page <
                                                    products.last_page
                                                        ? buildPaginationUrl(
                                                              products.current_page +
                                                                  1,
                                                          )
                                                        : undefined
                                                }
                                                className={
                                                    products.current_page ===
                                                    products.last_page
                                                        ? 'pointer-events-none opacity-50'
                                                        : ''
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
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
