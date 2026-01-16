import { ChartNoAxesCombined, LayoutDashboard, ShoppingBasket, TicketCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: <ShoppingBasket />
    }, {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <TicketCheck />
    }
];

const MenuItems = ({ navigate, setOpen }) => {

    return (
        <nav className='mt-8 flex flex-col gap-2'>
            {
                adminSidebarMenuItems.map((menuItem) => {
                    return (
                        <div key={menuItem.id}
                            className='flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground'
                            onClick={() => {
                                navigate(menuItem.path);
                                setOpen?.(false);
                            }}
                        >
                            {menuItem.icon}
                            <span>{menuItem.label}</span>
                        </div>
                    );
                })
            }
        </nav>
    );
};

const AdminSidebar = ({ open, setOpen }) => {

    const navigate = useNavigate();

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side='left' className='w-64'>
                    <div className='flex flex-col h-full'>
                        <SheetHeader className={'border-b'}>
                            <SheetTitle className={'flex gap-2 mt-5 mb-5 cursor-pointer text-2xl font-extrabold'}>
                                <ChartNoAxesCombined size={30} />
                                Admin Sidebar
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems navigate={navigate} setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>
            <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
                <div className='flex cursor-pointer items-center gap-2'
                    onClick={() => navigate('/admin/dashboard')}
                >
                    <ChartNoAxesCombined size={30} />
                    <h1 className='text-2xl font-extrabold'>Admin Sidebar</h1>
                </div>
                <MenuItems navigate={navigate} />
            </aside>
        </>
    )
}

export default AdminSidebar;