import React, { useEffect, useState } from 'react';
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchData, fetchDataSuccess, fetchDataError } from '../../features/vsCurrency/vsCurrencySlice';

const CurrencySelector = () => {
    const dispatch = useDispatch();
    const [vsCurrencies, setVsCurrencies] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('inr');

    const vsCurrencyHandler = (vsCurrency) => {
        setSelectedCurrency(() => vsCurrency);
        dispatch(fetchData());
        try {
            dispatch(fetchDataSuccess(vsCurrency));
        } catch (error) {
            dispatch(fetchDataError(error));
        }
    }

    const fetchApiData = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
            setVsCurrencies(() => response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchApiData();
    }, [])

    // console.log(vsCurrencies);

    return (
        <div onClick={() => setIsOpen((prev) => !prev)} className={`relative flex items-center justify-between w-full h-[100%] px-3 text-sm font-semibold  bg-white rounded-lg cursor-pointer ${isOpen ? 'border-2 border-[#3660cb]' : ''}`}>
            <div className={`${isOpen ? ' text-[#3660cb]' : ''} flex justify-between items-center w-[100%]`}>
                <p className={`uppercase`}>{selectedCurrency}</p>
                {isOpen ? <VscTriangleUp style={{ width: "1.1rem", height: "1.1rem" }} /> : <VscTriangleDown style={{ width: "1.1rem", height: "1.1rem" }} />}
            </div>
            {isOpen && <div className='absolute left-[0] top-[2.8rem] z-30 w-[5.7rem] h-[25rem] overflow-y-scroll bg-white shadow-lg rounded-lg'>{vsCurrencies.map((vsCurrency, index) => (<div onClick={() => vsCurrencyHandler(vsCurrency)} key={index} className='w-full px-3 py-3 text-sm font-semibold uppercase border-b border-gray-300 cursor-pointer' >{vsCurrency}</div>))}</div>}
        </div>
    )
}

export default CurrencySelector;