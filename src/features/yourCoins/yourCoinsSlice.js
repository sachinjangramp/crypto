import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    yourCoins : [{
        Bitcoin: 5,
        unit: 'BTC'
    },
    {
        'United Arab Emirates Dirham': 15,
        unit: 'DH'
    },
    {
        Ether: 30,
        unit: 'ETH'
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
            let counter = 0;
            let key1 = Object.keys(action.payload[0])[0];
            let key2 = Object.keys(action.payload[1])[0];
            const currentKeys = state.yourCoins.map((coin) => Object.keys(coin)[0]);
            if ((currentKeys.includes(key1) && currentKeys.includes(key2)) || currentKeys.length < 6){
                let value1 = parseFloat(action.payload[0][key1]);
            let value2 = parseFloat(action.payload[1][key2]);
            let value2Unit = action.payload[1]['unit'];
            // console.log(key1);
            // console.log(key2);
            // console.log(value1);
            // console.log(value2);
            // console.log(value2Unit);
            state.yourCoins.forEach((coin, index) => {
                if ( Object.keys(coin)[0] === key1){
                    console.log(typeof state.yourCoins[index][key1]);
                    console.log(typeof value1);
                    if(state.yourCoins[index][key1] === value1 || state.yourCoins[index][key1] < value1){
                        state.yourCoins = state.yourCoins.filter((coin) => !coin.hasOwnProperty(key1));
                        // console.log('coin:')
                        // console.log(coin);
                        console.log('yourCoins:')
                        console.log(state.yourCoins);
                    } else{
                        console.log('hello');
                        state.yourCoins[index][key1] = state.yourCoins[index][key1] - value1;
                    }
                }
            });
            state.yourCoins.forEach((coin, index) => {
                if ( Object.keys(coin)[0] === key2){
                    state.yourCoins[index][key2] = state.yourCoins[index][key2] + value2;
                    counter = 1;
                }
            });
            if (counter === 0)
            state.yourCoins.push({[key2]: value2, 'unit': value2Unit});
            } else{
                state.loading = false;
                state.error = 'Reached the max limit of coins.';
            }
        },
        fetchDataError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {fetchData, fetchDataSuccess, fetchDataError} = yourCoinsSlice.actions;

export default yourCoinsSlice.reducer;