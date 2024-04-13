const getAllStripeProducts = require('../../utils/stripeUtils/getAllStripeProducts');
const getSingleStripeProduct = require('../../utils/stripeUtils/getSingleStripeProduct');

const getAllProducts = async (req, res) => {
  try {
    const products = await getAllStripeProducts();
    if (products) {
      return res.status(200).json(products);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getSingleStripeProduct(productId);
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllProducts, getSingleProduct };
