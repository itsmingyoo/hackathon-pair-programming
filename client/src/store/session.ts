import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';

// Async thunks
export const authenticate = createAsyncThunk<User | null, void, { rejectValue: string }>(
    'session/authenticate',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/auth/');
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error authenticating: ', error);
            return rejectWithValue('Failed to authenticate');
        }
    }
);

export const login = createAsyncThunk<User | null, { email: string; password: string }, { rejectValue: string }>(
    'session/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            if (response.ok) {
                const data = await response.json();
                return data || null; // Assuming data is of type User
            } else {
                return null;
            }
        } catch (error) {
            return rejectWithValue('Failed to login');
        }
    }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
    'session/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/logout', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                return;
            } else {
                throw new Error('Failed to logout');
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const signUp = createAsyncThunk<
    User | null,
    { username: string; email: string; password: string; first_name?: string; last_name?: string },
    { rejectValue: string }
>('session/signUp', async (signupData, { rejectWithValue }) => {
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
        });
        if (response.ok) {
            const data = await response.json();
            return data || null; // Assuming data is of type User
        } else {
            return null;
        }
    } catch (error) {
        return rejectWithValue('Failed to sign up');
    }
});

// Initial State
const initialState: { user: User | null } = { user: null };

// Reducer
const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authenticate.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export default sessionSlice.reducer;
