import type { Request, Response, NextFunction } from "express";
import { Pet } from "../data/pets";

/*
CHALLENGE: Get specific with the Request and Response generics
1. Think about what params we might be getting in the request
2. Consider what we might be responding with
*/

export const validateNumericId = (
  req: Request<{ id: string }>,
  res: Response<Pet | { message: string }>,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ message: "Pet ID must be a number" });
  } else {
    next();
  }
};
