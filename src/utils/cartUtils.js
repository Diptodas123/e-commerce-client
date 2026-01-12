/**
 * Calculate the effective price for a cart item (sale price or regular price)
 */
export const getItemPrice = (item) => {
    return item?.salePrice > 0 ? item.salePrice : item.price;
};

/**
 * Calculate the total price for a cart item (price * quantity)
 */
export const getItemTotal = (item) => {
    return getItemPrice(item) * item.quantity;
};

/**
 * Calculate the total amount for all cart items
 */
export const getCartTotal = (cartItems) => {
    return cartItems?.reduce((total, item) => total + getItemTotal(item), 0) || 0;
};
