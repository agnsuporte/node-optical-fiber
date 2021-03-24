const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();

const { isToken } = require('../middlewares');
const UserController = require('../controllers/user-controller');

router.get('/', isToken, UserController.index);

router.post('/sign', celebrate({
  [Segments.BODY]: Joi.object().keys({
    userPassword: Joi.string().required(),
    userEmail: Joi.string().required().email(),
  })
}), UserController.sign);

router.post('/create', celebrate({
  [Segments.BODY]: Joi.object().keys({
    userName: Joi.string().required(),
    userUsername: Joi.string().required().max(50),
    userPassword: Joi.string().required(),
    userEmail: Joi.string().required().email()
  })
}), UserController.create);

router.delete('/delete/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), isToken, UserController.delete);

router.put('/update/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    userName: Joi.string().optional(),
    userUsername: Joi.string().required().max(50),
    userPassword: Joi.string().optional(),
    userEmail: Joi.string().optional().email()
  }),
}), isToken, UserController.update);

module.exports = router;
