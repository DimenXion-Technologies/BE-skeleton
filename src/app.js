import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Use middleware cors
app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Use middleware cookie-parser
app.use(
  cookieParser({
    httpOnly: true,
    path: '/',
  })
);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome ji!' });
});

export default app;
