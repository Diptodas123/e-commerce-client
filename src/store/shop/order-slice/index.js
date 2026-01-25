import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    approvalURL: null,
    orderId: null,
    orderList: [],
    orderDetails: null,
};

export const createOrder = createAsyncThunk("/order/createNewOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/order`, orderData, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error creating order" });
        }
    }
);

export const capturePayment = createAsyncThunk("/order/capturePayment",
    async ({ userId, paymentData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/order/capture-payment/${userId}`, paymentData, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error creating order" });
        }
    }
);


export const getAllOrdersByUser = createAsyncThunk("/order/getAllOrdersByUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/order/user-orders/${userId}`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching orders" });
        }
    }
);

export const getOrderDetails = createAsyncThunk("/order/getOrderDetails",
    async ({ id, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/order/details/${userId}/${id}`, {
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
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalURL = action.payload.data.approvalURL;
                state.orderId = action.payload.data.orderId;
                sessionStorage.setItem('currentOrderId', JSON.stringify(state.orderId));
            })
            .addCase(createOrder.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(capturePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(capturePayment.fulfilled, (state) => {
                state.isLoading = false;
                state.approvalURL = null;
            })
            .addCase(capturePayment.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getAllOrdersByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            })
            .addCase(getAllOrdersByUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getOrderDetails.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default shopOrderSlice.reducer;
export const { resetOrderDetails } = shopOrderSlice.actions;
