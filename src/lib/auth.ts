import { UserInterface } from '@src/app/models/user'
import bcrypt from 'bcrypt'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import config from '@src/config'
import { Request } from 'express'

/**
 * @description Auth Request
 * @interface AuthRequest
 * @extends Request
 */
export interface AuthRequest extends Request {
    user?: UserInterface
}

/**
 * @description Validate password
 * @param {UserInterface} user User
 * @param {string} password User password
 * @returns {Promise<boolean>}
 * @see https://www.npmjs.com/package/bcrypt
 */
export const validatePassword = async (user: UserInterface, password: string): Promise<boolean> => {
    return await bcrypt.compare(password, user.password)
}

/**
 * @description Generate token
 * @param {UserInterface} user User
 * @returns {Promise<string>}
 * @see https://www.npmjs.com/package/jsonwebtoken
 */
export const generateToken = async (user: UserInterface): Promise<string> => {
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    }, config.app.secret)

    return token
}

/**
 * @description Verify token
 * @param {string} token Token
 * @returns {Promise<UserInterface>}
 * @see https://www.npmjs.com/package/jsonwebtoken
 */
export const verifyToken = (token: string): boolean | UserInterface => {
    if (!token) return false

    jwt.verify(token, config.app.secret, (err: VerifyErrors, decoded: UserInterface) => {
        if (err) return false
        return decoded
    })
}