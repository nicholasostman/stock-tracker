import express from 'express'
import healthRoute from './api/health'
import stockRoute from './api/stocks'

const app = express()

// app.use(security middleware, helmet/cors)

app.use('/health', healthRoute)
app.use('/stocks', stockRoute)

export default app
