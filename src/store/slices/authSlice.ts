import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/axiosConfig';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }: { name: string; email: string; password: string }) => {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Registration failed';
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
