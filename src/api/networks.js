const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();

const NetworkController = require('../controllers/network-controller');

router.get('/', NetworkController.index);

router.get('/:id', NetworkController.find);

router.get('/create/model', NetworkController.createModel);

router.post('/new', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    ProjectId: Joi.number().integer(),
    networkName: Joi.string().required().max(255),
  })
}), NetworkController.create);

router.delete('/delete/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), NetworkController.delete);

router.put('/update/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    networkName: Joi.string().required().max(255),
  })
}), NetworkController.update);

module.exports = router;
