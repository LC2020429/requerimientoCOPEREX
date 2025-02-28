import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Coperex API',
      version: '1.0.0',
      description: 'API documentation for Coperex',
    },
    servers: [
      {
        url: 'http://localhost:3003',
      },
    ],
  },
  apis: [
    './src/auth/auth.routes.js',
    './src/user/user.routes.js',
    './src/categoryEnterprise/category.routes.js',
    './src/enterprise/enterprise.routes.js',
    './src/excel/excel.routes.js',
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };