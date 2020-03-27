import { STONKS } from '../src/common/constants'
// Define testing export constants
export const defaultHighVal = 63.44
export const prevYearHigherVal = 1000.96
export const defaultLowVal = 19.10
export const prevYearLowerVal = 2.14
export const defaultLastYear = '2019'
export const defaultStockSymbol = STONKS[2]
// moment will use Data.now internally to calculate previous year for history function
export const defaultDate = Date.now = jest.fn(() => new Date(Date.UTC(2019, 3, 24)).valueOf())
export const defaultResponseFromQuoteEndpoint =  [{
    symbol: 'DAL',
    name: 'Delta Air Lines, Inc.',
    price: 22.22,
    changesPercentage: 15.66,
    change: 4.21,
    dayLow: 27.4,
    dayHigh: 33.28,
    yearHigh: 63.44,
    yearLow: 19.1,
    marketCap: 19906924544,
    priceAvg50: 46.53657,
    priceAvg200: 54.395622,
    volume: 69700639,
    avgVolume: 15679022,
    exhange: 'NYSE',
    open: 31.49,
    previousClose: 26.89,
    eps: 7.3,
    pe: 4.260274,
    earningsAnnouncement: '2020-01-14T12:00:13.000+0000',
    sharesOutstanding: 646742976,
    timestamp: 1585178783
  },
  {
    symbol: 'LYFT',
    name: 'Lyft, Inc.',
    price: 22.61,
    changesPercentage: 3.29,
    change: 0.89,
    dayLow: 26.53,
    dayHigh: 30.9,
    yearHigh: 88.6,
    yearLow: 14.562,
    marketCap: 8570588160,
    priceAvg50: 37.152287,
    priceAvg200: 42.686314,
    volume: 13888939,
    avgVolume: 9575570,
    exhange: 'NASDAQ',
    open: 27.39,
    previousClose: 27.06,
    eps: -11.439,
    pe: null,
    earningsAnnouncement: '2020-02-12T02:00:00.000+0000',
    sharesOutstanding: 293792992,
    timestamp: 1585178783
  },
  {
    symbol: 'UBER',
    name: 'Uber Technologies, Inc.',
    price: 22.40,
    changesPercentage: -0.76,
    change: -0.2,
    dayLow: 25.3104,
    dayHigh: 28.45,
    yearHigh: 47.08,
    yearLow: 13.71,
    marketCap: 45145796608,
    priceAvg50: 32.306,
    priceAvg200: 31.57927,
    volume: 52350354,
    avgVolume: 37135022,
    exhange: 'NYSE',
    open: 26.18,
    previousClose: 26.39,
    eps: -6.814,
    pe: null,
    earningsAnnouncement: '2020-02-07T02:00:00.000+0000',
    sharesOutstanding: 1716679936,
    timestamp: 1585178783
  }
]
export const defaultResponseForCurrentYear = [
    {
      symbol: 'DAL',
      value: 44.44,
      quantity: 2,
      price: 22.22,
      high: 63.44,
      low: 19.10
    },
    {
      symbol: 'LYFT',
      value: 135.66,
      quantity: 6,
      price: 22.61,
      high: 88.60,
      low: 14.562
    },
    {
      symbol: 'UBER',
      value: 156.79999999999998,
      quantity: 7,
      price: 22.40,
      high: 47.08,
      low: 13.71
    },
    { symbol: 'Total', value: 336.90 }
]
export const finalUnformattedResult = [ // I'd typically use more vars
    {
        symbol: 'DAL',
        value: 44.44,
        quantity: 2,
        price: 22.22,
        high: 63.44,
        low: 19.10
    },
    {
        symbol: 'LYFT',
        value: 135.66,
        quantity: 6,
        price: 22.61,
        high: 88.60,
        low: 14.562
    },
    {
        symbol: 'UBER',
        value: 156.80,
        quantity: 7,
        price: 22.4,
        high: 47.08,
        low: 13.71
    },
    { symbol: 'Total', value: 336.90 }
]
export const finalFormattedResult = [ // I'd typically use more vars
    {
        symbol: 'DAL',
        value: '$44.44',
        quantity: 2,
        price: '$22.22',
        high: '$63.44',
        low: '$19.10'
    },
    {
        symbol: 'LYFT',
        value: '$135.66',
        quantity: 6,
        price: '$22.61',
        high: '$88.60',
        low: '$14.56'
    },
    {
        symbol: 'UBER',
        value: '$156.80',
        quantity: 7,
        price: '$22.40',
        high: '$47.08',
        low: '$13.71'
    },
    { symbol: 'Total', value: '$336.90' }
]
export const defaultInputForHistoryFunc = {
    symbol: STONKS[2],
    value: 44.44,
    quantity: 2,
    price: 22.22,
    high: defaultHighVal,
    low: defaultLowVal
}
export const inputChunkTwo = {
    symbol: 'LYFT',
    value: 135.66,
    quantity: 6,
    price: 22.61,
    high: 88.60,
    low: 14.562
}
export const inputChunkThree = {
    symbol: 'UBER',
    value: 156.80,
    quantity: 7,
    price: 22.40,
    high: 47.08,
    low: 13.71
}
export const prevYearHigherInputForHistoryFunc = {
    symbol: defaultStockSymbol,
    value: 44.44,
    quantity: 2,
    price: 22.22,
    high: prevYearHigherVal,
    low: defaultLowVal
}
export const prevYearLowerInputForHistoryFunc = {
    symbol: defaultStockSymbol,
    value: 44.44,
    quantity: 2,
    price: 22.22,
    high: defaultHighVal,
    low: prevYearLowerVal
}
export const defaultResponseFromHistoryEndpoint = {historical: [{
    date: '2019-08-14',
    open: 47.36,
    high: 47.96,
    low: 47.28,
    close: 47.63,
    adjClose: 43.8,
    volume: 6117400,
    unadjustedVolume: 6117400,
    change: -0.27,
    changePercent: -0.57,
    vwap: 47.62333,
    label: 'August 14, 15',
    changeOverTime: -0.0057
  }]}
export const yearTestResponseFromHistoryEndpoint = {historical: [{
    date: '2019-08-14',
    high: 47.96,
  },
  {
    date: '2015-08-17',
    high: 1000.25
}]}
export const previousYearHigherResponseFromHistoryEndpoint = {historical: [{
    date: '2019-08-14',
    high: prevYearHigherVal,
}]}
export const previousYearLowerResponseFromHistoryEndpoint = {historical: [{
    date: '2019-08-16',
    high: defaultHighVal,
    low: prevYearLowerVal,
}]}
