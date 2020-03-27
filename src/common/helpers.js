export function toDollarString(value) {
	// verify expected value etc. in more robust scenario
	return '$'+ value.toFixed(2)
}

export function stripDollarSign(string) {
	return string.replace(/\$/g, '')
}