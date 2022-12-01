import { Request, Response, NextFunction } from 'express'
import User, { UserDocument } from '@src/app/models/user'

/**
 * @description Auth request interface
 * @interface AuthRequest
 * @extends Request
 */
 export interface AuthRequest extends Request {
    user?: UserDocument
}

/**
 * @description The auth middleware, check if request has a valid token
 * if the token is valid, the user will be attached to the request
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token: string = req.header('X-Access-Token') || req.header('Authorization')

    if(token) {
        const user = await User.verifyToken(token)
        if(user) req.user = user
    }

    next()
}

/**
 * @description The user protected middleware, check if request has user,
 * if not it will return 401 status code
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const userProtected = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.user) {
        next()
    } else {
        res.status(401).send({
            success: false,
            message: 'Unauthorized'
        })
    }
}

/**
 * @description The admin protected middleware, check if request has user with admin role,
 * if the user is not admin, it will return 403 forbidden
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const adminProtected = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(403).json({
            success: false,
            message: 'Forbidden'
        })
    }
}