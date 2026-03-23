const router = require('express').Router();

const {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestionById,
    deleteQuestionById
} = require('../controller/questions.controller');


router.get('/', (req, res) => {
    /* #swagger.tags = ['Questions']
       #swagger.summary = 'Récupérer toutes les questions'
       #swagger.responses[200] = {
           description: 'Liste de toutes les questions',
           schema: [{ id: 1, intitule: 'Quelle est la capitale de la France ?' }]
       }
    */
    getAllQuestions(req, res);
});

router.get('/:id', (req, res) => {
    /* #swagger.tags = ['Questions']
       #swagger.summary = 'Récupérer une question par son id'
       #swagger.parameters['id'] = { in: 'path', description: 'ID de la question', required: true, type: 'integer' }
       #swagger.responses[200] = {
           description: 'Question trouvée',
           schema: { id: 1, intitule: 'Quelle est la capitale de la France ?' }
       }
       #swagger.responses[500] = { description: 'Erreur serveur' }
    */
    getQuestionById(req, res);
});

router.post('/create', (req, res) => {
    /* #swagger.tags = ['Questions']
       #swagger.summary = 'Créer une nouvelle question'
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: {
                       type: 'object',
                       required: ['intitule'],
                       properties: {
                           intitule: { type: 'string', example: 'Quelle est la capitale de la France ?' }
                       }
                   }
               }
           }
       }
       #swagger.responses[200] = { description: 'Question créée avec succès' }
       #swagger.responses[400] = { description: 'Corps de la requête vide' }
       #swagger.responses[500] = { description: 'Erreur serveur' }
    */
    createQuestion(req, res);
});

router.put('/update/:id', (req, res) => {
    /* #swagger.tags = ['Questions']
       #swagger.summary = 'Mettre à jour une question par son id'
       #swagger.parameters['id'] = { in: 'path', description: 'ID de la question', required: true, type: 'integer' }
       #swagger.requestBody = {
           required: true,
           content: {
               'application/json': {
                   schema: {
                       type: 'object',
                       required: ['intitule'],
                       properties: {
                           intitule: { type: 'string', example: 'Quelle est la capitale de la Belgique ?' }
                       }
                   }
               }
           }
       }
       #swagger.responses[200] = { description: 'Question mise à jour avec succès' }
       #swagger.responses[400] = { description: 'Corps de la requête vide' }
       #swagger.responses[500] = { description: 'Erreur serveur' }
    */
    updateQuestionById(req, res);
});

router.delete('/delete/:id', (req, res) => {
    /* #swagger.tags = ['Questions']
       #swagger.summary = 'Supprimer une question par son id'
       #swagger.parameters['id'] = { in: 'path', description: 'ID de la question', required: true, type: 'integer' }
       #swagger.responses[200] = { description: 'Question supprimée avec succès' }
       #swagger.responses[500] = { description: 'Erreur serveur' }
    */
    deleteQuestionById(req, res);
});

module.exports = router;
