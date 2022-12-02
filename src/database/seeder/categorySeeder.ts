import Category from '@src/app/models/category'
import { faker } from '@faker-js/faker'
import { strToSlug } from '@src/lib/utils'

/**
 * @description Method to populate the categories collection with fake data
 * @param {number} [count=1] - Number of categories to be created
 * @returns {Promise<void>}
 */
export const populateCategories = async (count: number): Promise<void> => {
    const categories = []
    for (let i = 0; i < count; i++) {
        const name = faker.commerce.productName()
        categories.push({
            name,
            slug: strToSlug(`${name}-${faker.random.numeric(5)}`),
            description: faker.lorem.sentence(),
        })
    }
    await Category.insertMany(categories)
}