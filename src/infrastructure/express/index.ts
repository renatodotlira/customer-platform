import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import {router} from '../../presentation/routers/index.route';

const app = express();
const distDir: string = path.resolve(__dirname, '../../public');
app.use(express.static(distDir));

/*
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});
*/

app.use((req, res, next) => {
  console.log("index.ts - ");
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.use(bodyParser.json({ limit: '512mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(methodOverride());

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross-Origin Resource Sharing
app.use(cors());

// API router
app.use('/api/v1', router);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404));
});

// Error handler, send stacktrace only during development
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.isJoi) {
    err.message = err.details.map((e: any) => e.message).join('; ');
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message,
  });
  next(err);
});

export default app;
