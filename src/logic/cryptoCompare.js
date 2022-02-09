const axios = require('axios');
const moment = require("moment");

function cryptoCompare(symbols, date) {
  let daysLimit = moment().diff(date, 'days');
  let promises = symbols.map((symbol) => {
    return compare(symbol, daysLimit);
  })
  return Promise.all(promises);
}

function compare(symbol, daysLimit) {
  return axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=${daysLimit}`).then(function (response) {
    // handle success
    let { data } = response;
    return {
      symbol,
      data
    };
  })
  .catch(function (error) {
    return "Error..."
  });
}
module.exports = cryptoCompare;