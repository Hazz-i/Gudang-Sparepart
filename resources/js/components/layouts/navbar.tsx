import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';

const Navbar = (auth: any) => {
    const { url } = usePage();

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

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-10">
                <Link
                    href="/"
                    className="text-lg leading-tight font-bold tracking-tight"
                >
                    Gudang Sparepart
                </Link>

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

                <div
                    className={`items-center gap-4 ${auth.auth?.user ? 'flex' : 'hidden'}`}
                >
                    <Link href="/dashboard">
                        <Button className="bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700">
                            Dasbor
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
