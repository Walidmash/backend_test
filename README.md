# Backend test

## setup
Make sure you have npm installed

  1. clone the repo: `git clone git@github.com:Walidmash/backend_test.git`
  2. go to girih folder: `cd backend_test`
  3. run: `npm i`
  4. add the `config.env` file with environment variables needed:
    `TEST_URL`, `DATABASE_URL`, `STRIPE_PRIVATE_KEY`, `TOKEN_SECRET`
  5. run the server: `npm run start`
  6. open `localhost:4000` in the browser

## Tastks
  - [x] build scalable project structure
  - [x] create online database
  - [X] add API documentation tool
  - [x] add testing tools
  - [X] build register connected to Stripe API 
  - [X] build sign in
  - [X] token authentication
  - [ ] DB testing
  - [X] API testing
  - [X] build get all products end-point to get products from Stripe
  - [X] Test => Products list (with price). The products should be fetched from Stripes (assuming you have
manually entered them before).
5 Product purchase (from the available
  - [ ] Product purchase (from the available ones) (you can assume that a credit card for the user
was already present in the system). An invoice should be generated and sent to the user
after the purchase.
  - [X] depoly API on a cloud
  - [ ] learn and add docker