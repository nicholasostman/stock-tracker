import { finalFormattedResult, finalUnformattedResult } from '../testingConstants'
import * as stock from '../../src/service/stock-service'
import server from '../../src/app'
import request from 'supertest'

describe('Stocks', () => {
	it('should deliver appropriate response from getStockInfo', async(done) => {

		const mockStockInfoFunc = jest.spyOn(stock, 'getStockInfo')
		mockStockInfoFunc.mockImplementation(() => finalUnformattedResult)

		const result = (await request(server).get('/stocks'))

		expect(result.body).toMatchObject(finalFormattedResult)

		console.warn('There is currently an issue with Jest which prevents this from gracefully exiting. It works fine with Mocha')

		// https://github.com/facebook/jest/pull/9532
		// https://github.com/facebook/jest/issues/9685
		// https://github.com/facebook/jest/issues/9504

		done()
	})
})