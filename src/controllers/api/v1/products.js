const { stripe } = require('./helpers/index.js');

const getAllProducts = async (req, res) => {
  // get all products
  const products = await stripe.products.list();
  // get all prices
  const prices = await stripe.prices.list();
  // add prices to products
  // hash table
  const productsDic = products.data.reduce((dic, product) => {
    product.prices = []; // initialize
    dic[product.id] =product;
    return dic;
  },{});
  // map prices to the hash table
  prices.data.forEach(price => {
    productsDic[price.product].prices.push(price);
  });
  products.data = Object.values(productsDic)
  res.status(200).send(products)
}
module.exports = {
  getAllProducts
}
