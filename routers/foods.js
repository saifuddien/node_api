import express from "express";
import { addFoods, getFoods } from "../controllers/foods.js";

export const foodsRouter = express.Router()

foodsRouter.post('/foods', addFoods)
foodsRouter.get('/foods', getFoods)