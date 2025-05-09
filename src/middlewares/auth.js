import config from '../config';
import User from '../models/User';
import JWT from 'jsonwebtoken';
import { sendError } from '../utils/response';
import HttpStatusCode from '../utils/http-status-code';

const auth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies)
      return sendError(
        res,
        'You must login to perform this action 11.',
        HttpStatusCode.FORBIDDEN
      );

    // Get token from headers
    let token = cookies?.accessToken;
    // If token does not exist then throw error
    if (!token)
      return sendError(
        res,
        'You must login to perform this action 22.',
        HttpStatusCode.FORBIDDEN
      );

    // Initialize payload variable with undefined value
    let payload;
    let tokenError;
    // Verify token
    JWT.verify(token, config.JWT_ACCESS_TOKEN_SECRET, (error, data) => {
      // If any error on verifying token then return
      if (error) {
        tokenError = error.name;
        return;
      }
      // If no error on verifying token then update payload variable with data(token payload)
      payload = data;
    });

    // If payload is undefind then throw error
    if (!payload) {
      if (tokenError === 'TokenExpiredError') {
        res.clearCookie('accessToken');
        return sendError(res, 'ACCESS_TOKEN_EXPIRED', HttpStatusCode.FORBIDDEN);
      }
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return sendError(
        res,
        'The given authorization token is invalid.',
        HttpStatusCode.BAD_REQUEST
      );
    }

    // Check in user table if user exists based on email and id, getting from token payload
    const user = await User.getByEmail(payload.email);
    // If user does not exist then throw error
    if (!user)
      return sendError(
        res,
        'The given authorization token is invalid.',
        HttpStatusCode.BAD_REQUEST
      );

    // Add user property in req with user data
    req.currentUser = user;
    // Execute further codes
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
