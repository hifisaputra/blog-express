import { Router } from 'express'
import { login, register, profile } from '@src/app/controllers/authController'
import { authMiddleware } from '@src/app/middlewares/auth'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.use('/profile', authMiddleware)
router.get('/profile', profile)

export default router
