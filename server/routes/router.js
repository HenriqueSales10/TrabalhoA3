const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller')

/**
 * @description Root Route
 * @method GET/
 */
route.get('/',services.homeRoutes)

/**
 * @description add-Compromisso
 * @method GET/
 */
route.get('/add-compromisso', services.add_compromisso)

/**
 * @description update-compromisso
 * @method GET/
 */
route.get('/update-compromisso', services.update_compromisso)

/**
 * @description ir-compromisso
 * @method GET/
 */
 route.get('/ir-compromisso', services.ir_compromisso)

 /**
 * @description irParaPostoSaude
 * @method GET/
 */
route.get('/irParaPostoSaude', services.irParaPostoSaude)

//API
route.post('/api/compromissos', controller.create);
route.get('/api/compromissos', controller.find);
route.put('/api/compromissos/:id', controller.update);
route.delete('/api/compromissos/:id', controller.delete);

module.exports = route