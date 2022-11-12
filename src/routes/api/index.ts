import { Router } from 'express'
import auth from '@src/routes/api/auth'
import users from '@src/routes/api/users'
import thirdPartyProviders from '@src/routes/api/thirdPartyProviders'

const router: Router = Router()
router.use('/auth', auth)
router.use('/users', users)
router.use('/third-party-providers', thirdPartyProviders)

export default router