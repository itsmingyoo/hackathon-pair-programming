import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DirectMessage } from '../interfaces/directMessage';


// export const checkDMs = createAsyncThunk<>(

// )


interface DirectMessageState {
    directMessages: DirectMessage[] | null;
}

const initialState: DirectMessageState = {
    directMessages: null,
};

const directMessageSlice = createSlice({
    name: "directMessage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //.addCase()
    }
})