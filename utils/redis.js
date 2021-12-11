const { createClient } = require('async-redis');

const ENV = process.env;
const {
  REDIS_USER, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT,
} = ENV;

const url = `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;

const client = createClient({ url });

client.on('error', (err) => {
  console.log('Redis error', err);
});

client.on('connect', () => {
  console.log('Redis connected');
});

const set = async (key, data) => {
  const keyString = key.toString();
  const jsonData = JSON.stringify(data);
  await client.set(keyString, jsonData);
};

const get = async (key) => {
  const keyString = key.toString();
  const data = await client.get(keyString);
  return data ? JSON.parse(data) : null;
};

module.exports = { set, get };
