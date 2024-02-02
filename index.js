const express = require('express');
const app = express();
const port = 3000;
const ejs = require("ejs");


require('dotenv').config();

const axios = require('axios');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
      const apiUrl = 'https://api.wazirx.com/api/v2/tickers';
      
      const response = await axios.get(apiUrl);
      const data = Object.values(response.data)
      .slice(0, 10)
      .map(ticker => ({
          symbol: ticker.symbol,
          base_unit:ticker.base_unit,
        lastPrice: ticker.last,
        buy: ticker.buy,
        sell: ticker.sell,
          volume: ticker.volume,
          name: ticker.name,
        
      }));

    res.render('index', { data });
  
      // Display a simple message in the response
      
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
