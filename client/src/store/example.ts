// //! Example Usage of createAsyncThunk / createSlice (reducer)
// //! : these all return promises and do the thunk/action at the same time by returning a promise
// //! : once the promise is fulfilled, it will hit the reducer and update the state accordingly
// //? Why this method? This method's benefits is not having to re-spread [...state] everytime. It'll also just update to the new data.

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const thunkName = createAsyncThunk('reducerName/thunkName', async (_, thunkAPI) => {
//     //* first paramater is what data you want to pass in when using this thunk
//     //* thunkAPI provides: dispatch, getState, rejectWithValue, fulfillWithValue, requestId, signal, meta

//     // Do your normal fetch, error handling, or try catch blocks
//     const response = await fetch('https://localhost:5000/test', {
//         method: 'GET',
//     });
//     if (!response.ok) {
//         // error handler
//         const error = await response.json();
//         console.error('fetch in thunk was successful, but didnt emit a successful res.status code');
//         return thunkAPI.rejectWithValue(error); // using the passed in parameter `thunkAPI` and keying into the method
//     } else {
//         console.log('SUCCESS!');
//         const data = response.json();
//         return data; // this data is returned as the payload in the reducer slice
//     }
// });

// // Initial State
// const initialState: {} = {};

// // Reducer - slice for test
// const testSlice = createSlice({
//     name: 'session',
//     initialState,
//     reducers: {},

//     // boiler plate for fulfilled promised async thunks and what to do with this slice
//     extraReducers: (builder) => {
//         builder.addCase(thunkName.fulfilled, (state, action) => {
//             state = action.payload ?? null;
//         });
//     },
// });

// // Export the slice
// export default testSlice.reducer;
