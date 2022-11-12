import { request, getDefaultToken } from './setup'

const postData = {
    status: 'draft',
    title: 'Lorem Ipsum Dolor Sir Amet',
    content: '',
    expect: '',
    featuredImage: ''
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
 * @descriptionTest Test creating a new post
 * @endpoint POST /api/posts
 */
describe('POST /posts', () => {
    it('Trying to create post without authorization token should return status 401', async () => {
        const response = await request().post('/api/posts')

        expect(response.statusCode).toBe(401)
    })
})
