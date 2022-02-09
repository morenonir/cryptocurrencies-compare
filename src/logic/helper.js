function compareRate(prevPrice, lastPrice) {
  let calc = Math.floor(( lastPrice / prevPrice ) * 100) - 100
  return (prevPrice < 0) ? (calc * -1) : calc;
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

function sortByTopPercentageGainers(symbolsData) {
  return symbolsData.sort(function (a, b) {  return a.percentage - b.percentage; }).reverse()
}

module.exports = {
  compareRate,
  prepareResponse,
  calculatePercentageGain
};