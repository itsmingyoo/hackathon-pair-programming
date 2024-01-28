import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';
import { Following, FollowingState } from '../interfaces/following';

export const getFollowing = createAsyncThunk<Following | null, User, { rejectValue: string }>(
    'following/getFollowing',
    async (user, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/follows/user/${user.id}`);
            if (response.ok) {
                const data: Following = await response.json();
                return data;
            } else {
                return rejectWithValue('Failed to fetch following');
            }
        } catch (error) {
            console.error('Error fetching: ', error);
            return rejectWithValue('Failed to fetch following');
        }
    }
);

export const postFollow = createAsyncThunk<Following | null, number, { rejectValue: string }>(
    'following/postFollow',
    async (followId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/follows/user/${followId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data: Following = await response.json();
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

export const unfollow = createAsyncThunk<string | null, number, { rejectValue: string }>(
    'following/unfollow',
    async (relationshipId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/follows/delete/${relationshipId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const message: string = await response.text(); // Getting the response as text since it's a string
                return message;
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

const initialState: FollowingState = {
    following: null,
    followed: null,
    unfollowed: null,
};

const followingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFollowing.fulfilled, (state, action) => {
            state.following = action.payload;
        });
        builder.addCase(postFollow.fulfilled, (state, action) => {
            state.followed = action.payload;
        });
        builder.addCase(unfollow.fulfilled, (state, action) => {
            state.unfollowed = action.payload;
        });
    },
});

export default followingSlice.reducer;
