// eslint-disable-next-line import/extensions
import { createToken } from '../middlewares/token.js';

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({
      status: 'error',
      message: 'no username provided'
    });
  }

  if (!password) {
    return res.status(400).json({
      status: 'error',
      message: 'please enter a password'
    });
  }

  const token = createToken({ username, password });
  return res.status(200).json({
    status: 'success',
    token
  });
};

export default login;
