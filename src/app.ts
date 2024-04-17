import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import { config } from './config/config.js';
import { ConnectOptions } from 'mongoose';

const app: Application = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions) // Add the 'as ConnectOptions' type assertion

    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong',
  });
});

// Start the server
const port = config.port || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});