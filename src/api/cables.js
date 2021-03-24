const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();

const CableController = require('../controllers/cable-controller');

router.get('/', CableController.index);

router.get('/:id', CableController.find);

router.get('/create/model', CableController.createModel);

router.post('/new', celebrate({
  [Segments.BODY]: Joi.object().keys({
    ProjectId: Joi.number().integer(),
    cable_name: Joi.string().required().max(255),
    cable_capacity: Joi.number().integer()
  })
}), CableController.create);

router.delete('/delete/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), CableController.delete);

router.put('/update/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().max(255),
    capacity: Joi.number().integer()
  }),
}), CableController.update);

module.exports = router;
