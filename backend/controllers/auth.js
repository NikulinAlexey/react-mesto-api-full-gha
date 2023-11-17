const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const UnauthorizedError = require('../errors/unauthorized-error');

const { JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError('Неправльная почта или пароль'))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            // создаю токен
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, JWT_SECRET);

            // Зашиваю токен в куку
            res.cookie('jwt', jwt, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });
            res.send(user);
          } else {
            throw new UnauthorizedError('Неправильная почта или пароль');
          }
        });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    email,
    avatar,
    password,
  } = req.body;

  bcrypt.hash(String(password), 10)
    .then((hashedPassword) => {
      User.create({
        name,
        about,
        email,
        avatar,
        password: hashedPassword,
      })
        .then((user) => {
          res.status(201).send({ data: user });
        })
        .catch(next);
    })
    .catch(next);
};

const logOut = (req, res, next) => {
  try {
    res.cookie(
      'jwt',
      null,
      {
        expires: new Date(Date.now()),
        httpOnly: true,
      },
    );
    res.status(200).send({ message: 'successful logout' });
  } catch (err) {
    return next(new Error('unsuccessful logout'));
  }
};

module.exports = {
  login,
  logOut,
  createUser,
};
