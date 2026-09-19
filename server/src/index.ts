import express from 'express';
import cors from 'cors';

const app = express();

// Allow requests from your Vercel frontend specifically
app.use(cors({
  origin: ['https://mean-app-backend-alh4.vercel.app', 'http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());