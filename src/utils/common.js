import { customAlphabet } from 'nanoid';

// Create nanoid generator with uppercase alphanumeric characters
export const getUniqueString = (length = 10) =>
  customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', length);
