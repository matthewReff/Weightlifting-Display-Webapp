import { Express } from "express";
import bodyWeight from "./body-weight"
import exerciseMax from "./exercise-max"

export const mountDataRoutes = (app: Express) => {
  const dataFunctions = [
    bodyWeight,
    exerciseMax
  ];

  for(const func of dataFunctions) {
    app.use("/data", func);
  }
}