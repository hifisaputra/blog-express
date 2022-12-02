import { Request, Response } from 'express'
import Category from '@src/app/models/category'
import { logger } from '@src/lib/winston'

/**
 * @description Method to get all categories
 * returns the result in paginated format.
 *
 * The available query string used for filtering:
 * - page: the page number
 * - limit: the number of category per page
 * - sort: the sort order
 * - search: the search query
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.find
 */
export const fetch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page, limit, sort, search } = req.query
        const query: Record<string, unknown> = {}
        const options: Record<string, unknown> = {
            page: page || 1,
            limit: limit || 10,
            sort: sort || { createdAt: -1 },
        }

        if (search) {
            query.$text = { $search: search }
        }

        const result = await Category.paginate(query, options)
        res.status(200).json({
            success: true,
            message: 'Successfully fetched categories',
            ...result
        })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories'
        })
    }
}

/**
 * @description Method to validate input and store a new category in the database
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.create
 */
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body

        // check if input is valid
        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Please provide name'
            })
            return
        }

        const category = new Category({
            name,
            description
        })
        await category.save()
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category,
        })
    } catch (error) {
        logger.log('error', error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**
 * @description Method to get a category by id
 * if category is not found, it will return 404
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findById
 */
export const get = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const category = await Category.findById(id)
        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found'
            })
            return
        }
        res.json({
            success: true,
            message: 'Category fetched successfully',
            data: category,
        })
    } catch (error) {
        logger.log('error', error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**
 * @description Method to validate input and store changes to a category in the database
 * if category is not found, it will return 404
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
 */
export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body
        const { id } = req.params

        // check if input is valid
        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Please provide name'
            })
            return
        }

        const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true })

        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found'
            })
            return
        }

        res.json({
            success: true,
            message: 'Category updated successfully',
            data: category,
        })
    } catch (error) {
        logger.log('error', error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**
 * @description Method to delete a category by id from the database
 * if category is not found, it will return 404
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
 */
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const category = await Category.findByIdAndDelete(id)

        if (!category) {
            res.status(404).json({
                success: false,
                message: 'Category not found'
            })
            return
        }

        res.json({
            success: true,
            message: 'Category deleted successfully',
            data: category,
        })
    } catch (error) {
        logger.log('error', error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}