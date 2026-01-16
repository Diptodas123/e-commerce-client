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
import { Badge } from '@/components/ui/badge';
import { logoutUser } from '@/store/auth-slice';
import CartWrapper from './CartWrapper';
import { useEffect, useState } from 'react';
import { fetchCartItems } from '@/store/shop/cart-slice';
import { Label } from '@/components/ui/label';

function MenuItems() {

    const navigate = useNavigate();

    const handleNavigate = (clickedMenuItem) => {
        sessionStorage.removeItem('filters');

        const isHomeMenuItem = clickedMenuItem === 'home';
        if (isHomeMenuItem) {
            return navigate('/shop/home');
        }

        const currentFilter = {
            category: [clickedMenuItem]
        };

        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate('/shop/listing');
    }

    return (
        <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
            {
                shoppingViewHeaderMenuItems.map(menuItem =>
                    <Label
                        onClick={() => handleNavigate(menuItem.id)}
                        key={menuItem.id}
                        className='text-sm font-medium cursor-pointer'
                    >
                        {menuItem.label}
                    </Label>
                )
            }
        </nav>
    );
}

function HeaderRightContent() {

    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart);
    const [openCartSheet, setOpenCartSheet] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch user cart items on component mount
    useEffect(() => {
        dispatch(fetchCartItems(user.id))
    }, [dispatch, user.id]);

    const cartCount = cartItems.length ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

    return (
        <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
            <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
                <Button variant='outline' size='icon' className='relative' onClick={() => setOpenCartSheet(true)}>
                    <ShoppingCart className='h-6 w-6' />
                    {cartCount > 0 && (
                        <Badge className='absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs'>
                            {cartCount}
                        </Badge>
                    )}
                    <span className='sr-only'>View cart</span>
                </Button>
                <CartWrapper cartItems={cartItems} />
            </Sheet>
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