import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";

dotenv.config();

const { DATABASE_URI } = process.env;

if (!DATABASE_URI) {
  console.error("No DATABASE_URI environment variable has been defined in .env");
  process.exit(1);
}

connectToDatabase(DATABASE_URI)
  .then(() => {
    const app = express();
    
    app.use(cors());
    app.use(express.json()); // Ensures incoming JSON request bodies are parsed correctly

    app.use("/employees", employeeRouter);

    app.get("/healthcheck", (_req, res) => {
      res.status(200).send({ status: "ok" });
    });

    // Railway dynamically assigns a port; bind to 0.0.0.0 so external traffic can reach it
    const portNumber = process.env.PORT ? parseInt(process.env.PORT, 10) : 5300;

    app.listen(portNumber, "0.0.0.0" as string, () => {
      console.log(`Server running on port ${portNumber}...`);
    });
  })
  .catch((error) => console.error(error));