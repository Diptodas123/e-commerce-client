import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    featureImageList: []
};

export const getFeatureImageList = createAsyncThunk(
    'common/getFeatureImageList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/feature-images`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching feature images" });
        }
    }
);

export const addFeatureImage = createAsyncThunk(
    'common/addFeatureImage',
    async (image, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/feature-images`, { image }, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error adding feature image" });
        }
    }
);

export const deleteFeatureImage = createAsyncThunk(
    'common/deleteFeatureImage',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/feature-images/${id}`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error deleting feature image" });
        }
    }
);

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeatureImageList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImageList.fulfilled, (state, action) => {
                state.isLoading = false;                
                state.featureImageList = action.payload.data || [];
            })
            .addCase(getFeatureImageList.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addFeatureImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addFeatureImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList.push(action.payload.data);
            })
            .addCase(addFeatureImage.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteFeatureImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteFeatureImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = state.featureImageList.filter(
                    img => img._id !== action.payload.data._id
                );
            })
            .addCase(deleteFeatureImage.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default commonSlice.reducer;
