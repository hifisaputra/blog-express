import { request, getDefaultToken } from './setup'
import Category from '../src/app/models/category'

const postData = {
    status: 'published',
    title: 'What is Lorem Ipsum?',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    featuredImage: 'https://picsum.photos/200/300',
}

let createdPostData = {
    _id: '',
    status: '',
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    author: '',
    categories: [] as string[],
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
        const categories = await Category.find()

        const response = await request().post('/api/posts').set('Authorization', getDefaultToken()).send({
            ...postData,
            categories: categories.map((category) => category._id),
        })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('title', postData.title)
        createdPostData = response.body.data
        expect(createdPostData).toHaveProperty('_id')
        expect(createdPostData).toHaveProperty('title', postData.title)
        expect(createdPostData).toHaveProperty('slug')
        expect(createdPostData).toHaveProperty('content', postData.content)
        expect(createdPostData).toHaveProperty('excerpt', postData.excerpt)
        expect(createdPostData).toHaveProperty('featuredImage', postData.featuredImage)
        expect(createdPostData).toHaveProperty('categories')
        expect.arrayContaining(createdPostData.categories)
        expect(createdPostData.categories.length).toBeGreaterThan(0)
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

    // it('Successfully deleting post should return 200 and deleted post', async () => {
    //     const { _id } = createdPostData
    //     const response = await request().delete(`/api/posts/${_id}`).set('Authorization', getDefaultToken())

    //     expect(response.statusCode).toBe(200)
    //     expect(response.body).toHaveProperty('data')
    //     expect(response.body.data).toHaveProperty('_id', _id)
    // })
})