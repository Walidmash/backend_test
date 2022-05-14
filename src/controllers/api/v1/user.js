const queries = require('../../../models/queries/index.js');
const tokenHandler = require('./helpers/index.js').token;
const { stripe } = require('./helpers/index.js');

const postUserRegister = (req, res) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to sign in a specific user' */
  try {
    // Get user input
    let { password, email } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("email and password are required");
    }
    email = email.toLowerCase();
  // check if user already exist
  queries.user.getUser(email, (err, result) => {
    if (err) {
      console.log(`error getting user from database: ${err.message}`);
      res.status(401).json({message: "Internal Server Error"});
    } else {
      if (result) // user exist
        return res.status(409).send("User Already Exist. Please Login");
      // else create new user
        // create stripe user
      stripe.customers.create({
        email
      })
      .then( customer => {
        queries.user.postUserRegister(email, password, customer.id, (error, result2)=>{
          if (error){
            console.log(`error creating user in database: ${error.message}`);
            return res.status(401).json({message: "Internal Server Error"});
          }
          const token = tokenHandler.createToken(result2.id, email, customer.id);
          const user = {
            id: result2.id,
            email,
            stripe_id:customer.id,
            token
          }
          res.status(201).json(user); // done; return user

        })
      })
      .catch( error =>{
        console.log(`error creating user in stripe: ${error.message}`);
        return res.status(401).json({message: "External Server Error"});
      })
    }
  });
  } catch (err) {
    console.log(`Error in postUserRegister function: ${err}`);
    return res.status(401).json({message: "Internal Server Error"});
  }
}
const postUserLogIn = (req, res) => {
  const { email, password } = req.body;
  // Validate user input
  if (!(email && password))
    return res.status(400).send("email and password are required");
  
  queries.user.userLogIn(email, password, (err, result) => {
    if (err) {
      if (err.notMatched) return res.status(401).json({message: "Wrong email/password"});
      // else internal error
      console.log(`error user login in database: ${err.message}`);
      return res.status(401).json({message: "Internal Server Error"});
    }
      const token = tokenHandler.createToken(result.id, result.email, result.stripe_id);
      const user = {
        id: result.id,
        email: result.email,
        stripe_id: result.stripe_id,
        token
      }
      res.status(200).json(user); // done; return user
  });
};

module.exports = {
  postUserRegister,
  postUserLogIn
};
