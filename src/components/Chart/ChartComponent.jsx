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
import "./ChartComponent.css";
import "chartjs-plugin-annotation";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ConvertToUnixTimeStamp } from "../../utils/ConvertToUnixTimeStamp";

Chart.register(CategoryScale);

const ChartComponent = () => {
    const dispatch = useDispatch();
    const dates1 = useSelector((state) => state.chartData.dates1);
    const prices1 = useSelector((state) => state.chartData.prices1);
    const prices2 = useSelector((state) => state.chartData.prices2);
    const coins = useSelector((state) => state.coins.coins);
    const vsCurrency = useSelector((state) => state.vsCurrency.vsCurrency);
    const [days, setDays] = useState(1);
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [selectedOption, setSelectedOption] = useState("Line");
    const [isOpen, setIsOpen] = useState(false);
    const [isCryptoOpen, setIsCryptoOpen] = useState(false);
    const [selectedCryptoOption, setSelectedCryptoOption] = useState(["Bitcoin"]);
    const [whichCoins, setWhichCoins] = useState(["bitcoin"]);
    const [checkedCoins, setCheckedCoins] = useState(["bitcoin"]);
    const [labelName, setLabelName] = useState(["Bitcoin"]);
    const [israngePickerOpen, setIsRangePickerOpen] = useState(false);
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });
    const [run, setRun] = useState(0.6809836734145203);
    const [clicked, setClicked] = useState(true);
    const [isRangeChanged, setIsRangeChanged] = useState(false);
    const [previousCurrency, setPreviousCurrency] = useState("inr");
    const [previousRun, setPreviousRun] = useState("days");
    const [duration, setDuration] = useState(1);
    const [limit, setLimit] = useState(6);

    const lineHandler = () => {
        setSelectedOption("Line");
        setIsOpen(!isOpen);
    };

    const barHandler = () => {
        setSelectedOption("Bar");
        setIsOpen(!isOpen);
    };

    const handleCryptoClick = (coin) => {
        if (checkedCoins.includes(coin.id)) {
            setCheckedCoins([...checkedCoins.filter((c) => c !== coin.id)]);
            setSelectedCryptoOption([
                ...selectedCryptoOption.filter((c) => coin.name !== c),
            ]);
        } else if (checkedCoins.length < 2) {
            setCheckedCoins([...checkedCoins, coin.id]);
            setSelectedCryptoOption([...selectedCryptoOption, coin.name]);
        } else {
            alert("The maximum selection allowed is 2.");
        }
    };

    const handleDoneClick = () => {
        setWhichCoins([...checkedCoins]);
        setIsCryptoOpen(!isCryptoOpen);
        setLabelName([...selectedCryptoOption]);
    };

    const calendarIconHandler = () => {
        setIsRangePickerOpen(!israngePickerOpen);
        setDuration(0);
        const temp = { ...selectionRange };
        if (isRangeChanged === true) {
            temp.endDate = new Date(temp.endDate.getTime() + 24 * 60 * 60 * 1000);
        }
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
        setIsRangeChanged(true);
    };

    const daysBasis = async () => {

        const response1 = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${whichCoins[0]}/market_chart?vs_currency=${vsCurrency}&days=${days}`
        );

        const dates1 = response1.data.prices.map((price) => price[0]);
        const prices1 = response1.data.prices.map((price) => price[1].toFixed(2));
        if (whichCoins.length === 2) {
            const response2 = axios.get(
                `https://api.coingecko.com/api/v3/coins/${whichCoins[1]}/market_chart?vs_currency=${vsCurrency}&days=${days}`
            );
            const dates2 = response2.data.prices.map((price) => price[0]);
            const prices2 = response2.data.prices.map((price) => price[1].toFixed(2));
            dispatch(fetchChartDataSuccess({ dates1, dates2, prices1, prices2 }));
        } else {
            dispatch(fetchChartDataSuccess({ dates1, prices1 }));
        }
    };

    const rangeBasis = () => {
        const response1 = axios.get(
            `https://api.coingecko.com/api/v3/coins/${whichCoins[0]}/market_chart/range?vs_currency=${vsCurrency}&from=${from}&to=${to}`
        );
        const dates1 = response1.data.prices.map((price) => price[0]);
        const prices1 = response1.data.prices.map((price) => price[1].toFixed(2));
        if (whichCoins.length === 2) {
            const response2 = axios.get(
                `https://api.coingecko.com/api/v3/coins/${whichCoins[1]}/market_chart/range?vs_currency=${vsCurrency}&from=${from}&to=${to}`
            );
            const dates2 = response2.data.prices.map((price) => price[0]);
            const prices2 = response2.data.prices.map((price) => price[1].toFixed(2));
            dispatch(fetchChartDataSuccess({ dates1, dates2, prices1, prices2 }));
        } else {
            dispatch(fetchChartDataSuccess({ dates1, prices1 }));
        }
    };

    useEffect(() => {
        const fetchChartData1 = async () => {
            dispatch(fetchChartData());
            try {
                if (previousCurrency !== vsCurrency) {
                    setPreviousCurrency(() => vsCurrency);
                    if (previousRun === "days") {
                        daysBasis();
                    } else {
                        rangeBasis();
                    }
                } else {
                    if (clicked) {
                        setPreviousCurrency(() => vsCurrency);
                        setPreviousRun(() => "days");
                        setClicked(() => false);
                        daysBasis();
                    } else {
                        setPreviousCurrency(() => vsCurrency);
                        setPreviousRun(() => "calendar");
                        rangeBasis();
                    }
                }
            } catch (error) {
                console.log(error);
                dispatch(fetchChartDataError("Error fetching data."));
            }
        };
        fetchChartData1();
    }, [dispatch, run, whichCoins, from, to, vsCurrency]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            // Define your breakpoints and set the value of 'a' accordingly
            if (width < 450) {
                setLimit(4);
            } else if (width >= 450 && width < 700) {
                setLimit(5);
            } else if (width >= 700 && width < 900) {
                setLimit(8);
            } else if (width >= 900 && width < 1024) {
                setLimit(10);
            } else if (width >= 1024 && width < 1731) {
                setLimit(8);
            } else {
                setLimit(10);
            }
        };

        window.addEventListener("resize", handleResize);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const datasets = prices2
        ? [
            {
                label: ` ${labelName[0]} Price`,
                data: prices1,
                borderColor: "#36A2EB",
                backgroundColor: "#9BD0F5",
            },
            {
                label: ` ${labelName[1]} Price`,
                data: prices2,
                borderColor: "#FF6384",
                backgroundColor: "#FFB1C1",
            },
            {
                label: "",
                data: prices1.map(() => null), // Create transparent data points for Dataset 1
                pointRadius: 0, // Make points invisible
                backgroundColor: "rgba(255, 255, 255, 0)",
                borderColor: "rgba(255, 255, 255, 0)",
                hidden: true,
            },
            {
                label: "",
                data: prices2.map(() => null), // Create transparent data points for Dataset 2
                pointRadius: 0, // Make points invisible
                backgroundColor: "rgba(255, 255, 255, 0)",
                borderColor: "rgba(255, 255, 255, 0)",
                hidden: true,
            },
        ]
        : [
            {
                label: ` ${labelName[0]} Price`,
                data: prices1,
                borderColor: "#36A2EB",
                backgroundColor: "#9BD0F5",
            },
            {
                label: "",
                data: prices1.map(() => null), // Create transparent data points for Dataset
                pointRadius: 0, // Make points invisible
                backgroundColor: "rgba(255, 255, 255, 0)",
                borderColor: "rgba(255, 255, 255, 0)",
                hidden: true,
            },
        ];

    const labels = dates1.map((date, index) => {
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
        return days === 1 || to === from + 86400 ? time : finalDate;
    });

    const options = {
        maintainAspectRatio: false,
        pointHoverRadius: 7,
        pointHitRadius: 10,
        hoverBackgroundColor: "white",
        pointHoverBorderWidth: 3,
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: limit,
                },
            },
            y: {
                ticks: {
                    maxTicksLimit: 10,
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        if (value >= 1000000) {
                            return (value / 1000000).toFixed(2) + "M";
                        } else if (value >= 1000) {
                            return (value / 1000).toFixed(2) + "K";
                        } else {
                            return value.toFixed(2);
                        }
                    },
                },
            },
        },
        elements: {
            point: {
                pointRadius: 0,
            },
        },
        plugins: {
            tooltip: {
                usePointStyle: true,
                mode: "index", // Show tooltip for all points
                intersect: false, // Allow tooltips to intersect with items
            },
            legend: {
                align: "end",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                },
            },
        },
    };

    const lines = {
        id: "lines",
        beforeDatasetsDraw(chart) {
            const {
                ctx,
                tooltip,
                chartArea: { top, bottom },
            } = chart;

            if (tooltip._active[0]) {
                ctx.beginPath();
                ctx.strokeStyle = "grey";
                ctx.lineWidth = 1;
                ctx.moveTo(tooltip._active[0].element.x, top);
                ctx.lineTo(tooltip._active[0].element.x, bottom);
                ctx.stroke();
                ctx.restore();
            }
        },
    };

    return (
        <div className="w-[100%] h-full py-4 pl-5 pr-5 flex flex-col justify-between">
            <div className="flex items-center justify-between w-full">
                <div className=" grid-rows-1 gap-1 grid-cols-6 w-[19rem] hidden sm:grid h-[2rem] text-sm">
                    <div
                        onClick={() => {
                            setDays(1);
                            setDuration(1);
                            setRun(() => Math.random());
                            setClicked(() => true);
                        }}
                        className={`flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer ${duration === 1 ? "border-2 border-[#3660cb] text-[#3660cb]" : ""
                            }`}
                    >
                        <p>1D</p>
                    </div>
                    <div
                        onClick={() => {
                            setDays(7);
                            setDuration(7);
                            setRun(() => Math.random());
                            setClicked(() => true);
                        }}
                        className={`flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer ${duration === 7 ? "border-2 border-[#3660cb] text-[#3660cb]" : ""
                            }`}
                    >
                        <p>1W</p>
                    </div>
                    <div
                        onClick={() => {
                            setDays(30);
                            setDuration(30);
                            setRun(() => Math.random());
                            setClicked(() => true);
                        }}
                        className={`flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer ${duration === 30 ? "border-2 border-[#3660cb] text-[#3660cb]" : ""
                            }`}
                    >
                        <p>1M</p>
                    </div>
                    <div
                        onClick={() => {
                            setDays(180);
                            setDuration(180);
                            setRun(() => Math.random());
                            setClicked(() => true);
                        }}
                        className={`flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer ${duration === 180 ? "border-2 border-[#3660cb] text-[#3660cb]" : ""
                            }`}
                    >
                        <p>6M</p>
                    </div>
                    <div
                        onClick={() => {
                            setDays(365);
                            setDuration(365);
                            setRun(() => Math.random());
                            setClicked(() => true);
                        }}
                        className={`flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg cursor-pointer ${duration === 365 ? "border-2 border-[#3660cb] text-[#3660cb]" : ""
                            }`}
                    >
                        <p>1Y</p>
                    </div>
                    <div
                        onClick={() => calendarIconHandler()}
                        className={`relative flex items-center justify-center col-span-1 font-semibold bg-gray-100 rounded-lg invisible cursor-pointer ${duration === 0 ? "border-2 border-[#3660cb] text-[#3660cb]" : ""
                            }`}
                    >
                        <div className="">
                            <IoCalendarOutline />
                        </div>
                    </div>
                </div>

                {israngePickerOpen && (
                    <div className="absolute top-[27.2%] left-[29.9%] z-10 border-2 border-[#afafaf]">
                        <DateRangePicker
                            className=""
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                        // rangeColors={["#FDA403"]}
                        // color={"#FDA403"}
                        />
                    </div>
                )}

                <div className="flex sm:justify-between sm:w-[28%] w-full relative">
                    <button
                        onClick={() => {
                            setIsCryptoOpen((prev) => !prev);
                            if (previousRun === "days") {
                                setClicked(true);
                            } else {
                                setClicked(false);
                            }
                        }}
                        className={`bg-gray-100 h-[2.5rem] sm:w-[64%] w-[45%] sm:mr-[0.7rem] mr-0 flex justify-between items-center text-sm font-semibold rounded-lg border px-3 ${isCryptoOpen ? "border-2 border-[#3660cb] text-[#3660cb]" : ""
                            }`}
                    >
                        <p className="mr-2 overflow-hidden whitespace-nowrap w-[90%] text-left">
                            {selectedCryptoOption.join(", ")}
                        </p>
                        {isCryptoOpen ? (
                            <VscTriangleUp size={"20"} />
                        ) : (
                            <VscTriangleDown size={"20"} />
                        )}
                    </button>
                    {isCryptoOpen && (
                        <div className="w-[13rem] h-[19.5rem] absolute top-[2.7rem] left-[0]">
                            {isCryptoOpen && (
                                <div className="overflow-y-scroll h-[90%] bg-gray-100 border  rounded-t-lg  text-sm font-semibold justify-center">
                                    {coins.map((coin) => {
                                        return (
                                            <div
                                                key={coin.id}
                                                onClick={() => handleCryptoClick(coin)}
                                                className="w-[13rem] px-[0.79rem] flex items-center h-[2.5rem] border-b border-gray-300 cursor-pointer text-sm font-semibold"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={checkedCoins.includes(coin.id)}
                                                    onChange={() => { }}
                                                    className="mr-2 cursor-pointer "
                                                />
                                                {coin.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {isCryptoOpen && (
                                <button
                                    onClick={() => handleDoneClick()}
                                    className="w-full py-2 text-white rounded-b-lg bg-gradient-to-r from-cyan-500 to-blue-500"
                                >
                                    Done
                                </button>
                            )}
                        </div>
                    )}
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className={`bg-gray-100 w-[5rem] h-[2.5rem] ml-4 sm:ml-0 flex justify-center items-center text-sm font-semibold rounded-lg border ${isOpen ? "border-2 border-[#3660cb] text-[#3660cb]" : ""
                            }`}
                    >
                        <p className="mr-2">{selectedOption}</p>
                        {isOpen ? (
                            <VscTriangleUp size={"1.1rem"} />
                        ) : (
                            <VscTriangleDown size={"1.1rem"} />
                        )}
                    </button>
                    {isOpen && (
                        <div className="w-[5rem] h-[5rem] bg-gray-100 border absolute rounded-lg top-[2.7rem] right-0 flex flex-col text-sm font-semibold justify-center">
                            <div
                                onClick={barHandler}
                                className="w-full h-[50%] px-[0.79rem]  rounded-t-lg flex items-center border-b cursor-pointer"
                            >
                                Bar
                            </div>
                            <div
                                onClick={lineHandler}
                                className="w-full h-[50%] px-[0.79rem] rounded-b-lg flex items-center cursor-pointer"
                            >
                                Line
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="h-[85%]">
                {selectedOption === "Line" ? (
                    <Line
                        data={{
                            labels: labels,
                            datasets: datasets,
                        }}
                        options={options}
                        plugins={[lines]}
                    />
                ) : (
                    <Bar
                        data={{
                            labels: labels,
                            datasets: datasets,
                        }}
                        options={options}
                        plugins={[lines]}
                    />
                )}
            </div>
        </div>
    );
};

export default ChartComponent;
