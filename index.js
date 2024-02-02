const express = require('express');
const app = express();
const port = 3000;
const ejs = require("ejs");
require("./db/conn");
const TickerModel=require("./models/tickerData")

require('dotenv').config();
const axios = require('axios');
app.set('view engine', 'ejs');
/*
app.get('/', async (req, res) => {
    try {
      const apiUrl = 'https://api.wazirx.com/api/v2/tickers';
      const response = await axios.get(apiUrl);
  
      // Extract the top 10 tickers
      const data = Object.values(response.data)
        .slice(0, 10)
        .map(ticker => ({
          symbol: ticker.symbol,
          base_unit: ticker.base_unit,
          name: ticker.name,
          lastPrice: parseFloat(ticker.last),
          buy: parseFloat(ticker.buy),
          sell: parseFloat(ticker.sell),
          volume: parseFloat(ticker.volume),
        }));
       
      // Save data to MongoDB
      await TickerModel.insertMany(data);
  
      // Render the view with the top 10 tickers
      res.render('index', { data });
    } catch (error) {
      console.error('Error fetching or saving data:', error.message);
      res.status(500).send('Internal Server Error');
    }
});
  */
// Fetch data from MongoDB and render the view
app.get('/api', async (req, res) => {
    try {
      // Fetch data from MongoDB
      const tickers = await TickerModel.find().limit(10).exec();
  
      // Render the view with the fetched data
      res.render('index', { tickers: tickers }); // Corrected the variable name here
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
