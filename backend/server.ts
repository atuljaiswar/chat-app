import express from 'express';
import dotenv from 'dotenv';
// import { renderToString } from 'react-dom/server';
import connectDb from './db/connectDb';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth';
import messageRoutes from './routes/messages';
import usersRoutes from './routes/usersSidebar';

// import App from '../frontend/src/App';

import { app, server } from './socket/socket';

dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', usersRoutes);

server.listen(PORT, () => {
  connectDb();
  console.log('Listening on port 5000!!!');
});
