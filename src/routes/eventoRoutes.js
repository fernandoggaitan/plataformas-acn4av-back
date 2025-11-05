const express = require('express');
const router = express.Router();

//Controlador
const eventoController = require('../controllers/eventoController');

router.get('/eventos', eventoController.index);
router.post('/eventos', eventoController.store);

router.get('/eventos/:ID', eventoController.show);
router.put('/eventos/:ID', eventoController.update);
router.delete('/eventos/:ID', eventoController.destroy);

module.exports = router;