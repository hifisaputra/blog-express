import { Request, Response } from 'express'
import User from '@src/app/models/user'

/**
 * @description Show list of all users
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.find
 */
export const fetch = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({})
        res.json({
            data: users,
            message: 'Users fetched successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Create new user
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @see https://mongoosejs.com/docs/api.html#model_Model.create
 */
export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body

        // check if input is valid
        if (!name || !email || !password) {
            res.status(400).json({
                message: 'Please provide name, email and password'
            })
            return
        }

        // check if user already exists
        const isExist = await User.findOne({ email })
        if (isExist) {
            res.status(400).json({
                message: 'User already exists'
            })
            return
        }

        const user = new User({
            name,
            email,
            password
        })
        await user.save()
        res.status(201).json({
            data: user,
            message: 'User created successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Get user by id
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
                message: 'User not found'
            })
            return
        }

        res.json({
            data: user,
            message: 'User fetched successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Update user
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
                message: 'User not found'
            })
            return
        }

        res.json({
            data: user,
            message: 'User updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Delete user
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
                message: 'User not found'
            })
            return
        }

        res.json({
            data: user,
            message: 'User deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
