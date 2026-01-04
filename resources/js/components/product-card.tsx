import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BellIcon, ShoppingCartIcon } from 'lucide-react';

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
        <Card className="group overflow-hidden border transition-all hover:shadow-lg">
            <CardContent className="p-4">
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
                <div className="flex flex-col gap-1">
                    <div className="text-xs font-medium text-muted-foreground">
                        Kompatibel: {product.compatibility}
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold">
                        {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                        <span
                            className={`text-xl font-bold ${isOutOfStock ? 'text-muted-foreground' : 'text-blue-600'}`}
                        >
                            {formatPrice(product.price)}
                        </span>
                        <button
                            disabled={isOutOfStock}
                            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                                isOutOfStock
                                    ? 'cursor-not-allowed bg-muted text-muted-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-blue-600 hover:text-white'
                            }`}
                        >
                            {isOutOfStock ? <BellIcon /> : <ShoppingCartIcon />}
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
