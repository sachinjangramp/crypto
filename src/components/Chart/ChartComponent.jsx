import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { CategoryScale, Chart } from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchChartData,
    fetchChartDataSuccess,
    fetchChartDataError,
} from "../../features/chartData/chartDataSlice";
import axios from "axios";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { IoCalendarOutline } from "react-icons/io5";
import './ChartComponent.css';

Chart.register(CategoryScale);

const ChartComponent = () => {
    const dispatch = useDispatch();
    const dates = useSelector((state) => state.chartData.dates);
    const prices = useSelector((state) => state.chartData.prices);
    const coins = useSelector((state) => state.coins.coins);
    const [days, setDays] = useState(1);
    const [selectedOption, setSelectedOption] = useState('Line');
    const [isOpen, setIsOpen] = useState(false);
    const [isCryptoOpen, setIsCryptoOpen] = useState(false);
    const [selectedCryptoOption, setSelectedCryptoOption] = useState('Bitcoin');
    const [whichCoin, setWhichCoin] = useState('bitcoin');


    const lineHandler = () => {
        setSelectedOption('Line');
        setIsOpen(!isOpen);
    }

    const barHandler = () => {
        setSelectedOption('Bar');
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const fetchChartData1 = async () => {
            dispatch(fetchChartData());
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/${whichCoin}/market_chart?vs_currency=inr&days=${days}`
                );
                const dates = response.data.prices.map((price) => price[0]);
                const prices = response.data.prices.map((price) => price[1]);
                dispatch(fetchChartDataSuccess({ dates, prices }));
            } catch (error) {
                console.log(error)
                dispatch(fetchChartDataError(error));
            }
        };
        fetchChartData1();
    }, [dispatch, days, whichCoin]);

    return (
        <div className="w-[100%] h-full py-4 pl-5 pr-5 flex flex-col justify-between">
            <div className="flex items-center justify-between w-full">
                <div className="grid grid-rows-1 gap-1 grid-cols-6 w-[19rem] h-[2rem] text-sm">
                    <div onClick={() => (setDays(1))} className="flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <p>1D</p>
                    </div>
                    <div onClick={() => (setDays(7))} className="flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <p>1W</p>
                    </div>
                    <div onClick={() => (setDays(30))} className="flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <p>1M</p>
                    </div>
                    <div onClick={() => (setDays(180))} className="flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <p>6M</p>
                    </div>
                    <div onClick={() => (setDays(365))} className="flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <p>1Y</p>
                    </div>
                    <div className="flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <div>
                            <IoCalendarOutline />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between w-[47%] relative">
                    <button onClick={() => setIsCryptoOpen(prev => !prev)} className="bg-gray-100 h-[2.5rem] flex justify-center items-center text-sm font-semibold rounded-lg border px-3">
                        <p className="mr-2">
                            {selectedCryptoOption}
                        </p>
                        {isCryptoOpen ?
                            <VscTriangleUp style={{ width: "1.1rem", height: "1.1rem" }} />
                            : <VscTriangleDown style={{ width: "1.1rem", height: "1.1rem" }} />}
                    </button>
                    <div className="w-[13rem] h-[19.5rem] absolute top-[2.7rem] left-[0]">
                        {isCryptoOpen && <div className="overflow-y-scroll h-[90%] bg-gray-100 border  rounded-t-lg  text-sm font-semibold justify-center">
                            {coins.map((coin) => {
                                return (
                                    <div key={coin.id} onClick={() => { setWhichCoin(coin.id); setSelectedCryptoOption(coin.name); setIsCryptoOpen(!isCryptoOpen) }} className="w-[13rem] px-[0.79rem] flex items-center pt-[0.5rem] pb-[0.7rem] border-b border-gray-300 cursor-pointer text-sm font-semibold">
                                        {coin.name}
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                    <button onClick={() => setIsOpen(prev => !prev)} className="bg-gray-100 w-[5rem] h-[2.5rem] flex justify-center items-center text-sm font-semibold rounded-lg border">
                        <p className="mr-2">
                            {selectedOption}
                        </p>
                        {isOpen ?
                            <VscTriangleUp style={{ width: "1.1rem", height: "1.1rem" }} />
                            : <VscTriangleDown style={{ width: "1.1rem", height: "1.1rem" }} />}
                    </button>
                    {isOpen && <div className="w-[5rem] h-[4rem] bg-gray-100 border absolute rounded-lg top-[2.7rem] right-0 flex flex-col text-sm font-semibold justify-center">
                        <div onClick={barHandler} className="w-full h-[50%] px-[0.79rem] rounded-t-lg flex items-end pb-[0.2rem] border-b cursor-pointer">
                            Bar
                        </div>
                        <div onClick={lineHandler} className="w-full h-[50%] px-[0.79rem] rounded-b-lg flex items-start pt-[0.2rem] border-t cursor-pointer">
                            Line
                        </div>
                    </div>}
                </div>
            </div>
            <div className="h-[85%]">

                {selectedOption === 'Line' ?
                    <Line
                        data={{
                            labels: dates.map((date, index) => {
                                const fullDate = new Date(date);
                                const hours = fullDate.getHours();
                                const minutes = fullDate.getMinutes();
                                const seconds = fullDate.getSeconds();
                                const time =
                                    hours > 12
                                        ? `${hours - 12}:${minutes}:${seconds} PM`
                                        : `${hours}:${minutes}:${seconds} AM`;
                                const extractedDate = fullDate.toLocaleDateString();
                                let counter = 0;
                                let pos;
                                for (let i = 0; i < extractedDate.length; i++) {
                                    if (extractedDate[i] === "/") {
                                        counter++;
                                    }
                                    if (counter === 2) {
                                        pos = i + 1;
                                        break;
                                    }
                                }
                                const finalDate =
                                    extractedDate.slice(0, pos) + extractedDate.slice(pos + 2);
                                console.log(finalDate);
                                return days === 1 ? time : finalDate;
                            }),
                            datasets: [
                                {
                                    label: `Price (Past ${days} Days) of ${selectedCryptoOption}`,
                                    data: prices,
                                },
                            ],
                        }}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    ticks: {
                                        maxTicksLimit: 12,
                                    },
                                },
                                y: {
                                    ticks: {
                                        maxTicksLimit: 10,
                                        beginAtZero: true,
                                        callback: function (value, index, values) {
                                            if (value >= 1000000) {
                                                return value / 1000000 + "M";
                                            } else if (value >= 1000) {
                                                return value / 1000 + "K";
                                            } else {
                                                return value;
                                            }
                                        },
                                    },
                                },
                            },
                            elements: {
                                point: {
                                    pointRadius: 0,
                                }
                            }
                        }}
                    /> :
                    <Bar
                        data={{
                            labels: dates.map((date, index) => {
                                const fullDate = new Date(date);
                                const hours = fullDate.getHours();
                                const minutes = fullDate.getMinutes();
                                const seconds = fullDate.getSeconds();
                                const time =
                                    hours > 12
                                        ? `${hours - 12}:${minutes}:${seconds} PM`
                                        : `${hours}:${minutes}:${seconds} AM`;
                                const extractedDate = fullDate.toLocaleDateString();
                                let counter = 0;
                                let pos;
                                for (let i = 0; i < extractedDate.length; i++) {
                                    if (extractedDate[i] === "/") {
                                        counter++;
                                    }
                                    if (counter === 2) {
                                        pos = i + 1;
                                        break;
                                    }
                                }
                                const finalDate =
                                    extractedDate.slice(0, pos) + extractedDate.slice(pos + 2);
                                console.log(finalDate);
                                return days === 1 ? time : finalDate;
                            }),
                            datasets: [
                                {
                                    label: `Price (Past ${days} Days) of ${selectedCryptoOption}`,
                                    data: prices,
                                },
                            ],
                        }}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    ticks: {
                                        maxTicksLimit: 12,
                                    },
                                },
                                y: {
                                    ticks: {
                                        maxTicksLimit: 10,
                                        beginAtZero: true,
                                        callback: function (value, index, values) {
                                            if (value >= 1000000) {
                                                return value / 1000000 + "M";
                                            } else if (value >= 1000) {
                                                return value / 1000 + "K";
                                            } else {
                                                return value;
                                            }
                                        },
                                    },
                                },
                            },
                            elements: {
                                point: {
                                    pointRadius: 0,
                                }
                            }
                        }}
                    />
                }

            </div>
        </div>
    );
};

export default ChartComponent;
