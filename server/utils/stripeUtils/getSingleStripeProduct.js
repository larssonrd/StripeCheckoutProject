const initStripe = require('../../stripe');

const getSingleStripeProduct = async (productId) => {
  try {
    const stripe = initStripe();
    const productArr = await stripe.prices.list({
      product: productId,
      expand: ['data.product'],
    });
    const product = productArr.data[0];

    const formattedProduct = {
      id: product.id,
      imageSrc: product.product.images[0],
      name: product.product.name,
      price: product.unit_amount / 100,
      currency: product.currency.toUpperCase(),
      href: `/product/${product.product.id}`,
      productId: product.product.id,
      description: product.product.description,
    };

    return formattedProduct;
  } catch (err) {
    console.error(err);
  }
};

module.exports = getSingleStripeProduct;
