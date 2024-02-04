import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';

export interface UserForm {
    id: string;
    username: string;
    picUrl: File;
    about: string;
    github: string;
    linkedin: string;
    portfolio: string;
    leetcode: string;
}

export const getUser = createAsyncThunk<User | null, number, { rejectValue: {} | string }>(
    'user/getUser',
    async (id, {rejectWithValue}) => {
        try {
            const res = await fetch(`/api/users/${id}`);
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                return null;
            }
        } catch (error) {
            return rejectWithValue('User not found');
        }
    }
);

export const editUser = createAsyncThunk<User | null, FormData, { rejectValue: {} | string }>(
    'user/editUser',
    async (user, {rejectWithValue}) => {
        try {
            const res = await fetch(`/api/users/edit/${user.get('id')}`, {
                method: 'PUT',
                body: user
            });
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                return "Edit user response not ok"
            }
        } catch (error) {
            return rejectWithValue('User not found');
        }
    }
);

const initialState: {targetUser: User | null} = {targetUser: null}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.targetUser = action.payload;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.targetUser = action.payload
            })
    },
});

export default userSlice.reducer;