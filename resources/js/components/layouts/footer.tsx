import { BotIcon, GlobeIcon, MailIcon } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-auto border-t bg-card">
            <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-2">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex items-center justify-center rounded-lg bg-blue-500/10 p-1.5 text-blue-600">
                                <BotIcon />
                            </div>
                            <span className="text-xl font-bold">
                                Gudang Sparepart
                            </span>
                        </div>
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
                                <a
                                    className="transition-colors hover:text-blue-600"
                                    href="#"
                                >
                                    Katalog
                                </a>
                            </li>
                            <li>
                                <a
                                    className="transition-colors hover:text-blue-600"
                                    href="#"
                                >
                                    Daftar Merek
                                </a>
                            </li>
                            <li>
                                <a
                                    className="transition-colors hover:text-blue-600"
                                    href="#"
                                >
                                    Harga
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-bold">Bantuan</h4>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    className="transition-colors hover:text-blue-600"
                                    href="#"
                                >
                                    Pusat Bantuan
                                </a>
                            </li>
                            <li>
                                <a
                                    className="transition-colors hover:text-blue-600"
                                    href="#"
                                >
                                    Hubungi Kami
                                </a>
                            </li>
                            <li>
                                <a
                                    className="transition-colors hover:text-blue-600"
                                    href="#"
                                >
                                    Syarat Layanan
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
                    <p className="text-xs text-muted-foreground">
                        © 2024 Gudang Sparepart. Hak cipta dilindungi.
                    </p>
                    <div className="flex gap-4">
                        <a
                            className="text-muted-foreground transition-colors hover:text-blue-600"
                            href="#"
                        >
                            <GlobeIcon />
                        </a>
                        <a
                            className="text-muted-foreground transition-colors hover:text-blue-600"
                            href="#"
                        >
                            <MailIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
