const express = require('express');

const router = express.Router();
const TokenValidController = require('../controllers/token-valid-controller');

router.get('/', TokenValidController.index);

module.exports = router;
