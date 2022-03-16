import request from 'supertest'
import { expect } from 'chai'
import server from './server'
import configService from './config.service'
import { Configuration } from './config.key'

describe('Server Test', () => {
    const app = server.getApp()

    it('Should get instance of server', async () => {
        const appTest = server.getApp()
        expect(app).to.be.equal(appTest)
    })

    it('Should server port is equals than port env', async () => {
        const portServer = app.get('port')        
        const envPort = configService.get(Configuration.PORT) || process.env.PORT
        expect(portServer).to.be.equal(envPort)
    })
})