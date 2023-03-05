const { getPlayers } = require('../controller/playersController');
const express = require('express');
const router = express.Router();

router.get('/', getPlayers);

module.exports = router;
