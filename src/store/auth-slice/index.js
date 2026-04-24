import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

export const registerUser = createAsyncThunk("auth/register",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", formData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Registration failed" });
        }
    }
);

export const loginUser = createAsyncThunk("auth/login",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", formData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Login failed" });
        }
    }
);

export const checkAuth = createAsyncThunk("auth/user-info",
    async () => {
        const response = await axios.get("http://localhost:3000/api/auth/user-info", {
            withCredentials: true,
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
            }
        });
        return response.data;
    }
);

export const logoutUser = createAsyncThunk("auth/logout",
    async () => {
        const response = await axios.post("http://localhost:3000/api/auth/logout", {}, {
            withCredentials: true,
        });
        return response.data;
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;  // Registration does not authenticate user
            state.user = null;
        }).addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        });
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data.user;
        }).addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        });
        builder.addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data;
        }).addCase(checkAuth.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        });
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(logoutUser.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        });
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;