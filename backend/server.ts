import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connectDb';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth';
import messageRoutes from './routes/messages';
import usersRoutes from './routes/usersSidebar';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', usersRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log('Listening on port 5000!!!');
});
