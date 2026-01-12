import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import CartItemContent from './CartItemContent.jsx';
import { renderPrice } from '@/utils/renderPrice';
import { ShoppingCart } from 'lucide-react';
import { getCartTotal } from '@/utils/cartUtils';

const CartWrapper = ({ cartItems }) => {

    const totalAmount = getCartTotal(cartItems);

    return (
        <SheetContent side='right' className='w-full sm:max-w-md p-6 flex flex-col'>
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            {
                cartItems?.length === 0 ? (
                    <div className='flex-1 flex flex-col items-center justify-center space-y-4 text-center'>
                        <div className='relative'>
                            <div className='absolute inset-0 bg-primary/5 rounded-full blur-3xl'></div>
                            <ShoppingCart className='relative h-32 w-32 text-muted-foreground/40 stroke-[1.5]' />
                        </div>
                        <div className='space-y-2'>
                            <p className='text-xl font-semibold text-foreground'>Your cart is empty</p>
                            <p className='text-sm text-muted-foreground max-w-xs'>
                                Discover amazing products and add them to your cart to get started!
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='mt-8 space-y-4 overflow-y-auto'>
                            {cartItems?.map(cartItem =>
                                <CartItemContent key={cartItem.productId} cartItem={cartItem} />
                            )}
                        </div>
                        <div className='pt-6 border-t space-y-3 mt-15'>
                            <div className='flex justify-between items-center'>
                                <span className='text-lg font-bold'>Total</span>
                                <span className='text-lg font-bold'>{renderPrice(totalAmount)}</span>
                            </div>
                            <Button className={"w-full"} size="lg">Checkout</Button>
                        </div>
                    </>
                )
            }
        </SheetContent>
    )
}

export default CartWrapper;
