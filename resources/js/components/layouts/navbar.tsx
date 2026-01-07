import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

const Navbar = (auth: any) => {
    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/') {
            return url === '/';
        }
        return url.startsWith(path);
    };

    const linkClass = (path: string) =>
        `text-sm font-medium transition-colors ${
            isActive(path)
                ? 'text-blue-600 font-semibold'
                : 'text-muted-foreground hover:text-blue-600'
        }`;

    const mobileLinkClass = (path: string) =>
        `block px-4 py-3 text-base font-medium transition-colors rounded-lg ${
            isActive(path)
                ? 'text-blue-600 font-semibold bg-blue-50'
                : 'text-muted-foreground hover:text-blue-600 hover:bg-gray-50'
        }`;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-10 sm:py-6">
                <Link
                    href="/"
                    className="text-lg leading-tight font-bold tracking-tight"
                >
                    Gudang Sparepart
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-9 md:flex">
                    <Link className={linkClass('/')} href="/">
                        Beranda
                    </Link>
                    <Link className={linkClass('/products')} href="/products">
                        Produk
                    </Link>
                    <Link
                        className={linkClass('/booking-status')}
                        href="/booking-status"
                    >
                        Cek Booking
                    </Link>
                </nav>


                {/* Hamburger Menu Button - Mobile */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-gray-100 hover:text-foreground md:hidden"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <XIcon className="h-6 w-6" />
                    ) : (
                        <MenuIcon className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`overflow-hidden fixed top-16 z-50 w-full rounded-b-xl border-b transition-all duration-300 ease-in-out md:hidden ${
                    isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <nav className="border-t bg-background px-4 py-4">
                    <div className="flex flex-col gap-1 text-center">
                        <Link
                            className={mobileLinkClass('/')}
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Beranda
                        </Link>
                        <Link
                            className={mobileLinkClass('/products')}
                            href="/products"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Produk
                        </Link>
                        <Link
                            className={mobileLinkClass('/booking-status')}
                            href="/booking-status"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Cek Booking
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
