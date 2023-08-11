const allowedCors = [
  'http://alekseynikulin-front15.nomoreparties.co',
  'https://alekseynikulin-front15.nomoreparties.co',
  'http://localhost:3000',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Controll-Allow-Origin', origin);
  } else if (method === 'OPTIONS') {
    res.header('Access-Controll-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Controll-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
};

module.exports = cors;
