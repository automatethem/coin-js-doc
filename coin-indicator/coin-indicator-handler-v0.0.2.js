import ccxt from "ccxt";
import {rsi} from 'indicatorts';
import {bollingerBands} from 'indicatorts';

const binance = new ccxt.binance();
const upbit = new ccxt.upbit();
const bithumb = new ccxt.bithumb();

//1y,1M,1d,1h,1m
const timeframe = "1m";

const handle = async (exchangeName, indicatorName, symbol, limit) => {
    var exchange = null;
    if (exchangeName == "binance") 
        exchange = binance;
    if (exchangeName == "upbit") 
        exchange = upbit;
    if (exchangeName == "bithumb") 
        exchange = bithumb;
    const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
    //console.log(ohlcv);
/*
[
  [ 1707971040000, 71462000, 71470000, 71462000, 71464000, 5.49252936 ],
  [
    1707971100000,
    71464000,
    71496000,
    71463000,
    71496000,
    11.94154841
  ],
  [ 1707971160000, 71495000, 71534000, 71494000, 71507000, 5.58867093 ],
  [ 1707971220000, 71507000, 71558000, 71506000, 71558000, 3.65583778 ],
  [ 1707971280000, 71549000, 71558000, 71547000, 71555000, 3.06287481 ],
  [ 1707971340000, 71557000, 71566000, 71555000, 71566000, 3.52230023 ],
  [ 1707971400000, 71570000, 71590000, 71568000, 71580000, 3.37504682 ],
  [ 1707971460000, 71580000, 71590000, 71579000, 71588000, 3.29403089 ],
  [ 1707971520000, 71589000, 71590000, 71506000, 71510000, 9.45908625 ],
  [ 1707971580000, 71510000, 71510000, 71506000, 71509000, 1.59060466 ]
]
*/

    const highArray = [];
    for (const x of ohlcv) {
        const high = x[1];
        highArray.push(high);
    }
    //const highArray = ohlcv.map(x => x[1]);
    const lowArray = [];
    for (const x of ohlcv) {
        const low = x[2];
        lowArray.push(low);
    }
    const colseArray = [];
    for (const x of ohlcv) {
        const close = x[3];
        colseArray.push(close);
    }
    //console.log(colseArray); 
    /*
[
  71462000, 71463000,
  71494000, 71506000,
  71547000, 71555000,
  71568000, 71579000,
  71506000, 71506000
]
    */
    const volumerray = [];
    for (const x of ohlcv) {
        const volume = x[4];
        volumerray.push(volume);
    }

    var indicatorValue = null;
    if (indicatorName == "rsi") {
        indicatorValue = rsi(colseArray);
    }
    else if (indicatorName == "bbands") {
        indicatorValue = bollingerBands(colseArray);
    }

    return indicatorValue;
};

const handleRsi = async (exchangeName, symbol) => {
    const limit = 30;
    const coinIndicatorValue = await handle(exchangeName, "rsi", symbol, limit);
    //console.log(coinIndicatorValue);
    //[ [ 100, 100, 100, 100, 100, 28.693170398359936, 28.69317039835993 ] ]
    const previouseRsi = coinIndicatorValue.slice(-2)[0];
    //console.log(previouseRsi); //28.693170398359936
    const rsi = coinIndicatorValue.slice(-2)[1];
    //console.log(rsi); //28.69317039835993
    return [previouseRsi, rsi];
}

const handleBbands = async (exchangeName, symbol) => {
    const limit = 30;
    const coinIndicatorValue = await handle(exchangeName, "bbands", symbol, limit);
    //console.log(coinIndicatorValue);
    /*
    [
    [
        71511627.09586658,
        71510708.6640114,
        71510839.75316624,
        71511616.10872106,
        71518622.9578657,
        71528575.46036771,
        71529056.07975946,
        71524114.78922161
    ],
    [
        71518666.66666666,
        71513333.33333333,
        71513000,
        71519333.33333333,
        71525000,
        71531666.66666666,
        71532000,
        71556000
    ],
    [
        71525706.23746674,
        71515958.00265525,
        71515160.24683376,
        71527050.5579456,
        71531377.0421343,
        71534757.8729656,
        71534943.92024054,
        71587885.21077839
    ]
    ]
    */

    const previousBbandsLower = coinIndicatorValue.lowerBand.slice(-2)[0];
    const previousBbandsMiddle = coinIndicatorValue.middleBand.slice(-2)[0];
    const previousBbandsUpper = coinIndicatorValue.upperBand.slice(-2)[0];
    //console.log(previousBbandsLower);
    //console.log(previousBbandsMiddle);
    //console.log(previousBbandsUpper);

    const bbandsLower = coinIndicatorValue.lowerBand.slice(-2)[1];
    const bbandsMiddle = coinIndicatorValue.middleBand.slice(-2)[1];
    const bbandsUpper = coinIndicatorValue.upperBand.slice(-2)[1];
    //console.log(bbandsLower);
    //console.log(bbandsMiddle);
    //console.log(bbandsUpper);
    return [[previousBbandsLower, previousBbandsMiddle, previousBbandsUpper], [bbandsLower, bbandsMiddle, bbandsUpper]]
};

export default {
    handleRsi: handleRsi,
    handleBbands: handleBbands
};
