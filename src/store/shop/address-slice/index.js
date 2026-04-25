import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    addressList: [],
    currentSelectedAddress: null,
};

export const addAddress = createAsyncThunk('address/addAddress',
    async ({ userId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/shop/address/${userId}`,
                formData, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error adding address" });
        }
    }
);

export const fetchAllAddresses = createAsyncThunk('address/fetchAllAddresses',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/shop/address/${userId}`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching addresses" });
        }
    }
);

export const editAddress = createAsyncThunk('address/editAddress',
    async ({ userId, addressId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/shop/address/${userId}/${addressId}`,
                formData, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error editing address" });
        }
    }
);

export const deleteAddress = createAsyncThunk('address/deleteAddress',
    async ({ userId, addressId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/shop/address/${userId}/${addressId}`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error deleting address" });
        }
    }
);


const shopAddressSlice = createSlice({
    name: 'shopAddressSlice',
    initialState,
    reducers: {
        setCurrentSelectedAddress: (state, action) => {
            state.currentSelectedAddress = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addAddress.pending, (state) => {
            state.isLoading = true;
        }).addCase(addAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList.push(action.payload.data);
        }).addCase(addAddress.rejected, (state) => {
            state.isLoading = false;
        }).addCase(fetchAllAddresses.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllAddresses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;
        }).addCase(fetchAllAddresses.rejected, (state) => {
            state.isLoading = false;
        }).addCase(editAddress.pending, (state) => {
            state.isLoading = true;
        }).addCase(editAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.addressList.findIndex(addr => addr._id === action.payload.data._id);
            if (index !== -1) {
                state.addressList[index] = action.payload.data;
            }
        }).addCase(editAddress.rejected, (state) => {
            state.isLoading = false;
        }).addCase(deleteAddress.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = state.addressList.filter(addr => addr._id !== action.payload.data._id);
        }).addCase(deleteAddress.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export default shopAddressSlice.reducer;
export const { setCurrentSelectedAddress } = shopAddressSlice.actions;
