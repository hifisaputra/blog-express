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
 * @descriptionTest Creating a enw post
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

    it('Trying to create post with valid form data should return status 201 and user', async () => {
        const response = await request().post('/api/posts').set('Authorization', getDefaultToken()).send(postData)

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('title', postData.title)
        createdPostData = response.body.data
        expect(createdPostData).toHaveProperty('_id')
        expect(createdPostData).toHaveProperty('title', postData.title)
        expect(createdPostData).toHaveProperty('slug', 'lorem-ipsum-dolor-sir-amet')
    })
})