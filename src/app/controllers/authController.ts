import User from '@src/app/models/user'
import { validatePassword, generateToken, AuthRequest } from '@src/lib/auth'
import { Request, Response } from 'express'

/**
 * @description Validate user login credentials
 * @param {Request} req
 * @param {Response} res
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({
                error: 'Email and password are required'
            })
            return
        }

        const user = await User.findOne({ email })
        if (!user.email) {
            res.status(401).json({
                message: 'User not found'
            })
            return
        }

        const isValid = await validatePassword(user, password)
        if (!isValid) {
            res.status(401).json({
                message: 'Invalid password'
            })
            return
        }

        const token = await generateToken(user)
        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Register new user
 * @param {Request} req
 * @param {Response} res
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body

        // Check if input is valid
        if (!name || !email || !password) {
            res.status(400).json({
                error: 'Name, email and password are required'
            })
            return
        }

        // Check if user already exists
        const isExists = await User.findOne({ email })
        if (isExists) {
            res.status(400).json({
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
        const token: string = await generateToken(user)

        res.status(201).json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * @description Get logged in user profile
 * @param {AuthRequest} req
 * @param {Response} res
 */
export const profile = async (req: AuthRequest, res: Response): Promise<void> => {
    if (req.user) {
        res.json({
            user: req.user
        })
    } else {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}