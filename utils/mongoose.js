const mongoose = require('mongoose');

const ENV = process.env;
const {
  DB_USER, DB_PASSWORD, DB_NAME, DB_SERVER,
} = ENV;

const CONNECTION_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_SERVER}/${DB_NAME}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function connectDB(callback) {
  mongoose.connect(CONNECTION_URL, options);
  mongoose.connection.on('error', (err) => {
    console.log('Database Error', err);
  });
  mongoose.connection.on('connected', () => {
    console.log('Database connected');
    callback();
  });
}

module.exports = { connectDB };
