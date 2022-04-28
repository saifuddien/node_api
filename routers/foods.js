import express from "express";
import { addFoods, deleteFoods, getFoods, getOneFoods } from "../controllers/foods.js";

export const foodsRouter = express.Router()

foodsRouter.post('/foods', addFoods)
foodsRouter.get('/foods', getFoods)
foodsRouter.get('/foods/:id', getOneFoods)
foodsRouter.delete('/foods/:id', deleteFoods)