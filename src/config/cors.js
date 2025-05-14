import config from '.';

const corsConfig = Object.freeze({
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  origin: config.CORS_ALLOWED_ORIGIN.split(','),
  optionsSuccessStatus: 200,
});

export default corsConfig;
