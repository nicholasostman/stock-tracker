
import { createObjectCsvWriter } from 'csv-writer'
import { DEFAULTQUANTITIES, STONKS } from '../common/constants'
import express from 'express'
import HttpStatus from'http-status-codes'
import { getStockInfo } from '../service/stock-service'

const router = express.Router()

const csvWriter = createObjectCsvWriter({
	path: 'stocks.csv',
	header: [
		{id: 'symbol', title: 'Symbol / Ticker'},
		{id: 'value', title: 'Current Value'},
		{id: 'quantity', title: 'Quantity'},
		{id: 'price', title: 'Current Price'},
		{id: 'yearHigh', title: 'Highest Price'},
		{id: 'yearLow', title: 'Lowest Price'}
	]
})

router.get('/', async function(req, res) {
	try {
		// Future: Can parse out req here for user input stocks
		const data = await getStockInfo(STONKS, DEFAULTQUANTITIES)

		// Format values to dollars
		console.log('final print: ', data)

		csvWriter.writeRecords(data)
			.then(() => {
				console.info('CSV written successfully')
			})
			.catch((err) => {
				console.error('CSV write failed: ', err)
			})

		res.status(HttpStatus.OK)
		res.json(data)
		return res
	} catch (err) {
		console.error('Error in fetching stock data: ', err)
	}
})

export default router