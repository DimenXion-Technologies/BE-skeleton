import User from '../models/User';
import HttpStatusCode from '../utils/http-status-code';
import { sendError, sendSuccess } from '../utils/response';
import JWT from 'jsonwebtoken';
import config from '../config';

const COOKIE_CONFIG = {
  maxAge: 1000 * 60 * 60 * 24 * 365,
  httpOnly: true,
  path: '/',
};

export const register = async (req, res) => {
  const inputData = req.body;
  const user = {
    first_name: inputData.first_name,
    last_name: inputData.last_name,
    email: inputData.email,
    password: inputData.password,
  };

  await User.create(user);

  return doLogin(res, user);
};

export const login = async (req, res) => {
  const input = req.body;
  const user = await User.getByEmail(input.email);

  if (!user)
    return sendError(res, `Invalid email`, HttpStatusCode.UNAUTHORIZED);

  const isValidPassword = await user.comparePassword(input.password);

  if (!isValidPassword)
    return sendError(
      res,
      `Either email or password is incorrect.`,
      HttpStatusCode.UNAUTHORIZED
    );

  return doLogin(res, user);
};

const doLogin = async (res, user) => {
  const payload = getTokenPayload(user);

  const access_token = getToken(payload);
  const refresh_token = getToken(payload, 'refresh');

  res.cookie('accessToken', access_token, COOKIE_CONFIG);
  res.cookie('refreshToken', refresh_token, COOKIE_CONFIG);

  return sendSuccess(res);
};

export const logout = async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  sendSuccess(res, {}, HttpStatusCode.OK, 'You loged out successfully.');
};

export const refreshToken = async (req, res) => {
  const inputData = req.cookies;
  // Verify token;
  let payload;
  JWT.verify(
    inputData.refreshToken,
    config.JWT_REFRESH_TOKEN_SECRET,
    (error, data) => {
      // If any error on verifying token then return
      if (error) return;
      // If no error on verifying token then update payload variable with data(token payload)
      payload = data;
    }
  );
  // If payload is undefind then throw error
  if (!payload) sendError(`The given refresh token is invalid/expired.`);

  const user = await User.getByEmail(payload.email);
  if (!user) return sendError(`Invalid refresh token.`);

  //New access token for few more minutes
  const tokenPayload = getTokenPayload(user);
  const accessToken = getToken(tokenPayload);
  const refreshToken = getToken(tokenPayload, 'refresh');

  res.cookie('accessToken', accessToken, COOKIE_CONFIG);
  res.cookie('refreshToken', refreshToken, COOKIE_CONFIG);

  sendSuccess(res);
};

const getToken = (payload, type = 'access') => {
  if (type === 'access')
    return JWT.sign(payload, config.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });

  return JWT.sign(payload, config.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: config.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });
};

const getTokenPayload = (user) => {
  return {
    id: user.id,
    email: user.email,
  };
};
