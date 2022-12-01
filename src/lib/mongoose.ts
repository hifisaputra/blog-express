import mongoose, { Error } from 'mongoose'
import { logger } from '@src/lib/winston'

/**
 * @description Initialize database connection
 * @param host Database host
 * @param port Database port
 * @param name Database name
 * @returns promise
 */
export const initializeDatabase = (host: string, port: string | number, name: string, callback?: () => void) => {
    mongoose.connection
        .once('open', () => {
            if(callback) callback()
        })
        .on('error', (error: Error) => logger.log('error', 'Error connecting to MongoDB: ' + error))
        .on('disconnected', () => logger.log('error', 'MongoDB disconnected'))

    return mongoose.connect(`mongodb://${host}:${port}/${name}`)
}

export default mongoose