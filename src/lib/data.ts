import BookOpen from 'lucide-svelte/icons/book-open';
import Settings2 from 'lucide-svelte/icons/settings-2';
import LayoutDashboard from 'lucide-svelte/icons/layout-dashboard';
import  PersonStanding  from 'lucide-svelte/icons/person-standing';
import { Store } from 'lucide-svelte';
export const navItems = [
    {
        title: 'Dashbord',
        url: '/dashboard',
        icon: LayoutDashboard,
        isActive: true
    },
    {
        title: 'Farmers',
        url: '/farmers',
        icon: PersonStanding,
        isActive: false,
    },
    {
        title: 'Storage',
        url: '/storage',
        icon: Store,
        isActive: false,
    },
    {
        title: 'Settings',
        url: '/profile',
        icon: Settings2,
        isActive: false,
    },
]