const fs = require('fs').promises;
const fetchUsers = require('../../utils/fetchUsers');
const bcrypt = require('bcrypt');
const createStripeCustomer = require('../../utils/stripeUtils/createStripeCustomer');

const register = async (req, res) => {
  try {
    const { name, email, password, street, city, postcode, country } = req.body;

    const users = await fetchUsers();
    const userAlreadyExists = users.find((user) => user.email === email);
    if (userAlreadyExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStripeCustomer = await createStripeCustomer({
      name,
      email,
      address: {
        line1: street,
        postal_code: postcode,
        city,
        country,
      },
    });

    const newUser = {
      id: newStripeCustomer.id,
      name,
      email,
      password: hashedPassword,
      address: newStripeCustomer.address,
    };
    users.push(newUser);
    await fs.writeFile('./data/users.json', JSON.stringify(users, null, 2));

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await fetchUsers();
  const userExists = users.find((user) => user.email === email);

  if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
    return res.status(400).json('Wrong user or password');
  }

  const userForSession = {
    id: userExists.id,
    name: userExists.name,
    email: userExists.email,
    address: userExists.address,
  };

  req.session.user = userForSession;

  res.status(200).json(userForSession);
};

const logout = (req, res) => {
  req.session = null;
  res.status(200).json('Successfully logged out');
};

const status = (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ isLoggedIn: false, message: 'You are not logged in' });
  }
  res.status(200).json({ isLoggedIn: true, user: req.session.user });
};

module.exports = { register, login, logout, status };
