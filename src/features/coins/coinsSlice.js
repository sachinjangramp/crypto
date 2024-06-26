import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    coins: [],
    loading: false,
    error: null,
};

export const coinsSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
        fetchData: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.coins = action.payload;
        },
        fetchDataError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }

    }
})

export const {fetchData, fetchDataSuccess, fetchDataError} = coinsSlice.actions;

export default coinsSlice.reducer;