const express = require('express');
require('dotenv').config();
require('./utils/redis');
const { connectDB } = require('./utils/mongoose');
const { DEFAULT_PORT, POSTMAN_URL } = require('./utils/constants');
const validator = require('./utils/ajv');
const routes = require('./routes/index');

const app = express();
const ENV = process.env;
const PORT = ENV.PORT ?? DEFAULT_PORT;

app.use(express.json({ extended: true }));
app.use(validator);

app.get('/', (req, res) => res.send(`Click <a href=${POSTMAN_URL}>here</a> to view Postman Collection`));

app.use('/api', routes);

(() => {
  connectDB(() => {
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  });
})();
