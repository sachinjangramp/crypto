import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    searchKey: '',
    loading: false,
    error: false,
}

export const searchKeySlice = createSlice({
    name: 'searchKey',
    initialState,
    reducers: {
        fetchKey : (state) => {
            state.loading = true;
        },
        fetchKeySuccess: (state, action) => {
            state.loading = false;
            state.searchKey = action.payload;
        },
        fetchKeyError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {fetchKey, fetchKeySuccess, fetchKeyError} = searchKeySlice.actions;

export default searchKeySlice.reducer;