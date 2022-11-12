import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth.router';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (_, res) => res.json({ message: 'Hello World' }));
app.use('/auth', authRouter);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(500).json({ message: err.message });
  }
});

export default app;
