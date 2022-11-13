import { Router } from 'express'
import auth from '@src/routes/api/auth'
import users from '@src/routes/api/users'
import posts from '@src/routes/api/posts'
import categories from '@src/routes/api/categories'

const router: Router = Router()
router.use('/auth', auth)
router.use('/users', users)
router.use('/posts', posts)
router.use('/categories', categories)

export default router