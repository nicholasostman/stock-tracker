import axios from 'axios'
import { BASEURL, QUOTESUFFIX, HISTORYSUFFIX } from 'config'
import moment from 'moment'

export async function getStockInfo(stockTickers, quantities) {

	let currentYearInfo = await stockInfoCurrentYear(stockTickers, quantities)

	let stockResultsThroughPrevYear = []
	const lastYear = moment().subtract(1, 'years').format("YYYY")

	for (let currentYearStockInfo of currentYearInfo) {
		if (currentYearStockInfo.symbol !== 'Total') // Code will still work, but prefer to skip additional api call
			stockResultsThroughPrevYear.push(await getHistoricalHighLow(currentYearStockInfo, lastYear))
	}
	
	return stockResultsThroughPrevYear
}

// Replaces the existing stockInfo current year high and low with previous year high and low if applicable
export async function getHistoricalHighLow(stockInfo, lastYear) {
	
	let stockSymbol = stockInfo.symbol

	const fullURL = BASEURL + HISTORYSUFFIX + stockSymbol

	return axios.get(fullURL)
		.then(response => {

			let fullHistory = []
			if (response.data && response.data.historical)
				fullHistory = response.data.historical

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

			let conciseData = []
			let total = 0
			for (let [index, stockData] of fullData.entries()) {
				
				let numShares = quantities[index]
				let value = stockData.price * numShares

				let conciseStock = {
					symbol: stockData.symbol,
					value: value,
					quantity: numShares,
					price: stockData.price,
					high: stockData.yearHigh,
					low: stockData.yearLow
				}

				conciseData.push(conciseStock)
				total+=value
			}

			let totalObj = {symbol: 'Total', value: total}
			conciseData.push(totalObj)

			return conciseData
		})
		.catch(error => {
			throw error
		})
}