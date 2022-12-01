import { Request, Response } from 'express'
import Post from '@src/app/models/post'
import { logger } from '@src/lib/winston'
import { AuthRequest } from '@src/app/middlewares/auth'

/**
 * @description Show list of all available post
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.find
 */
export const fetch = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find({})

        res.json({
            success: true,
            message: 'Posts fetched successfully',
            data: posts,
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
 * @description Validate input and store a new post in the database
 *
 * @param {AuthRequest} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.create
 */
export const create = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { title, excerpt, content, featuredImage, categories, status } = req.body

        // check if input is valid
        if (!title) {
            res.status(400).json({
                success: false,
                message: 'Please provide title for the post'
            })
            return
        }

        const post = new Post({
            title,
            excerpt,
            content,
            featuredImage,
            status,
            author: req.user._id,
            categories,
        })
        await post.save()

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: post,
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
 * @description Get a single post by id
 * if post is not found, return 404
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findById
 */
export const get = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const post = await Post.findById(id)

        if (!post) {
            res.status(404).json({
                success: false,
                message: 'Post not found'
            })
            return
        }

        res.json({
            success: true,
            message: 'Post fetched successfully',
            data: post,
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
 * @description Method to validate input and update a post in the database
 * if post is not found, return 404
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
 */
export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { status, title, excerpt, content, featuredImage, categories } = req.body

        // check if input is valid
        if (!title) {
            res.status(400).json({
                success: false,
                message: 'Please provide title for the post'
            })
            return
        }

        const post = await Post.findByIdAndUpdate(
            id,
            {
                status,
                title,
                excerpt,
                content,
                featuredImage,
                categories,
            },
            { new: true }
        )

        if (!post) {
            res.status(404).json({
                success: false,
                message: 'Post not found'
            })
            return
        }

        res.json({
            success: true,
            message: 'Post updated successfully',
            data: post,
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
 * @description Method to delete a post from the database
 * if post is not found, return 404
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
 */
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const post = await Post.findByIdAndDelete(id)

        if (!post) {
            res.status(404).json({
                success: false,
                message: 'Post not found'
            })
            return
        }

        res.json({
            success: true,
            message: 'Post deleted successfully'
        })
    } catch (error) {
        logger.log('error', error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}