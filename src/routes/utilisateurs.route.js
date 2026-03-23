const router = require('express').Router();

const {
    getUtilisateurById,
    createUtilisateur,
    updateUtilisateurById,
    deleteUtilisateurById,
    loginUtilisateur
} = require('../controller/utilisateurs.controller');

router.get('/:id/:motdepasse', (req, res) => {
    /* #swagger.tags = ['Utilisateurs']
       #swagger.summary = 'Récupérer un utilisateur par son id (mot de passe requis)'
       #swagger.parameters['id'] = { in: 'path', description: 'ID de l\'utilisateur', required: true, type: 'integer' }
       #swagger.parameters['motdepasse'] = { in: 'path', description: 'Mot de passe de l\'utilisateur', required: true, type: 'string' }
       #swagger.responses[200] = {
           description: 'Utilisateur trouvé',
           schema: { id: 1, pseudo: 'johndoe' }
       }
       #swagger.responses[401] = { description: 'Identifiants incorrects' }
       #swagger.responses[500] = { description: 'Erreur serveur' }
    */
    getUtilisateurById(req, res);
});

router.post('/create', (req, res) => {
    /* #swagger.tags = ['Utilisateurs']
       #swagger.summary = 'Créer un nouvel utilisateur'
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: {
                       type: 'object',
                       required: ['pseudo', 'motdepasse'],
                       properties: {
                           pseudo: { type: 'string', example: 'johndoe' },
                           motdepasse: { type: 'string', example: 'motdepasse123' }
                       }
                   }
               }
           }
       }
       #swagger.responses[201] = { description: 'Utilisateur créé', schema: { id: 1, pseudo: 'johndoe' } }
       #swagger.responses[400] = { description: 'Corps de la requête invalide' }
       #swagger.responses[500] = { description: 'Erreur serveur' }
    */
    createUtilisateur(req, res);
});

router.put('/update/:id', (req, res) => {
    /* #swagger.tags = ['Utilisateurs']
       #swagger.summary = 'Mettre à jour un utilisateur par son id'
       #swagger.parameters['id'] = { in: 'path', description: 'ID de l\'utilisateur', required: true, type: 'integer' }
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: {
                       type: 'object',
                       properties: {
                           pseudo: { type: 'string', example: 'newpseudo' },
                           motdepasse: { type: 'string', example: 'nouveaumotdepasse' }
                       }
                   }
               }
           }
       }
       #swagger.responses[200] = { description: 'Utilisateur mis à jour', schema: { id: 1, pseudo: 'newpseudo' } }
       #swagger.responses[400] = { description: 'Corps de la requête vide' }
       #swagger.responses[500] = { description: 'Erreur serveur' }
    */
    updateUtilisateurById(req, res);
});

router.delete('/delete/:id', (req, res) => {
    /* #swagger.tags = ['Utilisateurs']
       #swagger.summary = 'Supprimer un utilisateur par son id'
       #swagger.parameters['id'] = { in: 'path', description: 'ID de l\'utilisateur', required: true, type: 'integer' }
       #swagger.responses[200] = { description: 'Utilisateur supprimé avec succès' }
       #swagger.responses[500] = { description: 'Erreur serveur' }
    */
    deleteUtilisateurById(req, res);
});

router.post('/login', (req, res) => {
    /* #swagger.tags = ['Utilisateurs']
       #swagger.summary = 'Connexion d\'un utilisateur'
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: {
                       type: 'object',
                       required: ['pseudo', 'motdepasse'],
                       properties: {
                           pseudo: { type: 'string', example: 'johndoe' },
                           motdepasse: { type: 'string', example: 'motdepasse123' }
                       }
                   }
               }
           }
       }
       #swagger.responses[200] = { description: 'Connexion réussie (true) ou échouée (false)', schema: true }
       #swagger.responses[400] = { description: 'Pseudo ou mot de passe manquant' }
       #swagger.responses[500] = { description: 'Erreur serveur' }
    */
    loginUtilisateur(req, res);
});

module.exports = router;
