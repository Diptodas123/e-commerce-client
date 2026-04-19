import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    searchResults: [],
    isLoading: false,
};

export const getSearchResults = createAsyncThunk("/search/products",
    async (keyword, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/search/products?keyword=${keyword}`, {
                withCredentials: true,
            });
            
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error fetching search results" });
        }
    }
);

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        resetSearchResults: (state) => {
            state.searchResults = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchResults.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSearchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload.data;
            })
            .addCase(getSearchResults.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default searchSlice.reducer;
export const { resetSearchResults } = searchSlice.actions;