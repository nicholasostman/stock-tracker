import axios from 'axios'
import request from 'supertest'
import server from '../src/app'

describe('GET health route', () => {
	it('should respond with ok', (done) => {
		request(server)
			.get('/health')
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				expect(res.text).toEqual('OK')
			})
		done()
	})
})

jest.mock('axios')

describe('Get stocks route', function() {
	it('should call stocks route', async function(done) {
		const successMessage = 'proof'
		axios.get.mockResolvedValue(successMessage)
		await axios.get('/stocks').then(response => {
			expect(response).toEqual(successMessage)
		})
		done()
	})
})
