import BookOpen from 'lucide-svelte/icons/book-open';
import Bot from 'lucide-svelte/icons/bot';
import Settings2 from 'lucide-svelte/icons/settings-2';
import LayoutDashboard from 'lucide-svelte/icons/layout-dashboard';
export const navItems = [
    {
        title: 'Dashbord',
        url: '/dashboard',
        icon: LayoutDashboard,
        isActive: true
    },
    {
        title: 'Models',
        url: '#',
        icon: Bot,
        isActive: false,
    },
    {
        title: 'Documentation',
        url: '#',
        icon: BookOpen,
        isActive: false,
    },
    {
        title: 'Settings',
        url: '/profile',
        icon: Settings2,
        isActive: false,
    },
]