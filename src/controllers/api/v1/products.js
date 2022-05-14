const { stripe } = require('./helpers/index.js');

const getAllProducts = (req, res) => {
    stripe.products.list({
        limit: 3,
      })
      .then(product => {
        res.status(200).send(product)
    })
      .catch(error => console.error(`error getting all products: ${error}`));
}
module.exports = {
  getAllProducts
}
