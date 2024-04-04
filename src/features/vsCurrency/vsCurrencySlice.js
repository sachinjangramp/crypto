import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    vsCurrency: 'inr',
    loading: false,
    error: null,
}

export const vsCurrencySlice = createSlice({
    name: 'vsCurrency',
    initialState,
    reducers: {
        fetchData: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.vsCurrency = action.payload;
        },
        fetchDataError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {fetchData, fetchDataError, fetchDataSuccess} = vsCurrencySlice.actions;
export default vsCurrencySlice.reducer;