import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { User } from '../interfaces/user';
import { Following, FollowingObject, FollowingState } from '../interfaces/following';

export const getFollowing = createAsyncThunk<Following | null, number, { rejectValue: string }>(
    'following/getFollowing',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/follows/user/${userId}`);
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

export const postFollow = createAsyncThunk<FollowingObject | null, number, { rejectValue: string }>(
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
                const data: FollowingObject = await response.json();
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

export const unfollow = createAsyncThunk<number | null, number, { rejectValue: string }>(
    'following/unfollow',
    async (relationshipId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/follows/delete/${relationshipId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // const message: string = await response.text(); // Getting the response as text since it's a string
                return relationshipId;
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

const initialState: FollowingState | Following = {
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
            const unfollowedId = action.payload;
            // console.log('unfollowedId in reducer');

            if (state.following) {
                state.following.follows = state.following.follows.filter((follow) => +follow.id !== +unfollowedId!);
            }
        });
    },
});

export default followingSlice.reducer;
