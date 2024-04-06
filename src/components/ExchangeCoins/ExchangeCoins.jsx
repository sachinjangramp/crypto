import React, { useState, useEffect } from 'react';
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import './ExchangeCoins.css';
import { fetchDataSuccess, fetchData, fetchDataError } from '../../features/yourCoins/yourCoinsSlice'


const ExchangeCoins = () => {
    const dispatch = useDispatch();
    const yourCoins = useSelector((state) => state.yourCoins.yourCoins);
    const [sellCoin, setSellCoin] = useState(Object.keys(yourCoins[0])[0]);
    const [sellInputValue, setSellInputValue] = useState(0);
    const [buyOutputValue, setBuyOutputValue] = useState(0);
    const [isSellOpen, setIsSellOpen] = useState(false);
    const [isBuyOpen, setIsBuyOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(0);
    const [buyCurrencies, setBuyCurrencies] = useState([]);
    const [buyCoin, setBuyCoin] = useState();
    const [unit, setUnit] = useState(yourCoins[0]['unit']);
    const [buyUnit, setBuyUnit] = useState();

    const sellButtonHandler = () => {
        setIsSellOpen((prev) => !prev);
        setSellInputValue(0);
    }

    const sellHandler = (currency) => {
        setSellCoin(Object.keys(currency)[0]);
        setIsSellOpen((prev) => !prev);
        setUnit(currency['unit']);
    }

    const sellInputHandler = (event) => {
        if (event.target.value > currentValue)
            event.target.value = currentValue;
        setSellInputValue(event.target.value);
    }

    const buyButtonHandler = () => {
        setIsBuyOpen((prev) => !prev);

    }

    const buyHandler = (currency) => {
        setBuyCoin(currency['name']);
        setIsBuyOpen((prev) => !prev);
    }

    const exchangeHandler = () => {
        dispatch(fetchData());
        try {
            dispatch(fetchDataSuccess([{ [sellCoin]: sellInputValue }, { [buyCoin]: buyOutputValue, unit: buyUnit }]));
        } catch (error) {
            dispatch(fetchDataError('Error fetching data...'));
        }
    }

    const fetchApiData = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/exchange_rates');
            const array = Object.entries(response.data.rates);
            const array2 = array.map(([key, value]) => value);
            setBuyCurrencies(array2);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        for (let i = 0; i < yourCoins.length; i++) {
            if (Object.keys(yourCoins[i])[0] === sellCoin) {
                setCurrentValue(yourCoins[i][sellCoin]);
                break;
            }
        }
    }, [sellCoin]);

    useEffect(() => {
        fetchApiData();
    }, []);

    useEffect(() => {
        if (buyCurrencies[0])
            setBuyCoin(buyCurrencies[0]['name']);
    }, [buyCurrencies]);

    useEffect(() => {
        let a = 0;
        let totalBitcoins = 0;
        if (buyCurrencies[0] && buyCoin) {
            for (const currency of buyCurrencies) {
                if (currency['name'] === sellCoin) {
                    a = currency['value'];
                    totalBitcoins = sellInputValue / a;
                }
            }
            for (const currency of buyCurrencies) {
                if (currency['name'] === buyCoin) {
                    setBuyUnit(currency['unit']);
                    setBuyOutputValue(currency['value'] * totalBitcoins);
                }
            }
        }
    }, [buyCoin, sellCoin, sellInputValue]);

    const topPosition = `${-((yourCoins.length) * 2.7) - 0.2}rem`;

    return (
        <div className='p-5'>
            <h1 className='text-lg font-bold'>Exchange Coins</h1>
            <div className='mr-[5rem] w-[27.95rem]'>
                <p className='text-sm font-semibold text-right mr-[7.6rem]'>Enter value</p>
                <div className='flex items-center mt-[0.5rem]'>
                    <span className='text-sm font-semibold text-red-500 mr-[1.2rem]'>Sell</span>
                    <div className='relative'>
                        <button onClick={sellButtonHandler} className={`bg-gray-100 h-[2.7rem] flex justify-between items-center text-sm w-[10rem] font-semibold rounded-lg border px-3 ${isSellOpen ? 'border-2 border-[#3660cb] text-[#3660cb]' : 'border border-gray-300'}`}>
                            <p className={`overflow-hidden whitespace-nowrap w-[85%] mr-2 text-left`}>{sellCoin}</p>
                            {isSellOpen ? <VscTriangleUp size={'1.1rem'} /> : <VscTriangleDown size={'1.1rem'} />}
                        </button>
                        {isSellOpen && <div className={`absolute text-sm z-10 font-semibold bg-gray-100 rounded-lg border border-gray-300`} style={{ top: topPosition }}>
                            {yourCoins.map((currency, index) => (<div key={index} onClick={() => sellHandler(currency)} className={`bg-gray-100 h-[2.7rem] flex justify-between border-b border-gray-300  items-center text-base text-gray-600 w-[17.2rem] font-semibold px-4 capitalize cursor-pointer ${index === 0 ? 'rounded-t-lg' : ''} ${index === yourCoins.length - 1 ? 'rounded-b-lg border-none ' : ''}`}>{Object.keys(currency)[0]}</div>))}
                        </div>}
                    </div>
                    <input value={sellInputValue} onChange={(event) => sellInputHandler(event)} placeholder={` Avl: ${currentValue.toFixed(2)} ${unit}`} type="number" className='h-[2.7rem] w-[8rem] ml-[2.5rem] border border-gray-300 p-2 rounded-lg' />
                </div>
                <div className='flex items-center mt-[0.5rem]'>
                    <span className='text-sm font-semibold text-green-500 mr-[1rem]'>Buy</span>
                    <div className='relative'>
                        <button onClick={buyButtonHandler} className={`bg-gray-100 h-[2.7rem] flex justify-between items-center text-sm w-[10rem] font-semibold rounded-lg border px-3 ${isBuyOpen ? 'border-2 border-[#3660cb] text-[#3660cb]' : 'border border-gray-300'}`}>
                            <p className='overflow-hidden whitespace-nowrap w-[85%] mr-2 text-left'>{buyCoin}</p>
                            {isBuyOpen ? <VscTriangleUp size={'1.1rem'} /> : <VscTriangleDown size={'1.1rem'} />}
                        </button>
                        {isBuyOpen && <div className='overflow-y-scroll border border-gray-300 z-10 h-[30rem] absolute text-sm font-semibold bg-gray-100 rounded-lg top-[-30.2rem]'>
                            {buyCurrencies.map((currency, index) => (<div key={index} onClick={() => buyHandler(currency)} className={` bg-gray-100 h-[2.7rem] flex justify-between border-b border-gray-300 items-center text-base text-gray-600 w-[18rem] font-semibold px-4 capitalize cursor-pointer ${index === 0 ? 'rounded-t-lg' : ''} ${index === buyCurrencies.length - 1 ? 'rounded-b-lg border-none ' : ''}`}>{currency.name}</div>))}
                        </div>}
                    </div>
                    <div className='h-[2.7rem] w-[8rem] ml-[3.15rem] text-green-500 flex items-center'>{buyOutputValue.toFixed(2)}</div>
                </div>
            </div>
            <button onClick={exchangeHandler} className='w-[7rem] h-[2.7rem] font-semibold text-white text-sm bg-[#3660cb] hover:scale-[102%] duration-300 rounded-lg mx-auto block mt-4'>Exchange</button>
        </div>
    )
}

export default ExchangeCoins;