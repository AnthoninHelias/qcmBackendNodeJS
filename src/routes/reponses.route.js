const router = require('express').Router();

const {
    getResponseByIdQuestion,

} = require('../controller/reponses.controller');


router.get('/:id', (req, res) => {
    /* #swagger.tags = ['Réponses']
       #swagger.summary = 'Récupérer les réponses d\'une question par son id'
       #swagger.parameters['id'] = { in: 'path', description: 'ID de la question', required: true, type: 'integer' }
       #swagger.responses[200] = {
           description: 'Liste des réponses de la question',
           schema: [{ id: 1, titre: 'Paris', correct: true, question_id: 1 }]
       }
       #swagger.responses[500] = { description: 'Erreur serveur' }
    */
    getResponseByIdQuestion(req, res);
});


module.exports = router;
