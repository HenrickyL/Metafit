import { appUrl } from "./auth";
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions : swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'MetaFit API',
      version: '1.0.0',
      description: 'API documentation for MetaFit',
    },
    servers: [
      {
        url: "api" || appUrl, // Altere a URL de acordo com o seu ambiente
      },
    ],
  },
  apis: ['./app/infra/http/Routes/*.ts','./types/DTOs/*.ts'], // Especifique o caminho para os seus arquivos de rotas ou controladores
};


export default swaggerOptions