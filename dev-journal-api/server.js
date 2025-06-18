import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});


