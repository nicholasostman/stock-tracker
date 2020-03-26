import axios from 'axios'
import { BASEURL, QUOTESUFFIX, HISTORYSUFFIX} from 'config'
import moment from 'moment'
import { toDollarString } from '../common/helpers'

export async function getStockInfo(stockTickers, quantities) {

	let currentYearInfo = await stockInfoCurrentYear(stockTickers, quantities)

	// let listOfHighLow = await Promise.map(stockTickers, async(stock, index) => {
	// 	let currentYearStockInfo = currentYearInfo[index]
	// 	return await getHistoricalHighLow(stock, currentYearStockInfo.yearHigh, currentYearStockInfo.yearLow)
	// });

	let stockResultsThroughPrevYear = []
	const lastYear = moment().subtract(1, 'years').format("YYYY")

	// for (let [index, stock] of stockTickers.entries()) {
	// let currentYearStockInfo = currentYearInfo[index]

	console.log("stock ticker: ", stockTickers[0])

	for (let currentYearStockInfo of currentYearInfo) {
		// listOfHighLow.push(await getHistoricalHighLow(stock, currentYearStockInfo.yearHigh, currentYearStockInfo.yearLow, lastYear))
		stockResultsThroughPrevYear.push(await getHistoricalHighLow(currentYearStockInfo, lastYear))
	}
	
	console.log(" results of high low: ", stockResultsThroughPrevYear)

	return stockResultsThroughPrevYear
}

// export async function getHistoricalHighLow(stockSymbol, highValue, lowValue, lastYear) {
export async function getHistoricalHighLow(stockInfo, lastYear) {
	
	let stockSymbol = stockInfo.symbol
	console.log("stock symbol: ", stockSymbol)

	const fullURL = BASEURL + HISTORYSUFFIX + stockSymbol

	return axios.get(fullURL)
		.then(response => {

			let fullHistory = []
			if (response.data && response.data.historical)
				fullHistory = response.data.historical

			// console.log('HISTORIED ', fullHistory)

			// A lot less value replacement to already have the current year high/low
			for (let dayInfo of fullHistory) {
				if (dayInfo.date.slice(0,4) == lastYear) { // only want to check for previous year
					if (dayInfo.high > stockInfo.high) stockInfo.high = dayInfo.high
					if (dayInfo.low < stockInfo.low) stockInfo.low = dayInfo.low
				}
			}

			return stockInfo
		})
		.catch(error => {
			throw error
		})
}

export function stockInfoCurrentYear(stockTickers, quantities) {
	const fullURL = BASEURL + QUOTESUFFIX + stockTickers

	return axios.get(fullURL)
		.then(response => {

			let fullData = response.data

			console.log("fulldata: ", fullData)

			let conciseData = []
			let total = 0
			for (let [index, stockData] of fullData.entries()) {
				
				let numShares = quantities[index]
				let value = stockData.price * numShares

				// let conciseStock = {
				// 	symbol: stockData.symbol,
				// 	value: toDollarString(value),
				// 	quantity: numShares,
				// 	price: toDollarString(stockData.price),
				// 	yearHigh: toDollarString(stockData.yearHigh),
				// 	yearLow: toDollarString(stockData.yearLow)
				// }

				let conciseStock = {
					symbol: stockData.symbol,
					value: value,
					quantity: numShares,
					price: stockData.price,
					yearHigh: stockData.yearHigh,
					yearLow: stockData.yearLow
				}

				conciseData.push(conciseStock)
				total+=value
			}

			// let tempTotalObj = {symbol: 'Total', value: toDollarString(total)}
			let tempTotalObj = {symbol: 'Total', value: total}
			conciseData.push(tempTotalObj)

			console.log("the stuff: ", conciseData)
			return conciseData
		})
		.catch(error => {
			throw error
		})
}