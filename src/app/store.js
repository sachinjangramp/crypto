import {configureStore} from '@reduxjs/toolkit';
// import {combineReducers} from 'redux';
import coinsReducer from '../features/coins/coinsSlice';
import chartDataReducer from '../features/chartData/chartDataSlice'

// const rootReducer = combineReducers({
//     coins : coinsReducer,
//     chartData: chartDataReducer,
// })

// const store = configureStore({
//     reducer: rootReducer
// });

const store = configureStore({
    reducer: {
        coins: coinsReducer,
        chartData: chartDataReducer,
    }
})

export default store;