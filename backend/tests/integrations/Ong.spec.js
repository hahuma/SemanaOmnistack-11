const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('should create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: 'APAD',
            email: 'dalkf@fkfd.com',
            whatsapp: '81993509776',
            city: 'Condado',
            uf: 'PE'
        })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})