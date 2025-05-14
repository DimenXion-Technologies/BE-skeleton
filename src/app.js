import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsConfig from './config/cors';
import cookieConfig from './config/cookie';

const app = express();

// Use middleware cors
app.use(cors(corsConfig));

// Middleware to parse JSON bodies
app.use(express.json());

// Use middleware cookie-parser
app.use(cookieParser(cookieConfig));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome ji!' });
});

export default app;
