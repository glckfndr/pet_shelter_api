import express from "express";
import type { Express } from "express";
import { pets } from "./data/pets.js";

const PORT = 8000;
const app: Express = express();
app.get("/", (req: express.Request, res: express.Response) => {
  res.json(pets);
});
app.listen(PORT, (): void => {
  console.log("Listening on port: ", PORT);
});
