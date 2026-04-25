import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '@/lib/apiClient';

const initialState = {
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null,
};

export const fetchAllOrders = createAsyncThunk("/order/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/api/admin/orders');
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching orders" });
        }
    }
);

export const fetchOrderDetails = createAsyncThunk("/order/fetchOrderDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/admin/orders/${id}`);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching order details" });
        }
    }
);

export const updateOrderStatus = createAsyncThunk("/order/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`/api/admin/orders/${id}`, { status });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error updating order status" });
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
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                // Update the order status in orderDetails if it matches
                if (state.orderDetails && state.orderDetails._id === action.payload.data._id) {
                    state.orderDetails.orderStatus = action.payload.data.orderStatus;
                }
                // Also update the order in orderList
                const index = state.orderList.findIndex(order => order._id === action.payload.data._id);
                if (index !== -1) {
                    state.orderList[index].orderStatus = action.payload.data.orderStatus;
                }
            })
            .addCase(updateOrderStatus.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default shopOrderSlice.reducer;
export const { resetOrderDetails } = shopOrderSlice.actions;
