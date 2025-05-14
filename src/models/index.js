import { Sequelize } from 'sequelize';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import config from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sequelize
export const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'mysql',
    logging: config.LOG_DB_QUERY ? console.log : false,
  }
);

const models = {};

// Load models dynamically
export const initializeModels = async () => {
  const files = await readdir(__dirname);
  for (const file of files) {
    // Skip index.js and non-JS files
    if (file === 'index.js' || !file.endsWith('.js')) continue;
    // Convert to file:// URL for ESM import
    const filePath = path.join(__dirname, file);
    const fileUrl = pathToFileURL(filePath);
    try {
      const { default: model } = await import(fileUrl.href);
      if (!model?.name) {
        console.warn(`⚠️ Model in ${file} has no "name" property.`);
        continue;
      }
      console.log('Model loded', file);
      models[model.name] = model;
    } catch (err) {
      console.error(`❌ Failed to load model from ${file}:`, err);
    }
  }

  // Setup associations if defined
  Object.values(models).forEach((model) => {
    if (typeof model.associate === 'function') {
      model.associate(models);
    }
  });
};

export default models;
