import Joi from 'joi';

export const firstNameSchema = Joi.string().min(3).max(30).required();

export const lastNameSchema = Joi.string().min(3).max(30).required();

export const passwordSchema = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required()
  .messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
    'string.empty': 'Password is empty',
  });

export const emailSchema = Joi.string().email().required().messages({
  'string.base': 'Email must be a string',
  'any.required': 'Email is required',
  'string.email': 'Invalid email',
});

export const baseNameSchema = Joi.string().min(3).max(30);

export const phoneNumberSchema = Joi.string()
  .required()
  .pattern(/^(\+91[\-\s]?)?[6-9]\d{9}$/)
  .message('Phone number must be a valid Indian mobile number');

export const accessTokenSchema = Joi.string().required();

export const refreshTokenSchema = Joi.string().required();
