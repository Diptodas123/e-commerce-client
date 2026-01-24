import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductsSlice from './admin/products-slice';
import shopProductsSlice from './shop/products-slice';
import cartSlice from './shop/cart-slice';
import addressSlice from './shop/address-slice';
import orderSlice from './shop/order-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shopProductsSlice,
        cart: cartSlice,
        address: addressSlice,
        order: orderSlice,
    },
});

export default store;