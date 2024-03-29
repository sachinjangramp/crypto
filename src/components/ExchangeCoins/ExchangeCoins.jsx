import React from 'react';
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";


const ExchangeCoins = () => {
    return (
        <div className='p-5'>
            <h1 className='text-lg font-bold'>Exchange Coins</h1>
            <div className='mr-[5rem] w-[27.95rem]'>
                <p className='text-sm font-semibold text-right mr-[7.6rem]'>Enter value</p>
                <div className='flex items-center mt-[0.5rem]'>
                    <span className='text-sm font-semibold text-red-500 mr-[1.2rem]'>Sell</span>
                    <button className='bg-gray-100 h-[2.7rem] border-none flex justify-between items-center text-base text-gray-600 w-[10rem] font-semibold rounded-lg border px-4'>
                        <p>Bitcoin</p>
                        <VscTriangleDown size={'20'} />
                    </button>
                    <input type="text" className='h-[2.7rem] w-[8rem] ml-[2.5rem] border-gray-300 border rounded-lg' />
                </div>
                <div className='flex items-center mt-[0.5rem]'>
                    <span className='text-sm font-semibold text-green-500 mr-[1rem]'>Buy</span>
                    <button className='bg-gray-100 h-[2.7rem] border-none flex justify-between items-center text-base text-gray-600 w-[10rem] font-semibold rounded-lg border px-4'>
                        <p>Bitcoin</p>
                        <VscTriangleDown size={'20'} />
                    </button>
                    <div className='h-[2.7rem] w-[8rem] ml-[2.5rem] '></div>
                </div>
            </div>
            <button className='w-[7rem] h-[2.7rem] font-semibold text-white text-sm bg-[#3660cb] rounded-lg mx-auto block mt-4'>Exchange</button>
        </div>
    )
}

export default ExchangeCoins;