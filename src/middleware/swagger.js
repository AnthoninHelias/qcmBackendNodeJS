const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'API pour les questions et réponses'
  },
  host: 'localhost:8000',
  schemes: ['http'],
  tags: [
    { name: 'Questions', description: 'Opérations sur les questions' },
    { name: 'Réponses', description: 'Opérations sur les réponses' },
    { name: 'Utilisateurs', description: 'Gestion des utilisateurs' },
    { name: 'Authentification', description: 'Connexion des utilisateurs' }
  ]
};

const outputFile = './swagger-output.json';
const routes = ['../server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);