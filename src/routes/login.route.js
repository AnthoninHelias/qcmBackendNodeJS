const router = require('express').Router();
const { loginByParams } = require('../controller/utilisateurs.controller');

router.get('/:pseudo/:motdepasse', loginByParams);

module.exports = router;
