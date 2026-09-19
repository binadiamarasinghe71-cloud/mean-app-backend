import { Router } from 'express';
import { collections } from './database';
import { ObjectId } from 'mongodb';

export const employeeRouter = Router();

// (Keep your existing GET, POST, and DELETE routes here...)

// Add this PUT route for updating
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