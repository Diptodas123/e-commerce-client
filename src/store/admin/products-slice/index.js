import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

const initialState = {
    isLoading: false,
    productList: [],
};

export const addNewProduct = createAsyncThunk("/products/addnewproduct",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/api/admin/products", formData);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to add product" });
        }
    }
);

export const fetchAllProducts = createAsyncThunk("/products/fetchallproducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/api/admin/products");

            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch all products" });
        }
    }
);

export const editProduct = createAsyncThunk("/products/editproduct",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`/api/admin/products/${id}`, formData);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to add product" });
        }
    }
);

export const deleteProduct = createAsyncThunk("/products/deleteproduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(`/api/admin/products/${id}`);
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
