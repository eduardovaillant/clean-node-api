import { noCache } from './no-cache'
import app from '@/main/config/app'
import request from 'supertest'

describe('NoCache Middleware', () => {
  test('Should disable cache', async () => {
    app.get('/test_cors', noCache, (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .get('/test_cors')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
