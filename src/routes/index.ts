import { Router } from 'express'
import api from '@src/routes/api'

const router: Router = Router()

router.use('/api', api)
router.get('/', (req, res) => res.send('Hello World!'))

export default router