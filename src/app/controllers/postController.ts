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
            message: 'Posts fetched successfully'
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
        const { status, title, excerpt, content, featuredImage, categories } = req.body

        // check if input is valid
        if (!title) {
            res.status(400).json({
                message: 'Please provide title for the post'
            })
            return
        }

        const post = new Post({
            status,
            title,
            excerpt,
            content,
            featuredImage,
            categories
        })
        await post.save()

        res.status(201).json({
            data: post,
            message: 'Post created successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Get single post by id
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
                message: 'Post not found'
            })
            return
        }

        res.json({
            data: post,
            message: 'Post fetched successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Update post by id
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
 */
export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { status, title, excerpt, content, featuredImage } = req.body

        // check if input is valid
        if (!title) {
            res.status(400).json({
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
                featuredImage
            },
            { new: true }
        )

        if (!post) {
            res.status(404).json({
                message: 'Post not found'
            })
            return
        }

        res.json({
            data: post,
            message: 'Post updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Delete post by id
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
                message: 'Post not found'
            })
            return
        }

        res.json({
            data: post,
            message: 'Post deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}