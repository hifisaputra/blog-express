import { Router } from 'express'
import { fetch, get, create, update, remove } from '@src/app/controllers/userController'
import { adminProtected } from '@src/app/middlewares/auth'

const router = Router()

router.get('/', fetch)
router.get('/:id([0-9a-f]{24})', get)
router.post('/', adminProtected, create)
router.put('/:id([0-9a-f]{24})', adminProtected, update)
router.delete('/:id([0-9a-f]{24})', adminProtected, remove)

export default router