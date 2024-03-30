const fs = require('fs').promises;
const cookieSession = require('cookie-session');
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

const login = (req, res) => {
  const { email, password } = req.body;
};

module.exports = { register, login };
