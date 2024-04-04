import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2';
import { CategoryScale, Chart } from "chart.js/auto";
import { useSelector } from 'react-redux';
import './Portfolio.css'
Chart.register(CategoryScale);

const Portfolio = () => {
    const yourCoins = useSelector((state) => state.yourCoins.yourCoins);
    // const [keys, setKeys] = useState([]);
    const keys = yourCoins.map((coin) => Object.keys(coin)[0]);
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
                let width = this.width += 45 + (largestKey * 3);
                return width;
            }
        }
    }

    const width = `${15 + largestKey / 3.1}rem`;

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
                <span className='text-base font-semibold'>Total Value: $1000</span>
            </div>
            <div className='w-[15rem] h-[88%] mx-auto' style={{ width: width }}>
                <Pie data={data} options={options} plugins={[plugin]} />
            </div>
        </div>
    )
}

export default Portfolio