const express = require('express');
require('dotenv').config();
require('./utils/redis');
const { connectDB } = require('./utils/mongoose');
const { DEFAULT_PORT } = require('./utils/constants');
const validator = require('./utils/ajv');
const routes = require('./routes/index');

const POSTMAN_URL = 'https://www.postman.com/subhankr12/workspace/blog';

const app = express();
const ENV = process.env;
const PORT = ENV.PORT ?? DEFAULT_PORT;

app.use(express.json({ extended: true }));
app.use(validator);

app.get('/', (req, res) => res.redirect(POSTMAN_URL));
app.use('/api', routes);

(() => {
  connectDB(() => {
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  });
})();
