import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    cartItems: []
};

export const addToCart = createAsyncThunk("/cart/add",
    async ({ productId, quantity, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/cart/${userId}`, { productId, quantity }, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error adding to cart" });
        }
    }
);

export const fetchCartItems = createAsyncThunk("/cart/fetchcartitems",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/cart/${userId}`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching cart items" });
        }
    }
);

export const removeFromCart = createAsyncThunk("/cart/removefromcart",
    async ({ productId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/cart/${productId}/${userId}`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error removing from cart" });
        }
    }
);

export const updateCartItemQuantity = createAsyncThunk("/cart/updatequantity",
    async ({ productId, quantity, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/cart/${productId}/${userId}`, { quantity }, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error updating cart item quantity" });
        }
    }
);

const shopCartSlice = createSlice({
    name: "shopCartSlice",
    initialState,
    reducers: {},
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

export default shopCartSlice.reducer;
