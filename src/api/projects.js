const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();

const { isToken } = require("../middlewares");
const ProjectController = require('../controllers/project-controller');

router.get('/', isToken, ProjectController.index);

router.get('/:id', isToken, ProjectController.find);

router.post('/create', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    projectName: Joi.string().required().max(255),
    projectCompany: Joi.string().required().max(255)
  })
}), isToken, ProjectController.create);

router.delete('/delete/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), isToken, ProjectController.delete);

router.put('/update/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    projectName: Joi.string().required().max(255),
    projectCompany: Joi.string().required().max(255)
  })
}), isToken, ProjectController.update);


module.exports = router;
