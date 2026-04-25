import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";

const initialState = {
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
    isLoading: false,
};

export const getReviewsByProductId = createAsyncThunk(
    'reviewSlice/getReviewsByProductId',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/shop/reviews/${productId}`);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching reviews" });
        }
    }
);

export const addReview = createAsyncThunk(
    'reviewSlice/addReview',
    async (reviewData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/shop/reviews', reviewData);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error adding review" });
        }
    }
);

const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReviewsByProductId.pending, (state) => {
            state.isLoading = true;
        }).addCase(getReviewsByProductId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload.data.reviews;
            state.averageRating = action.payload.data.averageRating;
            state.totalReviews = action.payload.data.totalReviews;
        }).addCase(getReviewsByProductId.rejected, (state) => {
            state.isLoading = false;
        }).addCase(addReview.pending, (state) => {
            state.isLoading = true;
        }).addCase(addReview.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews.push(action.payload.data);
            state.totalReviews += 1;
            const total = state.reviews.reduce((sum, r) => sum + r.rating, 0);
            state.averageRating = parseFloat((total / state.reviews.length).toFixed(1));
        }).addCase(addReview.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export default reviewSlice.reducer;