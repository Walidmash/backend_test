const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/app.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "backend test",
        description: "test auto-doc."
    },
    host: "localhost:4000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        ApiKeyAuth: {
            type: "apiKey",
            name: "x-access-token",
            in: "header"
        }
    },
    tags: [
        {
            "name": "User",
            "description": "user's Endpoints"
        },
        {
            "name": "Product",
            "description": "product's Endpoints"
        }
    ],
    definitions: {
        User: {
            email: 'test5@test.com',
            password: 'test5',
            stripe_id: 'dfds134'
        },
        Login: {
            $email: 'test5@test.com',
            $password: 'test5'
        },
        Register: {
            $email: 'test6@test.com',
            $password: 'test6'
        }
    },
}
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/index.js')
})