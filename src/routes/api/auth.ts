import { Router } from 'express'
import { login, register, profile } from '@src/app/controllers/authController'
import { userProtected } from '@src/app/middlewares/auth'
import { check, returnValidationError } from '@src/lib/express-validator'

const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *   LoginRequest:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      description: The user email address
 *      example: johndoe@mail.com
 *     password:
 *      type: string
 *      description: The user password
 *      example: '123456'
 *    required:
 *     - email
 *     - password
 *    example:
 *     email: johndoe@mail.com
 *     password: '123456'
 *   LoginResponse:
 *    type: object
 *    properties:
 *     success:
 *      type: boolean
 *      example: true
 *     message:
 *      type: string
 *      example: User logged in
 *     data:
 *      $ref: '#/components/schemas/User'
 *     token:
 *      type: string
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGQ5ZWM3ZjliMzM2NjAwMzAyMzQ0MCIsImlhdCI6MTY3MDIyNTgxM30.f19cu4eJoil1_cqjC9GUN7dGjf3Qht_djY1m0x14F-8
 *
 * /api/auth/login:
 *  post:
 *   summary: Login
 *   description: Validate user credentials and return a JWT token
 *   tags:
 *    - Auth
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/LoginRequest'
 *     application/x-www-form-urlencoded:
 *      schema:
 *       $ref: '#/components/schemas/LoginRequest'
 *   responses:
 *    200:
 *     description: Successful response with user data and token
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/LoginResponse'
 */
router.post('/login', [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is not valid'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], returnValidationError, login)


router.post('/register', register)

/**
 * @swagger
 * components:
 *  schemas:
 *   ProfileResponse:
 *    type: object
 *    properties:
 *     success:
 *      type: boolean
 *      example: true
 *     message:
 *      type: string
 *      example: User profile
 *     data:
 *      $ref: '#/components/schemas/User'
 *
 * /api/auth/profile:
 *  get:
 *   summary: Profile
 *   description: Get logged in user profile
 *   tags:
 *    - Auth
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      description: User token
 *      type: string
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ProfileResponse'
 */
router.use('/profile', userProtected, profile)

export default router
