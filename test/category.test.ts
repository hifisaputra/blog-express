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
