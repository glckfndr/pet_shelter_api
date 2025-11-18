import express from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";
import { pets } from "./data/pets.js";

const PORT = 8000;
const app: Express = express();

app.use(cors());
app.get("/", (req: Request, res: Response): void => {
  res.json(pets);
});
app.listen(PORT, (): void => {
  console.log("Listening on port: ", PORT);
});
