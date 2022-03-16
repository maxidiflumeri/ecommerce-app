import request from 'supertest'
import { expect } from 'chai'
import server from '../../config/server'

describe('Products Test', () => {
    const app = server.getApp()

    it('Should get all products', async () => {
        const response = await request(app).get('/api/products')
        expect(response.body.data).to.be.an.an('array')
    })

    it('Should get one product by id and expect that response status is 200', async () => {
        const response = await request(app).get('/api/products/CYHYPPCid8R5gSf71fLV')
        expect(response.status).to.be.equal(200)
    })

    it('Should get one product by wrong id and expect that response status is 404', async () => {
        const response = await request(app).get('/api/products/AA')
        expect(response.status).to.be.equal(404)
    })

    it('Should get one product by wrong id and expect that response message is Product not found', async () => {
        const response = await request(app).get('/api/products/AA')
        expect(response.body.message).to.be.equal('Product not found.')
    })
})

