const express = require('express');
const routes = require('./routes.js');
const router = express.Router();
router.post('/register', routes.postRegister);
router.post('/login', routes.postLogin);
// need auth WIP
router.get('/allproducts', routes.getAllProducts);
module.exports = router;
