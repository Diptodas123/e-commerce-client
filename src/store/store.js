import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductsSlice from './admin/products-slice';
import shopProductsSlice from './shop/products-slice';
import cartSlice from './shop/cart-slice';
import addressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';
import adminOrderSlice from './admin/order-slice';
import searchSlice from './shop/search-slice';
import reviewSlice from './shop/review-slice';
import commonSlice from './common';

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shopProductsSlice,
        cart: cartSlice,
        address: addressSlice,
        shopOrder: shopOrderSlice,
        adminOrder: adminOrderSlice,
        search: searchSlice,
        reviews: reviewSlice,
        common : commonSlice
    },
});

export default store;