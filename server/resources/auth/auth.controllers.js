const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const cookieSession = require('cookie-session');
const fetchUsers = require('../../utils/fetchUsers');

const register = async (req, res) => {
  const { email, password } = req.body;

  const users = await fetchUsers();
  const userAlreadyExists = users.find((user) => user.email === email);
  if (userAlreadyExists) {
    res.status(409).json({ message: 'User already exists' });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
};

module.exports = { register, login };
