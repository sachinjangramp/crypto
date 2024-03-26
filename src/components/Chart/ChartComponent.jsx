import React, { useEffect, useState, useRef, useCallback } from "react";
import { flushSync } from 'react-dom'
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
import 'chartjs-plugin-annotation';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ConvertToUnixTimeStamp } from "../../utils/ConvertToUnixTimeStamp";

Chart.register(CategoryScale);

const ChartComponent = () => {
    const dispatch = useDispatch();
    const dates1 = useSelector((state) => state.chartData.dates1);
    const dates2 = useSelector((state) => state.chartData.dates2);
    const prices1 = useSelector((state) => state.chartData.prices1);
    const prices2 = useSelector((state) => state.chartData.prices2);
    const coins = useSelector((state) => state.coins.coins);
    const [days, setDays] = useState(1);
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [selectedOption, setSelectedOption] = useState('Line');
    const [isOpen, setIsOpen] = useState(false);
    const [isCryptoOpen, setIsCryptoOpen] = useState(false);
    const [selectedCryptoOption, setSelectedCryptoOption] = useState(['Bitcoin']);
    const [whichCoins, setWhichCoins] = useState(['bitcoin']);
    const [checkedCoins, setCheckedCoins] = useState(['bitcoin']);
    const [labelName, setLabelName] = useState(['Bitcoin']);
    const [israngePickerOpen, setIsRangePickerOpen] = useState(false);
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [run, setRun] = useState(0.6809836734145203);
    const [clicked, setClicked] = useState(true);
    const [isRangeChanged, setIsRangeChanged] = useState(false);


    const lineHandler = () => {
        setSelectedOption('Line');
        setIsOpen(!isOpen);
    }

    const barHandler = () => {
        setSelectedOption('Bar');
        setIsOpen(!isOpen);
    }

    const handleCryptoClick = (coin) => {
        if (checkedCoins.includes(coin.id)) {
            setCheckedCoins([...(checkedCoins.filter((c) => c !== coin.id))]);
            setSelectedCryptoOption([...(selectedCryptoOption.filter((c) => coin.name !== c))]);
        } else if (checkedCoins.length < 2) {
            setCheckedCoins([...checkedCoins, coin.id]);
            setSelectedCryptoOption([...selectedCryptoOption, coin.name]);
        } else {
            alert('The maximum selection allowed is 2.')
        }
    }

    const handleDoneClick = () => {
        setWhichCoins([...checkedCoins]);
        setIsCryptoOpen(!isCryptoOpen);
        setLabelName([...selectedCryptoOption]);
    }

    const calendarIconHandler = () => {
        setIsRangePickerOpen(!israngePickerOpen);
        const temp = { ...selectionRange };
        if (isRangeChanged === true) {
            temp.endDate = new Date(temp.endDate.getTime() + 24 * 60 * 60 * 1000);
        }
        console.log(temp);
        console.log('temp.startDate');
        console.log(temp.startDate);
        console.log('temp.endDate');
        console.log(temp.endDate);
        console.log('selectionRange.startDate');
        console.log(selectionRange.startDate);
        console.log('selectionRange.endDate');
        console.log(selectionRange.endDate);
        let startDate = ConvertToUnixTimeStamp(temp.startDate);
        let endDate = ConvertToUnixTimeStamp(temp.endDate);
        if (isRangeChanged) {
            setIsRangeChanged((prev) => !prev);
            setFrom(startDate);
            setTo(endDate);
        }
    };

    const handleSelect = (ranges) => {
        setSelectionRange(ranges.selection);
        console.log('selectionRange')
        console.log(selectionRange)
        setIsRangeChanged(true);
        // console.log(ranges.selection);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    };

    useEffect(() => {
        const fetchChartData1 = async () => {
            dispatch(fetchChartData());
            try {
                if (clicked) {
                    setClicked((prev) => !prev);
                    const response1 = await axios.get(
                        `http://localhost:3000/api/coins1?whichCoin=${whichCoins[0]}&days=${days}`
                    );
                    const dates1 = response1.data.prices.map((price) => price[0]);
                    const prices1 = response1.data.prices.map((price) => price[1]);
                    if (whichCoins.length === 2) {
                        const response2 = await axios.get(
                            `http://localhost:3000/api/coins2?whichCoin=${whichCoins[1]}&days=${days}`
                        );
                        const dates2 = response2.data.prices.map((price) => price[0]);
                        const prices2 = response2.data.prices.map((price) => price[1]);
                        dispatch(fetchChartDataSuccess({ dates1, dates2, prices1, prices2 }))
                    }
                    else {
                        dispatch(fetchChartDataSuccess({ dates1, prices1 }));
                    }
                }
                else {
                    const response1 = await axios.get(
                        `http://localhost:3000/api/coins1/range?whichCoin=${whichCoins[0]}&from=${from}&to=${to}`
                    );
                    const dates1 = response1.data.prices.map((price) => price[0]);
                    const prices1 = response1.data.prices.map((price) => price[1]);
                    console.log('dates1:');
                    console.log(dates1);
                    console.log(prices1);
                    if (whichCoins.length === 2) {
                        const response2 = await axios.get(
                            `http://localhost:3000/api/coins2/range?whichCoin=${whichCoins[1]}&from=${from}&to=${to}`
                        );
                        const dates2 = response2.data.prices.map((price) => price[0]);
                        const prices2 = response2.data.prices.map((price) => price[1]);
                        dispatch(fetchChartDataSuccess({ dates1, dates2, prices1, prices2 }))
                    }
                    else {
                        dispatch(fetchChartDataSuccess({ dates1, prices1 }));
                    }
                }

            } catch (error) {
                console.log(error)
                dispatch(fetchChartDataError('Error fetching data.'));
            }
        };
        fetchChartData1();
    }, [dispatch, run, whichCoins, from, to]);

    // console.log('previousDays:');
    // console.log(typeof previousDays);
    // console.log(previousDays);
    // console.log('days:');
    // console.log(typeof days);
    // console.log(days);


    // if (dates1) {
    //     console.log(dates1);
    //     console.log(dates1.map((date) => {
    //         const datee = new Date(date);
    //         return datee.toLocaleDateString()
    //     }));
    // }

    // if (dates2){
    //     console.log(dates1);
    //     console.log(dates1.map((date) => {
    //         const datee = new Date(date);
    //         return datee.toLocaleDateString()
    //     }));
    // }

    // if (prices1)
    //     console.log("prices1:" );
    //     console.log(prices1);
    // if (prices2){
    //     console.log("prices2:" );
    //     console.log(prices2);
    // }

    const datasets = prices2 ? [
        {
            label: ` ${labelName[0]} Price`,
            data: prices1,
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5',
        },
        {
            label: ` ${labelName[1]} Price`,
            data: prices2,
            borderColor: '#FF6384',
            backgroundColor: '#FFB1C1',

        },
        {
            label: '',
            data: prices1.map(() => null), // Create transparent data points for Dataset 1
            pointRadius: 0, // Make points invisible
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: 'rgba(255, 255, 255, 0)',
            hidden: true
        },
        {
            label: '',
            data: prices2.map(() => null), // Create transparent data points for Dataset 2
            pointRadius: 0, // Make points invisible
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: 'rgba(255, 255, 255, 0)',
            hidden: true
        },
    ] : [
        {
            label: ` ${labelName[0]} Price`,
            data: prices1,
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5',
        },
        {
            label: '',
            data: prices1.map(() => null), // Create transparent data points for Dataset
            pointRadius: 0, // Make points invisible
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: 'rgba(255, 255, 255, 0)',
            hidden: true
        },
    ];


    return (
        <div className="w-[100%] h-full py-4 pl-5 pr-5 flex flex-col justify-between">
            <div className="flex items-center justify-between w-full">
                <div className="grid grid-rows-1 gap-1 grid-cols-6 w-[19rem] h-[2rem] text-sm">
                    <div onClick={() => { setDays(1); setRun(() => Math.random()); setClicked(() => true) }} className="flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <p>1D</p>
                    </div>
                    <div onClick={() => { setDays(7); setRun(() => Math.random()); setClicked(() => true) }} className="flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <p>1W</p>
                    </div>
                    <div onClick={() => { setDays(30); setRun(() => Math.random()); setClicked(() => true) }} className="flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <p>1M</p>
                    </div>
                    <div onClick={() => { setDays(180); setRun(() => Math.random()); setClicked(() => true) }} className="flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <p>6M</p>
                    </div>
                    <div onClick={() => { setDays(365); setRun(() => Math.random()); setClicked(() => true) }} className="flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <p>1Y</p>
                    </div>
                    <div onClick={() => calendarIconHandler()} className="relative flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer">
                        <div className="">
                            <IoCalendarOutline />
                        </div>
                    </div>
                </div>

                {israngePickerOpen && <div className="absolute top-[27.2%] left-[29.9%] z-10 border-2 border-[#afafaf]">
                    <DateRangePicker
                        className=""
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                    // rangeColors={["#FDA403"]}
                    // color={"#FDA403"}
                    />
                </div>}

                <div className="flex justify-between w-[47%] relative">
                    <button onClick={() => setIsCryptoOpen(prev => !prev)} className="bg-gray-100 h-[2.5rem] flex justify-center items-center text-sm font-semibold rounded-lg border px-3">
                        <p className="mr-2">
                            {selectedCryptoOption.join(', ')}
                        </p>
                        {isCryptoOpen ?
                            <VscTriangleUp style={{ width: "1.1rem", height: "1.1rem" }} />
                            : <VscTriangleDown style={{ width: "1.1rem", height: "1.1rem" }} />}
                    </button>
                    {isCryptoOpen && <div className="w-[13rem] h-[19.5rem] absolute top-[2.7rem] left-[0]">
                        {isCryptoOpen && <div className="overflow-y-scroll h-[90%] bg-gray-100 border  rounded-t-lg  text-sm font-semibold justify-center">
                            {coins.map((coin) => {
                                return (
                                    <div key={coin.id} onClick={() => handleCryptoClick(coin)} className="w-[13rem] px-[0.79rem] flex items-center pt-[0.5rem] pb-[0.7rem] border-b border-gray-300 cursor-pointer text-sm font-semibold">
                                        <input type="checkbox" checked={checkedCoins.includes(coin.id)} onChange={() => { }} className="mr-2 cursor-pointer " />{coin.name}
                                    </div>
                                )
                            })}
                        </div>}
                        {isCryptoOpen && <button onClick={() => handleDoneClick()} className="w-full py-2 text-white rounded-b-lg bg-gradient-to-r from-cyan-500 to-blue-500">Done</button>}
                    </div>}
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
                            labels: dates1.map((date, index) => {
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
                                return days === 1 || to === (from + 86400) ? time : finalDate;
                            }),
                            datasets: datasets,
                        }}
                        options={{
                            maintainAspectRatio: false,
                            pointHoverRadius: 7,
                            pointHitRadius: 10,
                            hoverBackgroundColor: 'white',
                            pointHoverBorderWidth: 3,
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
                            },
                            plugins: {
                                tooltip: {
                                    usePointStyle: true,
                                    mode: 'index', // Show tooltip for all points
                                    intersect: false, // Allow tooltips to intersect with items
                                },
                                legend: {
                                    align: 'end',
                                    labels: {
                                        usePointStyle: true,
                                        pointStyle: 'circle'
                                    }
                                }
                            },
                        }}
                    /> :
                    <Bar
                        data={{
                            labels: dates1.map((date, index) => {
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
                                return days === 1 || to === (from + 86400) ? time : finalDate;
                            }),
                            datasets: datasets,
                        }}
                        options={{
                            maintainAspectRatio: false,
                            pointHoverRadius: 7,
                            pointHitRadius: 10,
                            hoverBackgroundColor: 'white',
                            pointHoverBorderWidth: 3,
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
                            },
                            plugins: {
                                tooltip: {
                                    usePointStyle: true,
                                    mode: 'index', // Show tooltip for all points
                                    intersect: false, // Allow tooltips to intersect with items
                                },
                                legend: {
                                    align: 'end',
                                    labels: {
                                        usePointStyle: true,
                                        pointStyle: 'circle'
                                    }
                                }
                            },
                        }}
                    />
                }

            </div>
        </div>
    );
};

export default ChartComponent;
