import app from './app'
import { logger } from '@src/lib/winston'
import { initializeDatabase } from '@src/lib/mongoose'
import config from '@src/config'

/**
 * @description Initialize app and database connection
 */
initializeDatabase(config.database.host, config.database.port, config.database.name, () => {
    app.listen(config.app.port, () => logger.log('info', `Server started on port ${config.app.port}`))
})
