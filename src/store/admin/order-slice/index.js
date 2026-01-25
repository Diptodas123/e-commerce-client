import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null,
};

export const fetchAllOrders = createAsyncThunk("/order/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/order/admin/orders`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching orders" });
        }
    }
);

export const fetchOrderDetails = createAsyncThunk("/order/fetchOrderDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/order/admin/order-details/${id}`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching order details" });
        }
    }
);

const shopOrderSlice = createSlice({
    name: 'shopOrderSlice',
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            })
            .addCase(fetchAllOrders.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(fetchOrderDetails.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default shopOrderSlice.reducer;
export const { resetOrderDetails } = shopOrderSlice.actions;
