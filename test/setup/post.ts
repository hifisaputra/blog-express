import Post from '../../src/app/models/post'
import { categoryData } from './category'
import { adminData } from './auth'

export const postData = {
    _id: '5f1b9b9b9b9b9b9b9b9b9b9b',
    title: '[Test] Post',
    content: 'Lorem ipsum dolor sir amet',
    excerpt: 'Lorem ipsum dolor sir amet',
    featuredImage: 'https://picsum.photos/200/300',
    status: 'published',
    author: adminData._id,
    categories: [categoryData._id],
}

/**
 * @description Store post data to mongodb
 * @returns {Promise<void>}
 */
export const createPost = async (): Promise<void> => {
    const post = new Post(postData)
    await post.save()
}

/**
 * @description Delete all posts from mongodb
 * @returns {Promise<void>}
 */
export const deleteAllPosts = async (): Promise<void> => {
    await Post.deleteMany({ title: /.*\[Test\].*/ })
}
