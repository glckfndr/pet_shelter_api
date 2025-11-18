import express from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";
import { pets, Pet } from "./data/pets.js";

type PetQueryParams = {
  species?: string;
  adopted?: string;
};

const PORT = 8000;
const app: Express = express();

app.use(cors());

app.get(
  "/",
  (
    req: Request<{}, unknown, {}, PetQueryParams>,
    res: Response<Pet[]>
  ): void => {
    const { species, adopted } = req.query;
    let filteredPets: Pet[] = pets;
    if (species) {
      filteredPets = filteredPets.filter(
        (p: Pet) => p.species.toLowerCase() === species.toLowerCase()
      );
    }
    if (adopted) {
      filteredPets = filteredPets.filter(
        (p: Pet) => p.adopted === JSON.parse(adopted)
      );
    }
    res.json(filteredPets);
  }
);

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
