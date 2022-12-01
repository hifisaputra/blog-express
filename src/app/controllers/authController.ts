import User from '@src/app/models/user'
import { AuthRequest } from '@src/app/middlewares/auth'
import { Request, Response } from 'express'
import { logger } from '@src/lib/winston'

/**
 * @description Method to validate user credentials,
 * if valid, it will return the user token and user data
 *
 * @param {Request} req
 * @param {Response} res
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Email and password are required'
            })
            return
        }

        const user = await User.findOne({ email })
        if (!user.email) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
            return
        }

        const isValid = await user.validatePassword(password)
        if (!isValid) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
            return
        }

        const token = await user.generateToken()
        res.json({
            success: true,
            message: 'User logged in',
            data: user,
            token
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
 * @description Method to validate user data and create a new user
 * return the created user token and data
 *
 * @param {Request} req
 * @param {Response} res
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body

        // Check if input is valid
        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: 'Name, email and password are required'
            })
            return
        }

        // Check if user already exists
        const isExists = await User.findOne({ email })
        if (isExists) {
            res.status(400).json({
                success: false,
                error: 'User already exists'
            })
            return
        }

        const user = new User({
            name,
            email,
            password
        })
        await user.save()
        const token: string = await user.generateToken()

        res.status(201).json({
            success: true,
            message: 'User created',
            data: user,
            token
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
 * @description Method to return the logged in user data
 *
 * @param {AuthRequest} req
 * @param {Response} res
 */
export const profile = async (req: AuthRequest, res: Response): Promise<void> => {
    res.json({
        success: true,
        message: 'User profile',
        data: req.user
    })
}