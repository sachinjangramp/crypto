import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dates1: [],
    prices1: [],
    dates2: [],
    prices2: [],
    loading: false,
    error: null,
};

const chartDataSlice = createSlice({
    name: 'chartData',
    initialState,
    reducers: {
        fetchChartData: (state) => {
            state.loading = true;
        },
        fetchChartDataSuccess: (state, action) => {
            const {dates1, dates2, prices1, prices2} = action.payload;
            state.dates1 = dates1;
            state.prices1 = prices1;
            state.dates2 = dates2;
            state.prices2 =prices2;
            state.loading = false;
        },
        fetchChartDataError:(state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        }
    }
});

export const {fetchChartData, fetchChartDataSuccess, fetchChartDataError} = chartDataSlice.actions;

export default chartDataSlice.reducer;