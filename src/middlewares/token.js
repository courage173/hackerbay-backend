import jwt from 'jsonwebtoken';

export const createToken = (data) => jwt.sign(data, 'itsABeautifulToken', { expiresIn: '1h' });

export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: 'error',
      message: 'No token found'
    });
  }
  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, 'itsABeautifulToken', (error, user) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        message: 'token is invalid'
      });
    }
    req.user = user;
    return next();
  });
};
