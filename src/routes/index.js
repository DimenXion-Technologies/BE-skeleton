import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const ROUTES_DIR = __dirname;
const registeredRoutes = [];

async function loadRoutesFromDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await loadRoutesFromDir(fullPath);
    } else if (
      entry.isFile() &&
      !['index.js', 'printRoutes.js'].includes(entry.name)
    ) {
      const relativePath = path.relative(ROUTES_DIR, fullPath);
      const parsed = path.parse(relativePath);
      const baseRoute =
        '/' + path.join(parsed.dir, parsed.name).replace(/\\/g, '/');
      try {
        const moduleUrl = pathToFileURL(fullPath).href;
        const { default: model } = await import(moduleUrl);
        registeredRoutes.push({ path: baseRoute });
        router.use(baseRoute, model);
      } catch (err) {
        console.error(`❌ Failed to load route at ${fullPath}:`, err);
      }
    }
  }
}

// Export an async initializer
export async function getRouter() {
  await loadRoutesFromDir(ROUTES_DIR);
  return router;
}

export function getRegisteredRoutes() {
  return registeredRoutes;
}
