import { Link, useNavigate } from 'react-router-dom';
import { HousePlug, LogOut, Menu, UserCog } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingViewHeaderMenuItems } from '@/config';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ShoppingCart } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { logoutUser } from '@/store/auth-slice';

function MenuItems() {
    return (
        <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
            {
                shoppingViewHeaderMenuItems.map(menuItem =>
                    <Link key={menuItem.id} to={menuItem.to} className='text-sm font-medium'>
                        {menuItem.label}
                    </Link>
                )
            }
        </nav>
    );
}

function HeaderRightContent() {

    const { user } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
            <Button variant='outline' size='icon'>
                <ShoppingCart className='h-6 w-6' />
                <span className='sr-only'>View cart</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className={"bg-black"}>
                        <AvatarFallback className={"bg-black text-white font-extrabold"}>
                            {user?.userName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='right' className={"w-56"}>
                    <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/shop/account")} className={"cursor-pointer"}>
                        <UserCog className='mr-2 h-4 w-4' />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => dispatch(logoutUser())} className={"cursor-pointer"}>
                        <LogOut className='mr-2 h-4 w-4' />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

const ShoppingHeader = () => {

    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <header className='sticky top-0 z-40 w-full border-b bg-background'>
            <div className='flex h-16 items-center justify-between px-4 md:px-6'>
                <Link to="/shop/home" className='flex items-center gap-2'>
                    <HousePlug className='h-6 w-6' />
                    <span className='font-bold'>ECommerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='outline' size='icon' className={"lg:hidden"}>
                            <Menu className='h-6 w-6' />
                            <span className='sr-only'>Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className={"w-full max-w-xs p-8"}>
                        <MenuItems />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>
                <div className='hidden lg:block'>
                    <MenuItems />
                </div>
                {
                    isAuthenticated ? (
                        <div className='hidden lg:block'>
                            <HeaderRightContent />
                        </div>
                    ) : null
                }
            </div>
        </header>
    )
}

export default ShoppingHeader;