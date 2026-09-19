import { Router } from 'express';
import { collections } from './database';
import { ObjectId } from 'mongodb';

export const employeeRouter = Router();

// GET all employees
employeeRouter.get('/', async (_req, res) => {
  try {
    const employees = await collections.employees?.find({}).toArray();
    res.status(200).send(employees);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// GET a single employee by ID
employeeRouter.get('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const employee = await collections.employees?.findOne({ _id: new ObjectId(id) });

    if (employee) {
      res.status(200).send(employee);
    } else {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error: any) {
    res.status(400).send(`Failed to find an employee: ID ${req?.params?.id}`);
  }
});

// POST a new employee (Fixes the 404 error when saving)
employeeRouter.post('/', async (req, res) => {
  try {
    const newEmployee = req.body;
    const result = await collections.employees?.insertOne(newEmployee);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new employee: ID ${result.insertedId}.`);
    } else {
      res.status(500).send('Failed to create a new employee.');
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// PUT to update an employee
employeeRouter.put('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const updatedEmployee = req.body;
    const result = await collections.employees?.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedEmployee }
    );

    if (result && result.matchedCount) {
      res.status(200).send(`Successfully updated employee: ID ${id}`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find employee: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update employee: ID ${id}`);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

// DELETE an employee
employeeRouter.delete('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await collections.employees?.deleteOne({ _id: new ObjectId(id) });

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed employee: ID ${id}`);
    } else if (!result?.deletedCount) {
      res.status(404).send(`Failed to find employee: ID ${id}`);
    } else {
      res.status(400).send(`Failed to remove employee: ID ${id}`);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});