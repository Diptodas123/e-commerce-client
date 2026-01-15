import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createSearchParamsHelper } from "@/utils/queryParams";

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null
}

export const fetchAllFilteredProducts = createAsyncThunk("/products/fetchallfilteredproducts",
    async ({ filterParams, sortParams }, { rejectWithValue }) => {

        const filterQuery = createSearchParamsHelper(filterParams);
        const sortQuery = sortParams ? `sortBy=${encodeURIComponent(sortParams)}` : '';

        const queryString = [filterQuery, sortQuery].filter(Boolean).join('&');

        try {
            const response = await axios.get(`http://localhost:3000/api/shop/products?${queryString}`);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Something went wrong" });
        }
    }
);

export const fetchProductDetails = createAsyncThunk("/products/fetchproductdetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/shop/products/${id}`);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Something went wrong" });
        }
    }
)

const shoppingProductSlice = createSlice({
    name: "shoppingProduct",
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetails = null;
        }
    },
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
        builder.addCase(fetchProductDetails.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload.data;
        }).addCase(fetchProductDetails.rejected, (state) => {
            state.isLoading = false;
            state.productDetails = null;
        });
    }
});

export const {setProductDetails} = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;
