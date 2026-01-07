import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
};

export const addNewProduct = createAsyncThunk("/products/addnewproduct",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/admin/products", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to add product" });
        }
    }
);

export const fetchAllProducts = createAsyncThunk("/products/fetchallproducts",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:3000/api/admin/products", {
                withCredentials: true
            });
            
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch all products" });
        }
    }
);

export const editProduct = createAsyncThunk("/products/editproduct",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/admin/products/${id}`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to add product" });
        }
    }
);

export const deleteProduct = createAsyncThunk("/products/deleteproduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/admin/products/${id}`, {
                withCredentials: true
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to add product" });
        }
    }
);

const adminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addNewProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(addNewProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList.push(action.payload.data);
        }).addCase(addNewProduct.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.data;            
        }).addCase(fetchAllProducts.rejected, (state) => {
            state.isLoading = false;
            state.productList = [];
        });
    }
});

export default adminProductsSlice.reducer;
