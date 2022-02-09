function compareRate(prevPrice, lastPrice) {
  return Math.floor(( lastPrice / prevPrice ) * 100) - 100;
}

function calculatePercentageGain(symbolData) {
  const { data: { Data } } = symbolData;
  const price_p1 = Data.Data[0].close;
  const price_pN = Data.Data[Data.Data.length - 1].close;
  return {
    symbol: symbolData.symbol,
    percentage: compareRate(price_p1, price_pN) 
  };
}

function prepareResponse(symbolsData){
  return sortByTopPercentageGainers(symbolsData).reduce((acc, symbol) => {
    acc += `${symbol.symbol}: ${symbol.percentage}% `;
    return acc;
  }, "");
}

//Private
function sortByTopPercentageGainers(symbolsData) {
  return symbolsData.sort(function (a, b) {  return a.percentage < b.percentage; })
}

module.exports = {
  calculatePercentageGain,
  prepareResponse
};