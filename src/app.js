require('env2')('./config.env');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./controllers/api/v1/index');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./../swagger_output.json');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, '..', 'public'), { maxAge: '30d' }));
app.use('/api/v1/', routes);
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// })111;
app.use('/api/v1/', (req, res) => {
  res.status(404).json({ message: 'End point not found' })
});
app.use(swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});
app.set('port', process.env.PORT || 4000);
module.exports = app;
