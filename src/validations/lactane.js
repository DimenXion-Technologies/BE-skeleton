import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';
import {
  baseNameSchema,
  emailSchema,
  firstNameSchema,
  lastNameSchema,
  phoneNumberSchema,
} from '../utils/joi-validations.js';

export const registerLactaneDonorValidator = celebrate(
  {
    [Segments.BODY]: Joi.object({
      uhid: Joi.string().required(),
      hospital_id: Joi.alternatives()
        .try(Joi.string().alphanum(), Joi.number())
        .required(),
      first_name: firstNameSchema,
      last_name: lastNameSchema,
      date_of_birth: Joi.date().required(),
      gender: Joi.string(),
      phone_number: phoneNumberSchema,
      email: emailSchema,
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      postal_code: Joi.string().required(),
      country: Joi.string(),
      status: Joi.string(),
    }),
  },
  { abortEarly: false }
);

export const updateLactaneDonorValidator = celebrate(
  {
    [Segments.BODY]: Joi.object({
      uhid: Joi.string().optional(),
      hospital_id: Joi.alternatives()
        .try(Joi.string().alphanum(), Joi.number())
        .optional(),
      first_name: baseNameSchema.optional(),
      last_name: baseNameSchema.optional(),
      date_of_birth: Joi.date().optional(),
      gender: Joi.string().valid('Female', 'Other').optional(),
      phone_number: phoneNumberSchema.optional(),
      email: Joi.string().email().optional(),
      address: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      postal_code: Joi.string().optional(),
      country: Joi.string().optional(),
      status: Joi.string()
        .valid('Pending', 'Active', 'Inactive', 'Disqualified')
        .optional(),
    }).min(1), // at least one field must be present
  },
  { abortEarly: false }
);
