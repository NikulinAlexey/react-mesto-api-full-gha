require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const router = require('./routes');
const errorHandler = require('./middlewares/error');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => console.log('Подключился к БД'))
  .catch(() => console.log('Ошибка при подключении к БД'));

app.use(express.json());
app.use(cookieParser());

const allowedCors = [
  'https://alekseynikulin-front15.nomoreparties.co',
  'http://alekseynikulin-front15.nomoreparties.co',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }
});

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(router);

app.use((next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`слушаю ${PORT} порт`);
});
