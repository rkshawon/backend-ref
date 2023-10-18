import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cannabis Connecter API Documentation',
      version: '1.0.0',
      description:
        'Developed By Corexlab Limited',
      contact: {
        name: 'MD Razu Ahammed Molla',
        email:"reach@corexlab.com",
        url: 'https://corexlab.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
        description: 'Development server',
      },
    ],
  },
  apis: ["**/*.yaml", "**/*.ts"]
};

export const swaggerSpec = swaggerJsdoc(options);
