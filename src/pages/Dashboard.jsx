import React from 'react';
import CurrencySelector from '../components/CurrencySelector/CurrencySelector';
import SearchBar from '../components/SearchBar/SearchBar';
import MarketCap from '../components/MarketCap/MarketCap';
import ChartComponent from '../components/Chart/ChartComponent';
import Portfolio from '../components/Portfolio/Portfolio';
import ExchangeCoins from '../components/ExchangeCoins/ExchangeCoins';
import AlmaLogo from '../assets/alamLogo.png'

const dashboard = () => {
    return (
        <div className='font-every'>
            <div className='fixed flex items-center w-full h-20 shadow-lg'>
                <img src={AlmaLogo} alt="logo" className='pl-12' />
                <h1 className='px-4 pt-1 pb-[0.4rem] text-lg font-semibold text-gray-700 border-2 font-signature border-gray-300 ml-28'>Crypto Dashboard</h1>
            </div>
            {/* <div className='flex flex-col h-screen pt-[6.5rem] w-[87%] pb-10 mx-auto px-[4.5rem]'>
                <div className='grid w-full h-full gap-5 py-6 bg-gray-100 rounded-lg grid-cols-15 px-11 grid-rows-12 '>
                    <div className='flex col-span-11 bg-white rounded-lg '>
                        <CurrencySelector />
                        <SearchBar />
                    </div>
                    <div className='col-span-4 bg-white rounded-lg row-span-12'>
                        <MarketCap />
                    </div>
                    <div className='grid grid-cols-11 col-span-11 gap-5 row-span-11 grid-rows-12'>
                        <div className='col-span-11 bg-white rounded-lg row-span-7'>
                            <ChartComponent />
                        </div>
                        <div className='col-span-5 row-span-5 bg-white rounded-lg'>
                            <Portfolio />
                        </div>
                        <div className='col-span-6 row-span-5 bg-white rounded-lg'>
                            <ExchangeCoins />
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='flex flex-col h-screen pt-[6.5rem] w-[87%] pb-10 mx-auto px-[8rem]'>
                <div className='grid w-full h-full gap-5 py-6 pr-[3.7rem] bg-gray-100 rounded-lg pl-11 grid-cols-footer grid-rows-12'>
                    <div className='grid col-span-1 gap-5 grid-rows-12 row-span-12'>
                        <div className='flex row-span-1 bg-white rounded-lg'>
                            <CurrencySelector />
                            <SearchBar />
                        </div>
                        <div className='grid grid-cols-11 gap-5 row-span-11 grid-rows-12'>
                            <div className='col-span-11 bg-white rounded-lg row-span-7'>
                                <ChartComponent />
                            </div>
                            <div className='grid col-span-11 row-span-5 gap-5 pr-5 grid-cols-new grid-rows-12'>
                                <div className='col-span-1 bg-white rounded-lg row-span-12'>
                                    <Portfolio />
                                </div>
                                <div className='col-span-1 bg-white rounded-lg row-span-12'>
                                    <ExchangeCoins />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1 bg-white rounded-lg row-span-12'>
                        <MarketCap />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboard