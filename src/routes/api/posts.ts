import { Router } from 'express'
import { fetch, get, create, update, remove } from '@src/app/controllers/postController'
import { authMiddleware } from '@src/app/middlewares/auth'

const router = Router()

router.use('/', authMiddleware)
router.get('/', fetch)
router.get('/:id([0-9a-f]{24})', get)
router.post('/', create)
router.put('/:id([0-9a-f]{24})', update)
router.delete('/:id([0-9a-f]{24})', remove)

export default router