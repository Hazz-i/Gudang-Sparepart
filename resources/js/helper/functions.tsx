import { type Order } from '@/types';

// Status type
type StatusType = 'in_stock' | 'low_stock' | 'out_of_stock';


// Helper function untuk format harga
export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

// Format date
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

// Status badge component
export const StatusBadge = ({ status }: { status: Order['status'] }) => {
    const variants = {
        pending:
            'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20',
        confirmed:
            'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20',
        cancelled:
            'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
        completed:
            'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20',
    };

    const labels = {
        pending: 'Menunggu',
        confirmed: 'Dikonfirmasi',
        cancelled: 'Dibatalkan',
        completed: 'Selesai',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${variants[status]}`}
        >
            {labels[status]}
        </span>
    );
}

// Status badge component
export const ProductStatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, string> = {
        in_stock:
            'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20',
        low_stock:
            'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20',
        out_of_stock: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
    };

    const labels: Record<StatusType, string> = {
        in_stock: 'tersedia',
        low_stock: 'menipis',
        out_of_stock: 'habis',
    };

    const statusKey = status as StatusType;
    const variantClass = variants[statusKey] || variants.in_stock;
    const label = labels[statusKey] || status;

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${variantClass}`}
        >
            {label}
        </span>
    );
}

// Get initials from name
export const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

// Get color class based on name
export const getAvatarColor = (name: string): string => {
    const colors = [
        'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
        'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
        'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
        'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
        'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
}