// hide this later in env.
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
module.exports = stripe
