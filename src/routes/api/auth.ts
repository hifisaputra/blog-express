import { Router } from 'express'
import { login, register, profile } from '@src/app/controllers/authController'
import { userProtected } from '@src/app/middlewares/auth'
import { validateEmail, returnValidationError } from '@src/lib/express-validator'

const router = Router()

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Validating user credentials and return user token and data
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user email
 *               password:
 *                 type: string
 *                 description: The user password
 *    responses:
 */
router.post('/login', validateEmail, returnValidationError, login)
router.post('/register', register)
router.use('/profile', userProtected, profile)

export default router
