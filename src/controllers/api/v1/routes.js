module.exports = {
  postRegister: require('./user.js').postUserRegister,
  postLogin: require('./user.js').postUserLogIn,
  getAllProducts: require('./products.js').getAllProducts
};
