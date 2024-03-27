import React, { useEffect, useState } from 'react';
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
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
        <div className='flex justify-between w-full text-white bg-gray-100'>
            <div onClick={() => setIsOpen((prev) => !prev)} className='w-[9.5%] cursor-pointer text-black text-sm px-3 flex bg-white justify-between items-center font-semibold rounded-lg relative'>
                <p className='uppercase'>{selectedCurrency}</p>
                {isOpen ? <VscTriangleUp style={{ width: "1.1rem", height: "1.1rem" }} /> : <VscTriangleDown style={{ width: "1.1rem", height: "1.1rem" }} />}
                {isOpen && <div className='absolute left-[0] top-[2.8rem] z-30 w-[5.7rem] h-[25rem] overflow-y-scroll bg-white shadow-lg rounded-lg'>{vsCurrencies.map((vsCurrency, index) => (<div onClick={() => vsCurrencyHandler(vsCurrency)} key={index} className='w-full px-3 py-3 text-sm font-semibold uppercase border-b border-gray-300 cursor-pointer' >{vsCurrency}</div>))}</div>}
            </div>
            <div className='w-[88%] bg-white text-black rounded-lg'>
            </div>
        </div>
    )
}

export default CurrencySelector;