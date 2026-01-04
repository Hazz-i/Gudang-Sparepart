import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <Link
            className="group flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
            href={logout()}
            as="button"
            onClick={handleLogout}
            data-test="logout-button"
        >
            <UserInfo user={auth.user} />
            <LogOut className="size-4" />
        </Link>
    );
}
