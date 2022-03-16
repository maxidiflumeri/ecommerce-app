import request from 'supertest'
import { expect } from 'chai'
import server from '../../config/server'

describe('Carts Test', () => {
    const app = server.getApp()

    it('Should get all carts', async () => {
        const response = await request(app).get('/api/carts')
        expect(response.body.data).to.be.an.an('array')
    })

    it('Should get one cart by id and expect that response status is 200', async () => {
        const response = await request(app).get('/api/carts/9JSrGSWIspUoJ5OFJ7KS')
        expect(response.status).to.be.equal(200)
    })

    it('Should get one cart by wrong id and expect that response status is 404', async () => {
        const response = await request(app).get('/api/carts/AA')
        expect(response.status).to.be.equal(404)
    })

    it('Should get one cart by wrong id and expect that response message is Product not found', async () => {
        const response = await request(app).get('/api/carts/AA')
        expect(response.body.message).to.be.equal('Cart not found.')
    })
})