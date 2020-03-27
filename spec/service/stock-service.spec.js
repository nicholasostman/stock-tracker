import { BASEURL, HISTORYSUFFIX, QUOTESUFFIX } from 'config'
import { DEFAULTQUANTITIES, STONKS } from '../../src/common/constants'
import { getHistoricalHighLow, getStockInfo, stockInfoCurrentYear } from '../../src/service/stock-service'
import { defaultInputForHistoryFunc, defaultLastYear, defaultResponseForCurrentYear, defaultResponseFromHistoryEndpoint,
	defaultResponseFromQuoteEndpoint, defaultStockSymbol, finalUnformattedResult, inputChunkThree, inputChunkTwo, previousYearHigherResponseFromHistoryEndpoint,
	previousYearLowerResponseFromHistoryEndpoint, prevYearHigherInputForHistoryFunc, prevYearLowerInputForHistoryFunc, yearTestResponseFromHistoryEndpoint
} from '../testingConstants'
import nock from 'nock'
import * as stock from '../../src/service/stock-service'

// Ensure that interceptors do not interfere with each other (bleed over params)
afterAll(() => {
	nock.restore()
})

describe('Stock service', () => {

	it('should return formatted consistent and correct values for stockInfoCurrentYear', async() => {
		// Stub externals

		nock(BASEURL)
			.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
			.get(QUOTESUFFIX + STONKS)
			.reply(200, defaultResponseFromQuoteEndpoint)
		// .log(console.log) // For debugging

		// Perform on internals

		const result = await stockInfoCurrentYear(STONKS, DEFAULTQUANTITIES)

		expect(result).toMatchObject(defaultResponseForCurrentYear)
	})

	describe('getHistoricalHighLow', () => {
		it('should return correct history data', async() => {
			nock(BASEURL)
				.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
				.get(HISTORYSUFFIX + defaultStockSymbol)
				.reply(200, defaultResponseFromHistoryEndpoint)

			// Perform on internals

			// historicalHighLow directly modifies values for efficiency.
			// thus we will create an object copy to use for testing to not taint the template object

			let updateablePrototype = {...defaultInputForHistoryFunc} // Spread operator should work as shallow copy (no nested objs being modified in these tests)

			const result = await getHistoricalHighLow(updateablePrototype, defaultLastYear)
			expect(result).toMatchObject(updateablePrototype)
		})

		// These tests could be simplified be moving the high low replacement loop logic to it's own function. Because there are only 3 expected stock inputs, I'm not concerned with test runtime.
		it('should ignore years prior to previous year', async() => {
			nock(BASEURL)
				.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
				.get(HISTORYSUFFIX + defaultStockSymbol)
				.reply(200, yearTestResponseFromHistoryEndpoint)

			let updateablePrototype = {...defaultInputForHistoryFunc}

			const result = await getHistoricalHighLow(updateablePrototype, defaultLastYear)
			expect(result).toMatchObject(updateablePrototype)
		})

		it('should replace current year high with larger previous year high value', async() => {
			nock(BASEURL)
				.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
				.get(HISTORYSUFFIX + defaultStockSymbol)
				.reply(200, previousYearHigherResponseFromHistoryEndpoint)

			let updateablePrototype = {...defaultInputForHistoryFunc}

			const result = await getHistoricalHighLow(updateablePrototype, defaultLastYear)
			expect(result).toMatchObject(prevYearHigherInputForHistoryFunc)
		})

		it('should replace current year low with smaller previous year low value', async() => {
			nock(BASEURL)
				.defaultReplyHeaders({ 'access-control-allow-origin': '*' })
				.get(HISTORYSUFFIX + defaultStockSymbol)
				.reply(200, previousYearLowerResponseFromHistoryEndpoint)

			let updateablePrototype = {...defaultInputForHistoryFunc}

			const result = await getHistoricalHighLow(updateablePrototype, defaultLastYear)
			expect(result).toMatchObject(prevYearLowerInputForHistoryFunc)
		})
	})

	it('should call child funcs and get correct final response through getStockInfo', async() => {

		const mockCurrentYearFunc = jest.spyOn(stock, 'stockInfoCurrentYear')
		mockCurrentYearFunc.mockImplementation(() => defaultResponseForCurrentYear)

		const mockHistoryFunc = jest.spyOn(stock, 'getHistoricalHighLow')
		mockHistoryFunc.mockImplementationOnce(() => defaultInputForHistoryFunc)
			.mockImplementationOnce(() => inputChunkTwo) // in this case the inputs are also the results
			.mockImplementationOnce(() => inputChunkThree)

		const result = await getStockInfo(STONKS, DEFAULTQUANTITIES)

		expect(stockInfoCurrentYear).toHaveBeenCalled()
		expect(getHistoricalHighLow).toHaveBeenCalled()
		expect(result).toMatchObject(finalUnformattedResult)
	})

})
