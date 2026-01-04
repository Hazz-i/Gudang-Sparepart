import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { BotIcon } from 'lucide-react';

const Navbar = (auth: any) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-10">
                <Link href="/" className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-lg bg-blue-500/10 p-2 text-blue-600">
                        <BotIcon />
                    </div>
                    <h2 className="text-lg leading-tight font-bold tracking-tight">
                        Gudang Sparepart
                    </h2>
                </Link>

                <nav className="hidden items-center gap-9 md:flex">
                    <Link
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
                        href="#"
                    >
                        Beranda
                    </Link>
                    <Link
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
                        href="#"
                    >
                        Kategori
                    </Link>
                    <Link
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
                        href="#"
                    >
                        Cara Kerja
                    </Link>
                </nav>

                <div
                    className={`items-center gap-4 ${auth.user ? 'flex' : 'hidden'}`}
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
