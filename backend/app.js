require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const router = require('./routes');
const errorHandler = require('./middlewares/error');
const NotFoundError = require('./errors/not-found-error');

const allowedCors = [
  'https://alekseynikulin-front15.nomoreparties.co',
  'http://alekseynikulin-front15.nomoreparties.co',
  'http://localhost:3000',
  'https://localhost:3000',
];
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => console.log('Подключился к БД'))
  .catch(() => console.log('Ошибка при подключении к БД'));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: allowedCors,
    credentials: true,
  }),
);

app.use(limiter);
// app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use((next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Слушаю ${PORT} порт`);
});
