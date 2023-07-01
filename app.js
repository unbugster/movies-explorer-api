const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes');
const сentralizedErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');

const config = require('./config');

const app = express();

mongoose.connect(config.CONNECT_DATABASE_PATH).then(() => {
}).catch((error) => {
  console.log(`Error: ${error}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

app.use(limiter);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(сentralizedErrors);

app.listen(config.PORT, () => {
  console.log(`Start server on port: ${config.PORT}`);
});
