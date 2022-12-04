import { Router } from 'express'
import { login, register, profile } from '@src/app/controllers/authController'
import { userProtected } from '@src/app/middlewares/auth'
import { validateEmail, returnValidationError } from '@src/lib/express-validator'

const router = Router()

router.post('/login', validateEmail, returnValidationError, login)
router.post('/register', register)
router.use('/profile', userProtected, profile)

export default router
