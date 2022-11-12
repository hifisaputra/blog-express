import 'module-alias/register'
import express, { Application } from 'express'
import router from '@src/routes'
import config from '@src/config'
import mongoose, { initializeDatabase } from './lib/mongoose'

/**
 * @constant {Application} app
 */
const app:Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

/**
 * @description Initialize app and database connection
 * @returns {Promise<typeof import("mongoose")>}
 */
export const connectDB = (): Promise<typeof import("mongoose")> => {
    return initializeDatabase(config.database.host, config.database.port, config.database.name)
}

export const closeDB = (): Promise<void> => {
    return mongoose.disconnect()
}

export default app