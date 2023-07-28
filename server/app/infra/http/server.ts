import {auth} from '@config/auth'
import cors from 'cors'
import express from 'express';
import {createServer} from 'http'
import { router } from './Routes';
import  swaggerJSDoc from 'swagger-jsdoc'
import  swaggerUi from 'swagger-ui-express'
import swaggerOptions from '@config/swagger';
import { disconnectPrisma } from '@infra/prisma';

const api = express();
const http = createServer(api)
const port = auth.port || 5000
const specs = swaggerJSDoc(swaggerOptions);

api.use(express.urlencoded({ extended : true }))
api.use(express.json());
api.use(cors())
api.use(router);
api.set('port', port);

api.get('/', (req,res)=>{
  return res.status(200).json({
    status: 'online'
  })
})

api.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

http.listen( port, () => {
  console.log(`Server running on port ${port}`);
});

// Lógica de encerramento do servidor
const handleShutdown = async () => {
  await disconnectPrisma();
  http.close(() => {
    process.exit(0);
  });
};

// Ouvinte de sinal de encerramento do processo
process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);