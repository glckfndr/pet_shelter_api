import express from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";
import { pets, Pet } from "./data/pets.js";

const PORT = 8000;
const app: Express = express();

app.use(cors());

app.get("/", (req: Request, res: Response<Pet[]>): void => {
  res.json(pets);
});

app.get(
  "/:id",
  (req: Request<{ id: string }>, res: Response<Pet | { message: string }>) => {
    const pet: Pet | undefined = pets.find(
      (p: Pet) => p.id === parseInt(req.params.id)
    );
    pet
      ? res.json(pet)
      : res
          .status(404)
          .json({ message: `Pet with id ${req.params.id} not found` });
  }
);

app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: `Endpoint ${req.originalUrl} not found` });
});

app.listen(PORT, (): void => {
  console.log("Listening on port: ", PORT);
});
