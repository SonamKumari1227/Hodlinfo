
const mongoose = require('mongoose');
const tickerSchema = new mongoose.Schema({
    symbol: String,
    base_unit: String,
    name: String,
    last: Number,
    buy: Number,
    sell: Number,
    volume: Number
});
  
const Ticker = mongoose.model('Ticker', tickerSchema);
module.exports = Ticker;