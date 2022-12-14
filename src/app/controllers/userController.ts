import { Request, Response } from 'express'
import User from '@src/app/models/user'
import { logger } from '@src/lib/winston'

/**
 * @description Method to get list of users
 * returns the result in paginated format.
 *
 * The available query string used for filtering:
 * - page: the page number
 * - limit: the number of user per page
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

        const result = await User.paginate(query, options)
        res.status(200).json({
            success: true,
            message: 'Successfully fetched users',
            ...result
        })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users'
        })
    }
}

/**
 * @description Method to validate input and email.
 * if input is valid and email is not in use,
 * it will create a new user
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.create
 */
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, profilePicture, role } = req.body

        // check if input is valid
        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: 'Please provide name, email and password'
            })
            return
        }

        // check if user email is already in use
        const emailInUse = await User.emailExists(email)
        if (emailInUse) {
            res.status(400).json({
                success: false,
                message: 'Email already in use'
            })
            return
        }

        const user = new User({
            name,
            email,
            password,
            profilePicture,
            role
        })
        await user.save()
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
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
 * @description Method to get user by id
 * if user is not found, it will return 404
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findById
 */
export const get = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
            return
        }

        res.json({
            success: true,
            message: 'User fetched successfully',
            data: user,
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
 * @description Method to validate user input,
 * check if user exists and update user
 * if user is not found, it will return 404
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
 */
export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
            return
        }

        res.json({
            success: true,
            message: 'User updated successfully',
            data: user,
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
 * @description Method to delete user by id
 * if user is not found, it will return 404
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
 */
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndRemove(req.params.id)

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
            return
        }

        res.json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (error) {
        logger.log('error', error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
