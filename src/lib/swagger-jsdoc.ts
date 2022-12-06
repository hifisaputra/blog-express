import swaggerJSDoc from 'swagger-jsdoc'

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'Blog Rest API Documentation',
        },
        basePath: '/',
    },
    apis: ['./src/app/models/*.ts', './src/app/controllers/*.ts', './src/routes/api/*.ts'],
}

export const swaggerSpec = swaggerJSDoc(options)
