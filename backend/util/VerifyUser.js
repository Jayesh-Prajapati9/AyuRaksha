import jwt from 'jsonwebtoken';
import { ApiError } from './ApiError.js';

export const VerifyUser = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json(new ApiError(401, 'Unauthorized - No token provided'));
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.error('JWT Verification Error:', err.message);
        return res.status(401).json(new ApiError(401, 'Unauthorized - Invalid token'));
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    res.status(500).json(new ApiError(500, 'Internal Server Error'));
  }
};
