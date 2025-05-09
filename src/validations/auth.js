import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';
import {
  accessTokenSchema,
  refreshTokenSchema,
  emailSchema,
  firstNameSchema,
  passwordSchema,
  lastNameSchema,
} from '../utils/joi-validations';

export const loginValidator = celebrate(
  {
    [Segments.BODY]: Joi.object({
      email: emailSchema,
      password: passwordSchema,
    }),
  },
  { abortEarly: false }
);

export const registerValidator = celebrate(
  {
    [Segments.BODY]: Joi.object({
      first_name: firstNameSchema,
      last_name: lastNameSchema,
      email: emailSchema,
      password: passwordSchema,
    }),
  },
  { abortEarly: false }
);

export const refreshTokenValidator = celebrate(
  {
    [Segments.COOKIES]: Joi.object({
      accessToken: accessTokenSchema,
      refreshToken: refreshTokenSchema,
    }),
  },
  { abortEarly: false }
);
