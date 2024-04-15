import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2';
import { CategoryScale, Chart } from "chart.js/auto";
import { useSelector } from 'react-redux';
import './Portfolio.css'
Chart.register(CategoryScale);

const Portfolio = () => {
    const yourCoins = useSelector((state) => state.yourCoins.yourCoins);
    const coins = useSelector((state) => state.coins.coins);
    const [total, setTotal] = useState(0);
    const [keys, setKeys] = useState([]);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        setTotal(() => 0);
        let units = [];
        const newKeys = yourCoins.map((coin) => {
            for (const c of coins) {
                if (c.name === Object.keys(coin)[0]) {
                    setTotal((prev) => prev + c.current_price);
                    break;
                }
            }
            units.push(coin['unit']);
            return Object.keys(coin)[0]
        });
        setKeys(newKeys);
        setUnits(units);
    }, [coins, yourCoins]);

    let largestKey = 0;
    for (const key of keys) {
        if (key.length > largestKey)
            largestKey = key.length;
    }
    const values = yourCoins.map((coin, index) => coin[keys[index]]);
    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'right',
                rtl: true,
                labels: {
                    // generateLabels: function (chart) {
                    //     const data = chart.data;
                    //     if (data.labels.length && data.datasets.length) {
                    //         return data.labels.map(function (label, i) {
                    //             const ds = data.datasets[0];
                    //             const unit = units[i]; // Get the unit for this label
                    //             const backgroundColor = ds.backgroundColor[i];

                    //             return {
                    //                 text: unit, // Only include the unit
                    //                 fillStyle: backgroundColor, // Use dataset background color for fill
                    //                 strokeStyle: backgroundColor, // Use dataset background color for stroke
                    //                 lineWidth: 1,
                    //                 pointStyle: 'circle',
                    //                 hidden: false,
                    //                 // Extra data used for toggling the datasets
                    //                 datasetIndex: 0,
                    //                 index: i
                    //             };
                    //         });
                    //     }
                    //     return [];
                    // },
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxHeight: 8,
                    boxWidth: 8,
                    textAlign: 'left',
                    position: 'absolute',
                    zindex: 1
                }

            },
        },
    };

    const plugin = {
        id: 'plugin',
        afterInit(chart, args, options) {
            const fitValue = chart.legend.fit;
            chart.legend.fit = function fit() {
                fitValue.bind(chart.legend)();
                let width = this.width += 10 + (largestKey * 3);
                return width;
            }
        }
    }

    const data = {
        labels: [...keys],
        datasets: [
            {
                label: 'Total coins',
                data: [...values],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='p-5 h-[100%]'>
            <div className='flex items-center justify-between text-lg font-bold'>
                <span>Portfolio</span>
                <span className='ml-3 overflow-scroll text-base font-semibold whitespace-nowrap sm:ml-0'>Total Value: {total.toFixed(2)}</span>
            </div>
            <div className='h-[88.5%] w-[100%] flex justify-center items-center'>
                <div className='w-[100%] h-[80%] mx-auto'>
                    <Pie data={data} options={options} plugins={[plugin]} />
                </div>
            </div>
        </div>
    )
}

export default Portfolio