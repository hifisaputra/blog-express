import { Router } from 'express'
import { login, register, profile } from '@src/app/controllers/authController'
import { userProtected } from '@src/app/middlewares/auth'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.use('/profile', userProtected, profile)

export default router
