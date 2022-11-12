import dotenv from 'dotenv'
dotenv.config()

export default {
    /**
     * @description Database connection options
     * @type {object}
     * @property {string} host Database host
     * @property {number} port Database port
     * @property {string} name Database name
     */
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || '0'
    },

    /**
     * @description App configuration
     * @type {object}
     * @property {string|number} port App port
     */
    app: {
        port: process.env.APP_PORT || 3000,
        secret: process.env.APP_SECRET || '0'
    }
}