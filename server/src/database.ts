import * as mongodb from "mongodb";

export const collections: {
  employees?: mongodb.Collection<mongodb.BSON.Document>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("meanStackExample");
  const employeesCollection = db.collection("employees");

  collections.employees = employeesCollection;

  console.log(`Successfully connected to database: ${db.databaseName}`);
}