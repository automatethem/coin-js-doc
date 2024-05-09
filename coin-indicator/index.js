import coinIndicatorHandler from "./coin-indicator-handler.js";

/*
const exchangeName = "binance";
const symbol = "BTC/USDT"
*/
///*
const exchangeName = "upbit";
const symbol = "BTC/KRW"
//*/
/*
const exchangeName = "bithumb";
const symbol = "BTC/KRW"
*/

const [previouseRsi, rsi] = await coinIndicatorHandler.handleRsi(exchangeName, symbol);
console.log(previouseRsi);
console.log(rsi);

const bbandsValue = await coinIndicatorHandler.handleBbands(exchangeName, symbol);
const [[previousBbandsLower, previousBbandsMiddle, previousBbandsUpper], [bbandsLower, bbandsMiddle, bbandsUpper]] = bbandsValue;
console.log(previousBbandsLower);
console.log(previousBbandsMiddle);
console.log(previousBbandsUpper);
console.log(bbandsLower);
console.log(bbandsMiddle);
console.log(bbandsUpper);

/*
47.67629365422534
48.3700449933124
71602199.58159088
71697800
71793400.41840912
71603831.00923741
71699150
71794468.99076259
*/