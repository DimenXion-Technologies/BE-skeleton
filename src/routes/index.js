import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const __dirname = path.join(
  path.dirname(process.env.npm_package_json),
  'src',
  'routes'
);

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
      const { default: model } = await import(
        `${path.join(dirPath, entry.name)}`
      );
      registeredRoutes.push({ path: baseRoute });
      router.use(baseRoute, model);
      //   console.log(`✅ Loaded route: ${baseRoute}`);
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
