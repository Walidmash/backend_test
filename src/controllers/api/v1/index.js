const express = require('express');
const routes = require('./routes.js');
const { auth } = require('../../../middlewares/auth');
const router = express.Router();
router.post('/register', routes.postRegister);
router.post('/login', routes.postLogin);
// need auth
router.get('/allproducts', auth, routes.getAllProducts);
module.exports = router;
