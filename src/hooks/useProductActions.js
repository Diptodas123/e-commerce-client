import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '@/store/shop/products-slice';
import { addToCart } from '@/store/shop/cart-slice';
import { toast } from 'sonner';

const useProductActions = () => {
    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);
    const { productDetails } = useSelector(state => state.shopProducts);

    const [openProductDetailsDialog, setOpenProductDetailsDialog] = useState(false);

    const handleGetProductDetails = (productId) => {
        dispatch(fetchProductDetails(productId));
        setOpenProductDetailsDialog(true);
    };

    const handleAddToCart = (e, productId, availableStock) => {
        e.stopPropagation();

        const items = cartItems?.items || [];

        if (items.length) {
            const indexOfCurrentItem = items.findIndex(item => item.productId === productId);

            if (indexOfCurrentItem !== -1) {
                const currentQuantity = items[indexOfCurrentItem].quantity;

                if (currentQuantity + 1 > availableStock) {
                    toast.error("Cannot add more than available stock", {
                        duration: 3000,
                        position: 'top-right'
                    });
                    return;
                }
            }
        }

        dispatch(addToCart({ productId, userId: user.id, quantity: 1 })).then(data => {
            if (data.payload?.status === "success") {
                toast.success(data.payload?.message || "Product added to cart", {
                    duration: 3000,
                    position: 'top-right'
                });
            } else {
                toast.error(data.payload?.message || "Failed to add product to cart", {
                    duration: 5000,
                    position: 'top-right'
                });
            }
        });
    };

    return {
        handleGetProductDetails,
        handleAddToCart,
        openProductDetailsDialog,
        setOpenProductDetailsDialog,
        productDetails,
    };
};

export default useProductActions;
