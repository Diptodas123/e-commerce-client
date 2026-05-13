import image from '@/assets/banners/banner4.jpeg';
import Address from '@/components/shopping-view/Address';
import CartItemContent from '@/components/shopping-view/CartItemContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getCartTotal } from '@/utils/cartUtils';
import { renderPrice } from '@/utils/convertToLocale';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { createOrder } from '@/store/shop/order-slice';

const ShoppingCheckout = () => {

  const { cartItems } = useSelector(state => state.cart);
  const { approvalURL } = useSelector(state => state.shopOrder);
  const totalAmount = getCartTotal(cartItems?.items);
  const { currentSelectedAddress } = useSelector(state => state.address);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);

  const dispatch = useDispatch();

  const handleInitiatePayment = () => {
    if (!currentSelectedAddress) {
      toast.error("Please select a shipping address before proceeding to payment.", {
        position: 'top-right'
      });
      return;
    }
    setIsPaymentStarted(true);

    const orderData = {
      cartId: cartItems.cartId,
      cartItems: cartItems?.items?.map(item => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice || item.price,
        quantity: item.quantity
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        postalCode: currentSelectedAddress?.postalCode,
        country: currentSelectedAddress?.country,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount,
      paymentId: "",
      payerId: ""
    };

    dispatch(createOrder(orderData)).then(data => {
      if (data?.payload?.status === 'success') {
        // Payment initiation successful, approvalURL should be set in the state
        toast.success("Payment initiated successfully. Redirecting to PayPal...", {
          position: "top-right",
          duration: 3000,
        });
      } else if (data.payload?.data?.errors) {
        // Combine all validation errors into one message
        const errorMessages = data.payload.data.errors
          .map(err => `${err.field}: ${err.message}`)
          .join('\n');
        toast.error(errorMessages, {
          position: "top-right",
          duration: 5000,
        });
        setIsPaymentStarted(false);
      } else {
        toast.error(data.payload?.message || "Error initiating payment", {
          position: "top-right",
        });
        setIsPaymentStarted(false);
      }
    });
  }

  useEffect(() => {
    if (approvalURL && isPaymentStarted) {
      window.location.href = approvalURL;
    }
  }, [approvalURL, isPaymentStarted]);


  return (
    <div className="flex flex-col">
      <div className='relative h-90 w-full overflow-hidden'>
        <img
          src={image}
          alt="Checkout Banner"
          width={1600}
          height={300}
          className='h-full w-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-white'>Checkout</h1>
        </div>
      </div>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <Address />
          </div>

          <div className='lg:col-span-1'>
            <Card className='sticky top-4'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <ShoppingCart className='w-5 h-5' />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {cartItems?.items?.length > 0 ? (
                  <>
                    <div className='space-y-3 max-h-100 overflow-y-auto pr-2'>
                      {
                        cartItems?.items?.map(item => (
                          <CartItemContent key={item?.productId} cartItem={item} />
                        ))
                      }
                    </div>

                    <Separator />

                    <div className='space-y-2'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>Subtotal</span>
                        <span>{renderPrice(totalAmount)}</span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>Shipping</span>
                        <span className='text-green-600'>FREE</span>
                      </div>
                    </div>

                    <Separator />

                    <div className='flex justify-between items-center'>
                      <span className='text-lg font-bold'>Total</span>
                      <span className='text-2xl font-bold text-primary'>
                        {renderPrice(totalAmount)}
                      </span>
                    </div>

                    <Button className='w-full' size='lg' onClick={handleInitiatePayment}>
                      {
                        isPaymentStarted ? "Redirecting to PayPal..." : "Proceed to Payment"
                      }
                    </Button>
                  </>
                ) : (
                  <div className='text-center py-8'>
                    <ShoppingCart className='w-16 h-16 mx-auto text-gray-300 mb-4' />
                    <p className='text-muted-foreground'>Your cart is empty</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout;
