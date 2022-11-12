import { request, getDefaultToken, defaultUser } from './setup'

const userData = {
    name: 'John Dea',
    email: 'johndea@mail.com',
    password: 'password'
}

let createdUser = {
    _id: '',
    name: '',
    email: '',
    password: ''
}

/**
 * @descriptionTest GET /api/users
 */
describe('GET /users', () => {
    it('Trying to get list of users without authorization token should return status 401', async () => {
        const response = await request().get('/api/users')

        expect(response.statusCode).toBe(401)
    })

    it('Successfully getting list of users should return status 200 and list of users', async () => {
        const response = await request().get('/api/users').set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

/**
 * @descriptionTest POST /api/users
 */
describe('POST /users', () => {
    it('Trying to create user without authorization token should return status 401', async () => {
        const response = await request().post('/api/users')

        expect(response.statusCode).toBe(401)
    })

    it('Trying to create user with invalid form data should return stataus 400', async () => {
        const response = await request().post('/api/users').set('Authorization', getDefaultToken()).send({})

        expect(response.statusCode).toBe(400)
    })

    it('Trying to create user that has already exists should return status 400', async () => {
        const response = await request().post('/api/users').set('Authorization', getDefaultToken()).send(defaultUser)

        expect(response.statusCode).toBe(400)
    })

    it('Trying to create user with valid form data should return status 201 and user', async () => {
        const response = await request().post('/api/users').set('Authorization', getDefaultToken()).send(userData)

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('name', userData.name)
        createdUser = response.body.data
        expect(createdUser).toHaveProperty('_id')
        expect(createdUser).toHaveProperty('email', userData.email)
    })
})

/**
 * @descriptionTest GET /api/users/:id
 */
describe('GET /users/:id', () => {
    it('Trying to get user without authorization token should return status 401', async () => {
        const response = await request().get('/api/users/1')

        expect(response.statusCode).toBe(401)
    })

    it('Trying to get non existed user should return 404', async () => {
        const response = await request().get('/api/users/1').set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(404)
    })

    it('Successfully creating user should return 200 and user', async () => {
        const { email, _id } = createdUser
        const response = await request().get(`/api/users/${_id}`).set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('email', email)
    })
})

/**
 * @descriptionTest PUT /api/users/:id
 */
describe('PUT /users/:id', () => {
    it('Trying to update user without authorization token should return status 401', async () => {
        const response = await request().put('/api/users/1')

        expect(response.statusCode).toBe(401)
    })

    it('Trying to update user with incorrect user id should return 404', async () => {
        const response = await request().put('/api/users/1').set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(404)
    })

    it('Successfully updating user should return 200 and updated user', async () => {
        const { _id } = createdUser
        const response = await request().put(`/api/users/${_id}`).set('Authorization', getDefaultToken()).send({
            name: 'John Due',
            email: 'johndue@mail.com',
            password: 'password'
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('name', 'John Due')
        expect(response.body.data).toHaveProperty('email', 'johndue@mail.com')
    })
})

/**
 * @descriptionTest DELETE /api/users/:id
 */
describe('DELETE /users/:id', () => {
    it('Trying to delete user without authorization token should return status 401', async () => {
        const response = await request().delete('/api/users/1')

        expect(response.statusCode).toBe(401)
    })

    it('Trying to delete user with incorrect user id should return 404', async () => {
        const response = await request().delete('/api/users/1').set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(404)
    })

    it('Successfully deleting user should return 200 and deleted user', async () => {
        const { _id } = createdUser
        const response = await request().delete(`/api/users/${_id}`).set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id', _id)
    })
})