import { DEFAULTQUANTITIES, STONKS } from '../common/constants'
import { createObjectCsvWriter } from 'csv-writer'
import express from 'express'
import HttpStatus from 'http-status-codes'
import { getStockInfo } from '../service/stock-service'
import { toDollarString } from '../common/helpers'

const router = express.Router()

const csvWriter = createObjectCsvWriter({
	path: 'stocks.csv',
	header: [
		{id: 'symbol', title: 'Symbol / Ticker'},
		{id: 'value', title: 'Current Value'},
		{id: 'quantity', title: 'Quantity'},
		{id: 'price', title: 'Current Price'},
		{id: 'high', title: 'Highest Price'},
		{id: 'low', title: 'Lowest Price'}
	]
})

router.get('/', async function(req, res) {
	try {
		// Future: Can parse out req here for user input stocks
		const stockResults = await getStockInfo(STONKS, DEFAULTQUANTITIES)

		// Format values to dollars
		let lastIndex = stockResults.length-1
		let index = 0
		for (index; index < lastIndex; index++) { // Skip last index, A.K.A. the Total obj
			let stock = stockResults[index]
			stock.value = toDollarString(stock.value)
			stock.price = toDollarString(stock.price)
			stock.high = toDollarString(stock.high)
			stock.low = toDollarString(stock.low)
		}

		// Grab & format last item "total"
		stockResults[lastIndex].value = toDollarString(stockResults[lastIndex].value)

		csvWriter.writeRecords(stockResults)
			.then(() => {
				console.info('CSV written successfully')
			})
			.catch((err) => {
				console.error('CSV write failed: ', err)
			})

		res.status(HttpStatus.OK)
		res.json(stockResults)
		return res
	} catch (err) {
		console.error('Error in fetching stock data: ', err)
	}
})

export default router