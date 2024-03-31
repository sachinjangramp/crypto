import {configureStore} from '@reduxjs/toolkit';
// import {combineReducers} from 'redux';
import coinsReducer from '../features/coins/coinsSlice';
import chartDataReducer from '../features/chartData/chartDataSlice'
import vsCurrencyReducer from '../features/vsCurrency/vsCurrencySlice'
import searchKeyReducer from '../features/searchKey/searchKeySlice'
import yourCoinsReducer from '../features/yourCoins/yourCoinsSlice'

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
        vsCurrency: vsCurrencyReducer,
        searchKey: searchKeyReducer,
        yourCoins: yourCoinsReducer,
    }
})

export default store;