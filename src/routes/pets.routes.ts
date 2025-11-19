import express from "express";
import type { Router, Request, Response } from "express";

import type { Pet } from "../data/pets";
import { pets } from "../data/pets";
import { getPets } from "../controllers/pets.controller";

export const petRouter: Router = express.Router();

petRouter.get("/", getPets);

petRouter.get(
  "/:id",
  (
    req: Request<{ id: string }>,
    res: Response<Pet | { message: string }>
  ): void => {
    const { id } = req.params;
    const pet: Pet | undefined = pets.find(
      (pet: Pet): boolean => pet.id.toString() === id
    );

    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: "No pet with that ID" });
    }
  }
);
