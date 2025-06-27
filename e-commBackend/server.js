import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};


app.get(('/'), (req, res) => {
  res.send('API is running ...')
});

//mount API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);

app.use(notFound);
app.use(errorHandler);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
});
