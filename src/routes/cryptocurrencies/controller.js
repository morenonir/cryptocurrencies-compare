const express = require("express");
const router = express.Router();
const moment = require("moment");
const cryptoCompare = require("../../logic/cryptoCompare.js");
const helper = require("../../logic/helper");

const _FORMAT = 'DD/MM/YYYY';

function getPriceOverTime(req, res, next) {
  const { query } = req;
  let symbols = [];
  let date = undefined;
  
  try {
    symbols = Object.keys(query.symbols.replace(/\s/g, '').toUpperCase().split(",").reduce((acc, sym) => {
      acc[sym] = sym;
      return acc;
    }, {}));
  } catch (e) {
    return res.status(400).send("missing 'symbols' as parameter");
  }

  if (!query.date) {
    return res.status(400).send("missing 'date' as parameter");
  }
  else {
    try {
      date = moment(query.date, _FORMAT, true)
      if (!date.isValid()) {
        return res.status(400).send(`required date in format : ${_FORMAT}`);
      }
      if (moment().diff(date, 'days') < 1){
        return res.status(400).send("required date in the past");
      }
    
      cryptoCompare(symbols, date).then((multiSymbolsData) => {
        let symbolPercentageGainResults = multiSymbolsData.reduce((acc, symbolData) => {
          const { data: { Response } } = symbolData;
          if(Response === "Success"){
            acc.push(helper.calculatePercentageGain(symbolData))
          }
          return acc;
        }, []);
        if(!symbolPercentageGainResults.length && multiSymbolsData[0].data) {
          return res.status(400).send(multiSymbolsData[0].data.Message);
        }

        let strResponse = helper.prepareResponse(symbolPercentageGainResults);
        return res.status(200).send(strResponse);
      });
    } catch (e) {
      return res.status(400).send(`123required date in format : ${_FORMAT}`);
    }
  }
}

module.exports = getPriceOverTime;