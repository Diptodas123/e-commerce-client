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
    async (_, { rejectWithValue }) => {
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
        builder.addCase(editProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(editProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            const updatedProduct = action.payload.data;
            const index = state.productList.findIndex(product => product._id === updatedProduct._id);
            if (index !== -1) {
                state.productList[index] = updatedProduct;
            }
        }).addCase(editProduct.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            const deletedProductId = action.payload.data._id;
            state.productList = state.productList.filter(product => product._id !== deletedProductId);
        }).addCase(deleteProduct.rejected, (state) => {
            state.isLoading = false;
        })
    }
});

export default adminProductsSlice.reducer;
