require('dotenv').config();

const {
  NODE_ENV, PORT, JWT_SECRET, CONNECT,
} = process.env;

const config = {
  NODE_ENV: NODE_ENV || 'development',
  PORT: PORT || 3100,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
  CONNECT_DATABASE_PATH: CONNECT || 'mongodb://127.0.0.1:27017/bitfilmsdb',
};

module.exports = config;
