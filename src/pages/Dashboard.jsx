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
        <div className='text-gray-700 font-every'>
            <div className='fixed z-20 flex items-center w-full h-20 bg-white shadow-lg'>
                <img src={AlmaLogo} alt="logo" className='sm:pl-[2.5%] pl-5' />
                <h1 className='px-4 pt-1 pb-[0.4rem] sm:block hidden text-lg font-semibold text-gray-700 border-2 font-signature border-gray-300 ml-[6%] mr-4'>Capstone Project - Crypto Dashboard</h1>
            </div>
            <div className='flex flex-col lg:h-screen pt-[6.5rem] xl:w-[87%] w-full pb-10 mx-auto 2xl:px-[8rem]'>
                <div className='grid w-full h-full gap-5 py-6 lg:pr-[3.7rem] bg-[#fafbff] rounded-lg lg:pl-11 px-[1.2rem] lg:grid-cols-footer grid-cols-1 lg:grid-rows-12'>
                    <div className='grid col-span-1 gap-5 lg:grid-rows-12 row-span-12'>
                        <div className='flex justify-between w-full row-span-1 bg-[#fafbff] lg:h-full h-[2.5rem] rounded-lg'>
                            <div className='lg:w-[9.5%] w-[25%]'>
                                <CurrencySelector />
                            </div>
                            <div className='lg:w-[88.5%] lg:ml-0 w-[75%] ml-[1rem]'>
                                <SearchBar />
                            </div>
                        </div>
                        <div className='grid grid-cols-11 gap-5 row-span-11 lg:grid-rows-12'>
                            <div className='col-span-11 bg-white rounded-lg row-span-7'>
                                <ChartComponent />
                            </div>
                            <div className='grid grid-cols-1 col-span-11 row-span-5 gap-5 lg:pr-5 lg:grid-cols-new lg:grid-rows-12'>
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