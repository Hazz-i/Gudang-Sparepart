import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Loader2, LogOut } from 'lucide-react';
import { useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const cleanup = useMobileNavigation();
    
    const [isLogout, setIsLogout] = useState<boolean>(false);
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

    const handleLogout = () => {
        setIsLoggingOut(true);
        cleanup();
        router.post(logout(), {}, {
            onFinish: () => {
                router.flushAll();
            },
        });
    };

    return (
        <>
        <button
            className="group flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
            onClick={() => setIsLogout(true)}
            data-test="logout-button"
        >
            <UserInfo user={auth.user} />
            <LogOut className="size-4" />
        </button>
        
        
        {/* Delete Confirmation AlertDialog */}
            <AlertDialog open={isLogout} onOpenChange={setIsLogout}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Keluar Aplikasi</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin keluar dari aplikasi?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsLogout(false)}>
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isLoggingOut ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Keluar...
                                </>
                            ) : (
                                'Keluar'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
