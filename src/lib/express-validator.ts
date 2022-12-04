import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

/**
 * @description The express-validator middleware, check if request has validation error
 * if the request has validation error, it will return 400 status code
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 export const returnValidationError = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        next()
    } else {
        res.status(400).json({
            success: false,
            message: 'Bad request',
            errors: errors.array(),
        })
    }
}

export const validateEmail = body('email').isEmail().withMessage('Email is not valid')
export const validatePassword = body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
export const validateName = body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters')