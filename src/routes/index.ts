import { Router } from 'express'
import api from '@src/routes/api'
import { auth } from '@src/app/middlewares/auth'

const router: Router = Router()

router.use('/api', auth, api)
router.get('/', (req, res) => res.send('Hello World!'))

export default router