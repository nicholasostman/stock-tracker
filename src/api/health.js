import express from 'express'
import HttpStatus from 'http-status-codes'

const router = express.Router()

router.get('/', function healthCheck(req, res) { res.status(HttpStatus.OK).send('OK')})

export default router