import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// Environment variables
const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI || '';

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// --- Employee Schema and Model ---
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  level: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('Mean Stack API is running successfully!');
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

app.post('/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create employee' });
  }
});

app.put('/employees/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update employee' });
  }
});

app.delete('/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete employee' });
  }
});

// --- Server Startup ---
async function startServer() {
  try {
    if (!MONGO_URI) {
      console.error('CRITICAL ERROR: MONGO_URI environment variable is missing!');
    }
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully');

    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('FATAL STARTUP ERROR:', err);
    process.exit(1);
  }
}

startServer();