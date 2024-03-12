import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dates: [],
    prices: [],
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
            const {dates, prices} = action.payload;
            state.dates = dates;
            state.prices = prices;
            state.loading = false;
        },
        fetchChartDataError:(state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {fetchChartData, fetchChartDataSuccess, fetchChartDataError} = chartDataSlice.actions;

export default chartDataSlice.reducer;