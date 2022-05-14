const express = require('express');
const routes = require('./routes.js');
const auth = require('../../../middlewares/auth.js');
const router = express.Router();


router.post('/register',
/*  #swagger.tags = ['User']
    #swagger.description = 'Endpoint to register as a user.'
    #swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: { $ref: "#/definitions/Register" }
    }
*/
routes.postRegister);

router.post('/login', 
/*  #swagger.tags = ['User']
    #swagger.description = 'Endpoint to login as a user.'
    #swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information.',
            required: true,
            schema: { $ref: "#/definitions/Login" }
    }
*/
routes.postLogin);


///// need auth
router.get('/allproducts', auth,
/*  #swagger.tags = ['Product']
    #swagger.description = 'Endpoint get all products.' */
routes.getAllProducts);

module.exports = router;
