import { Request, Response, NextFunction } from 'express'
import { check as c, validationResult } from 'express-validator'

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

export const check = c