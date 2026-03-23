const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'QCM API',
    description: 'API REST pour la gestion de questionnaires à choix multiples (QCM). Permet de gérer les questions, les réponses et les utilisateurs.'
  },
  host: 'localhost:8000',
  schemes: ['http'],
  tags: [
    { name: 'Questions', description: 'Gestion des questions' },
    { name: 'Réponses', description: 'Gestion des réponses' },
    { name: 'Utilisateurs', description: 'Gestion des utilisateurs' },
    { name: 'Authentification', description: 'Connexion des utilisateurs' }
  ]
};

const outputFile = './swagger-output.json';
const routes = ['../server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);