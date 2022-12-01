import Category from '../../src/app/models/category'

export const categoryData = {
    _id: '5f1b9b9b9b9b9b9b9b9b9b9b',
    name: 'Test Category',
    description: 'Lorem ipsum dolor sir amet'
}

/**
 * @description Store category data to mongodb and return the generated token
 * @returns {Promise<string>}
 */
export const createCategory = async (): Promise<void> => {
    const category = new Category(categoryData)
    await category.save()
}

/**
 * @description Delete all categories from mongodb
 * @returns {Promise<void>}
 */
export const deleteAllCategories = async (): Promise<void> => {
    await Category.deleteMany({})
}