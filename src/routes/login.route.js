const router = require('express').Router();
const { loginByParams } = require('../controller/utilisateurs.controller');

router.get('/:pseudo/:motdepasse', (req, res) => {
    /* #swagger.tags = ['Authentification']
       #swagger.summary = 'Connexion via pseudo et mot de passe (paramètres URL)'
       #swagger.parameters['pseudo'] = { in: 'path', description: 'Pseudo de l\'utilisateur', required: true, type: 'string' }
       #swagger.parameters['motdepasse'] = { in: 'path', description: 'Mot de passe de l\'utilisateur', required: true, type: 'string' }
       #swagger.responses[200] = { description: 'Connexion réussie (true) ou échouée (false)', schema: true }
       #swagger.responses[500] = { description: 'Erreur serveur' }
    */
    loginByParams(req, res);
});

module.exports = router;
