import { BASEURL, HISTORYSUFFIX, QUOTESUFFIX } from 'config'
import { getHistoricalHighLow, getStockInfo, stockInfoCurrentYear } from '../../src/service/stock-service'
import { STONKS, DEFAULTQUANTITIES } from '../../src/common/constants'
import nock from 'nock'

// Define testing constants
const defaultHighVal = 63.44
const prevYearHigherVal = 1000.96
const defaultLowVal = 19.10
const prevYearLowerVal = 2.14
const defaultLastYear = '2019'
const defaultStockSymbol = STONKS[0]
// moment will use Data.now internally to calculate previous year for history function
const defaultDate = Date.now = jest.fn(() => new Date(Date.UTC(2019, 3, 24)).valueOf())
const defaultResponseFromQuoteEndpoint =  [{
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
const defaultResponseForCurrentYear = [
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
const defaultResponseForHistoryFunc = {
    symbol: STONKS[0],
    value: 44.44,
    quantity: 2,
    price: 22.22,
    high: defaultHighVal,
    low: defaultLowVal
  }

const prevYearHigherResponseForHistoryFunc = {
    symbol: STONKS[0],
    value: 44.44,
    quantity: 2,
    price: 22.22,
    high: prevYearHigherVal,
    low: defaultLowVal
}
const prevYearLowerResponseForHistoryFunc = {
    symbol: STONKS[0],
    value: 44.44,
    quantity: 2,
    price: 22.22,
    high: defaultHighVal,
    low: prevYearLowerVal
}
const defaultResponseFromHistoryEndpoint = {historical: [{
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
const yearTestResponseFromHistoryEndpoint = {historical: [{
    date: '2019-08-14',
    high: 47.96,
  },
  {
    date: '2015-08-17',
    high: 1000.25
}]}
const previousYearHigherResponseFromHistoryEndpoint = {historical: [{
    date: '2019-08-14',
    high: prevYearHigherVal,
}]}
const previousYearLowerResponseFromHistoryEndpoint = {historical: [{
    date: '2019-08-16',
    low: prevYearLowerVal,
}]}

describe('Stock service', () => {

    it('should return formatted consistent and correct values for stockInfoCurrentYear', async () => {
        // Stub externals

        nock(BASEURL, {
            filteringScope: function(scope) {
                return true;
            }
        })
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(QUOTESUFFIX + STONKS)
        .reply(200, defaultResponseFromQuoteEndpoint)
        // .log(console.log) // For debugging

        // Perform on internals

        const result = await stockInfoCurrentYear(STONKS, DEFAULTQUANTITIES)

        expect(result).toMatchObject(defaultResponseForCurrentYear)

        // array of len 4 of typeof(object) with properties x6

        // const req = await request(axios)
        // .get(fullURL)
    })

    describe('getHistoricalHighLow', () => {
        it('should return correct history data', async () => {
            nock(BASEURL, {
                filteringScope: function(scope) {
                    return true;
                }
            })
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get(HISTORYSUFFIX + defaultStockSymbol)
            .reply(200, defaultResponseFromHistoryEndpoint)

            // Perform on internals

            const result = await getHistoricalHighLow(defaultResponseForHistoryFunc, defaultLastYear)
            expect(result).toMatchObject(defaultResponseForHistoryFunc)
        })

        // These tests could be simplified be moving the high low replacement loop logic to it's own function. Because there are only 3 expected stock inputs, I'm not concerned with test runtime.
        it('should ignore years prior to previous year', async () => {
            nock(BASEURL, {
                filteringScope: function(scope) {
                    return true;
                }
            })
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get(HISTORYSUFFIX + defaultStockSymbol)
            .reply(200, yearTestResponseFromHistoryEndpoint)

            
            const result = await getHistoricalHighLow(defaultResponseForHistoryFunc, defaultLastYear)
            expect(result).toMatchObject(defaultResponseForHistoryFunc)
        })

        it('should replace current year high with larger previous year high value', async () => {
            nock(BASEURL, {
                filteringScope: function(scope) {
                    return true;
                }
            })
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get(HISTORYSUFFIX + defaultStockSymbol)
            .reply(200, previousYearHigherResponseFromHistoryEndpoint)

            
            const result = await getHistoricalHighLow(defaultResponseForHistoryFunc, defaultLastYear)
            expect(result).toMatchObject(prevYearHigherResponseForHistoryFunc)
        })

        it('should replace current year low with smaller previous year low value', async () => {
            nock(BASEURL, {
                filteringScope: function(scope) {
                    return true;
                }
            })
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get(HISTORYSUFFIX + defaultStockSymbol)
            .reply(200, previousYearLowerResponseFromHistoryEndpoint)

            
            const result = await getHistoricalHighLow(defaultResponseForHistoryFunc, defaultLastYear)
            expect(result).toMatchObject(prevYearLowerResponseForHistoryFunc)
        })

    
    // it('should leave current year high with smaller previous year high value')
        
    })


    xit('should call current year and historical through getStockInfo', async () => {

        // just mock the functions and spy
        nock(BASEURL, {
        filteringScope: function(scope) {
            return true;
            }
        })
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(QUOTESUFFIX + STONKS)
        .reply(200, defaultResponseFromQuote)
        .get(HISTORYSUFFIX + defaultStockSymbol)
        .reply(200, defaultResponseFromHistoryEndpoint)

        // perform on internals

        const result = await getStockInfo(STONKS, DEFAULTQUANTITIES)

        expect(req.status).toBe(200)
        expect(result).toBe(defaultResponseForCurrentYear)
    })

})
