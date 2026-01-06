import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { BellIcon } from 'lucide-react';

// Helper function untuk format harga
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

// Helper function untuk status badge
const getStatusBadge = (status: string) => {
    switch (status) {
        case 'in_stock':
            return {
                text: 'Tersedia',
                className:
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            };
        case 'low_stock':
            return {
                text: 'Stok Terbatas',
                className:
                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
            };
        case 'out_of_stock':
            return {
                text: 'Habis',
                className:
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
            };
        default:
            return { text: 'Unknown', className: 'bg-gray-100 text-gray-700' };
    }
};

// Komponen ProductCard
interface Product {
    id: number;
    name: string;
    compatibility: string;
    price: number;
    status: string;
    image?: string;
    icon?: React.ComponentType;
    hasImage: boolean;
}

const ProductCard = ({ product }: { product: Product }) => {
    const statusBadge = getStatusBadge(product.status);
    const isOutOfStock = product.status === 'out_of_stock';

    return (
        <Link href={`/products/${product.id}`} className="h-full">
            <Card className="group flex h-full cursor-pointer flex-col overflow-hidden border transition-all hover:shadow-lg">
                <CardContent className="flex flex-1 flex-col p-4">
                    {/* Image Section */}
                    <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-muted">
                        {product.hasImage ? (
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    backgroundImage: `url('${product.image}')`,
                                }}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                                {product.icon && <product.icon />}
                            </div>
                        )}
                        <Badge
                            className={`absolute top-3 right-3 ${statusBadge.className} border-0`}
                        >
                            {statusBadge.text}
                        </Badge>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col">
                        <div className="text-xs font-medium text-muted-foreground">
                            Kompatibel: {product.compatibility}
                        </div>
                        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold transition-colors group-hover:text-blue-600">
                            {product.name}
                        </h3>
                        <div className="mt-auto flex items-center justify-between pt-2">
                            <span
                                className={`text-xl font-bold ${isOutOfStock ? 'text-muted-foreground' : 'text-blue-600'}`}
                            >
                                {formatPrice(product.price)}
                            </span>
                            <button
                                disabled
                                onClick={(e) => e.preventDefault()}
                                className={`h-8 w-8 items-center justify-center rounded-full transition-colors ${
                                    isOutOfStock
                                        ? 'flex bg-muted text-muted-foreground hover:bg-blue-600 hover:text-white'
                                        : 'hidden'
                                }`}
                            >
                                {isOutOfStock && (
                                    <BellIcon className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ProductCard;
