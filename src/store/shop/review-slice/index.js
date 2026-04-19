import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    reviews: [],
    isLoading: false,
};

const getReviewsByProductId = createAsyncThunk(
    'reviewSlice/getReviewsByProductId',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/reviews/${productId}`, {
                withCredentials: true,
            });
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching reviews" });
        }
    }
);

const addReview = createAsyncThunk(
    'reviewSlice/addReview',
    async (reviewData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/reviews/add`, reviewData, {
                withCredentials: true,
            });
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
            state.reviews = action.payload.data;
        }).addCase(getReviewsByProductId.rejected, (state) => {
            state.isLoading = false;
        }).addCase(addReview.pending, (state) => {
            state.isLoading = true;
        }).addCase(addReview.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews.push(action.payload.data);
        }).addCase(addReview.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export default reviewSlice.reducer;