import { Sequelize } from 'sequelize';
import { readdir } from 'fs/promises';
import path from 'path';
import config from '../config';

// Initialize Sequelize
export const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'postgres',
    logging: true,
  }
);

const models = {};

// **Function to Load Models Asynchronously**
export const initializeModels = async () => {
  const __dirname = path.join(
    path.dirname(process.env.npm_package_json),
    'src',
    'models'
  );
  const files = await readdir(__dirname);

  for (const file of files) {
    if (file !== 'index.js' && file.endsWith('.js')) {
      const { default: model } = await import(`${path.join(__dirname, file)}`);
      models[model.name] = model;
    }
  }

  // **Establish Associations**
  Object.values(models).forEach((model) => {
    if (model.associate) {
      model.associate(models);
    }
  });
};

export default models;
