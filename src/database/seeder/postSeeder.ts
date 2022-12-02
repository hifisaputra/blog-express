import Post from '@src/app/models/post'
import User from '@src/app/models/user'
import Category from '@src/app/models/category'
import { faker } from '@faker-js/faker'
import { strToSlug } from '@src/lib/utils'

/**
 * @description Method to populate the posts collection with fake data
 * @param {number} [count=1] - Number of posts to be created
 * @returns {Promise<void>}
 */
export const populatePosts = async (count: number): Promise<void> => {
    const userIds = await User.find().select('_id')
    const categoryIds = await Category.find().select('_id')

    const posts = []
    for (let i = 0; i < count; i++) {
        const title = faker.lorem.sentence()
        posts.push({
            title,
            slug: strToSlug(`${title}-${faker.random.numeric(5)}`),
            content: faker.lorem.paragraphs(),
            excerpt: faker.lorem.sentence(),
            featuredImage: faker.image.imageUrl(),
            status: faker.helpers.arrayElement(['published', 'draft']),
            author: faker.helpers.arrayElement(userIds),
            categories: faker.helpers.arrayElements(categoryIds, 2),
        })
    }
    await Post.insertMany(posts)
}