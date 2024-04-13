const express = require('express');
const router = express.Router();
const { getServicePoints } = require('./postnord.controller');

router.get('/servicepoints', getServicePoints);

module.exports = router;
