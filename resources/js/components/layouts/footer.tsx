import { Link } from '@inertiajs/react';
import { GlobeIcon, MailIcon } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-auto border-t bg-card">
            <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="mb-4 block text-xl font-bold">
                            Gudang Sparepart
                        </Link>
                        <p className="max-w-xs text-sm text-muted-foreground">
                            Mempermudah perawatan motor melalui percakapan
                            cerdas. Temukan sparepart lebih cepat, berkendara
                            lebih cepat.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 font-bold">Produk</h4>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    className="transition-colors hover:text-blue-600"
                                    href="/products"
                                >
                                    Katalog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="transition-colors hover:text-blue-600"
                                    href="/products"
                                >
                                    Daftar Merek
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="transition-colors hover:text-blue-600"
                                    href="/booking-status"
                                >
                                    Cek Booking
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-bold">Bantuan</h4>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    className="transition-colors hover:text-blue-600"
                                    href="/"
                                >
                                    Pusat Bantuan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="transition-colors hover:text-blue-600"
                                    href="/"
                                >
                                    Hubungi Kami
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="transition-colors hover:text-blue-600"
                                    href="/"
                                >
                                    Syarat Layanan
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Gudang Sparepart. Hak
                        cipta dilindungi.
                    </p>
                    <div className="flex gap-4">
                        <a
                            className="text-muted-foreground transition-colors hover:text-blue-600"
                            href="#"
                        >
                            <GlobeIcon className="h-5 w-5" />
                        </a>
                        <a
                            className="text-muted-foreground transition-colors hover:text-blue-600"
                            href="mailto:info@gudangsparepart.com"
                        >
                            <MailIcon className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
