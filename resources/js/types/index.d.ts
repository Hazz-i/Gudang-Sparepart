import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    products?: Product[];
    [key: string]: unknown;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    original_price: number;
    status: string;
    stock: number;
    brand: string;
    description: string;
    category: string;
    image_url?: string;
    icon?: React.ComponentType;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface AllProduct {
    current_page: number;
    data: Product[];
    first_page_url: string;
    from: number;
    to: number;
    total: number;
    per_page: number;
    last_page: number;
    last_page_url: string;
    links: Array<any>;
    next_page_url: string | null;
    prev_page_url: string | null;
};

export interface Filters {
    category?: string;
    brand?: string;
    status?: string;
    search?: string;
};

export interface Order {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    booking_code: string;
    evidence: string | null;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed' ;
    quantity: number;
    total_price: number;
    payment_method: string;
    product_id: number;
    product: Product;
    created_at: string;
}