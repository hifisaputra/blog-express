import { request, getUserData, getUserToken } from './setup'

/**
 * @descriptionTest Test register new user
 * @endpoint POST /api/auth/register
 * @access Public
 * @body { name, email, password }
 * @returns { success, message, data, token }
 */
describe('POST /register', () => {
    it('Register with invalid data should return status code 400', async () => {
        const response = await request().post('/api/auth/register')
            .send({})

        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Successful register should return status code 201, token and user', async () => {
        const response = await request().post('/api/auth/register')
            .send({
                name: 'John Doe',
                email: 'john@test.com',
                password: 'password'
            })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id')
        expect(response.body.data).toHaveProperty('name', 'John Doe')
        expect(response.body.data).toHaveProperty('email', 'john@test.com')
    })
})

/**
 * @descriptionTest Test login user
 * @endpoint POST /api/auth/login
 * @access Public
 * @body { email, password }
 * @returns { success, message, data, token }
 */
describe('POST /login', () => {
    it('Login with empty credentials should return status code 400', async () => {
        const response = await request().post('/api/auth/login')
            .send({})

        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Login with incorrect credentials should return status code 401', async () => {
        const response = await request().post('/api/auth/login')
            .send({ email: 'john@test.com', password: 'incorrect password' })

        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Successfull login should return status code 200, token and user', async () => {
        const response = await request().post('/api/auth/login')
            .send({
                email: 'john@test.com',
                password: 'password'
            })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('data')
    })
})

/**
 * @descriptionTest Get logged in user data
 * @endpoint GET /api/auth/profile
 * @access Private
 * @returns { success, data }
 * @headers { Authorization: token }
 */
describe('GET /profile', () => {
    it('Accessing profile endpoint without Authorization header should return status code 401', async () => {
        const response = await request().get('/api/auth/profile')
            .send()

        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Accessing profile endpoint with Authorization token header should return status 200 and user', async () => {
        const { _id, name, email } = getUserData()
        const response = await request().get('/api/auth/profile')
            .set('Authorization', getUserToken())

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id', _id)
        expect(response.body.data).toHaveProperty('name', name)
        expect(response.body.data).toHaveProperty('email', email)
    })
})