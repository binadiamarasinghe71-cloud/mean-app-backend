import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for your Vercel frontend
app.use(cors({
  origin: 'https://mean-app-backend-alh4.vercel.app',
  credentials: true
}));

app.use(express.json());