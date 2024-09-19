const express = require('express');
const addRecord = require('../controllers/addRecord');

const router = express.Router();

router.post('/', addRecord);

module.exports = router;