const router = require('express').Router();

const {
    getAllUtilisateurs,
    getUtilisateurById,
    createUtilisateur,
    updateUtilisateurById,
    deleteUtilisateurById,
    loginUtilisateur
} = require('../controller/utilisateurs.controller');

router.get('/', getAllUtilisateurs);

router.get('/:id', getUtilisateurById);

router.post('/create', createUtilisateur);

router.put('/update/:id', updateUtilisateurById);

router.delete('/delete/:id', deleteUtilisateurById);

router.post('/login', loginUtilisateur);

module.exports = router;
