import { Request, Response } from 'express'
import Post from '@src/app/models/post'

/**
 * @description Show list of all available post
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.find
 */
export const fetch = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find({})

        res.json({
            data: posts,
            message: 'Third party providers fetched successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Store new post to database
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.create
 */
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status, title, excerpt, content, featuredImage } = req.body

        // check if input is valid
        if (!title) {
            res.status(400).json({
                message: 'Please provide title for the post'
            })
            return
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
