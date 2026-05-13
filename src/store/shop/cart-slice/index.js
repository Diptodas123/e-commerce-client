import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

const initialState = {
    isLoading: false,
    cartItems: []
};

export const addToCart = createAsyncThunk("/cart/add",
    async ({ productId, quantity, userId }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`/api/shop/cart/${userId}`, { productId, quantity });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error adding to cart" });
        }
    }
);

export const fetchCartItems = createAsyncThunk("/cart/fetchcartitems",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/shop/cart/${userId}`);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching cart items" });
        }
    }
);

export const removeFromCart = createAsyncThunk("/cart/removefromcart",
    async ({ productId, userId }, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(`/api/shop/cart/${userId}/${productId}`);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error removing from cart" });
        }
    }
);

export const updateCartItemQuantity = createAsyncThunk("/cart/updatequantity",
    async ({ productId, quantity, userId }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`/api/shop/cart/${userId}/${productId}`, { quantity });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error updating cart item quantity" });
        }
    }
);

const shopCartSlice = createSlice({
    name: "shopCartSlice",
    initialState,
    reducers: {
        resetCart: (state) => {
            state.cartItems = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
        }).addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
        }).addCase(removeFromCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(removeFromCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(removeFromCart.rejected, (state) => {
            state.isLoading = false;
        }).addCase(updateCartItemQuantity.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(updateCartItemQuantity.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const { resetCart } = shopCartSlice.actions;
export default shopCartSlice.reducer;
