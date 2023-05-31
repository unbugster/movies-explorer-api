const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const router = require('./routes');

const сentralizedErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb').then(() => {
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
app.use(сentralizedErrors);

app.listen(PORT, () => {
  console.log(`Start server on port: ${PORT}`);
});
