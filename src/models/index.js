import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs/promises';
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
    define: {
      underscored: true,
      timestamps: true,
    },
  }
);

const models = {};

const readModelsRecursively = async (dir) => {
  let results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nestedFiles = await readModelsRecursively(fullPath);
      results = results.concat(nestedFiles);
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.js') &&
      entry.name !== 'index.js'
    ) {
      results.push(fullPath);
    }
  }

  return results;
};

// Load models dynamically
export const initializeModels = async () => {
  const files = await readModelsRecursively(__dirname);
  for (const file of files) {
    // const filePath = path.join(__dirname, file);
    const fileUrl = pathToFileURL(file);
    try {
      const { default: model } = await import(fileUrl.href);
      if (!model?.name) {
        console.warn(`⚠️ Model in ${file} has no "name" property.`);
        continue;
      }
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
