import express from 'express';
import cors from 'cors';

const app = express();

// MUST be placed before any app.use('/employees', ...) or routes
app.use(cors({
  origin: 'https://mean-app-backend-alh4.vercel.app',
  credentials: true
}));

app.use(express.json());

// Your routes go here:
// app.use('/employees', employeeRoutes);