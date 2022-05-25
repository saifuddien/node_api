import express from "express";
import { addFoods, deleteFoods, getFoods, getOneFoods, updateOneFoods } from "../controllers/foods.js";

export const foodsRouter = express.Router()

foodsRouter.post('/foods', addFoods)
foodsRouter.get('/foods', getFoods)
foodsRouter.get('/foods/:id', getOneFoods)
foodsRouter.put('/foods/:id', updateOneFoods)
foodsRouter.delete('/foods/:id', deleteFoods)