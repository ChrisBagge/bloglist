import { disconnect } from 'mongoose'
import supertest from 'supertest'
import app from '../app'

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  disconnect()
})