const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();

const DeviceController = require('../controllers/device-controller');


router.get('/', DeviceController.index);

router.get('/:id', DeviceController.find);

router.get('/create/model', DeviceController.createModel);

router.post('/new', celebrate({
  [Segments.BODY]: Joi.object().keys({
    ProjectId: Joi.number().integer(),
    device_name: Joi.string().required().max(255),
    device_active: Joi.boolean()
  })
}) , DeviceController.create);

router.delete('/delete/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}) , DeviceController.delete);

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
}) , DeviceController.update);


module.exports = router;
