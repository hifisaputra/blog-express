import { request, getUserToken, getAdminToken, getCategoryData } from './setup'

/**
 * @descriptionTest Get list of categories
 * @endpoint GET /api/categories
 * @access Public
 * @returns { success, message, data }
 */
describe('GET /categories', () => {
    it('Accessing categories without token should return status code 200', async () => {
        const response = await request().get('/api/categories')
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
    })

    it('Accessing categories with user token should return status code c', async () => {
        const response = await request().get('/api/categories')
            .set('Authorization', getUserToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
    })

    it('Accessing categories with admin token should return status code 200 and categories', async () => {
        const response = await request().get('/api/categories')
            .set('Authorization', getAdminToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
    })
})

/**
 * @descriptionTest Create new category
 * @endpoint POST /api/categories
 * @access Admin
 * @body { name, description }
 * @returns { success, message, data }
 */
describe('POST /categories', () => {
    it('Creating category without token should return status code 403', async () => {
        const response = await request().post('/api/categories')
            .send({ name: 'Category 1', description: 'Category 1 description' })

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Creating category with user token should return status code 403', async () => {
        const response = await request().post('/api/categories')
            .set('Authorization', getUserToken())
            .send({ name: 'Category 1', description: 'Category 1 description' })

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Creating category with admin token should return status code 201 and category', async () => {
        const response = await request().post('/api/categories')
            .set('Authorization', getAdminToken())
            .send({ name: 'Category 1', description: 'Category 1 description' })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
    })
})

/**
 * @descriptionTest Get single category
 * @endpoint GET /api/categories/:id
 * @access Public
 * @returns { success, message, data }
 */
describe('GET /categories/:id', () => {
    const { _id, name, description } = getCategoryData()

    it('Accessing category without token should return status code 200', async () => {
        const response = await request().get(`/api/categories/${_id}`)
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id', _id)
        expect(response.body.data).toHaveProperty('name', name)
        expect(response.body.data).toHaveProperty('description', description)
    })

    it('Accessing category with user token should return status code 200', async () => {
        const response = await request().get(`/api/categories/${_id}`)
            .set('Authorization', getUserToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id', _id)
        expect(response.body.data).toHaveProperty('name', name)
        expect(response.body.data).toHaveProperty('description', description)
    })

    it('Accessing category with admin token should return status code 200 and category', async () => {
        const response = await request().get(`/api/categories/${_id}`)
            .set('Authorization', getAdminToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id', _id)
        expect(response.body.data).toHaveProperty('name', name)
        expect(response.body.data).toHaveProperty('description', description)
    })
})

/**
 * @descriptionTest Update category
 * @endpoint PUT /api/categories/:id
 * @access Admin
 * @body { name, description }
 * @returns { success, message, data }
 */
describe('PUT /categories/:id', () => {
    it('Updating category without token should return status code 403', async () => {
        const response = await request().put('/api/categories/5f7e1b9b9b9b9b9b9b9b9b34')
            .send({ name: 'Category 1', description: 'Category 1 description' })

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Updating category with user token should return status code 403', async () => {
        const response = await request().put('/api/categories/5f7e1b9b9b9b9b9b9b9b9b34')
            .set('Authorization', getUserToken())
            .send({ name: 'Category 1', description: 'Category 1 description' })

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Updating category with nonexistent id should return status code 404', async () => {
        const response = await request().put('/api/categories/5f7e1b9b9b9b9b9b9b9b9b34')
            .set('Authorization', getAdminToken())
            .send({ name: 'Category 1', description: 'Category 1 description' })

        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Updating category with admin token should return status code 200 and category', async () => {
        const { _id } = getCategoryData()
        const response = await request().put(`/api/categories/${_id}`)
            .set('Authorization', getAdminToken())
            .send({ name: 'Category 1', description: 'Category 1 description' })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id', _id)
        expect(response.body.data).toHaveProperty('name', 'Category 1')
        expect(response.body.data).toHaveProperty('description', 'Category 1 description')
    })
})

/**
 * @descriptionTest Delete category
 * @endpoint DELETE /api/categories/:id
 * @access Admin
 * @returns { success, message }
 */
describe('DELETE /categories/:id', () => {
    it('Deleting category without token should return status code 403', async () => {
        const response = await request().delete('/api/categories/5f7e1b9b9b9b9b9b9b9b9b34')
            .send()

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Deleting category with user token should return status code 403', async () => {
        const response = await request().delete('/api/categories/5f7e1b9b9b9b9b9b9b9b9b34')
            .set('Authorization', getUserToken())
            .send()

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Deleting category with nonexistent id should return status code 404', async () => {
        const response = await request().delete('/api/categories/5f7e1b9b9b9b9b9b9b9b9b34')
            .set('Authorization', getAdminToken())
            .send()

        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Deleting category with admin token should return status code 200 and category', async () => {
        const { _id } = getCategoryData()
        const response = await request().delete(`/api/categories/${_id}`)
            .set('Authorization', getAdminToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
    })
})
