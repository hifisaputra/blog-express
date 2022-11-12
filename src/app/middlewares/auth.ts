import jwt, { VerifyErrors } from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { AuthRequest } from '@src/lib/auth'
import config from '@src/config'
import { UserInterface } from '@src/app/models/user'

/**
 * @description Auth required middleware
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @see https://www.npmjs.com/package/jsonwebtoken
 * @see https://www.npmjs.com/package/express-jwt
 */
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token: string = req.header('X-Access-Token') || req.header('Authorization')

    if (!token) {
        return res.status(401).send({
            error: 'You must be logged in to access this resource'
        })
    }

    jwt.verify(token, config.app.secret, (err: VerifyErrors, decoded: UserInterface) => {
        if (err) {
            return res.status(401).send({
                error: 'You must be logged in to access this resource'
            })
        }

        req.user = decoded
        next()
    })
}