const express = require('express');
const router = express.Router();
const { register, login, logout, status } = require('./auth.controllers');

router
  .post('/register', register)
  .post('/login', login)
  .post('/logout', logout)
  .get('/status', status);

module.exports = router;
