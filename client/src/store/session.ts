import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';

// Async thunks
export const authenticate = createAsyncThunk<User | null, void, { rejectValue: string }>(
    'session/authenticate',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/');
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

export const login = createAsyncThunk<User | null, { email: string; password: string }, { rejectValue: {} | string }>(
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
                const errorResponse = await response.json(); // Get the error message from the response
                return rejectWithValue(errorResponse.message || 'Invalid Credentials');
            }
        } catch (error) {
            return rejectWithValue(error || 'Failed to login');
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

export const editUser = createAsyncThunk<User | null, FormData, { rejectValue: {} | string }>(
    'session/editUser',
    async (user, {rejectWithValue}) => {
        try {
            const res = await fetch(`/api/users/edit`, {
                method: 'PUT',
                body: user
            });
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                const errorResponse = await res.json(); // Get the error message from the response
                // console.log("😒😒😒😒" , errorResponse)

                return rejectWithValue(errorResponse.errors);
            }
        } catch (error) {
            return rejectWithValue('User not found');
        }
    }
);

export const pairFollow = createAsyncThunk<User | null, number, { rejectValue: string }>(
    'session/pairFollow',
    async (followId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/follows/pair/${followId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                return rejectWithValue('Failed to post follow');
            }
        } catch (error) {
            console.error('Error in post follow: ', error);
            return rejectWithValue('Failed to follow user');
        }
    }
);

export const pairUnfollow = createAsyncThunk<User | null, number, { rejectValue: string }>(
    'session/pairUnfollow',
    async (relationshipId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/follows/pair/${relationshipId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const data = await response.json()
                return data;
            } else {
                // Handle non-OK responses
                return rejectWithValue(`Failed to unfollow, server responded with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error in unfollowing', error);
            return rejectWithValue('Failed to unfollow');
        }
    }
);

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
                state.user = action.payload?.errors ? null : action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.user = action.payload?.errors ? state.user : action.payload
            })
            .addCase(pairFollow.fulfilled, (state,action) => {
                state.user = action.payload;
            })
            .addCase(pairUnfollow.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    },
});

export default sessionSlice.reducer;
