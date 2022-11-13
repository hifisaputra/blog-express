import { request, getDefaultToken } from './setup'

const postData = {
    status: 'draft',
    title: 'Lorem Ipsum Dolor Sir Amet',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse',
    expect: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    featuredImage: '//placeholder.com/banner.png'
}

let createdPostData = {
    _id: '',
    status: '',
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
}

/**
 * @descriptionTest Fetching list of post
 * @endpoint GET /api/posts
 */
describe('GET /posts', () => {
    it('Trying to get list of post without authorization token should return status 401', async () => {
        const response = await request().post('/api/posts')

        expect(response.statusCode).toBe(401)
    })

    it('Successfully getting list of posts should return status 200 and list of posts', async () => {
        const response = await request().get('/api/posts').set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})


/**
 * @descriptionTest Creating a new post
 * @endpoint POST /api/posts
 */
 describe('POST /posts', () => {
    it('Trying to create post without authorization token should return status 401', async () => {
        const response = await request().post('/api/posts')

        expect(response.statusCode).toBe(401)
    })

    it('Trying to create post with invalid form data should return stataus 400', async () => {
        const response = await request().post('/api/posts').set('Authorization', getDefaultToken()).send({})

        expect(response.statusCode).toBe(400)
    })

    it('Trying to create post with valid form data should return status 201 and post', async () => {
        const response = await request().post('/api/posts').set('Authorization', getDefaultToken()).send(postData)

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('title', postData.title)
        createdPostData = response.body.data
        expect(createdPostData).toHaveProperty('_id')
        expect(createdPostData).toHaveProperty('title', postData.title)
        expect(createdPostData).toHaveProperty('slug')
    })
})


/**
 * @descriptionTest Get the specified post
 * @endpoint GET /api/posts/:id
 */
 describe('GET /posts/:id', () => {
    it('Trying to get post without authorization token should return status 401', async () => {
        const response = await request().get('/api/posts/1')

        expect(response.statusCode).toBe(401)
    })

    it('Trying to get non existed post should return 404', async () => {
        const response = await request().get('/api/posts/1').set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(404)
    })

    it('Successfully creating post should return 200 and post', async () => {
        const { _id, title } = createdPostData
        const response = await request().get(`/api/posts/${_id}`).set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('title', title)
    })
})

/**
 * @descriptionTest Update the specified post data
 * @endpoint PUT /api/posts/:id
 */
describe('PUT /posts/:id', () => {
    it('Trying to update post without authorization token should return status 401', async () => {
        const response = await request().put('/api/posts/1')

        expect(response.statusCode).toBe(401)
    })

    it('Trying to update post with incorrect post id should return 404', async () => {
        const response = await request().put('/api/posts/1').set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(404)
    })

    it('Successfully updating post should return 200 and updated post', async () => {
        const { _id } = createdPostData
        const response = await request().put(`/api/posts/${_id}`).set('Authorization', getDefaultToken()).send({
            title: 'Updated title',
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('title', 'Updated title')
    })
})

/**
 * @descriptionTest Delete the specified post
 * @endpoint DELETE /api/posts/:id
 */
describe('DELETE /posts/:id', () => {
    it('Trying to delete post without authorization token should return status 401', async () => {
        const response = await request().delete('/api/posts/1')

        expect(response.statusCode).toBe(401)
    })

    it('Trying to delete post with incorrect post id should return 404', async () => {
        const response = await request().delete('/api/posts/1').set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(404)
    })

    it('Successfully deleting post should return 200 and deleted post', async () => {
        const { _id } = createdPostData
        const response = await request().delete(`/api/posts/${_id}`).set('Authorization', getDefaultToken())

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('_id', _id)
    })
})