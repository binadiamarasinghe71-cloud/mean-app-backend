import express from 'express';
import cors from 'cors';

const app = express();

// Allow all origins to rule out any strict CORS mismatch
app.use(cors());

app.use(express.json());