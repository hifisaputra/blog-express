import { request, getUserData } from './setup'

/**
 * @descriptionTest POST /api/auth/register
 */
// describe('POST /register', () => {
//     it('Register with invalid data should return 400', async () => {
//         const response = await request().post('/api/auth/register').send({})

//         expect(response.statusCode).toBe(400)
//     })

//     it('Successful register should return token and user', async () => {
//         const response = await request().post('/api/auth/register').send(userData)

//         expect(response.statusCode).toBe(201)
//         expect(response.body).toHaveProperty('token')
//         expect(response.body).toHaveProperty('user')
//     })
// })

/**
 * @descriptionTest POST /api/auth/login
 */
describe('POST /login', () => {
    it('Login with empty credentials should return status code 400', async () => {
        const response = await request().post('/api/auth/login').send({})

        expect(response.statusCode).toBe(400)
    })

    it('Login with incorrect credentials should return status code 401', async () => {
        const { email } = getUserData()
        const response = await request().post('/api/auth/login').send({ email, password: 'incorrect password' })

        expect(response.statusCode).toBe(401)
    })

    it('Accessing profile endpoint without Authorization header should return status code 401', async () => {
        const response = await request().get('/api/auth/profile').send()

        expect(response.statusCode).toBe(401)
    })

    it('Successfull login should return token and user', async () => {
        const response = await request().post('/api/auth/login').send(getUserData())

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('user')
    })

    // it('Accessing profile endpoint with Authorization token header should return status 200 and user', async () => {
    //     const response = await request().get('/api/auth/profile').set('Authorization', userToken)

    //     expect(response.statusCode).toBe(200)
    //     expect(response.body).toHaveProperty('user')
    // })
})