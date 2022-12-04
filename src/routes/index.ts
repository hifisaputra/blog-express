import { Router } from 'express'
import api from '@src/routes/api'
import { auth } from '@src/app/middlewares/auth'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from '@src/lib/swagger-jsdoc'

const router: Router = Router()

router.use('/api', auth, api)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
router.get('/', (req, res) => res.send('Hello World!'))

export default router