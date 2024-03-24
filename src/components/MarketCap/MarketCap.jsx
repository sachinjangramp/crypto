import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, fetchDataSuccess, fetchDataError } from '../../features/coins/coinsSlice';
import axios from 'axios';
import { VscTriangleDown } from "react-icons/vsc";
import './MarketCap.css';

const MarketCap = () => {
    const dispatch = useDispatch();

    const coins = useSelector((state) => state.coins.coins);
    const loading = useSelector((state) => state.coins.loading);
    const error = useSelector((state) => state.coins.error);
    // console.log("Hello3");

    useEffect(() => {
        const fetchData1 = async () => {
            try {
                dispatch(fetchData());
                // const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
                const response = await axios.get('http://localhost:3000/api/coins/marketcap');
                // const coins = await response.json();
                const coins = await response.data;
                dispatch(fetchDataSuccess(coins));
            } catch (error) {
                dispatch(fetchDataError(error.message));
            }
        };
        dispatch(fetchData());
        fetchData1();
        // console.log("Hello1");
    }, [dispatch]);

    // console.log("Hello2");

    // Handle loading state
    if (loading) {
        return <p>Loading data...</p>;
    }

    // Handle errors
    if (error) {
        return <p>Failed to fetch data. Please try again later.</p>;
    }



    return (
        <div className='h-full'>
            {/* {coins.length > 0 ? (
                coins.map((coin) => (
                    <p key={coin.id}>{coin.name}, Current Price: {coin.current_price}, Market Cap: {coin.market_cap}</p>
                ))
            ) : (
                <p>No data found.</p>
            )} */}
            <div className='h-[8%] py-5 pr-5 pl-3 text-lg font-bold border-b flex items-center justify-center'>
                <h1 className='flex items-center justify-center'>
                    Cryptocurrency by market cap
                </h1>
            </div>
            <div className='h-[92%] overflow-y-scroll'>
                {coins.map((coin) => (
                    <div key={coin.id} className='flex justify-between py-5 pl-3 pr-5 border-y'>
                        <div className='flex items-center pr-1'>
                            <img src={coin.image} className='w-12' alt="" />
                        </div>
                        <div className='w-[100%]'>
                            <div className='flex items-center w-[100%] justify-between'>
                                <h1 className='text-base font-bold'>{coin.name}</h1>
                                <h1 className='text-sm font-bold'>Price: {coin.current_price}</h1>
                            </div>
                            <div className='flex items-center w-[100%] justify-between'>
                                <h1 className='text-sm'>Mkt.Cap: {coin.market_cap}</h1>
                                {coin.market_cap_change_percentage_24h < 0 ?
                                    <div className='flex items-center justify-between w-[4.39rem]'>
                                        <div style={{ color: 'red' }}>
                                            <VscTriangleDown size={'20'} />
                                        </div>
                                        <h1 className='text-sm text-red-500 font-number'>{Math.abs(coin.market_cap_change_percentage_24h).toFixed(2)}%</h1>
                                    </div>
                                    :
                                    <div className='flex items-center justify-between w-[4.39rem]'>
                                        <div style={{ color: 'green' }} className='rotate-180'>
                                            <VscTriangleDown size={'20'} />
                                        </div>
                                        <h1 className='text-sm text-green-500 font-number'>{Math.abs(coin.market_cap_change_percentage_24h).toFixed(2)}%</h1>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MarketCap;