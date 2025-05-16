import { isCelebrateError } from 'celebrate';
import app from './app.js';
import config from './config/index.js';
import { initializeModels, sequelize } from './models/index.js';
import { getRouter } from './routes/index.js';

let server;

const startServer = async () => {
  try {
    // Ensure models are loaded before starting the server
    await initializeModels();
    console.log('Models are loaded successfully');
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    getRouter().then((router) => {
      app.use('/', router);
      // Celebrate Validation Error Handler
      app.use((err, req, res, next) => {
        if (isCelebrateError(err)) {
          const result = {};

          for (const [segment, joiError] of err.details.entries()) {
            result[segment] = joiError.details.map((detail) => ({
              [detail.path.join('.')]: detail.message,
            }));
          }

          return res.status(400).json({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Validation failed',
            validation: result,
          });
        }

        next(err);
      });

      // Generic Error Handler
      // eslint-disable-next-line no-unused-vars
      app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(err.status || 500).json({
          statusCode: err.status || 500,
          error: 'Server Error',
          message: err.message || 'Internal Server Error',
        });
      });

      server = app.listen(config.PORT, () => {
        console.log(`The app has been started on port ${config.PORT}`);
      });
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit process if initialization fails
  }
};

// Graceful Shutdown function
const gracefulShutdown = async () => {
  console.log('\nReceived shutdown signal, closing server...');
  if (server) {
    server.close(async (err) => {
      if (err) {
        console.error('Error while closing server:', err);
        process.exit(1);
      }
      console.log('Server closed.');
      try {
        await sequelize.close();
        console.log('Database connection closed.');
        process.exit(0);
      } catch (dbError) {
        console.error('Error closing database connection:', dbError);
        process.exit(1);
      }
    });
  }
};

// Handle OS signals
process.on('SIGINT', gracefulShutdown); // Ctrl+C

startServer();
