import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    yourCoins : [{
        Bitcoin: 120,
        unit: 'BTC'
    },
    {
        Ether: 5000,
        unit: 'ETH'
    },
    {
        Litecoin: 500,
        unit: 'LTC'
    },
],
    loading: false,
    error: null,
}

export const yourCoinsSlice = createSlice({
    name: 'yourCoins',
    initialState,
    reducers: {
        fetchData: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.yourCoins = [...state.yourCoins, ...action.payload];
        },
        fetchDataError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {fetchData, fetchDataSuccess, fetchDataError} = yourCoinsSlice.actions;

export default yourCoinsSlice.reducer;