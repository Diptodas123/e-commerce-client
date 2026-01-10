import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
}

export const fetchAllFilteredProducts = createAsyncThunk("/products/fetchallfilteredproducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:3000/api/shop/products", {
                withCredentials: true
            });

            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Something went wrong" });
        }
    }
);

const shoppingProductSlice = createSlice({
    name: "shoppingProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.data;
        }).addCase(fetchAllFilteredProducts.rejected, (state) => {
            state.isLoading = false;
            state.productList = [];
        });
    }
});

export default shoppingProductSlice.reducer;
