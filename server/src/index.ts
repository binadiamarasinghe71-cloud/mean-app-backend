import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Enable CORS for your Vercel frontend and local testing
app.use(cors({
  origin: [
    'https://mean-app-backend-alh4.vercel.app',
    'http://localhost:4200'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Make sure your routes are defined AFTER middleware