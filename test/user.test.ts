import { request, getUserToken, getAdminToken, getUserData } from './setup'

/**
 * @descriptionTest Get list of users
 * @endpoint GET /api/users
 * @access Admin
 * @returns { success, message, data }
 */
describe('GET /users', () => {
    it('Accessing users without token should return status code 403', async () => {
        const response = await request().get('/api/users')
            .send()

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Accessing users with user token should return status code 403', async () => {
        const response = await request().get('/api/users')
            .set('Authorization', getUserToken())
            .send()

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Accessing users with admin token should return status code 200 and users', async () => {
        const response = await request().get('/api/users')
            .set('Authorization', getAdminToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
    })
})

/**
 * @descriptionTest Create new user
 * @endpoint POST /api/users
 * @access Admin
 * @body { name, email, password, profilePicture, role }
 * @returns { success, message, data }
 */
describe('POST /users', () => {
    it('Creating user without token should return status code 403', async () => {
        const response = await request().post('/api/users')
            .send({ name: 'John Doe', email: 'johndoe@test.com', password: 'password', role: 'user' })

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Creating user with user token should return status code 403', async () => {
        const response = await request().post('/api/users')
            .set('Authorization', getUserToken())
            .send({ name: 'John Doe', email: 'johndoe@test.com', password: 'password', role: 'user' })

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Creating user with admin token should return status code 201 and user', async () => {
        const response = await request().post('/api/users')
            .set('Authorization', getAdminToken())
            .send({ name: 'John Doe', email: 'johndoe@test.com', password: 'password', role: 'user' })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id')
        expect(response.body.data).toHaveProperty('name', 'John Doe')
        expect(response.body.data).toHaveProperty('email', 'johndoe@test.com')
        expect(response.body.data).toHaveProperty('role', 'user')
    })
})

/**
 * @descriptionTest Get user by id
 * @endpoint GET /api/users/:id
 * @access Admin
 * @returns { success, message, data }
 */
describe('GET /users/:id', () => {
    it('Getting user without token should return status code 403', async () => {
        const response = await request().get('/api/users/5f7e1b9b9b9b9b9b9b9b9b9b')
            .send()

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Getting user with user token should return status code 403', async () => {
        const response = await request().get('/api/users/5f7e1b9b9b9b9b9b9b9b9b9b')
            .set('Authorization', getUserToken())
            .send()

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Getting user with nonexistent id should return status code 404', async () => {
        const response = await request().get('/api/users/5f7e1b9b9b9b9b9b9b9b9b9b')
            .set('Authorization', getAdminToken())
            .send()

        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Getting user with admin token should return status code 200 and user', async () => {
        const { _id } = getUserData()
        const response = await request().get(`/api/users/${_id}`)
            .set('Authorization', getAdminToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id')
        expect(response.body.data).toHaveProperty('name')
        expect(response.body.data).toHaveProperty('email')
        expect(response.body.data).toHaveProperty('role')
    })
})

/**
 * @descriptionTest Update user by id
 * @endpoint PUT /api/users/:id
 * @access Admin
 * @body { name, email, password, profilePicture, role }
 * @returns { success, message, data }
 */
describe('PUT /users/:id', () => {
    it('Updating user without token should return status code 403', async () => {
        const response = await request().put('/api/users/5f7e1b9b9b9b9b9b9b9b9b9b')
            .send({ name: 'John Doe', email: 'johndoe@test.com', password: 'password', role: 'user' })

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Updating user with user token should return status code 403', async () => {
        const response = await request().put('/api/users/5f7e1b9b9b9b9b9b9b9b9b9b')
            .set('Authorization', getUserToken())
            .send({ name: 'John Doe', email: 'johndoetest.com', password: 'password', role: 'user' })

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Updating user with nonexistent id should return status code 404', async () => {
        const response = await request().put('/api/users/5f7e1b9b9b9b9b9b9b9b9b9b')
            .set('Authorization', getAdminToken())
            .send({ name: 'John Doe', email: 'johndoe@test.com', password: 'password', role: 'user' })

        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Updating user with admin token should return status code 200 and user', async () => {
        const { _id } = getUserData()
        const response = await request().put(`/api/users/${_id}`)
            .set('Authorization', getAdminToken())
            .send({ name: 'John Due', email: 'johndue@test.com', password: 'password', role: 'user' })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id')
        expect(response.body.data).toHaveProperty('name', 'John Due')
        expect(response.body.data).toHaveProperty('email', 'johndue@test.com')
        expect(response.body.data).toHaveProperty('role', 'user')
    })
})

/**
 * @descriptionTest Delete user by id
 * @endpoint DELETE /api/users/:id
 * @access Admin
 * @returns { success, message }
 */
describe('DELETE /users/:id', () => {
    it('Deleting user without token should return status code 403', async () => {
        const response = await request().delete('/api/users/5f7e1b9b9b9b9b9b9b9b9b9b')
            .send()

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Deleting user with user token should return status code 403', async () => {
        const response = await request().delete('/api/users/5f7e1b9b9b9b9b9b9b9b9b9b')
            .set('Authorization', getUserToken())
            .send()

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Deleting user with nonexistent id should return status code 404', async () => {
        const response = await request().delete('/api/users/5f7e1b9b9b9b9b9b9b9b9b9b')
            .set('Authorization', getAdminToken())
            .send()

        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Deleting user with admin token should return status code 200 and user', async () => {
        const { _id } = getUserData()
        const response = await request().delete(`/api/users/${_id}`)
            .set('Authorization', getAdminToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
    })
})