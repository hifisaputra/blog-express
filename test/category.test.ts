import { request, getDefaultToken } from './setup'

const categoryData = {
    name: 'Category name',
}

let createdCategoryData = {
    _id: '',
    name: '',
    slug: '',
}

/**
 * @descriptionTest Fetching list of category
 * @endpoint GET /api/categories
 */
describe('GET /categories', () => {
    it('Trying to get list of category without authorization token should return status 401', async () => {
        const response = await request().post('/api/categories')

        expect(response.statusCode).toBe(401)
    })

    it('Successfully getting list of categories should return status 200 and list of categories', async () => {
        const response = await request().get('/api/categories').set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

/**
 * @descriptionTest Creating a new category
 * @endpoint POST /api/categories
 */
describe('POST /categories', () => {
    it('Trying to create category without authorization token should return status 401', async () => {
        const response = await request().post('/api/categories')

        expect(response.statusCode).toBe(401)
    })

    it('Trying to create category with invalid form data should return stataus 400', async () => {
        const response = await request().post('/api/categories').set('Authorization', getDefaultToken()).send({})

        expect(response.statusCode).toBe(400)
    })

    it('Trying to create category with valid form data should return status 201 and category', async () => {
        const response = await request().post('/api/categories').set('Authorization', getDefaultToken()).send(categoryData)

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('name', categoryData.name)
        createdCategoryData = response.body.data
        expect(createdCategoryData).toHaveProperty('_id')
        expect(createdCategoryData).toHaveProperty('name', categoryData.name)
        expect(createdCategoryData).toHaveProperty('slug')
    })
})

/**
 * @descriptionTest Fetching a single category
 * @endpoint GET /api/categories/:id
 */
describe('GET /categories/:id', () => {
    it('Trying to get a single category without authorization token should return status 401', async () => {
        const response = await request().get(`/api/categories/${createdCategoryData._id}`)

        expect(response.statusCode).toBe(401)
    })

    it('Trying to get a single category with non-existing id should return status 404', async () => {
        const response = await request().get('/api/categories/non-id').set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(404)
    })

    it('Successfully getting a single category should return status 200 and category', async () => {
        const response = await request().get(`/api/categories/${createdCategoryData._id}`).set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id', createdCategoryData._id)
        expect(response.body.data).toHaveProperty('name', createdCategoryData.name)
        expect(response.body.data).toHaveProperty('slug', createdCategoryData.slug)
    })
})

/**
 * @descriptionTest Updating a category
 * @endpoint PUT /api/categories/:id
 */
describe('PUT /categories/:id', () => {
    it('Trying to update category without authorization token should return status 401', async () => {
        const response = await request().put(`/api/categories/${createdCategoryData._id}`)

        expect(response.statusCode).toBe(401)
    })

    it('Trying to update category with non-existing id should return status 404', async () => {
        const response = await request().put('/api/categories/non-id').set('Authorization', getDefaultToken()).send({})

        expect(response.statusCode).toBe(404)
    })

    it('Trying to update category with invalid form data should return status 400', async () => {
        const response = await request().put(`/api/categories/${createdCategoryData._id}`).set('Authorization', getDefaultToken()).send({})

        expect(response.statusCode).toBe(400)
    })

    it('Successfully updating category should return status 200 and category', async () => {
        const response = await request().put(`/api/categories/${createdCategoryData._id}`).set('Authorization', getDefaultToken()).send(categoryData)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id', createdCategoryData._id)
        expect(response.body.data).toHaveProperty('name', categoryData.name)
        expect(response.body.data).toHaveProperty('slug', createdCategoryData.slug)
    })
})

/**
 * @descriptionTest Deleting a category
 * @endpoint DELETE /api/categories/:id
 */
describe('DELETE /categories/:id', () => {
    it('Trying to delete category without authorization token should return status 401', async () => {
        const response = await request().delete(`/api/categories/${createdCategoryData._id}`)

        expect(response.statusCode).toBe(401)
    })

    it('Trying to delete category with non-existing id should return status 404', async () => {
        const response = await request().delete('/api/categories/non-id').set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(404)
    })

    it('Successfully deleting category should return status 200 and category', async () => {
        const response = await request().delete(`/api/categories/${createdCategoryData._id}`).set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id', createdCategoryData._id)
        expect(response.body.data).toHaveProperty('name', categoryData.name)
        expect(response.body.data).toHaveProperty('slug', createdCategoryData.slug)
    })
})
