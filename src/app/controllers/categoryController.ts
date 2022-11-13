import { Request, Response } from 'express'
import Category from '@src/app/models/category'

/**
 * @description Show list of all categories
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.find
 */
export const fetch = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find({})
        res.json({
            data: categories,
            message: 'Categories fetched successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Create new category
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.create
 */
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body

        // check if input is valid
        if (!name) {
            res.status(400).json({
                message: 'Please provide name'
            })
            return
        }

        const category = new Category({
            name
        })
        await category.save()
        res.status(201).json({
            data: category,
            message: 'Category created successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Get category by id
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
                message: 'Category not found'
            })
            return
        }
        res.json({
            data: category,
            message: 'Category fetched successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Update category
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
 */
export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body
        const { id } = req.params

        // check if input is valid
        if (!name) {
            res.status(400).json({
                message: 'Please provide name'
            })
            return
        }

        const category = await Category.findByIdAndUpdate(id, { name }, { new: true })
        res.json({
            data: category,
            message: 'Category updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Delete category
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
 */
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const category = await Category.findByIdAndDelete(id)
        res.json({
            data: category,
            message: 'Category deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}