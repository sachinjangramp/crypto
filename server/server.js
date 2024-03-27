const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:3001',
}))

app.get('/api/coins1', async (req, res) => {
    try {
        const { whichCoin, days} = req.query;
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${whichCoin}/market_chart?vs_currency=inr&days=${days}`);
        // console.log(response);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/coins2', async (req, res) => {
    try {
        const { whichCoin, days} = req.query;
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${whichCoin}/market_chart?vs_currency=inr&days=${days}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/coins1/range', async (req, res) => {
    try {
        const { whichCoin, from, to} = req.query;
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${whichCoin}/market_chart/range?vs_currency=inr&from=${from}&to=${to}`);
        // console.log('response:');
        // console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/coins2/range', async (req, res) => {
    try {
        const { whichCoin, from, to} = req.query;
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${whichCoin}/market_chart/range?vs_currency=inr&from=${from}&to=${to}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/coins/marketcap', async (req, res) => {
    try {
        const {vsCurrency} = req.query;
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});