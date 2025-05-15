import dotenv from 'dotenv';
import Joi from 'joi';

const env = process.env.NODE_ENV;
// Load environment variables from .env
dotenv.config({ path: env === 'test' ? '.env.test' : '.env' });

// Define validation schema using Joi
const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'qa', 'production').required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  CORS_ALLOWED_ORIGIN: Joi.string().required(),
  LOG_DB_QUERY: Joi.boolean().required(),
  ENABLE_MODEL_SYNC: Joi.boolean().required(),
}).unknown(); // Allows additional environment variables not explicitly listed

// Validate environment variables
const { error, value: envVars } = envSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(
    `Invalid environment variables: ${error.details.map((x) => x.message).join(', ')}`
  );
}

/**
 * @typedef {Object} EnvVars
 * @property {'development' | 'qa' 'production'} NODE_ENV
 * @property {string} JWT_ACCESS_TOKEN_SECRET
 * @property {string} JWT_ACCESS_TOKEN_EXPIRES_IN
 * @property {string} JWT_REFRESH_TOKEN_SECRET
 * @property {string} JWT_REFRESH_TOKEN_EXPIRES_IN
 * @property {number} PORT
 * @property {string} DB_HOST
 * @property {number} DB_PORT
 * @property {string} DB_NAME
 * @property {string} DB_USERNAME
 * @property {string} DB_PASSWORD
 * @property {string} DB_PATH
 * @property {string} CORS_ALLOWED_ORIGIN
 * @property {boolean} LOG_DB_QUERY
 * @property {boolean} ENABLE_MODEL_SYNC
 */

/** @type {EnvVars} */
const config = envVars;

export default config;
