const swagger_Jsdoc = require('swagger-jsdoc')
const swagger_ui = require('swagger-ui-express')

const options = 
{
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Blog API',
        version: '1.0.0',
        description: 'Blog Api Documentation',
      },  
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
        servers : 
        [
            {
                url : 'http://localhost:7000',
                description : 'Development Server'
            }
        ],

    apis : ['src/routes/swaggerRoutes.js']
}

const swaggerSpec = swagger_Jsdoc(options)

module.exports = swaggerSpec