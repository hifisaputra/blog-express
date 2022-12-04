import swaggerJSDoc from 'swagger-jsdoc'

const options = {
    swaggerDefinition: {
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'Blog Rest API Documentation',
        },
        basePath: '/',
    },
    apis: ['@src/routes/*.ts'],
}

export const swaggerSpec = swaggerJSDoc(options)
