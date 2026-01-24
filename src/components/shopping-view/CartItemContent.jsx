import { Button } from '@/components/ui/button';
import { removeFromCart, updateCartItemQuantity } from '@/store/shop/cart-slice';
import { renderPrice } from '@/utils/convertToLocale';
import { getItemTotal } from '@/utils/cartUtils';
import { Minus, Plus, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

const CartItemContent = ({ cartItem }) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Handle quantity update
  const handleCartItemDelete = (itemToDelete) => {
    dispatch(removeFromCart({
      productId: itemToDelete.productId,
      userId: user.id
    }));
  }

  // Handle quantity update
  const handleUpdateQuantity = (itemToUpdate, newQuantity) => {
    dispatch(updateCartItemQuantity({
      productId: itemToUpdate.productId,
      quantity: newQuantity,
      userId: user.id
    }))
  }

  return (
    <div className='flex items-center space-x-4'>
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className='w-20 h-20 object-cover'
      />
      <div className='flex-1'>
        <h3 className='font-extrabold'>{cartItem.title}</h3>
        <div className='flex items-center mt-1 gap-3'>
          <Button
            className={"h-8 w-8 rounded-full"}
            variant='outline'
            size='icon'
            disabled={cartItem.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, cartItem.quantity - 1)}
          >
            <Minus className='w-4 h-4' />
            <span className='sr-only'>Decrease</span>
          </Button>
          <span className='font-semibold'>{cartItem.quantity}</span>
          <Button
            className={"h-8 w-8 rounded-full"}
            variant='outline'
            size='icon'
            onClick={() => handleUpdateQuantity(cartItem, cartItem.quantity + 1)}
          >
            <Plus className='w-4 h-4' />
            <span className='sr-only'>Increase</span>
          </Button>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <p className='font-semibold'>
          {renderPrice(getItemTotal(cartItem))}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className='cursor-pointer mt-1'
          size={20}
        />
      </div>
    </div>
  )
}

export default CartItemContent;
