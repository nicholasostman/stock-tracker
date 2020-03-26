import app from './app.js'

let defaultPort = 3000
const port = process.env.PORT || defaultPort

// Keeping this separate adds the additional benefit of
// avoiding supertest/Jest issues with an open server handle
// It also allows optional concurrent servers
app.listen(port, () => {
	console.info(`App listening on port ${port}`)
})