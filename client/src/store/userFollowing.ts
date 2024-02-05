import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';
import { Following, FollowingObject, FollowingState, FollowingPayload } from '../interfaces/following';

export const getFollowing = createAsyncThunk<FollowingPayload | null, User, { rejectValue: string }>(
    'following/getFollowing',
    async (user, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/follows/user/${user.id}`);
            if (!response.ok) {
                // If response is not OK, reject
                return rejectWithValue('Failed to fetch following');
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                // If response is not JSON, reject
                return rejectWithValue('Response not in JSON format');
            }
            const data: Following = await response.json();
            return { data, user };
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

const initialState: FollowingState = {
    user: null,
    followers: [],
    following: [],
    justFollowed: null,
    justUnfollowed: null,
};

const followingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFollowing.fulfilled, (state, action) => {
            if (action.payload) {
                // console.log('😒😒😒😒😒😒😒😒😒😒get following action.payload', action.payload);
                state.following = action.payload.data.follows || [];
                state.followers = action.payload.data.followers || [];
                state.user = action.payload.user;
            }
        });
        builder.addCase(postFollow.fulfilled, (state, action) => {
            state.justFollowed = action.payload;
        });
        builder.addCase(unfollow.fulfilled, (state, action) => {
            const unfollowedId = action.payload;

            if (state.following) {
                // Filter out the unfollowed ID from 'following'
                state.following = state.following.filter((follow) => follow.id !== unfollowedId);
            }

            if (state.following && state.followers) {
                // Find the specific 'FollowingObject' that was unfollowed
                const unfollowedObject =
                    state.following.find((follow) => follow.id === unfollowedId) ||
                    state.followers.find((follow) => follow.id === unfollowedId);

                // Set 'justUnfollowed' to the found object, or null if not found
                state.justUnfollowed = unfollowedObject || null;
            }
        });
    },
});

export default followingSlice.reducer;
