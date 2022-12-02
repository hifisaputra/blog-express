import { request, getUserToken, getAdminToken, getCategoryData, getAdminData, getPostData } from './setup'

/**
 * @descriptionTest Get list of posts
 * @endpoint GET /api/posts
 * @access Public
 * @body { limit, page, status, author, categories, search }
 * @returns { success, message, data, meta }
 */
describe('GET /posts', () => {
    it('Accessing posts without token should return status code 200', async () => {
        const response = await request().get('/api/posts')
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
    })

    it('Accessing posts with user token should return status code 200', async () => {
        const response = await request().get('/api/posts')
            .set('Authorization', getUserToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
    })

    it('Accessing posts with admin token should return status code 200 and posts', async () => {
        const response = await request().get('/api/posts')
            .set('Authorization', getAdminToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(10)
        expect(response.body.data[0]).toHaveProperty('title')
        expect(response.body.data[0]).toHaveProperty('excerpt')
        expect(response.body.data[0]).toHaveProperty('slug')
        expect(response.body.data[0]).toHaveProperty('status')
        expect(response.body.data[0]).toHaveProperty('author')
        expect(response.body.data[0]).toHaveProperty('categories')
    })

    it('Using the published status filter should only returns published post',async () => {
        const response = await request().get('/api/posts')
            .set('Authorization', getAdminToken())
            .query({ status: 'published', limit: 1 })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body.data[0]).toHaveProperty('status', 'published')
    })

    it('Using the draft status filter should only returns draft post',async () => {
        const response = await request().get('/api/posts')
            .set('Authorization', getAdminToken())
            .query({ status: 'draft', limit: 1 })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body.data[0]).toHaveProperty('status', 'draft')
    })

    it('Using the author filter should only returns post from the author',async () => {
        const response = await request().get('/api/posts')
            .set('Authorization', getAdminToken())
            .query({ author: getAdminData()._id, limit: 1 })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body.data[0]).toHaveProperty('author')
        expect(response.body.data[0].author).toHaveProperty('_id', getAdminData()._id)
    })

    it('Using the categories filter should only returns post from the categories',async () => {
        const response = await request().get('/api/posts')
            .set('Authorization', getAdminToken())
            .query({ categories: [getCategoryData()._id], limit: 1 })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body.data[0]).toHaveProperty('categories')
        expect(response.body.data[0].categories).toHaveLength(1)
        expect(response.body.data[0].categories[0]).toHaveProperty('_id', getCategoryData()._id)
    })

    it('Using the search filter should only returns post that match the search query',async () => {
        const response = await request().get('/api/posts')
            .set('Authorization', getAdminToken())
            .query({ search: 'Test', limit: 1 })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body.data[0]).toHaveProperty('title', '[Test] Post')
    })
})

/**
 * @descriptionTest Create post
 * @endpoint POST /api/posts
 * @access Admin
 * @body { title, content, excerpt, featuredImage, categories[], status }
 * @returns { success, message, data }
 */
describe('POST /posts', () => {
    it('Creating post without token should return status code 403', async () => {
        const response = await request().post('/api/posts')
            .send(getPostData())

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Creating post with user token should return status code 403', async () => {
        const response = await request().post('/api/posts')
            .set('Authorization', getUserToken())
            .send(getPostData())

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Creating post with admin token should return status code 201 and post', async () => {
        const categoryData = getCategoryData()
        const userData = getAdminData()

        const response = await request().post('/api/posts')
            .set('Authorization', getAdminToken())
            .send({
                title: '[Test] Post 1',
                content: 'Post 1 content',
                excerpt: 'Post 1 excerpt',
                featuredImage: 'Post 1 featured image',
                categories: [categoryData._id],
                status: 'published'
            })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('title', '[Test] Post 1')
        expect(response.body.data).toHaveProperty('content', 'Post 1 content')
        expect(response.body.data).toHaveProperty('excerpt', 'Post 1 excerpt')
        expect(response.body.data).toHaveProperty('featuredImage', 'Post 1 featured image')
        expect(response.body.data).toHaveProperty('categories')
        expect(response.body.data).toHaveProperty('status', 'published')
        expect(response.body.data).toHaveProperty('author', userData._id)
    })
})

/**
 * @descriptionTest Get post by id
 * @endpoint GET /api/posts/:id
 * @access Public
 * @returns { success, message, data }
 */
describe('GET /posts/:id', () => {
    it('Accessing post by id without token should return status code 200', async () => {
        const postData = getPostData()

        const response = await request().get(`/api/posts/${postData._id}`)
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
    })

    it('Accessing post by id with user token should return status code 200', async () => {
        const postData = getPostData()

        const response = await request().get(`/api/posts/${postData._id}`)
            .set('Authorization', getUserToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
    })

    it('Accessing post by id with admin token should return status code 200 and post', async () => {
        const postData = getPostData()

        const response = await request().get(`/api/posts/${postData._id}`)
            .set('Authorization', getAdminToken())
            .send()

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
    })
})

/**
 * @descriptionTest Update post by id
 * @endpoint PUT /api/posts/:id
 * @access Admin
 * @body { title, content, excerpt, featuredImage, categories[], status }
 * @returns { success, message, data }
 */
describe('PUT /posts/:id', () => {
    it('Updating post by id without token should return status code 403', async () => {
        const postData = getPostData()

        const response = await request().put(`/api/posts/${postData._id}`)
            .send(getPostData())

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Updating post by id with user token should return status code 403', async () => {
        const postData = getPostData()

        const response = await request().put(`/api/posts/${postData._id}`)
            .set('Authorization', getUserToken())
            .send(getPostData())

        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty('success', false)
    })

    it('Updating post by id with admin token should return status code 200 and post', async () => {
        const postData = getPostData()

        const response = await request().put(`/api/posts/${postData._id}`)
            .set('Authorization', getAdminToken())
            .send({
                title: '[Test] Post 1 updated',
                content: 'Post 1 content updated',
                excerpt: 'Post 1 excerpt updated',
                featuredImage: 'Post 1 featured image updated',
                status: 'published'
            })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('title', '[Test] Post 1 updated')
        expect(response.body.data).toHaveProperty('content', 'Post 1 content updated')
        expect(response.body.data).toHaveProperty('excerpt', 'Post 1 excerpt updated')
        expect(response.body.data).toHaveProperty('featuredImage', 'Post 1 featured image updated')
        expect(response.body.data).toHaveProperty('categories')
        expect(response.body.data).toHaveProperty('status', 'published')
    })
})